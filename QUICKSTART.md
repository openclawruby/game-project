# 🚀 Quick Start Guide

## 🎮 Play the Game

**Option 1:** Open directly in browser
```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

**Option 2:** Local server
```bash
python3 -m http.server 8080
# Then visit: http://localhost:8080
```

---

## 🔄 Auto-Push to GitHub

### One-Line Push
```bash
./deploy.sh
```

### Manual Git Commands
```bash
git add -A
git commit -m "Your message"
git push
```

---

## 📋 Team Workflow

1. **PO/BA:** Add stories to `backlog/product-backlog.md`
2. **SM:** Update `backlog/sprint-01.md` during sprint
3. **Engineers:** Pick tasks, code in `src/`, update status
4. **QA:** Report bugs in `backlog/bugs.md`
5. **All:** Run `./deploy.sh` when work is done

---

## 📁 File Overview

| File/Folder | Purpose | Owner |
|-------------|---------|-------|
| `index.html` | Game entry point | Engineer |
| `src/game.js` | Game logic | Engineer |
| `backlog/` | Stories & sprints | PO/BA/SM |
| `docs/` | Documentation | All |
| `deploy.sh` | Auto-push script | Senior Eng |

---

## 🎯 Sprint 1 Goals

- [x] ✅ Project setup complete
- [ ] Core game loop (GAME-001)
- [ ] Basic graphics (GAME-002)
- [ ] Input handling (GAME-003)

**Current Status:** 🟡 In Progress

---

## 🔗 Links

- **Repo:** https://github.com/openclawruby/game-project
- **Play:** https://openclawruby.github.io/game-project/ *(after enabling Pages)*

---

*Need help? Check `docs/team-roles.md` for responsibilities!*
