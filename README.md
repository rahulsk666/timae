# Personal Time Journal

A lightweight mobile app for tracking how you spend your day.

> **Know where your hours went. Remember how you spent your days.**

## Overview

Personal Time Journal combines simple time tracking with lightweight journaling. The primary purpose is to help a user answer:

**“Where did my time go today?”**

The MVP focuses on fast activity capture, accurate duration tracking, a chronological daily timeline, time breakdowns, and visibility into untracked gaps.

The product is intentionally designed as a personal self-awareness tool rather than a professional timesheet, employee-monitoring system, project-management tool, or billing application.

## Core Loop

```text
Start → Live → Stop → Review → Reflect
```

1. Start an activity.
2. Let the timer record the duration.
3. Stop when finished.
4. Review the day's timeline and totals.
5. Optionally add notes, mood, and reflection.

## MVP Scope

### P0 — Must Have

- Activity timer
- Start / stop activity
- Pause / resume
- Manual activity entry
- Automatic duration calculation
- Daily timeline
- Activity categories
- Total tracked time
- Untracked time / gaps
- Edit and delete activities
- Local-first storage
- Offline support

### P1 — Important

- Activity notes
- Calendar / history
- Daily reflection
- Mood
- Custom activities
- Basic weekly summary
- Daily reminder

### P2 — Later

- Search
- Monthly analytics
- Photos
- Voice journaling
- Widgets
- Cloud sync
- Multi-device support
- Automatic activity detection
- Health integrations
- Advanced insights
- On-this-day memories

## Main Screens

### Today

The primary screen.

Shows:

- Current date
- Total tracked time
- Active timer
- Start Activity action
- Chronological timeline
- Untracked gaps
- Category breakdown
- Reflection entry point

### Activity Timer

Focused view for the active activity.

Shows:

- Activity
- Elapsed time
- Pause / resume
- Stop
- Optional note

### Add / Edit Activity

Manual time entry with:

- Activity
- Start time
- End time
- Optional note

Duration is calculated automatically.

### History

Calendar/date-based access to previous days.

Users can review:

- Daily tracked time
- Mood
- Timeline
- Category totals
- Reflection

### Insights

Lightweight time analytics:

- Daily total
- Weekly total
- Average tracked time/day
- Category breakdown
- Most-used activity
- Untracked time

### Settings

- Reminders
- Default/custom activities
- Theme
- App lock
- Export data
- Delete data

## Default Categories

- Work
- Study
- Exercise
- Food
- Travel
- Entertainment
- Social
- Personal
- Sleep
- Relaxation
- Chores
- Other

Users can add custom activities such as:

- Coding
- Design
- Gym
- Reading
- Gaming

## Key Business Rules

### No overlapping active activities

Only one activity can be actively tracked at a time.

### Duration is derived

```text
Duration = End Time - Start Time
```

Duration should never be treated as a manually entered source of truth.

### Changes update all totals

Creating, editing, or deleting an activity must update:

- Daily tracked time
- Category totals
- Untracked time
- Weekly statistics

### Midnight handling

Activities crossing midnight must be split across the appropriate dates so daily totals remain accurate.

## Data Model

### Activity

```text
id
date
activity_name
category
start_time
end_time
duration
note
created_at
updated_at
```

### Daily Reflection

```text
id
date
mood
went_well
could_be_better
remember
created_at
updated_at
```

### Category

```text
id
name
icon
color
is_default
created_at
```

### User Settings

```text
reminder_enabled
reminder_time
app_lock_enabled
theme
```

## Technical Direction

The MVP should be **local-first**.

Recommended characteristics:

- Local database
- No mandatory account
- No backend required initially
- Offline support
- Local notifications
- Device authentication/app lock where supported
- CSV/JSON export

Cloud sync and multi-device support should be treated as future capabilities.

## Privacy

Activity and journal data should be considered private user data.

The MVP should:

- Minimize data collection
- Keep data local by default
- Avoid selling or sharing activity data
- Allow export
- Allow deletion
- Support device authentication where available

## Product Principles

### 1. Low friction

Starting an activity should take as few actions as possible.

### 2. Personal, not administrative

The app should feel like a personal record of the day, not a timesheet.

### 3. Clear over complex

The user should understand their day within a few seconds.

### 4. Reflection is optional

Time tracking must work without requiring journal writing.

### 5. Show the truth

Tracked time and untracked time should be clearly separated.

## MVP Success Criteria

The MVP is successful when a user can:

1. Start tracking an activity in under 10 seconds.
2. Stop it and see the correct duration.
3. See it appear in the daily timeline.
4. Add a forgotten activity manually.
5. Edit or delete an activity.
6. See daily and category totals update automatically.
7. Identify untracked portions of the day.
8. Review previous days.
9. Understand their weekly time usage.
10. Optionally add notes, mood, and reflection.
11. Use the app offline.
12. Export or delete their data.

## Future Direction

The long-term product can evolve into a **personal life analytics journal**, using accumulated time history to surface patterns such as:

- Changes in weekly time allocation
- Activity trends
- Time patterns
- Historical comparisons
- “On this day” memories
- Optional smart insights

These capabilities should only be introduced after the core tracking experience is reliable.

## Documentation

- `Personal_Time_Journal_PRD_MVP.docx` — Full MVP Product Requirements Document

## Status

**Current phase:** MVP definition

**Priority:** Validate effortless time tracking and daily time awareness before expanding into advanced analytics or automation.
