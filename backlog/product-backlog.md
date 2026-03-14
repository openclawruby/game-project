# 📦 Product Backlog - Piano Rhythm Game

*Prioritized by Product Owner | Last Updated: 2026-03-14*

## Vision
A mobile-first piano rhythm game where players tap 6 keys in time with falling notes to create music. Easy to learn, challenging to master.

---

## Priority Scale
- 🔴 **P0** - Critical/Must have (Sprint 1)
- 🟠 **P1** - High priority (Sprint 2)
- 🟡 **P2** - Medium priority (Sprint 3)
- 🟢 **P3** - Low priority (Future)

---

## 🔴 P0 - MVP (Sprint 1) ✅ COMPLETE

### [GAME-001] 6-Key Piano Input
- **Story:** As a player, I want 6 colorful piano keys to tap so that I can play notes
- **Acceptance Criteria:**
  - [x] 6 keys with distinct colors
  - [x] Touch support for mobile
  - [x] Keyboard support (1-6, Q-I)
  - [x] Visual feedback on press
- **Status:** ✅ Done

### [GAME-002] Note System
- **Story:** As a player, I want notes to fall from the top so that I know when to press
- **Acceptance Criteria:**
  - [x] Notes spawn at top of lanes
  - [x] Notes fall at consistent speed
  - [x] Notes match key colors
  - [x] Hit line is clearly visible
- **Status:** ✅ Done

### [GAME-003] Hit Detection
- **Story:** As a player, I want accurate timing detection so that my skill is fairly judged
- **Acceptance Criteria:**
  - [x] Perfect window (±30ms)
  - [x] Good window (±80ms)
  - [x] Bad window (±150ms)
  - [x] Miss detection
- **Status:** ✅ Done

### [GAME-004] Audio System
- **Story:** As a player, I want piano sounds when I press keys so that it feels musical
- **Acceptance Criteria:**
  - [x] Each key has unique pitch
  - [x] Sounds are pleasant (not beeps)
  - [x] No latency between press and sound
  - [x] Hit feedback sounds
- **Status:** ✅ Done

### [GAME-005] Scoring
- **Story:** As a player, I want to see my score and combo so that I can track my performance
- **Acceptance Criteria:**
  - [x] Points for hits (Perfect: 100, Good: 50, Bad: 10)
  - [x] Combo counter
  - [x] Combo multiplier (5x: 1.5x, 10x: 2x)
  - [x] Accuracy percentage
- **Status:** ✅ Done

### [GAME-006] Song Patterns
- **Story:** As a player, I want different songs to play so that the game has variety
- **Acceptance Criteria:**
  - [x] 3 difficulty levels
  - [x] Songs have recognizable melodies
  - [x] Difficulty selector
  - [x] Song info display (BPM, note count)
- **Status:** ✅ Done

---

## 🟠 P1 - Polish (Sprint 2)

### [GAME-007] High Score System
- **Story:** As a player, I want my high scores saved so that I can track improvement
- **Estimate:** 3 points
- **Status:** 📋 Backlog

### [GAME-008] Visual Effects
- **Story:** As a player, I want particle effects on hits so that the game feels satisfying
- **Estimate:** 5 points
- **Status:** 📋 Backlog

### [GAME-009] More Songs
- **Story:** As a player, I want more songs to unlock so that I have long-term goals
- **Estimate:** 5 points
- **Status:** 📋 Backlog

### [GAME-010] Settings Menu
- **Story:** As a player, I want to adjust volume and speed so that I can customize the experience
- **Estimate:** 3 points
- **Status:** 📋 Backlog

---

## 🟡 P2 - Features (Sprint 3)

### [GAME-011] PWA Support
- **Story:** As a mobile player, I want to install this as an app so that I can play offline
- **Estimate:** 5 points
- **Status:** 📋 Backlog

### [GAME-012] Song Editor
- **Story:** As a player, I want to create my own songs so that I can share custom patterns
- **Estimate:** 8 points
- **Status:** 📋 Backlog

### [GAME-013] Daily Challenges
- **Story:** As a player, I want daily challenges so that I have a reason to come back
- **Estimate:** 5 points
- **Status:** 📋 Backlog

---

## 🟢 P3 - Future

### [GAME-014] Multiplayer
- **Story:** As a player, I want to compete with friends so that we can have fun together
- **Estimate:** 13 points
- **Status:** 📋 Backlog

### [GAME-015] Leaderboards
- **Story:** As a player, I want to see global rankings so that I can compete worldwide
- **Estimate:** 8 points
- **Status:** 📋 Backlog

### [GAME-016] Achievements
- **Story:** As a player, I want to unlock achievements so that I feel accomplished
- **Estimate:** 5 points
- **Status:** 📋 Backlog

---

## 📊 Backlog Metrics

- **Total Stories:** 16
- **Total Points:** 96
- **Completed:** 6 (28 points)
- **Ready for Sprint 2:** 4 (16 points)
- **Future:** 6 (52 points)
