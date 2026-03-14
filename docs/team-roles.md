# 👥 Scrum Team Roles

## Product Owner (PO)
**Focus:** Product vision & value maximization

### Responsibilities
- Define and communicate product vision
- Manage and prioritize Product Backlog
- Accept or reject completed work
- Stakeholder communication
- ROI optimization

### Key Artifacts
- `backlog/product-backlog.md` - Master feature list
- `docs/vision.md` - Product vision document

---

## Business Analyst (BA)
**Focus:** Requirements & user stories

### Responsibilities
- Gather and document requirements
- Write detailed user stories
- Define acceptance criteria
- Bridge between PO and engineering
- Process modeling

### Key Artifacts
- `backlog/user-stories/` - Detailed story specs
- `docs/requirements.md` - Requirements document

---

## Engineer L (Level/Lead Engineer)
**Focus:** Feature development

### Responsibilities
- Implement features from backlog
- Write clean, maintainable code
- Unit testing
- Code documentation
- Participate in code reviews

### Key Artifacts
- `src/` - Source code
- `tests/` - Unit tests

---

## Senior Engineer
**Focus:** Architecture & technical excellence

### Responsibilities
- System architecture design
- Technical decision-making
- Code review approval
- Mentoring junior engineers
- Performance optimization
- Security reviews

### Key Artifacts
- `docs/architecture.md` - System design
- `docs/adr/` - Architecture Decision Records

---

## QA (Quality Assurance)
**Focus:** Testing & quality

### Responsibilities
- Test plan creation
- Manual & automated testing
- Bug reporting and tracking
- Regression testing
- Release sign-off

### Key Artifacts
- `tests/` - Test suites
- `backlog/bugs.md` - Bug tracker
- `docs/test-plan.md` - Testing strategy

---

## Scrum Master (SM)
**Focus:** Process & team health

### Responsibilities
- Facilitate Scrum ceremonies
- Remove impediments
- Coach team on Agile practices
- Track velocity & metrics
- Protect team from interruptions

### Key Artifacts
- `meetings/` - Ceremony notes
- `backlog/sprint-*.md` - Sprint plans
- `docs/metrics.md` - Team metrics

---

## 📅 Scrum Ceremonies

| Ceremony | Frequency | Duration | Participants |
|----------|-----------|----------|--------------|
| Sprint Planning | Start of sprint | 2-4h | All |
| Daily Standup | Daily | 15min | All |
| Sprint Review | End of sprint | 1-2h | All + stakeholders |
| Retrospective | End of sprint | 1-2h | All |
| Backlog Refinement | Mid-sprint | 1h | PO, BA, Engineers |
