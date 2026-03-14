# 🏃 5-Sprint Master Plan

**Project:** Piano Rhythm Game
**Total Duration:** 10 weeks (5 sprints × 2 weeks)
**Goal:** Full-featured mobile rhythm game with live deployment

---

## 📊 Sprint Overview

| Sprint | Dates | Theme | Points | Goal |
|--------|-------|-------|--------|------|
| **Sprint 1** | W1-2 | MVP Core | 28 pts | ✅ Playable game with 3 songs |
| **Sprint 2** | W3-4 | Polish & Persistence | 26 pts | High scores, effects, settings |
| **Sprint 3** | W5-6 | Content & PWA | 32 pts | More songs, offline mode |
| **Sprint 4** | W7-8 | Social & Competition | 28 pts | Leaderboards, achievements |
| **Sprint 5** | W9-10 | Advanced Features | 22 pts | Song editor, multiplayer prep |

**Total:** 136 points across 5 sprints

---

## 🏃 Sprint 1: MVP Core ✅ COMPLETE

**Duration:** 2026-03-14 to 2026-03-28
**Status:** ✅ Done

### Stories Completed
| ID | Story | Points | Status |
|----|-------|--------|--------|
| GAME-001 | 6-key piano input system | 5 | ✅ Done |
| GAME-002 | Note spawning & animation | 5 | ✅ Done |
| GAME-003 | Hit detection & timing | 5 | ✅ Done |
| GAME-004 | Audio synthesis | 5 | ✅ Done |
| GAME-005 | Scoring & combo | 3 | ✅ Done |
| GAME-006 | 3 song patterns | 5 | ✅ Done |

**Velocity:** 28 pts | **Completion:** 100%

---

## 🏃 Sprint 2: Polish & Persistence

**Duration:** 2026-03-29 to 2026-04-11
**Theme:** Make it feel professional

### Stories

| ID | Story | Points | Priority | Assignee |
|----|-------|--------|----------|----------|
| GAME-007 | High score persistence (localStorage) | 3 | P1 | Engineer L |
| GAME-008 | Particle effects on hits | 5 | P1 | Senior Engineer |
| GAME-009 | Settings menu (volume, speed) | 3 | P1 | Engineer L |
| GAME-010 | Song select screen with previews | 5 | P1 | Engineer L |
| GAME-011 | Pause/resume functionality | 3 | P1 | Engineer L |
| GAME-012 | Game over animations & stats | 4 | P1 | Senior Engineer |
| GAME-013 | Tutorial overlay for new players | 3 | P2 | BA + Engineer |

**Total:** 26 points

### Acceptance Criteria Highlights

**GAME-007 - High Scores:**
- [ ] Save top 10 scores per song
- [ ] Display high scores in game over screen
- [ ] Clear scores option in settings
- [ ] Persist across browser sessions

**GAME-008 - Particle Effects:**
- [ ] Burst on perfect hits
- [ ] Sparkle trail on combo milestones
- [ ] Screen shake on miss
- [ ] Performance: 60fps maintained

**GAME-009 - Settings:**
- [ ] Master volume slider
- [ ] Note speed adjustment
- [ ] Key sound toggle
- [ ] Save settings to localStorage

---

## 🏃 Sprint 3: Content & PWA

**Duration:** 2026-04-12 to 2026-04-25
**Theme:** More content, offline play

### Stories

| ID | Story | Points | Priority | Assignee |
|----|-------|--------|----------|----------|
| GAME-014 | 10+ new songs (various genres) | 8 | P1 | BA + Engineer |
| GAME-015 | PWA - Install as app | 5 | P1 | Senior Engineer |
| GAME-016 | Offline mode support | 3 | P1 | Senior Engineer |
| GAME-017 | Song difficulty ratings (★) | 3 | P2 | Engineer L |
| GAME-018 | Unlock system (complete songs) | 5 | P2 | Engineer L |
| GAME-019 | Song categories (Easy, Pop, Classical) | 4 | P2 | BA |
| GAME-020 | Loading screen with tips | 2 | P3 | Engineer L |
| GAME-021 | Keyboard shortcuts (space=pause) | 2 | P3 | Engineer L |

**Total:** 32 points

### Acceptance Criteria Highlights

