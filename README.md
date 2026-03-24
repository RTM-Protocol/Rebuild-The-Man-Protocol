# The Rebuild Protocol

A mental health app for men who find traditional therapy uncomfortable. Treats mental health challenges like fixing a car or building something - practical, action-oriented, with clear step-by-step instructions.

## 🚀 Quick Start

### Step 1: Install Node.js

If you don't have Node.js installed:

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS version** (recommended)
3. Run the installer and follow the prompts
4. Restart your terminal after installation

### Step 2: Install Dependencies

```bash
cd "/Users/j.b.o/Desktop/CURSOR PROJECTS/The Rebuild Protocol - App"
npm install
```

### Step 3: Run the Development Server

```bash
npm run dev
```

### Step 4: Open Your Browser

Open [http://localhost:3000](http://localhost:3000) to see the app!

## 🎯 What's Built

### ✅ Complete Features

1. **Protocol Library (Homepage)**
   - 4 mental health protocols
   - Tactical, masculine design
   - Duration selection (7/14/30 days)

2. **Protocol Detail Page**
   - Problem/solution breakdown
   - Mission overview
   - Duration selection interface

3. **Daily Mission View**
   - Step-by-step instructions
   - Science-backed explanations
   - Pro tips
   - Progress tracking
   - Streak counter

4. **Completion Flow**
   - Achievement screen
   - Stats display
   - Next steps guidance

### 📊 Protocols Included

1. **System Overload Protocol** (Stress)
   - ✅ Full 7-day program complete
   - 14/30-day versions coming soon

2. **Pressure Valve Protocol** (Anger)
   - Day 1 sample included

3. **Engine Restart Protocol** (Depression)
   - Day 1 sample included

4. **Reality Calibration Protocol** (Imposter Syndrome)
   - Day 1 sample included

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **localStorage** (for progress)

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                          # Homepage
│   ├── protocol/
│   │   └── [id]/
│   │       ├── page.tsx                  # Protocol Detail
│   │       ├── mission/
│   │       │   └── [day]/
│   │       │       └── page.tsx          # Daily Mission
│   │       └── complete/
│   │           └── page.tsx              # Completion Screen
│   ├── layout.tsx
│   └── globals.css
├── data/
│   └── protocols.ts                      # Protocol Content
├── types/
│   └── index.ts                          # TypeScript Types
└── tailwind.config.ts
```

## 🎨 Design System

### Colors
- Tactical Black: `#0a0a0a`
- Tactical Dark Gray: `#1a1a1a`
- Tactical Gray: `#2a2a2a`
- Tactical Light Gray: `#3a3a3a`
- Tactical Green: `#4a5f3a`
- Tactical Green Bright: `#6b8e4e`
- Tactical Orange: `#d96c2c`
- Tactical Orange Bright: `#ff8542`

### Language Philosophy
- ✅ "Protocol" not "Program"
- ✅ "Mission" not "Task"
- ✅ "System Overload" not "Stress"
- ✅ "Execute" not "Complete"
- ✅ Direct, no-nonsense instructions

## 🎮 User Flow

1. **Browse Protocols** → Select one
2. **Choose Duration** → 7, 14, or 30 days
3. **Start Protocol** → Begin Day 1
4. **Complete Missions** → Daily tasks
5. **Track Progress** → Streaks & percentages
6. **Finish Protocol** → View results

## 💾 Data Storage

Uses browser localStorage:
- `activeProtocol` - Current progress
- `completedProtocols` - History

## 📝 Adding New Protocols

Edit `data/protocols.ts`:

```typescript
{
  id: 'your-protocol-id',
  title: 'Your Protocol Name',
  category: 'stress', // or anger, depression, etc.
  tagline: 'One-line description',
  problem: 'What\'s broken',
  solution: 'How to fix it',
  icon: '⚡',
  durations: [7, 14, 30],
  missions: {
    7: [/* array of DailyMission objects */],
    14: [],
    30: []
  }
}
```

## 🔜 Future Enhancements

- [ ] Complete all 14/30-day protocols
- [ ] Add more protocol categories
- [ ] User authentication
- [ ] Backend database
- [ ] Push notifications
- [ ] Mobile app
- [ ] Community features

## 🚨 Troubleshooting

### "npm: command not found"
- Install Node.js from [nodejs.org](https://nodejs.org)

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Changes not showing
- Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)

## 🔒 Security & Maintenance

### Post-Launch Security Tasks

After going live, review and address security vulnerabilities in dev dependencies:
- See **[POST_LAUNCH_SECURITY_TASKS.md](./POST_LAUNCH_SECURITY_TASKS.md)** for detailed update instructions

**Current Status**: 
- ✅ Production dependencies secure
- ⚠️ 5 vulnerabilities in dev dependencies (low priority, non-blocking)

---

## 📄 License

Private project - All rights reserved

---

**Built for men who prefer mechanics over feelings, protocols over therapy-speak.**
