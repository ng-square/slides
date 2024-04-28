```yaml
title: Routing Intermediate - ngSquare
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


# Route Parameters

---

## Passing parameters to routes

- Route parameters:
  - Defined by colon notation in the route path
  - `players/:playername`
  - Accessed in the component w/ `ActivatedRoute` service
- Query parameters:
  - Appended to the URL after a question mark 
  - `players?name=calcaraz`
  - Accessed in the component w/ `ActivatedRoute` service

---

## Accessing route parameters in components

```typescript

// accessing: "/player/calcaraz?details=matches"
// route configured as: "players/:playername"

constructor(private route: ActivatedRoute) {
  
  // path
  this.route.paramMap.subscribe(params => {
    const pathParam = params.get('playername'); // "calcaraz"
  }

  // query
  this.route.queryParamMap.subscribe(params => {
    const queryParam = params.get('details'); // "matches"
  }

}

```

---
layout: cover
---

# Route Guards

---

## Introduction to Route Guards

- Used for controlling navigation and access to routes
- Based on e.g.: Authentication status, roles, or data availability
- Navigation attempts are intercepted and checks executed before the requested route is rendered
- Most common type: `canActivate` 
  - Others: CanActivateChild, CanDeactivate, and CanLoad

---

## canActivate

- Determines whether a route can be activated or not
- Method returning a boolean, a Promise, or an Observable
  - if `true`, navigation proceeds to the requested route
  - if `false`, navigation is canceled

```typescript

// route config
{path: 'secret-area', component: PlayerComponent, canActivate: [CanActivatePlayer]}

// guard
@Injectable()
class CanActivatePlayer implements CanActivate {
  constructor() {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true; // activation logic goes here :)
  }
}

```

---
layout: cover
---

# Lazy Loading

---

## What is Lazy Loading?

- Optimizing app by loading modules on demand
- Splitting the app into feature modules that are loaded only when needed
- Reduces initial bundle size and improves application load time
- Ideal for large applications with many features or sections that are not immediately required

---

## Lazy Loading modules using Angular Router (1/2)

App route config:
```
{
  path:'admin',
  loadChildren:()=> import('./admin/admin.module').then(m=> m.AdminModule)
}
```

---

## Lazy Loading modules using Angular Router (2/2)

Lazy loaded module (AdminModule):
```
imports: [
  CommonModule,
  AdminRoutingModule
]
```

Lazy loaded routes (AdminRoutes):
```
const routes: Routes = [
 {
    path: '',
    component: AdminComponent
  }
];
```

---
layout: image
image: task.svg
class: task-full
hideInToc: true
---

# Task I1.A - Routing

- TODO

--- 
hideInToc: true
---

# Task I1.C - Example solution

- TODO

