```yaml
title: Standalone &amp; Modules - ngSquare
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

# Standalone &amp; Modules

Modern Approaches for Efficient Angular Development

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

# What Are Angular Modules?

Containers for a cohesive block of code dedicated to an application domain

**Types of Modules**
- Root Module
- Feature Modules
- Shared Modules
- Core Modules

---

# Example of a feature module

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserListComponent,
    UserDetailComponent
  ]
})
export class UserModule { }
```

---

# Angular Modules

| Angular Module             | Description                                                   |
|----------------------------|---------------------------------------------------------------|
| **BrowserModule**          | Provides services essential for launching a web application.  |
| **CommonModule**           | Provides common directives such as `ngIf` and `ngFor`.        |
| **ReactiveFormsModule**    | Provides a model-driven approach to handling form inputs.     |
| **HttpClientModule**       | Provides a simplified API for HTTP functionality.             |
| **RouterModule**           | Provides navigation and URL manipulation capabilities.        |

---

# What Are Standalone Components?

Components that do not require a module to be declared.

Standalone components can be imported directly into other components.

```ts
import { Component } from '@angular/core';
import { AnotherStandaloneComponent } from '.another-standalone.component.ts';

@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css'],
  imports: [AnotherStandaloneComponent]
  standalone: true
})
export class StandaloneComponent {}
```

---

# Benefits of Standalone Components

- Reduced Complexity
  - No need to manage component declarations in modules
- Enhanced Reusability
  - Easier to share and reuse across different projects
- Improved Tree Shaking
  - More efficient bundling and loading

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

# Summary

<v-click>

- Standalone components simplify Angular development

</v-click>
<v-click>

- Ideal for reusable, simple components

</v-click>
