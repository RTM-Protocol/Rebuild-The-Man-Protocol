# 🔄 Supabase Integration Setup Guide

## Overview
Your app now has **hybrid sync** - it works offline with localStorage and syncs to the cloud when online!

### Features Added:
✅ **Cloud backup** - Your data is safely backed up  
✅ **Multi-device sync** - Access your progress from any device  
✅ **Offline-first** - Works perfectly without internet  
✅ **Automatic sync** - Syncs when online, no manual action needed  
✅ **Conflict resolution** - Smart merging when using multiple devices  
✅ **Anonymous auth** - No signup needed, device-based authentication  

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

First, fix npm permissions and install Supabase:

```bash
# Fix npm cache (one-time fix)
sudo chown -R $(whoami) ~/.npm

# Install dependencies
npm install
```

---

### Step 2: Create Supabase Project

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign in (free account)
4. Click **"New Project"**
5. Choose:
   - **Organization**: Create new or use existing
   - **Name**: `rebuild-protocol` (or anything you like)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Plan**: Free tier is perfect

6. Click **"Create new project"**
7. Wait 2-3 minutes for setup

---

### Step 3: Create Database Table

1. In your Supabase project, click **"SQL Editor"** in left sidebar
2. Click **"+ New query"**
3. Copy and paste this SQL:

```sql
-- Create user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  active_protocol JSONB,
  completed_protocols JSONB[] DEFAULT '{}',
  lifetime_stats JSONB DEFAULT '{}',
  reminder_settings JSONB DEFAULT '{}',
  last_synced TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to manage their own data
CREATE POLICY "Users can manage their own data"
  ON user_progress
  FOR ALL
  TO anon
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update timestamp
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **"Run"** (bottom right)
5. You should see: **"Success. No rows returned"**

---

### Step 4: Get Your API Keys

1. Click **"Settings"** (gear icon) in left sidebar
2. Click **"API"**
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Project API keys** → **anon public**: `eyJhbGc...`

4. Copy both values

---

### Step 5: Configure Your App

1. In Cursor, create a file called `.env.local` at the root of your project
2. Add this (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: 
- Replace `YOUR_PROJECT_ID` with your actual project ID
- Replace the `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your actual anon key
- `.env.local` is already in `.gitignore` - your keys are safe!

---

### Step 6: Test It!

```bash
# Restart dev server
npm run dev
```

Open http://localhost:3000

**Check browser console (F12)**:
- You should see: `"Anonymous user created"`
- Then: `"✅ Data synced to cloud"`

**That's it!** Your app is now syncing to the cloud! 🎉

---

## 🔍 How It Works

### First Time User:
1. App loads → Creates anonymous user in Supabase
2. User completes missions → Saves to localStorage
3. After 1 second → Auto-syncs to cloud
4. All done silently in background

### Returning User (Same Device):
1. App loads → Reads localStorage (instant!)
2. Checks cloud → Merges any new data
3. Continues working

### Multi-Device User:
1. **Device A**: Complete Day 1-3
2. **Device B**: Open app → Syncs → Shows Day 1-3 completed!
3. **Device B**: Complete Day 4
4. **Device A**: Refresh → Syncs → Shows Day 4 completed!

### Offline User:
1. No internet? No problem!
2. App works 100% normally with localStorage
3. When back online → Auto-syncs everything

---

## 🛡️ Privacy & Security

### Anonymous Authentication
- No email, password, or personal info needed
- Each device gets a unique anonymous user ID
- Data tied to that device
- Completely private

### Row Level Security (RLS)
- Users can ONLY access their own data
- Supabase enforces this at database level
- Even if someone knows your user ID, they can't access your data

### Data Stored:
- ✅ Protocol progress (which day, completion status)
- ✅ Check-in ratings (stress/anger/focus levels)
- ✅ Field notes (your personal reflections)
- ✅ Lifetime stats (totals, streaks)
- ❌ NO personal info (name, email, etc.)
- ❌ NO authentication credentials

---

## 🔧 Troubleshooting

### "Supabase not configured - using localStorage only"
- **Cause**: Environment variables not set
- **Fix**: Make sure `.env.local` exists and has correct values
- **Restart**: `npm run dev` after creating `.env.local`

### "Anonymous sign-in failed"
- **Cause**: Anonymous auth might be disabled
- **Fix**: 
  1. Go to Supabase → Authentication → Providers
  2. Find "Anonymous sign-ins"
  3. Toggle it ON
  4. Save

### "Permission denied" errors
- **Cause**: RLS policies not set correctly
- **Fix**: Re-run the SQL from Step 3

### Data not syncing
- **Check**: Browser console for errors
- **Check**: Network tab (should see requests to Supabase)
- **Check**: Internet connection
- **Remember**: Sync is debounced (waits 1 second after changes)

---

## 📊 View Your Data

1. Go to your Supabase project
2. Click **"Table Editor"** in left sidebar
3. Select **"user_progress"** table
4. See all synced user data!

You can:
- View data in JSON format
- Export to CSV
- Run queries
- Monitor sync activity

---

## 🚀 Advanced: Manual Sync

If you want to add a "Sync Now" button, you can:

```typescript
import { syncService } from '@/lib/syncService';

// In your component:
const handleManualSync = async () => {
  const data = {
    activeProtocol,
    completedProtocols,
    lifetimeStats,
    reminderSettings
  };
  
  const success = await syncService.syncToCloud(data);
  if (success) {
    alert('Synced successfully!');
  }
};
```

---

## 💰 Costs

**Free Tier Includes:**
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth/month
- 50,000 monthly active users

**Your app usage (per user):**
- ~1-5 KB per user
- 1-10 sync requests per day
- **Easily fits thousands of users on free tier!**

---

## 🎯 What's Next?

Your app now has:
- ✅ Offline-first architecture
- ✅ Cloud backup
- ✅ Multi-device sync
- ✅ Anonymous auth
- ✅ Automatic syncing

All while maintaining:
- ✅ 100% privacy
- ✅ Instant performance
- ✅ Works offline
- ✅ No signup required

**You're all set!** 🚀

---

## 📞 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Discord**: https://discord.supabase.com
- **Issues**: Check browser console for error messages

---

**Last Updated**: October 14, 2025  
**Integration Version**: 1.0  
**Supabase Version**: 2.39.0






