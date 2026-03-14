# 🎹 Piano Rhythm Game

A mobile-first rhythm game where you tap 6 piano keys in time with falling notes to create music!

**🎮 Play Now:** https://openclawruby.github.io/game-project/

---

## ✨ Features

### Gameplay
- 🎹 **6 Piano Keys** - Colorful, responsive touch controls
- 🎵 **3 Song Difficulties** - Easy (100 BPM), Medium (120 BPM), Hard (160 BPM)
- ⏱️ **Precision Timing** - Perfect/Good/Bad hit windows
- 🔥 **Combo System** - Build combos for score multipliers
- 📊 **Live Stats** - Score, combo, accuracy in real-time

### Controls
- **Mobile:** Tap the colored keys
- **Desktop:** Press `1-6` or `Q-I` keys
- **Goal:** Hit notes when they reach the white line!

### Audio
- 🎼 **Synthesized Piano** - Real piano sounds via Web Audio API
- 🔊 **Hit Feedback** - Audio cues for Perfect/Good/Bad hits
- 🎧 **Zero Latency** - Instant sound on key press

---

## 🚀 Quick Start

### Play Locally
```bash
# Open in browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# Or serve with local server
python3 -m http.server 8080
# Visit: http://localhost:8080
```

### Deploy Updates
```bash
./deploy.sh
```

---

## 📁 Project Structure

```
game-project/
├── index.html           # Main game (mobile-responsive UI)
├── src/
│   ├── game.js          # Game engine & logic
│   └── audio.js         # Piano audio synthesis
├── backlog/
│   ├── product-backlog.md  # All features
│   ├── sprint-01.md        # Current sprint
│   └── bugs.md             # Bug tracker
├── docs/
│   └── team-roles.md       # Scrum team responsibilities
├── deploy.sh            # Auto-push to GitHub
└── README.md            # This file
```

---

## 🎮 How to Play

1. **Start Game** - Click "▶️ Start Game"
2. **Select Song** - Click "🎵 Select Song" to change difficulty
3. **Watch Notes** - Colored bars fall from top
4. **Hit the Line** - Tap the matching key when note reaches white line
5. **Build Combo** - Hit consecutive notes for score multipliers
6. **Beat Your Score** - Try to get 100% accuracy!

### Scoring
| Hit Quality | Points | Timing Window |
|-------------|--------|---------------|
| Perfect 💎 | 100 | ±30ms |
| Good ✅ | 50 | ±80ms |
| Bad ⚠️ | 10 | ±150ms |
| Miss ❌ | 0 | Too late |

**Combo Multiplier:**
- 5+ combo: 1.5x points
- 10+ combo: 2x points

---

## 👥 Scrum Team

| Role | Responsibilities |
|------|------------------|
| **Product Owner** | Vision, backlog priority, song selection |
| **Business Analyst** | User stories, timing balance, difficulty tuning |
| **Engineer L** | Game logic, note spawning, input handling |
| **Senior Engineer** | Audio system, performance optimization |
| **QA** | Timing tests, mobile compatibility, bug reports |
| **Scrum Master** | Sprint tracking, removing blockers |

---

## 📊 Sprint 1 Status

**✅ COMPLETE** - All 6 stories done (28 points)

- [x] 6-key piano input system
- [x] Note spawning & animation
- [x] Hit detection & timing windows
- [x] Audio synthesis for piano notes
- [x] Scoring & combo system
- [x] Song patterns (3 difficulties)

**Next Sprint:** High scores, visual effects, more songs

---

## 🛠️ Tech Stack

- **HTML5 Canvas** - Note rendering
- **Web Audio API** - Piano synthesis
- **Vanilla JavaScript** - No frameworks, pure performance
- **Touch Events** - Mobile-first input
- **CSS Gradients** - Beautiful key colors

---

## 🔗 Links

- **GitHub:** https://github.com/openclawruby/game-project
- **Live Demo:** https://openclawruby.github.io/game-project/
- **Issues:** https://github.com/openclawruby/game-project/issues

---

## 📝 License

Built with ❤️ by Team OpenClawRuby

---

*"Music is the rhythm of the soul" - Play, feel, repeat!* 🎹
