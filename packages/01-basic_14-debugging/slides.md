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

- Placeholder in the application
- The router renders components dynamically at this place
  - Based on the current route / URL


```html
<router-outlet></router-outlet>
```

---
layout: cover
---

# Navigating between Routes

---

## Navigate using RouterLink

```html
<!-- links to /player/rfederer -->
<a routerLink="/player/rfederer">Link Text</a>

<!-- links to /player/rfederer?debug=true#matches -->
<a [routerLink]="['/player/rfederer']" [queryParams]="{debug: true}" fragment="matches">Link Text</a>
```

- Angular directive used for creating navigation links in templates
- Navigates to the corresponding route when clicked
- Supports dynamic route parameters and query parameters for flexible navigation
- `routerLink` defines target
- `queryParams` allows to navigate w/ query params 
- `fragment` allows to target a specific fragment
- `queryParamsHandling` defines handling of existing query params (`preserve`, `merge`)

---
layout: two-cols-header
---

## Relative and absolute navigation

::left:: 

Relative navigation:
- Routes are navigated relative to the current activated route
- Used with `relativeTo` in navigation methods
- Example:
  - Current route: `/player/rfederer`
  - Navigate to: `details`
  - Target: `/player/rfederer/details`

::right:: 

Absolute navigation:
- Routes are navigated based on their absolute path from the root level
- Used with absolute paths in navigation methods (starting with `/`) 
- Example:
  - Current route: `/player/rfederer`
  - Navigate to: `/player/rnadal`
  - Target: `/player/rnadal`


---
layout: two-cols-header
---

## Navigate using Router service

::left::

- Allows for navigation within Angular components programmatically
  - When navigation needs to be triggered based on user interactions or application logic
- Inject the `Router` service into the component
- `navigate`
  - Navigate based on the provided array of commands and a starting point
- `navigateByUrl`
  - Navigates to a view using an absolute route path

::right::

```typescript
// navigate to player page with navigateByUrl
router.navigateByUrl("/player/rfederer")

// navigate to player page with navigate
router.navigate(['/player', `'rfederer`]);
// relative navigation -> /player/rfederer/details
router.navigate(['details'], {relativeTo: route});
// relative navigation -> /player/rnadal
router.navigate(['../../rnadal'], {relativeTo: route});
```


---
layout: image
image: task.svg
class: task-full
hideInToc: true
---

# Task B6.A - Routing

- Create a component `TennisPlayer` which displays the details of a Tennis player
  - Add content to the component as you wish
- Create a component `TennisMatch` which displays the details of a Tennis match
  - Add content to the component as you wish
- In the route configuration add the two components
  - `player` should target `TennisPlayer` component
  - `match` should target `TennisMatch` component
- In the `app.component` add two links (hint: `routerLink`) to navigate to these components

--- 
hideInToc: true
---

# Task B5.A - Example solution

```
// route config
{ path: 'player', component: TennisPlayerComponent },
{ path: 'match', component: TennisMatchComponent }

// app component
<a routerLink="/player">Tennis player</a>
<a routerLink="/match">Tennis match</a>
```

