```yaml
title: Setup - ngSquare
theme: default
highlighter: shikiji
transition: slide-left
lineNumbers: false
info: false
drawings:
  persist: false

layout: cover
background: https://images.unsplash.com/photo-1513116917658-bdc8f9e49348?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
image: images/gradient-icon---large.gif
hideInToc: true
```

# Setup

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/ng-square/slides" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

```yaml
hideInToc: true
```

# Table of contents

<Toc maxDepth="1"></Toc>

---

```yaml
layout: image-right
image: node.png
```

# Node.js

Node.js® is an open-source, cross-platform JavaScript runtime environment.

- Server Scripting with JavaScript
- pretty widespread in nowadays, keyword: Full-Stack JS

## Links

- [Documentation](https://nodejs.org/en)

---

```yaml
layout: image-right
image: task.svg
hideInToc: true
```

## Verify Node.js Installation

Open a terminal window and execute the following command:

```bash
node -v
```

Version output should be `>= 18.0.0`

---

```yaml
layout: image-right
image: npm.png
```

# npm

`n`ode `p`ackage `m`anager

- is integrated in node.js
- adds & removes dependencies of a project
- publishes libraries

## Commands

```bash
npm install
npm add <package>
npm add <package>@<version>
npm remove <package>
npm run <script>
```

<br/>

## Links

- [Documentation](https://www.npmjs.com/)

---

```yaml
layout: image-right
image: task.svg
hideInToc: true
```

## Verify npm Installation

Open a terminal window and execute the following command:

```bash
npm -v
```

Version output should be `>= 9.0.0`

---

```yaml
layout: image-right
image: nx.png
```

# Nx

Nx is a build system with built-in tooling and advanced CI capabilities.

- quickly scaffold a new project (using Nx plugins)
- reduces complexity of a project with standards
- supports single and mono-repos
- custom generators

## Links

- [Documentation](https://nx.dev/)
- [Nx Console for IDEA](https://plugins.jetbrains.com/plugin/21060-nx-console)
- [Nx Console for VSCode](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)

---

```yaml
layout: image
image: task.svg
hideInToc: true
class: task-full
```

## Create an Angular Workspace with Nx

[Angular Setup](https://nx.dev/getting-started/tutorials/angular-standalone-tutorial)

```bash
npx create-nx-workspace myngapp --preset=angular-standalone

✔ Where would you like to create your workspace? · my-app
✔ Which bundler would you like to use? · esbuild
✔ Default stylesheet format · scss
✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? · No
✔ Test runner to use for end to end (E2E) tests · cypress
✔ Enable distributed caching to make your CI faster · Yes
```

<br/>

Project is now scaffolded so jump into it and open it with your editor.

```bash
cd my-app
```

---

The setup includes..

- a new **Angular application** at the root of the Nx workspace (src/app)
- a Cypress based set of **e2e tests** (e2e/)
- **Formatter** Prettier preconfigured
- **Lining** ESLint & Angular ESLint preconfigured
- **Testing** Jest preconfigured

---

## File structure

```
└─ my-app
   ├─ e2e (Cypress)
   ├─ src (Application source files)
   │  ├─ app (Components and Co)
   │  ├─ assets
   │  ├─ favicon.ico
   │  ├─ index.html
   │  ├─ main.ts
   │  ├─ styles.css
   │  └─ test-setup.ts
   ├─ jest.config.ts
   ├─ jest.preset.js
   ├─ nx.json
   ├─ package-lock.json
   ├─ package.json
   ├─ project.json
   ├─ tsconfig.app.json
   ├─ tsconfig.editor.json
   ├─ tsconfig.json
   └─ tsconfig.spec.json
```

[Application source files](https://angular.io/guide/file-structure#application-source-files)

---

## package.json

Defines the version of the project and the used dependencies.

```json
{
  "name": "@my-app/source",
  "version": "0.0.0", // app version
  "scripts": {
    "start": "nx serve", // serves the application
    "build": "nx build",
    "test": "nx test"
  },
  "dependencies": {
    "@angular/animations": "~17.0.0",
    ...
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~17.0.0",
    ...
  }
}
```

---

## Versioning

- Many libraries use [Semantic Versioning](https://semver.org)
- 1.2.3: Only this exact version
- ~1.2.3: bugfixes (1.2.X)
- ^1.2.3: minor changes / features (1.X.Y)
- 1.2.x: same as ~ (Bugfixes)
- \*: all versions

---

```yaml
layout: image
image: wheelbarrel-no-tilde-caret-white-bg-w1000.jpg
class: background-size-contain
```

---

## package-lock.json in Node.js Projects

- Stores exact version numbers and metadata of the dependencies.
- Guarantees reproducibility.
- Ensures identical dependency versions.

> ensures that everyone working on the project installs the same versions of dependencies.
