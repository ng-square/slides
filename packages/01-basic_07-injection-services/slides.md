```yaml
title: Injection - ngSquare
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

# Injection & Services

Dependency injection, or DI, is one of the fundamental concepts in Angular.

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

# Introduction

**Dependency Injection (DI)** stands as an essential design pattern in modern software development that promotes:

- modularity
- testability
- maintainability

How a class is created will be done by the DI.

---

# Providing dependency

Imagine there is a service that needs to act dependency in a component.

The first step is to add the `@Injectable` decorator to show that the class can be injected.

```ts
@Injectable()
export class TennisService {}
```

The next step is to make it available in the DI by providing it.

```ts {5,8}
@Component({
  standalone: true,
  selector: 'app-list',
  template: '...',
  providers: [TennisService],
})
export class TennisListComponent {
  private http = inject(MyService);
}
```

The service is available to all instances of this component and other components and directives used in the template.

---

# Providing dependency globally

When you provide the service at the root level, Angular creates a single, shared instance of the service and injects it into any class that asks for it.

```ts {1-3}
@Injectable({
  providedIn: 'root',
})
export class TennisService {}
```

No need to provide the service anymore.

```ts {7}
@Component({
  standalone: true,
  selector: 'app-list',
  template: '...',
})
export class TennisListComponent {
  private http = inject(MyService);
}
```

Registering the provider in the `@Injectable` metadata also allows Angular to optimize an app by removing the service from the compiled application if it isn't used, a process known as tree-shaking.

---

# Injecting a dependency

The most common way to inject a dependency is to declare it in a class constructor.

```ts
@Component({ … })
class TennisListComponent {
  constructor(private service: TennisService) {}
}
```

Another option is to use the inject method:

```ts
@Component({ … })
class TennisListComponent {
  private service = inject(TennisService);
}
```

---

# `inject` function

The new inject function gives more flexibility where to inject and group certain logic blocks.

Inheritance in angular is sometime a kinda painful, but with the inject function we do not need to pass dependencies downwards.

```diff
@Component({ … })
class TennisListComponent {
+  private tennisService = inject(TennisService);
+  private courtService = inject(CourtService);

-  constructor(
-    private service: TennisService,
-    private courtService: CourtService,
-  ) { … }
}
```

---

# Creating an injectable service

Use the schematics to generate a service.

```bash
nx generate @schematics/angular:service --name=tennis --project=my-app --skipTests=true --no-interactive
```

This command creates the following default TennisService.

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TennisService {}
```

---

# Injecting services in other services

When a service depends on another service, follow the same pattern as injecting into a component.

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TennisService {
  private service = inject(CourtService);
}
```

---

```yaml
layout: intro
hideInToc: true
```

# Any Questions ?

---

```yaml
layout: image-right
image: sum-up.svg
class: sum-up
hideInToc: true
```

# Summary

<v-click>

- Inject services when possible at root level to let angular do its tree shaking.

</v-click>
<v-click>

- Try to use the new `inject`.

</v-click>
