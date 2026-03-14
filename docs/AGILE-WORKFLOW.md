# 🔄 Agile/Scrum Workflow

## Team Roles & Responsibilities

| Role | Responsibilities | GitHub Actions |
|------|------------------|----------------|
| **Product Owner** | Vision, backlog prioritization, sprint goals | Create issues, prioritize board, accept/reject stories |
| **Business Analyst** | User stories, acceptance criteria, requirements | Write story specs, define test cases |
| **Engineer L** | Feature development, unit tests | Create feature branches, implement, PR for review |
| **Senior Engineer** | Architecture, code review, merge approval | Review PRs, approve merges, technical decisions |
| **QA** | Test plans, bug reports, release sign-off | Test builds, report bugs, verify fixes |
| **Scrum Master** | Process facilitation, blocker removal | Track velocity, manage board, run ceremonies |

---

## 📋 GitHub Project Board

**Board:** https://github.com/openclawruby/game-project/projects

### Columns (Kanban Flow)
```
📋 Backlog → 📖 Ready → 🔄 In Progress → 👀 Review → 🧪 Testing → ✅ Done
```

### Card Types
- 📦 **Feature** - User-facing functionality
- 🐛 **Bug** - Defects to fix
- 🔧 **Tech Debt** - Infrastructure/improvements
- 📝 **Story** - User stories with acceptance criteria

---

## 🔀 GitFlow Workflow

### Branch Structure
```
main          - Production (GitHub Pages)
  └── develop - Integration branch
        └── feature/XXX-description - Feature branches
        └── release/v1.x.x - Release branches
        └── hotfix/xxx-description - Emergency fixes
```

### Branch Rules
| Branch | Protection | Merge Requirements |
|--------|------------|-------------------|
| `main` | ✅ Protected | PR + Senior Engineer approval + QA sign-off |
| `develop` | ✅ Protected | PR + Engineer review |
| `feature/*` | Open | Developer creates from develop |
| `release/*` | Protected | PO + QA approval |
| `hotfix/*` | Protected | Senior Engineer approval |

---

## 📅 Sprint Workflow

### Sprint Cycle (2 weeks each)

```
Week 1:                          Week 2:
┌─────────────────┐              ┌─────────────────┐
│ Sprint Planning │              │   Development   │
│   (Day 1 AM)    │              │   + Daily Stand │
├─────────────────┤              ├─────────────────┤
│  Story Dev +    │              │   Testing +     │
│  Code Review    │              │   Bug Fixes     │
└─────────────────┘              └─────────────────┤
                              │   Sprint Review   │
                              │   (Day 10 PM)     │
                              ├───────────────────┤
                              │  Retrospective    │
                              │   (Day 10 PM)     │
                              └───────────────────┘
```

### Ceremony Schedule

| Ceremony | When | Duration | Attendees | Output |
|----------|------|----------|-----------|--------|
| Sprint Planning | Sprint 1, Day 1 AM | 2h | All | Sprint backlog, commitments |
| Daily Standup | Every day 9AM | 15min | All | Progress, blockers |
| Backlog Refinement | Sprint 1, Day 5 | 1h | PO, BA, Engineers | Refined stories |
| Sprint Review | Sprint 1, Day 10 PM | 1h | All + stakeholders | Demo, feedback |
| Retrospective | Sprint 1, Day 10 PM | 1h | All | Improvements |

---

## 🎯 Definition of Done (DoD)

A story is **Done** when:

- [ ] Code implemented per acceptance criteria
- [ ] Unit tests written & passing
- [ ] Code reviewed & approved (Senior Engineer)
- [ ] QA tested & signed off
- [ ] PO accepted the story
- [ ] Merged to `develop` branch
- [ ] No new bugs introduced
- [ ] Documentation updated

---

## 📊 GitHub Project Setup Commands

```bash
# Create feature branch from develop
git checkout develop
git pull
git checkout -b feature/GAME-007-high-scores

# Work on feature, then commit
git add -A
git commit -m "feat: Implement high score system (GAME-007)"

# Push and create PR
git push -u origin feature/GAME-007-high-scores
# Then create PR on GitHub: feature → develop

# After PR approved & merged, deploy to develop
git checkout develop
git pull
# Test on develop branch

# For release to main
git checkout -b release/v1.0.0
# Final testing, version bump
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0 - Sprint 1 Complete"
git push origin main --tags
```

---

## 🏷️ Issue Labels

| Label | Color | Purpose |
|-------|-------|---------|
| `📦 feature` | #4ecdc4 | New functionality |
| `🐛 bug` | #ff6b9d | Defect |
| `🔧 enhancement` | #a29bfe | Improvement |
| `📖 documentation` | #ffeaa7 | Docs |
| `🧪 testing` | #81ecec | QA/Test related |
| `🔴 P0` | #d63031 | Critical priority |
| `🟠 P1` | #e17055 | High priority |
| `🟡 P2` | #fdcb6e | Medium priority |
| `🟢 P3` | #00b894 | Low priority |
| `🏃 sprint-1` | #0984e3 | Sprint 1 |
| `🏃 sprint-2` | #6c5ce7 | Sprint 2 |
| `🏃 sprint-3` | #fd79a8 | Sprint 3 |
| `🏃 sprint-4` | #e84393 | Sprint 4 |
| `🏃 sprint-5` | #d63031 | Sprint 5 |

---

## 📈 Velocity Tracking

- **Sprint 1 Target:** 28 points (completed)
- **Sprint 2 Target:** 25 points
- **Sprint 3 Target:** 30 points
- **Sprint 4 Target:** 25 points
- **Sprint 5 Target:** 20 points

**Total 5-Sprint Goal:** 128 points

---

## 🚀 Release Process

### Pre-Release Checklist
- [ ] All sprint stories in ✅ Done
- [ ] No critical/open bugs
- [ ] QA sign-off complete
- [ ] PO acceptance confirmed
- [ ] Version number updated
- [ ] CHANGELOG updated
- [ ] GitHub release created
- [ ] GitHub Pages deployed

### Release Commands
```bash
# Create release branch
git checkout develop
git checkout -b release/v1.0.0

# Update version in package.json / config
# Update CHANGELOG.md

# Merge to main
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags

# Merge back to develop
git checkout develop
git merge --no-ff release/v1.0.0
git push origin develop

# Delete release branch
git branch -d release/v1.0.0
```
