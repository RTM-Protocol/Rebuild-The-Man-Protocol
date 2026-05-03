# First-Time User Onboarding

## 🎯 Overview
A brief, action-oriented onboarding experience that sets expectations and explains the app's purpose. Designed to feel like a mission briefing, not a tutorial.

## ✨ Features

### 3 Slides (2-3 screens max)

#### Slide 1: "This Isn't Therapy"
**Purpose**: Set the tone and differentiate from wellness apps

**Content**:
- Main message: "This is your repair manual"
- 3 pillars display:
  - 🔧 No Theory → Just actionable steps
  - ⚙️ No Feelings Talk → Just practical work
  - ✓ Results Only → Measured progress
- Tagline: "Think workshop manual, not self-help book"

#### Slide 2: "How This Works"
**Purpose**: Explain the 3-step process

**Content**:
- Step 1: **Pick What's Broken** - Choose your protocol
- Step 2: **Follow the Daily Protocol** - 10-30 min missions
- Step 3: **Track Your Rebuild** - Streaks, stats, progress

Each step has:
- Large number indicator (1, 2, 3)
- Bold title
- Brief explanation
- Green accent bars

#### Slide 3: "This Requires Work"
**Purpose**: Set clear expectations and commitment

**Content**:
- Main message: "This isn't passive. You don't just read—you do."
- Requirements list:
  - ✓ Daily commitment: 10-30 minutes, every day
  - ✓ Honest execution: Do the work, don't just read it
  - ✓ No excuses: Mark setbacks and continue
  - ✓ Patience: Results compound over 14 days
- Final quote: "The rebuild doesn't happen to you. You build it."

### UI Design

#### Visual Elements
- **Full-screen modal**: Takes over entire viewport
- **Technical grid background**: Subtle blueprint texture
- **Angular design**: Corner cuts, sharp edges
- **Large header**: Brand shield icon + title
- **Progress indicators**: 3 horizontal bars (current = orange, completed = green, upcoming = gray)

#### Navigation
- **SKIP → button**: Top-right, always visible
- **← BACK button**: Appears after slide 1
- **NEXT → button**: Advances slides
- **START REBUILDING button**: Final slide CTA

#### Animation
- Smooth slide transitions
- Progress bar animations
- No excessive motion

## 📊 Data Storage

### localStorage Key
```javascript
'onboarding_completed': 'true'
```

**Set when**:
- User completes all 3 slides
- User clicks "SKIP"
- User clicks "START REBUILDING"

**Checked when**:
- App loads on home page
- Determines if onboarding should show

## 🔄 User Flow

### First-Time User
```
1. Open app → Home page
2. Check localStorage for 'onboarding_completed'
3. Not found → Show onboarding
4. User goes through 3 slides
5. Clicks "START REBUILDING"
6. Flag set in localStorage
7. Onboarding closes → Protocol library appears
```

### Returning User
```
1. Open app → Home page
2. Check localStorage for 'onboarding_completed'
3. Found → Skip onboarding
4. Show dashboard or protocol library directly
```

### Reviewing Onboarding (Optional)
```
1. Click ⚙️ Settings in nav
2. Go to "Options" tab
3. Click "VIEW ONBOARDING"
4. Removes localStorage flag
5. Reloads page
6. Onboarding appears again
```

## 🎨 Design Principles

### Tactical Aesthetic
- ✅ Dark backgrounds (carbon/steel)
- ✅ Military greens and industrial oranges
- ✅ Sharp, angular borders (clip-path)
- ✅ Bold, uppercase typography
- ✅ Technical grid texture
- ✅ Workshop manual vibe

### Messaging Tone
- **Direct**: No fluff, get to the point
- **Masculine**: Action-oriented language
- **Honest**: "This requires work"
- **Tactical**: Mission briefing style
- **Motivating**: "Are you ready?"

### Length
- **3 slides total**: Brief and focused
- **~30 seconds**: Quick read-through
- **Skippable**: Respect user's time
- **Informative**: Core concepts only

## 📱 Integration

