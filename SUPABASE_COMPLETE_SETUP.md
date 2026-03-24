# 🚀 Complete Supabase Setup Guide
## Step-by-Step Database & Authentication Configuration

This guide will walk you through setting up Supabase from scratch, including:
- ✅ Creating your Supabase project
- ✅ Enabling anonymous authentication
- ✅ Creating the database table structure
- ✅ Setting up security (Row Level Security)
- ✅ Configuring your app to connect
- ✅ Testing and verification

---

## 📋 Prerequisites

- A Supabase account (free at https://supabase.com)
- Your project URL: `https://pihwywkiimdxvqykasaa.supabase.co`
- Your Supabase anon key (we'll get this in Step 3)

---

## 🎯 Step 1: Create/Verify Supabase Project

### If you already have a project:
1. Go to https://app.supabase.com
2. Sign in to your account
3. Find your project: `pihwywkiimdxvqykasaa`
4. Click on it to open

### If you need to create a new project:
1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign in or create a free account
4. Click **"New Project"**
5. Fill in:
   - **Organization**: Create new or select existing
   - **Name**: `rebuild-protocol` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
   - **Plan**: Free tier is perfect
6. Click **"Create new project"**
7. Wait 2-3 minutes for setup to complete

---

## 🔐 Step 2: Enable Anonymous Authentication

**Why?** Your app uses anonymous authentication so users don't need to sign up, but their data is still synced to the cloud.

1. In your Supabase project, click **"Authentication"** in the left sidebar
2. Click **"Providers"** (or go to the "Providers" tab)
3. Scroll down to find **"Anonymous"** sign-in provider
4. **Toggle it ON** (should turn blue/green)
5. Click **"Save"** at the bottom

**✅ Verification**: You should see "Anonymous" with a green toggle/checkmark.

---

## 🗄️ Step 3: Create Database Table

Your app stores user progress in a table called `user_progress`. Let's create it:

1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"+ New query"** button (top right)
3. **Copy and paste** this entire SQL script:

```sql
-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
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
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Users can manage their own data" ON user_progress;

-- Create policy for anonymous users to manage their own data
CREATE POLICY "Users can manage their own data"
  ON user_progress
  FOR ALL
  TO anon, authenticated
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

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;

-- Create trigger to auto-update timestamp
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **"Run"** button (bottom right, or press `Ctrl+Enter` / `Cmd+Enter`)
5. **Expected result**: "Success. No rows returned" ✅

**🔍 Verify Table Created**:
- Click **"Table Editor"** in the left sidebar
- You should see `user_progress` table listed
- Click on it to see the table structure

---

## 🔑 Step 4: Get Your API Keys

1. In your Supabase project, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** from the settings menu
3. You'll see two important values:

   **a) Project URL:**
   ```
   https://pihwywkiimdxvqykasaa.supabase.co
   ```
   (This should match your project)

   **b) Project API keys → anon public:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaHd5d2tpaW1keHZxeWthc2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5MDAwMDAsImV4cCI6MjA0NDQ3NjAwMH0...
   ```
   (This is a long string starting with `eyJ` - copy the entire thing)

4. **Copy both values** - you'll need them in the next step!

---

## 📝 Step 5: Create Environment Variables File

1. In Cursor, navigate to your project root folder:
   ```
   /Users/j.b.o/Desktop/CURSOR PROJECTS/The Rebuild Protocol - App
   ```

2. **Create a new file** called `.env.local` (note the dot at the beginning!)

3. **Paste this content** (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://pihwywkiimdxvqykasaa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

4. **Replace `paste_your_anon_key_here`** with the actual anon key from Step 4

5. **Save the file** (`Cmd+S` or `Ctrl+S`)

**⚠️ Important**: 
- The file must be named exactly `.env.local` (with the dot at the beginning)
- Make sure there are NO spaces around the `=` sign
- Make sure the URL and key are on separate lines
- Don't add quotes around the values

**🔒 Security Note**: `.env.local` is automatically ignored by git (it's in `.gitignore`), so your keys won't be committed to version control.

---

## 🧪 Step 6: Test the Connection

1. **Stop your dev server** if it's running (press `Ctrl+C` in the terminal)

2. **Clear the Next.js cache**:
   ```bash
   rm -rf .next
   ```

3. **Install dependencies** (if you haven't already):
   ```bash
   npm install
   ```

4. **Start the dev server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** to http://localhost:3000

6. **Open Browser DevTools**:
   - **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - **Firefox**: Press `F12` or `Cmd+Option+K` (Mac) / `Ctrl+Shift+K` (Windows)

7. **Go to the "Console" tab** in DevTools

8. **Look for these messages**:
   - ✅ `"Anonymous user created"` - Authentication is working!
   - ✅ `"✅ Data synced to cloud"` - Data is syncing successfully!

**If you see errors**, scroll down to the Troubleshooting section.

---

## ✅ Step 7: Verify Data is Stored

1. **In your Supabase project**, click **"Table Editor"** in the left sidebar
2. Click on the **`user_progress`** table
3. **Complete a mission** in your app (or just navigate around)
4. **Refresh the Supabase table view** (click the refresh icon)
5. **You should see a new row** with:
   - A `user_id` (UUID)
   - `active_protocol` (JSON data)
   - `last_synced` (timestamp)

**🎉 Success!** Your data is now being stored in Supabase!

---

## 🔍 Step 8: Understanding Your Data Structure

### What Gets Stored:

**`user_progress` table contains:**
- `user_id`: Unique anonymous user ID (auto-generated per device)
- `active_protocol`: Current protocol progress (which day, completion status, etc.)
- `completed_protocols`: Array of completed protocols
- `lifetime_stats`: Total missions, protocols, longest streak
- `reminder_settings`: Notification preferences
- `last_synced`: When data was last synced
- `created_at`: When user first synced
- `updated_at`: Last update timestamp (auto-updated)

### Data Flow:

1. **User opens app** → Creates anonymous user ID (if first time)
2. **User completes mission** → Saves to `localStorage` (instant)
3. **After 1 second** → Auto-syncs to Supabase cloud
4. **User opens app on another device** → Loads from cloud → Merges with local data

---

## 🛡️ Security: Row Level Security (RLS)

**What is RLS?** Row Level Security ensures users can ONLY access their own data.

**How it works:**
- Each anonymous user gets a unique `user_id`
- The RLS policy checks: `auth.uid() = user_id`
- Users can only see/edit rows where the `user_id` matches their own

**This means:**
- ✅ User A cannot see User B's data
- ✅ Each device gets its own isolated data
- ✅ Secure by default, even with anonymous auth

---

## 🐛 Troubleshooting

### ❌ Error: "Supabase not configured - using localStorage only"

**Cause**: Environment variables not loaded

**Fix**:
1. Make sure `.env.local` exists in the project root
2. Make sure the file name is exactly `.env.local` (not `.env` or `env.local`)
3. Restart your dev server (`Ctrl+C`, then `npm run dev`)
4. Clear `.next` folder: `rm -rf .next`

### ❌ Error: "Anonymous sign-in failed"

**Cause**: Anonymous authentication not enabled

**Fix**:
1. Go to Supabase → Authentication → Providers
2. Find "Anonymous" and toggle it **ON**
3. Click "Save"
4. Refresh your app

### ❌ Error: "Permission denied" or "RLS policy violation"

**Cause**: RLS policies not set correctly

**Fix**:
1. Go to Supabase → SQL Editor
2. Re-run the SQL script from Step 3
3. Make sure you see "Success" message
4. Refresh your app

### ❌ Error: "relation 'user_progress' does not exist"

**Cause**: Table not created

**Fix**:
1. Go to Supabase → SQL Editor
2. Re-run the CREATE TABLE SQL from Step 3
3. Verify in Table Editor that the table exists

### ❌ Data not syncing

**Checklist**:
1. ✅ Is `.env.local` file created?
2. ✅ Are the values correct (no extra spaces, correct URL/key)?
3. ✅ Did you restart the dev server after creating `.env.local`?
4. ✅ Check browser console for errors
5. ✅ Check Network tab in DevTools - do you see requests to Supabase?
6. ✅ Are you online? (Sync only works when online)

### ❌ Still having issues?

**Debug steps**:
1. Open browser console (F12)
2. Look for error messages (they're usually red)
3. Check the Network tab for failed requests
4. Verify your Supabase project is active (not paused)
5. Make sure you're using the correct project URL and anon key

---

## 📊 Monitoring Your Data

### View Data in Supabase:
1. Go to **Table Editor** → `user_progress`
2. See all synced user data in JSON format
3. Click on any row to see full details

### Export Data:
1. In Table Editor, click **"Export"** button
2. Choose format: CSV, JSON, etc.

### Run Queries:
1. Go to **SQL Editor**
2. Try:
   ```sql
   -- Count total users
   SELECT COUNT(*) FROM user_progress;
   
   -- See recent syncs
   SELECT user_id, last_synced, updated_at 
   FROM user_progress 
   ORDER BY updated_at DESC 
   LIMIT 10;
   ```

---

## 🚀 Next Steps

Once your setup is working, you can:

1. **Add more features**:
   - User authentication (email/password, OAuth)
   - File storage (for exporting reports)
   - Real-time subscriptions
   - Email notifications

2. **Monitor usage**:
   - Check Supabase dashboard for storage/bandwidth usage
   - Free tier includes: 500 MB database, 1 GB file storage, 2 GB bandwidth/month

3. **Scale up**:
   - Your app easily fits thousands of users on the free tier
   - Upgrade to Pro if you need more resources

---

## 📝 Quick Reference

### Your Supabase Project:
- **URL**: `https://pihwywkiimdxvqykasaa.supabase.co`
- **Table**: `user_progress`
- **Auth**: Anonymous (enabled)

### Your Local Files:
- **Environment**: `.env.local` (in project root)
- **Supabase Client**: `lib/supabase.ts`
- **Sync Service**: `lib/syncService.ts`

### Key Commands:
```bash
# Clear Next.js cache
rm -rf .next

# Start dev server
npm run dev

# Install dependencies
npm install
```

---

## ✅ Setup Checklist

- [ ] Supabase project created/verified
- [ ] Anonymous authentication enabled
- [ ] Database table created (`user_progress`)
- [ ] RLS policies set up
- [ ] API keys copied
- [ ] `.env.local` file created with correct values
- [ ] Dev server restarted
- [ ] Console shows "Anonymous user created"
- [ ] Console shows "✅ Data synced to cloud"
- [ ] Data appears in Supabase Table Editor

**Once all checked, you're all set! 🎉**

---

## 🆘 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Check browser console** for detailed error messages

---

**Last Updated**: January 2025  
**Supabase Version**: Latest  
**Integration Status**: ✅ Ready for production


