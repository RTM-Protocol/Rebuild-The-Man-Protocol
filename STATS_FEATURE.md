# "You're Not Alone" Stats Feature

## Overview

The "You're Not Alone" stats feature displays real-world mental health research statistics throughout the app to normalize user struggles, reduce isolation, and provide evidence-based context for their challenges.

## Purpose

- **Normalize Struggles**: Show users that their challenges are common with real prevalence data
- **Reduce Isolation**: "Millions of men deal with this" messaging
- **Create Social Proof**: Position taking action as rare and commendable
- **Motivate Through Data**: Show the "action gap" (most guys don't do anything - you are)
- **Educational Context**: Provide research-backed information about their issue
- **Position App Usage**: Frame app usage as forward-thinking behavior

## Core Principle

**Facts, not feelings.** All statistics are from credible sources with proper citations. Updated quarterly to maintain accuracy.

---

## Implementation

### Files Created

1. **`data/mentalHealthStats.ts`**
   - Comprehensive database of 50+ researched statistics
   - Organized by protocol type and display location
   - Includes full source citations and publication years
   - Helper function `getStatsForProtocol()` for retrieving relevant stats

2. **`components/StatCard.tsx`**
   - Reusable display component for statistics
   - Respects user preference (can be disabled in settings)
   - Tactical design matching app aesthetic
   - Shows statistic, context, and source citation

### Integration Points

#### 1. Protocol Start Page (`app/protocol/[id]/page.tsx`)
- **When**: User views protocol before starting
- **Shows**: 2 stats (1 prevalence, 1 help-seeking)
- **Purpose**: Normalize the challenge and honor the action of seeking help

#### 2. Daily Mission Pages (`app/protocol/[id]/mission/[day]/page.tsx`)
- **When**: Days 3, 5, 7, 10, and 12 only (not every day)
- **Shows**: 1 relevant stat for that phase
- **Purpose**: Provide context without overwhelming with daily stats

#### 3. Protocol Completion Screen (`app/protocol/[id]/complete/page.tsx`)
- **When**: User completes entire protocol
- **Shows**: 2 outcome stats emphasizing effectiveness and action gap
- **Title**: "You Did What Most Men Don't"
- **Purpose**: Reinforce achievement and research-backed effectiveness

#### 4. Settings Page (`app/settings/page.tsx`)
- **Toggle**: Users can hide/show stats entirely
- **Default**: Enabled
- **Storage**: Preference saved in localStorage as `show_stats`

---

## Statistics Database Structure

### Stat Entry Format

```typescript
{
  id: string;                    // Unique identifier
  protocol: string[];            // Which protocols it applies to
  category: 'prevalence' | 'impact' | 'help_seeking' | 'outcomes' | 'demographics';
  statistic: string;             // The actual data point
  context: string;               // Brief explanatory text
  source: string;                // Organization name
  year: number;                  // Publication year
  citation?: string;             // Optional full citation/URL
  displayLocations: string[];    // Where to show this stat
}
```

### Categories

- **Prevalence**: How common the issue is
- **Impact**: Real-world consequences of not addressing it
- **Help-Seeking**: Data on who seeks help vs. who doesn't
- **Outcomes**: Research on effectiveness of interventions
- **Demographics**: How issue presents in men specifically

### Protocols Covered

1. **Pressure Valve Protocol** (Anger Management)
2. **Engine Restart Protocol** (Depression/Low Motivation)
3. **System Overload Protocol** (Stress Management)
4. **Control Systems Protocol** (Anxiety)
5. **Reset & Rewire Protocol** (Porn/Sexual Issues)
6. **Confidence Calibration Protocol** (Imposter Syndrome)
7. **System Overhaul Protocol** (Burnout)
8. **Communication Upgrade Protocol** (Relationship Issues)
9. **Rebuild The Man** (Foundation Protocol)
10. **Cross-Protocol Stats** (Applies to all)

---

## Example Statistics

### Anger Management
- "40% of men report significant anger management challenges in their lives"
- "Only 25% of men with anger issues seek any form of help"
- "Men who address anger issues report 60% improvement in relationship satisfaction"

### Depression
- "1 in 10 men will experience clinical depression in their lifetime"
- "Men are 50% less likely than women to seek help for depression"
- "Behavioral activation shows 65% effectiveness in reducing depression symptoms"

### General Help-Seeking
- "Men wait average of 2-3 years after symptom onset before seeking any help"
- "Men are 3x less likely than women to seek mental health support"
- "Self-directed interventions show 40-60% effectiveness when users complete them"

---

## Tone and Messaging

### Good Examples (Normalizing + Empowering)
✓ "77% of men experience significant work stress. Only 30% do anything about it. You're in the 30%. That puts you ahead."

✓ "Research shows 65% effectiveness for these techniques. The work you're doing is evidence-based, not guesswork."

### Avoid (Victim Mentality)
✗ "77% of men are stressed and nobody helps them. Society doesn't care about men's mental health."

✗ "This protocol will definitely work for you! Everyone sees amazing results!"

### Key Principles
- **Factual**: Data-driven, not emotional
- **Normalizing**: "You're part of a larger pattern"
- **Empowering**: "You're taking action - that's rare"
- **Honest**: No overpromising or sugarcoating
- **Forward-looking**: Always point toward solutions

---

## Maintenance Schedule

### Quarterly Review (Every 3 Months)

1. **Check Sources**
   - Verify existing citations are still accessible
   - Look for updated research from same organizations

2. **Update Stats**
   - Replace stats older than 3 years with newer data
   - Add newly published relevant research

3. **Test Links**
   - Ensure all source URLs still work
   - Update broken links or archive references

4. **Track Changes**
   - Version control for stat changes
   - Document what was updated and why

### Research Sources to Monitor

- American Psychological Association (APA)
- National Institute of Mental Health (NIMH)
- Centers for Disease Control (CDC)
- World Health Organization (WHO)
- Anxiety and Depression Association of America (ADAA)
- Journal of Clinical Psychology
- Harvard Medical School publications
- Mayo Clinic research
- Gallup wellness surveys
- Deloitte workplace studies

---

## Quality Criteria

Only include stats that meet these standards:

### ✓ Include
- FROM CREDIBLE SOURCE: Academic journals, medical institutions, government health agencies, established research organizations
- RECENT DATA: Published within last 5 years (preferably last 2 years)
- PROPERLY CITED: Full source attribution visible to users
- RELEVANT: Directly relates to the protocol's focus area
- ACTIONABLE CONTEXT: Paired with explanation of what it means for the user
- NOT ALARMIST: Factual without being scary or overwhelming

### ✗ Avoid
- Blog posts or opinion pieces
- Industry marketing materials
- Outdated studies (>5 years old)
- Uncited claims
- Cherry-picked data that lacks scientific rigor
- Statistics used out of context
- Implying causation when only correlation exists

---

## User Control

### Settings Toggle

**Location**: Settings > Appearance & Display > Research Statistics

**Options**:
- ✓ Show research statistics (default)
- Hide research statistics

**Effect**:
- When disabled, all StatCard components return null
- Preference saved in localStorage as `show_stats`
- Can be re-enabled anytime

**Rationale**: Some users may find stats distracting or triggering. Respect user preference while defaulting to enabled (most will benefit).

---

## Technical Implementation

### Display Logic

```typescript
// Get stats for specific protocol and location
const stats = getStatsForProtocol('pressure-valve', 'protocol_start');

// Render with StatCard component
<StatCard stats={stats} title="You're Not Alone" />
```

### Conditional Display

- **Protocol Start**: Always show 2 stats
- **Daily Missions**: Only on days 3, 5, 7, 10, 12
- **Completion**: Always show 2 outcome stats
- **Settings**: User can disable entirely

### localStorage Keys

- `show_stats`: Boolean string ("true" or "false")

---

## Design Specifications

### Visual Style
- Dark gray background (`bg-tactical-darkgray`)
- Light gray border
- Orange left accent border on stat blocks
- 📊 emoji icon
- Monospace font for source citations
- High contrast text for readability

### Spacing
- Appears as distinct section, not inline with content
- Clear visual separation from mission content
- Mobile responsive (single column)
- Never blocks primary action buttons

### Accessibility
- Semantic HTML (proper heading hierarchy)
- High contrast ratios
- Screen reader friendly
- Keyboard navigable
- Can be skipped if disabled

---

## Analytics to Track (Future)

Consider monitoring these metrics:

1. **Engagement**: Do users who see stats complete more missions?
2. **Preference**: What % of users disable stats?
3. **Completion Correlation**: Do specific stat categories correlate with retention?
4. **Source Clicks**: Do users engage with citations? (if clickable links added)
5. **Performance Tier**: Which stats appear for high vs. low performers?

---

## Future Enhancements

### Phase 1 (Current Implementation)
✓ Stats database with 50+ researched statistics
✓ Display component with proper styling
✓ Integration into protocol pages
✓ User settings toggle
✓ localStorage preference storage

### Phase 2 (Future)
- [ ] Clickable source citations (open research papers)
- [ ] "Learn More" expandable sections with full context
- [ ] Update notification system (alert when new stats available)
- [ ] Admin panel for easier stat management
- [ ] A/B testing framework for stat effectiveness

### Phase 3 (Advanced)
- [ ] Personalized stats based on user's protocol history
- [ ] Comparison feature ("Week 2 vs Week 1 stats for users like you")
- [ ] Visual charts/graphs for data-heavy stats
- [ ] Export functionality (download all relevant research)
- [ ] API integration for real-time stat updates

---

## Legal & Ethical Considerations

### Disclaimer (in app footer)

**Statistical Data Disclaimer**

Statistics displayed in this app are sourced from peer-reviewed research, government health agencies, and established medical institutions. While we strive to maintain accurate and current information, individual experiences may vary. These statistics are provided for educational and contextual purposes only and do not constitute medical advice.

Last Updated: [Date]

### Source Attribution Requirements

Always include:
- Organization name
- Publication year
- Link to source (when possible)

### Ethical Guidelines

- Never cherry-pick stats to support app goals without scientific rigor
- Never use statistics out of context
- Never imply causation when only correlation exists
- Never make clinical claims based on general population statistics
- Always provide option to disable stats

---

## Key Takeaways

1. **Facts Over Feelings**: All stats are research-backed with proper citations
2. **Normalize, Don't Medicalize**: Show users they're not alone or broken
3. **Honor Action-Taking**: Emphasize the "action gap" (most men don't do anything)
4. **Evidence-Based Credibility**: Build trust through proper sourcing
5. **User Control**: Respect preference to hide stats if desired
6. **Maintain Rigor**: Quarterly updates to keep information current
7. **Tactical Tone**: Factual, direct, masculine framing throughout

---

## Maintenance Checklist

### Every 3 Months
- [ ] Review all stats for accuracy
- [ ] Check source links
- [ ] Look for updated research
- [ ] Replace stats older than 3 years
- [ ] Add newly published relevant data
- [ ] Update year references
- [ ] Test all integrations
- [ ] Verify user preference toggle works

### Annually
- [ ] Comprehensive audit of all 50+ stats
- [ ] Contact research organizations for latest data
- [ ] Review and update source list
- [ ] Assess user engagement metrics
- [ ] Consider adding new protocol categories

---

**Implementation Date**: October 2025
**Last Updated**: October 2025
**Next Review Due**: January 2026
**Maintained By**: Rebuild The Man Protocol Team