### Home Page (`app/page.tsx`)
```typescript
// Check onboarding status
useEffect(() => {
  const hasCompleted = localStorage.getItem('onboarding_completed');
  setShowOnboarding(!hasCompleted);
}, []);

// Show onboarding if first-time
if (showOnboarding) {
  return <Onboarding onComplete={() => setShowOnboarding(false)} />;
}
```

### Settings Modal
```typescript
// Option to review onboarding
const handleReviewOnboarding = () => {
  localStorage.removeItem('onboarding_completed');
  window.location.reload();
};
```

## 🎯 Key Features

✅ **Brief**: 3 slides, ~30 seconds  
✅ **Skippable**: SKIP button always visible  
✅ **Informative**: Explains concept clearly  
✅ **Action-oriented**: Sets expectations for work required  
✅ **Persistent**: Won't show again after completion  
✅ **Reviewable**: Can view again from settings  
✅ **Tactical design**: Matches app aesthetic  

## 📊 Content Breakdown

### Slide 1 (Welcome)
- **Purpose**: Differentiate from therapy/wellness apps
- **Key message**: "This is your repair manual"
- **Time**: ~10 seconds to read

### Slide 2 (Process)
- **Purpose**: Explain the 3-step system
- **Key message**: Pick → Follow → Track
- **Time**: ~15 seconds to read

### Slide 3 (Commitment)
- **Purpose**: Set expectations and get buy-in
- **Key message**: "This requires work. Are you ready?"
- **Time**: ~10 seconds to read

**Total**: ~35 seconds if reading thoroughly

## 🎨 Visual Components

### Progress Indicators
```
Slide 1: ████████ ░░░░░░░░ ░░░░░░░░  (orange, gray, gray)
Slide 2: ████████ ████████ ░░░░░░░░  (green, orange, gray)
Slide 3: ████████ ████████ ████████  (green, green, orange)
```

### Buttons
- **SKIP →**: Always top-right, gray hover orange
- **← BACK**: Secondary style, appears slide 2+
- **NEXT →**: Primary style, orange
- **START REBUILDING**: Primary style, larger, final CTA

## 💡 Messaging Examples

### Core Messages
- "This isn't therapy. This is your repair manual."
- "Your mind is a machine. When it breaks down, you need a protocol—not a conversation."
- "Think workshop manual, not self-help book."
- "This isn't passive. You don't just read—you do."
- "The rebuild doesn't happen to you. You build it."

### Expectation Setting
- "Daily commitment: 10-30 minutes, every day"
- "Honest execution: Do the work, don't just read it"
- "No excuses: Mark setbacks and continue"
- "Patience: Results compound over 14 days"

## 🔧 Implementation Details

### Component: `Onboarding.tsx`
- **Type**: Client component
- **Props**: `onComplete()` callback
- **State**: `currentSlide` (0-2)
- **localStorage**: Sets `onboarding_completed`

### Styling
- **Full-screen**: Fixed positioning, z-50
- **Backdrop**: Grid texture overlay
- **Modal**: Max-width 3xl, tactical borders
- **Responsive**: Works on all screen sizes

### Behavior
- **Auto-hide**: On completion or skip
- **No re-show**: Unless manually triggered
- **Smooth transitions**: Slide changes
- **Accessible**: Keyboard navigation works

## 🎯 Success Criteria

**Onboarding is successful if**:
1. ✅ First-time users understand the concept
2. ✅ Expectations are set clearly
3. ✅ Users feel motivated, not overwhelmed
4. ✅ Takes < 1 minute to complete
5. ✅ Never shows again (unless requested)
6. ✅ Skippable without friction

## 📝 Testing Checklist

- [x] First load shows onboarding
- [x] SKIP button works
- [x] NEXT button advances slides
- [x] BACK button returns to previous
- [x] Final button completes onboarding
- [x] localStorage flag set correctly
- [x] Doesn't show on subsequent visits
- [x] Can review from settings
- [x] Works on mobile
- [x] Matches tactical design

## 🔮 Future Enhancements

Potential additions:
- Interactive protocol preview
- Video introduction
- Quick tour of key features
- Personalization (select interests)
- Skip individual slides
- Progress saving mid-onboarding

---

**Status**: ✅ Implemented and tested

The onboarding provides a clear, brief introduction that sets the right expectations and motivates users to commit to the rebuild process.

