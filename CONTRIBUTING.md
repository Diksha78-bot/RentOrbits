# Contributing to RentOrbits

We welcome contributions from everyone! Follow these guidelines to make contributing smooth and effective.

## 1. Reporting Issues
- Search existing issues before opening a new one.
- Provide clear steps to reproduce the problem.
- Include screenshots or logs if helpful.

## 2. Submitting Pull Requests
1. Fork the repository.  
2. Clone your fork:


```bash
git clone https://github.com/<your-username>/RentOrbits.git
cd RentOrbits
3. Create a descriptive branch:


```bash
git checkout -b feature/short-description


4. Make your changes and commit them:

When committing, use descriptive messages with the following prefixes:

```text
feat: add feature-name
fix: bug description
docs: update documentation
5. Push your branch to GitHub:


```bash
git push origin <branch-name>


6. Open a Pull Request from your branch to the main repository.

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

