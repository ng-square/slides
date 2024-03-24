```yaml
title: Routing - ngSquare
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

# Routing

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
layout: cover
---

# Introduction to Angular Routing

---

## What is Angular Routing?

- Enables navigation without page reloads
- Core for Single Page Applications (SPAs)
- Maps URLs to specific components/views
- Facilitates deep linking and bookmarking
- Enhances code modularity and organization

---

### How does Angular Routing work?

- Maps URLs to Angular components
- Uses RouterModule for configuration
- Renders components based on route configurations

---
layout: cover
---

# Setting Up Angular Routing

---

### Install Angular Router

- Install router package using Angular CLI
- Import RouterModule in AppModule
- Configure routes using RouterModule.forRoot() in AppModule

  ```
  ng add @angular/router
  ```

---
layout: cover
---

# Defining Routes

---

### Creating Route Configurations

- Define routes in AppModule or feature modules
- Use RouterModule.forRoot() for root-level routes
- Use RouterModule.forChild() for feature module routes

---

## Understanding Route Definition Objects

- Define routes as object literals with properties
  - `path`: URL path for the route
  - `component`: Component to render for the route
  - `redirectTo`: Redirects to a different URL
  - `children`: Defines child routes for nesting
  - `canActivate`: Guards route activation based on conditions

---

## Basic route configuration examples

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

---
layout: cover
---

# Router Outlet

---

## What is a Router Outlet?

- TODO

---

## Implementing Router Outlet in Angular templates

- TODO

---
layout: cover
---

# Navigating between Routes

---

## RouterLink

- TODO

---

## Programmatic navigation using Router service

- TODO

---

## Relative and absolute navigation

- TODO

---
layout: cover
---

# Route Parameters

---

## Passing parameters to routes

- TODO

---

## Accessing route parameters in components

- TODO

---

## Optional route parameters

- TODO

---
layout: cover
---

# Route Guards

---

## Introduction to Route Guards

- TODO

---

## canActivate

- TODO

---
layout: cover
---

# Lazy Loading

---

## What is Lazy Loading?

- TODO

---

## Lazy Loading modules using Angular Router

- TODO

---
layout: image
image: task.svg
class: task-full
hideInToc: true
---

# Task B6.A - Routing

- TODO

--- 
hideInToc: true
---

# Task B5.C - Example solution

- TODO

