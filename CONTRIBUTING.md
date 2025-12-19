# Contributing to RentOrbits

We welcome contributions from everyone! Follow these guidelines to make contributing smooth and effective.

## 1. Reporting Issues
- Search existing issues before opening a new one.
- Provide clear steps to reproduce the problem.
- Include screenshots or logs if helpful.

## 2. Submitting Pull Requests
**1️⃣ Clone your fork**
```bash
git clone https://github.com/<your-username>/RentOrbits.git
cd RentOrbits
```

This command clones your forked repository and navigates into the project directory.

**2️⃣ Create a descriptive branch**
```bash
git checkout -b feature/short-description
```

Create a new branch that clearly describes the feature or fix you’re working on.

**3️⃣ Make changes and commit them**

After making your changes, commit them with a descriptive message.

✅ Use the following prefixes for consistency:
- feature: add feature-name
- fix: resolve bug description
- docs: update documentation


Example:
```bash
git commit -m "feat: add user authentication flow"
```
**4️⃣ Push your branch to GitHub**
```bash
git push origin feature/short-description
```

This pushes your local branch to your GitHub fork.

**5️⃣ Open a Pull Request**

- Go to your fork on GitHub
- Click Compare & Pull Request
- Submit a PR from your branch to the main branch of the original repository
- Add a clear title and description of your changes

## 3. Coding Standards

* **Naming conventions:** Use `camelCase` for variables and functions, `PascalCase` for classes and components, and `UPPER_CASE` for constants.
* **Line length:** Limit lines to 100 characters.
* **Indentation:** Use 2 spaces for indentation (no tabs).
* **Linters/Formatters:** All code must pass [ESLint](https://eslint.org/) and be formatted with [Prettier](https://prettier.io/). Run `npm run lint` and `npm run format` before submitting.
* Write clean and maintainable code by following SOLID principles and adding comments where necessary.

## 4. Branching & Commit Guidelines

* Feature branches: `feature/short-description`
* Bugfix branches: `bugfix/short-description`
* Commit prefixes: `feat:`, `fix:`, `docs:`, `chore:`

## 5. Communication

* Use GitHub Issues for discussions.
* Open Pull Requests for code contributions.

## 6. PR Checklist

* [ ] Code builds successfully
* [ ] Code follows formatting rules
* [ ] No sensitive information included
* [ ] Commits are descriptive
* [ ] Documentation updated if needed

