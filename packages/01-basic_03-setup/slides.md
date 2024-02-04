```yaml
title: Setup - ngSquare
theme: default
highlighter: shiki
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

Create an Angular application with the help of build tools.

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

- [Documentation](https://www.npmjs.com/)
- [Cheat sheet](https://devhints.io/npm)

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

# Nx Workspace

Nx is a build system with built-in tooling.

- scaffold a new project (using Nx plugins)
- reduces complexity of a project by using standards
- supports single and mono-repos
- custom generators
- extends [Angular CLI](https://angular.dev/tools/cli)

<br/>

### Links

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

# File structure

```
└─ my-app
   ├─ e2e (cypress)           🧪 Testing
   ├─ node_modules            🔧 Local npm repository 🚩
   ├─ src
   │  ├─ app                  💄 Application source files
   │  ├─ assets               🍱 Static files like images
   │  ├─ favicon.ico
   │  ├─ index.html
   │  ├─ main.ts              🚀 Bootstrap application 🚩
   │  ├─ styles.css           🎨 Global styles 🚩
   │  └─ test-setup.ts
   ├─ jest.config.ts          🧪 Testing
   ├─ jest.preset.js          🧪 Testing
   ├─ nx.json                 🔧 Nx workspace config
   ├─ package-lock.json       🔧 NPM project config 🚩
   ├─ package.json            🔧 NPM project config 🚩
   ├─ project.json            🔧 Nx workspace config (similar to Angular.json)
   ├─ tsconfig.app.json       🔧 Typescript config
   ├─ tsconfig.editor.json    🔧 Typescript config
   ├─ tsconfig.json           🔧 Typescript config
   └─ tsconfig.spec.json      🔧 Typescript config
```

[Application source files](https://angular.io/guide/file-structure#application-source-files)

---

# Dependency Management

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
image: versioning.svg
class: background-size-contain--dark
```

---

## package-lock.json in Node.js Projects

- Stores exact version numbers and metadata of the dependencies.
- Guarantees reproducibility.
- Ensures identical dependency versions.

> ensures that everyone working on the project installs the same versions of dependencies.

---

## Installation of Dependencies

1. Install a dependency directly with the terminal

```bash
npm install <dependency> -E
npm add <dependency> -D -E
npm i <dependency> -D -E
```

- `-D`, `--save-dev`: Package will appear in your devDependencies.
- `-E`, `--save-exact`: Saved dependencies will be configured with an exact version.

[npm-install](https://docs.npmjs.com/cli/v8/commands/npm-install#synopsis)

2. Add dependency to your `package.json` manually

```json
"dependencies": {
  "@my/dependency": "latest",
},
"devDependencies": {
  ...
}
```

---

```yaml
layout: image
image: task.svg
hideInToc: true
class: task-full
```

## Install first Dependencies

1. Install `@ngneat/transloco` as a dependency

<v-click>

```bash
npm i -E @ngneat/transloco
```

</v-click>

<br/>

2. Install `@baloise/design-system-cli` as a dev dependency

<v-click>

```bash
npm i -D -E @baloise/design-system-cli
```

</v-click>

<br/>

<v-click>

```diff
{
  "name": "@my-app/source",
  "dependencies": {
+   "@ngneat/transloco": "6.0.4",
  },
  "devDependencies": {
+   "@baloise/design-system-cli": "0.0.2",
  }
}

```

</v-click>

---

## Where are the dependencies

### Local Repository

- the **node_modules** folder contains the local repository with all the installed dependencies
- Having problems? Delete the folder and rerun npm install
- Do NOT check in node_modules to your vcs!

---

# NPM Config

npm gets its config settings from the command line, environment variables, and npmrc files.

## .npmrc

- project specific configuration
- company registry proxy configuration

[Documentation](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc)

---

# Application source files

## src/

- See the [official docs](https://angular.io/guide/file-structure#application-source-files)
- **src/app subfolder** - where we write code, where you work on in 99% of your time

---

# Setup i18n

Lets use the provided schematics of the library to scaffold the configuration and installation.

```bash
nx g @ngneat/transloco:ng-add
```

```bash
✔ 🌍 Which languages do you need? · en, de
✔ 🚀 Are you working with server side rendering? (y/N) · false
CREATE transloco.config.js
CREATE src/app/transloco-loader.ts
CREATE src/assets/i18n/en.json
CREATE src/assets/i18n/de.json
UPDATE src/app/app.config.ts
```

---

# Setup Baloise Design System

Lets use the provided schematics of the Baloise Design System to scaffold the configuration and installation.

```bash
nx g @baloise/design-system-cli:ng-add
```

```bash
✔ Are you working with transloco internationalization library? (y/N) · true
✔ For which region is the app developed · CH
✔ Packages installed successfully.
DELETE src/app/nx-welcome.component.ts
CREATE src/polyfills.ts
CREATE src/zone-flags.ts
CREATE src/app/i18n.initialize.ts
UPDATE project.json
UPDATE tsconfig.app.json
UPDATE src/styles.scss
UPDATE src/app/app.component.ts
UPDATE src/app/app.component.html
UPDATE src/app/app.config.ts
UPDATE package.json
```

---

# Server the application

Setup is completed, so lets have a look at the scaffolded application.

<br/>

Run the following command in a terminal or use Nx console to server the application.

```bash
nx serve
```

```
> nx run my-app:serve:development

Initial Chunk Files | Names         |  Raw Size
styles.css          | styles        | 223.76 kB |
polyfills.js        | polyfills     |  83.58 kB |
main.js             | main          |   4.40 kB |

                    | Initial Total | 311.74 kB

Application bundle generation complete. [1.435 seconds]
Watch mode enabled. Watching for file changes...
```

**➜** Local: [http://localhost:4200/](http://localhost:4200/)

---

```yaml
layout: image-right
image: question.svg
hideInToc: true
```

# Any Questions

---

```yaml
layout: image-right
image: sum-up.svg
class: sum-up
hideInToc: true
```

# Sum Up

<v-click>

- Node.js runtime environment

</v-click>
<v-click>

- npm dependency management & config

</v-click>
<v-click>

- Nx build system with standards

</v-click>
<v-click>

- Angular schematics / cli

</v-click>