**GAME-015 - PWA:**
- [ ] manifest.json with app icons
- [ ] Service worker for caching
- [ ] Install prompt on mobile
- [ ] Full-screen mode
- [ ] Works offline after first load

**GAME-018 - Unlock System:**
- [ ] Songs locked initially (except 3)
- [ ] Unlock by completing previous song
- [ ] Visual lock indicators
- [ ] Star rating for completion

---

## 🏃 Sprint 4: Social & Competition

**Duration:** 2026-04-26 to 2026-05-09
**Theme:** Compete with others

### Stories

| ID | Story | Points | Priority | Assignee |
|----|-------|--------|----------|----------|
| GAME-022 | Global leaderboards (Firebase) | 8 | P1 | Senior Engineer |
| GAME-023 | Achievement system (20+ achievements) | 5 | P1 | Engineer L |
| GAME-024 | Achievement notifications | 3 | P2 | Engineer L |
| GAME-025 | Share score (social media) | 3 | P2 | Engineer L |
| GAME-026 | Daily challenge mode | 5 | P1 | Engineer L |
| GAME-027 | Weekly rankings | 4 | P2 | Senior Engineer |

**Total:** 28 points

### Acceptance Criteria Highlights

**GAME-022 - Leaderboards:**
- [ ] Global top 100 per song
- [ ] Friend leaderboards (optional)
- [ ] Filter by difficulty
- [ ] Real-time updates
- [ ] Privacy: anonymous or username

**GAME-023 - Achievements:**
- [ ] 20+ unique achievements
- [ ] Categories: Skill, Dedication, Mastery
- [ ] Progress tracking
- [ ] Unlock animations
- [ ] Examples: "First Perfect", "100 Combo", "All Songs"

---

## 🏃 Sprint 5: Advanced Features

**Duration:** 2026-05-10 to 2026-05-23
**Theme:** Power user features

### Stories

| ID | Story | Points | Priority | Assignee |
|----|-------|--------|----------|----------|
| GAME-028 | Song editor (create custom songs) | 8 | P1 | Senior Engineer |
| GAME-029 | Song sharing (import/export JSON) | 5 | P1 | Engineer L |
| GAME-030 | Practice mode (slow down) | 4 | P2 | Engineer L |
| GAME-031 | Replays (watch perfect runs) | 3 | P2 | Senior Engineer |
| GAME-032 | Stats dashboard (play history) | 2 | P3 | Engineer L |

**Total:** 22 points

### Acceptance Criteria Highlights

**GAME-028 - Song Editor:**
- [ ] Visual timeline editor
- [ ] Place notes on 6 lanes
- [ ] Preview while editing
- [ ] Save locally
- [ ] Export as JSON

**GAME-030 - Practice Mode:**
- [ ] Slow down songs (50%, 75%, 90%)
- [ ] Loop sections
- [ ] No score penalty
- [ ] Visual speed indicator

---

## 📈 Success Metrics

### Technical
- [ ] 60fps on mobile devices
- [ ] < 100ms input latency
- [ ] < 3s initial load time
- [ ] Works offline (PWA)
- [ ] No critical bugs

### User Engagement
- [ ] 10+ songs available
- [ ] 20+ achievements
- [ ] Global leaderboards active
- [ ] Daily challenges running
- [ ] Song editor functional

### Quality
- [ ] All stories meet DoD
- [ ] QA sign-off each sprint
- [ ] PO acceptance each sprint
- [ ] Zero P0 bugs at release

---

## 🎯 Release Milestones

| Release | After Sprint | Features | Version |
|---------|--------------|----------|---------|
| **Alpha** | Sprint 1 | MVP (3 songs) | v0.1.0 |
| **Beta** | Sprint 2 | Polish + scores | v0.5.0 |
| **v1.0** | Sprint 3 | PWA + content | v1.0.0 |
| **v1.5** | Sprint 4 | Social features | v1.5.0 |
| **v2.0** | Sprint 5 | Full feature set | v2.0.0 |

---

## 🔄 Sprint Retrospective Template

```markdown
## Sprint X Retrospective

### What Went Well
- 

### What Could Be Better
- 

### Action Items
| Item | Owner | Due |
|------|-------|-----|
| | | |

### Velocity
- Planned: X pts
- Completed: Y pts
- Carryover: Z pts
```
