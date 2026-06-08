# Contributing to Stylish Readme

Thank you for your interest in contributing to Stylish Readme.

Stylish Readme generates dynamic SVG widgets for GitHub profiles, README files, and documentation. Contributions of all sizes are welcome — bug fixes, new widgets, themes, documentation, tests, and workshop UI improvements.

This repository is a **curated open source project** under **[Nexus Spring of Code 2026 (NSoC)](https://nsoc.in)** — a 45-day online contribution program (April–15 May 2026) that helps students and early-stage developers gain real-world experience through mentor-guided work on live repositories.

## Table of Contents

- [Nexus Spring of Code 2026](#nexus-spring-of-code-2026)
- [Ways to Contribute](#ways-to-contribute)
- [Local Development](#local-development)
- [Reporting Issues](#reporting-issues)
- [Submitting Changes](#submitting-changes)
- [Contribution Guidelines](#contribution-guidelines)
- [Pull Request Process](#pull-request-process)

## Nexus Spring of Code 2026

If you are participating in NSoC 2026, you can contribute to Stylish Readme as part of the program.

**What to know:**

- Contributions are tracked through GitHub — fork this repo, open issues, and submit pull requests as usual.
- Work on existing issues or propose focused improvements (widgets, themes, tests, docs, workshop UI).
- Follow the same quality standards as any other contributor: test locally, keep PRs focused, and respect the serverless-first architecture.
- Evaluation is based on impact, consistency, and collaboration — not just PR count.

**Program resources:**

- Website: [nsoc.in](https://nsoc.in)
- Registration: [nsoc.netlify.app](https://nsoc.netlify.app)

Whether you join through NSoC or contribute independently, the workflow below is the same.

## Ways to Contribute

### 1. Widgets and Themes

- Add or improve SVG widgets in `lib/widgets.js`.
- Extend existing widgets with new URL parameters.
- Add new themes to the `THEMES` object (keep naming consistent with existing themes).
- Wire new widget types through `api/widget.js` and `vercel.json` routes if needed.

Current widget types: `profile`, `music`, `time`, `clock`, `date`, `quote`, `flag`, `timezone`, and `streak`.

Built-in themes: `classic`, `paper`, `terminal`, `retro`, `ocean`, `crimson`, `forest`, and `ink`.

### 2. Bug Fixes and Improvements

- Fix rendering issues, timezone handling, or parameter normalization.
- Improve accessibility, escaping, or SVG output quality.
- Optimize cache headers in `api/widget.js` and `vercel.json`.

### 3. Tests

Add or update Vitest tests in `tests/` when changing widget logic:

```bash
npm test
```

For coverage:

```bash
npm run coverage
```

### 4. Documentation and Workshop UI

- Improve `README.md` with accurate examples and parameter references.
- Update `index.html` (the local widget workshop) when adding widgets or parameters.
- Keep snippet examples in sync with supported query parameters.

## Local Development

### Prerequisites

- Node.js 18 or later

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/Stylish-Readme.git
cd Stylish-Readme
npm install
npm start
```

Open `http://localhost:5000` to use the widget workshop and preview widgets locally.

### Project Structure

```text
Stylish-Readme/
├── api/
│   ├── widget.js           # Serverless SVG endpoint handler
│   └── marketplace.svg.js  # Marketplace widget endpoint
├── lib/
│   ├── widgets.js          # Widget rendering and parameter logic
│   └── skills-paths.json   # Skill icon path data
├── tests/
│   └── widgets.test.js     # Vitest unit tests
├── index.html              # Local widget workshop UI
├── vercel.json             # Deployment routes and cache headers
├── README.md
└── CONTRIBUTION.md
```

### Serverless-First Architecture

Stylish Readme is designed as a lightweight, serverless-native project.

- Do not introduce persistent backend servers or long-running processes.
- New features should use stateless logic compatible with edge and serverless deployments.
- Keep cold starts fast and infrastructure requirements minimal.
- Avoid breaking existing URL parameters — existing README embeds depend on them.

Pull requests that add persistent server dependencies may not be accepted.

## Reporting Issues

Before creating a new issue:

1. Search existing issues to avoid duplicates.
2. Provide a clear, descriptive title.
3. Include the widget URL or query parameters you used.
4. Attach screenshots of unexpected SVG output when applicable.

### Issue Template

```text
Title:
Short description of the issue

Widget / URL:
e.g. /api/profile.svg?theme=paper&name=...

Steps to Reproduce:
1.
2.
3.

Expected Behavior:

Actual Behavior:

Environment:
Local / Production / Self-hosted
```

## Submitting Changes

### Step 1: Fork the Repository

Fork [Stylish-Readme](https://github.com/cu-sanjay/Stylish-Readme) to your GitHub account.

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/Stylish-Readme.git
cd Stylish-Readme
```

### Step 3: Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Use prefixes such as `feature/`, `fix/`, or `docs/` when it helps reviewers understand the change.

### Step 4: Make Your Changes

- Keep changes focused and minimal.
- Follow the existing code style in `lib/widgets.js` and `api/`.
- Test widgets locally in the workshop and via direct API URLs.
- Run `npm test` when touching widget logic.

### Step 5: Commit Changes

Use clear, descriptive commit messages:

```bash
git commit -m "Add ocean theme support to streak widget"
```

### Step 6: Push Changes

```bash
git push origin feature/your-feature-name
```

### Step 7: Open a Pull Request

Open a pull request against the `main` branch of the upstream repository. Describe what changed, why, and how you tested it.

## Contribution Guidelines

Please ensure:

- SVG output is valid and renders correctly on GitHub.
- User-supplied text is escaped (`escXml`) to prevent injection issues.
- New parameters have sensible defaults and do not break existing URLs.
- Cache headers match how often the widget content changes.
- Tests pass (`npm test`) for logic changes.
- README examples are updated when public API behavior changes.

### Adding a New Widget

1. Implement the renderer in `lib/widgets.js`.
2. Register the type in `renderWidget()`.
3. Add defaults in `normalizeParams()` if needed.
4. Set an appropriate `CACHE_POLICIES` entry in `api/widget.js`.
5. Add matching route/cache rules in `vercel.json` when required.
6. Add tests in `tests/widgets.test.js`.
7. Document parameters in `README.md` and add a workshop section in `index.html`.

## Pull Request Process

Before submitting a PR:

- [ ] Branch is up to date with the latest `main` changes.
- [ ] Widgets render correctly locally and via API URLs.
- [ ] Existing URL parameters still work.
- [ ] `npm test` passes (when applicable).
- [ ] Documentation and examples are updated (when applicable).
- [ ] Changes respect the serverless-first architecture.
- [ ] Commit messages are descriptive.

After submission:

1. Maintainers will review your contribution.
2. Feedback may be provided for improvements.
3. Once approved, your PR will be merged.

## Recognition

Every contribution helps make Stylish Readme better. Thank you for building with us.
