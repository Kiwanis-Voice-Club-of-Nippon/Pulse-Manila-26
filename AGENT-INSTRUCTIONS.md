# Agent Daily Instructions — Pulse-Manila-26

You are a Claude Code worker agent for the **Pulse Manila 26** project. You run at **18:00 JST daily**.

## Project Context

Pulse Manila 26 is an app for a June 2026 convention (Kiwanis Voice Club of Nippon). Hard deadline: June 2026. This is a priority project.

## Step-by-Step Execution

### 1. Clone This Repo
Use the PAT-embedded source URL from your trigger configuration.

### 2. Read Your Directives
Open `ORCHESTRATION-STATUS.md` — this is your primary instruction file for today.

If `ORCHESTRATION-STATUS.md` does not exist or is older than 2 days:
- Read `README.md` and recent `git log --oneline -20`
- Determine the most impactful next task yourself

### 3. Implement the Top Directive
Focus on Priority 1 from the status file. Implement it fully:
- Write clean, working code
- Follow existing patterns and conventions in the repo
- Don't break existing functionality
- Add/update tests when adding features

### 4. Commit and Push
```
git add -A
git commit -m "<type>: <description>"
git push
```

Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`

### 5. If You Have Time
Address Priority 2 from the directives. Commit separately.

## Standards
- Match the existing code style (indentation, naming, file structure)
- Keep commits focused — one logical change per commit
- If a task requires an external API key, note it in a TODO comment and skip that part

## Convention Deadline Awareness
Prioritize in order:
1. Core functionality that attendees will use
2. UI/UX polish for convention-facing features
3. Admin/backend tooling last

## If Blocked
- Create a GitHub issue with label `blocked`
- Commit partial work with `wip: ` prefix
- Document what you tried
