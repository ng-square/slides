```yaml
title: Signals - ngSquare
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

# Signals

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

# What are signals

A signal is a **wrapper** around a value that **notifies interested consumers when that value changes**.

Signals can contain **any value**, from primitives to complex data structures.

```ts
const count = signal(0);
console.log('The count is: ' + count());
```

Signals may be either **writable** or **read-only**.

---

# When to use Signals

1. In HTML templates
2. For state management
3. When you need to react to changes in a value without a time aspect

<br>

**In Angular templates, Signals are better than Observables**

- they schedule Change Detection without any pipes
- they are glitch-free, no side-effects
- you can read the same signal multiple times and it will be **"free"** in terms of performance <br/>(and read values are guaranteed to be the same)

---

# When to use Signals and when Observables

**Signal** - If the role of a variable can be described as **conditions**

- "if this variable has this value, then display this list"
- "if this variable has this value, this button is disabled"

<br/>

**Observable** - If the description of a variable’s role includes words, related to **time**

- "when the cursor moves…"
- "wait for the file uploading event and then…"
- "every time this event happens, do this…"
- "until this event…"
- "for N seconds ignore…"
- "after this request…"

---

# Writable signals

Writable signals provide an API for updating their values directly.

```ts
// You create writable signals by calling the signal function with the signal's initial value
const count = signal(0);
// Signals are getter functions - calling them reads their value
console.log('The count is: ' + count());
```

```ts
// To change the value of a writable signal, either `.set()` it directly:
count.set(3);
```

```ts
// Or use the `.update()` operation to compute a new value from the previous one:
count.update((value) => value + 1);
```

---

# Computed signals (read-only)

**Computed signal** are read-only signals that derive their value from other signals. You define computed signals using the `computed` function and specifying a derivation:

```ts
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

The doubleCount signal depends on the count signal. Whenever count updates, Angular knows that doubleCount needs to update as well.

---

# When to use computed()?

**Whenever you like!**

computed is the best thing in Angular Signals, incredibly handy and safe to use.

They memorize the value until changed again.

<br/>

There are just **two rules** about the usage of `computed()`:

1. Do not modify things in `computed()`
2. Do not make asynchronous calls in `computed()`

<br/>

`computed()` should not have side effects, it should be a pure function.

---

# Reading signals in OnPush components

When you read a signal within an `OnPush` component's template, Angular tracks the signal as a dependency of that component.

When the value of that signal changes, Angular automatically **marks** the component to ensure it gets updated the next time change detection runs.

---

# Effects

Signals notify interested consumers when they change.

An effect is an operation that runs whenever one or more signal values change.

```ts
effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

Effects always run **at least once**.

When an effect runs, it tracks any signal value reads.
Whenever any of these signal values change, the effect runs again.

Similar to computed signals, effects keep track of their dependencies dynamically, and only track signals which were read in the most recent execution.

Effects always execute **asynchronously**, during the change detection process.

---

# When to use effect()?

Effects are rarely needed in most application code, but may be useful in specific circumstances.

Here are some examples of situations where an effect might be a good solution:

- Logging data being displayed and when it changes
- Keeping data in sync with window.localStorage.
- Adding custom DOM behavior that can't be expressed with template syntax.
- Performing custom rendering to a canvas, charting library, or other third party UI library.

---

# Effects - untracked()

Reading without tracking dependencies

```ts
effect(() => {
  // reading the signals we need
  const a = this.a();
  const b = this.b();

  untracked(() => {
    // rest of the code is here - this code should not
    // modify the signals we read above!
    if (a > b) {
      document.title = 'Ok';
    }
  });
});
```

---

# Effect cleanup functions

Effects might start long-running operations, which you should cancel if the effect is destroyed or runs again before the first operation finished.

```ts
effect((onCleanup) => {
  const user = currentUser();
  const timer = setTimeout(() => {
    console.log(`1 second ago, the user became ${user}`);
  }, 1000);
  onCleanup(() => {
    clearTimeout(timer);
  });
});
```

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

- Use `Observable` for time related values

</v-click>
<v-click>

- Use `Signals` for condition base values

</v-click>
<v-click>

- `Signals` can be used in onPush

</v-click>
<v-click>

- Do not modify thins in `computed()`
- Do not make asynchronous calls in `computed()`

</v-click>
<v-click>

- Use `effects` for side effects like logging

</v-click>

---

```yaml
layout: image
image: task.svg
class: task-full
hideInToc: true
```

# Task B12.A

1. Change the `tennis.service.ts` from RxJS to signals
2. Change the `tennis-legends.component.ts` to use signals

---

```yaml
class: scrollable
hideInToc: true
```

# Solution B12.A

## TennisService

Change the `tennis.service.ts` from RxJS to signals

```ts{1,8,12,15,20}
import { computed, Injectable, signal } from '@angular/core';
import { TennisPlayer } from './tennis.model';

@Injectable({
  providedIn: 'root'
})
export class TennisService {
  private store = signal<TennisPlayer[]>([
    ...
  ]);

  players = computed(() => this.store())

  setFavorite(player: TennisPlayer) {
    const currentPlayers = this.store();
    const updatedPlayers = currentPlayers.map(p => ({
      ...p,
      favorite: p.firstName === player.firstName && p.lastName === player.lastName
    }));
    this.store.set(updatedPlayers);
  }
}

```

## TennisLegendsComponent

Change the `tennis-legends.component.ts` to use signals

```html{8}
<h1>Tennis Legends</h1>

<table>
  <thead>
    ...
  </thead>
  <tbody>
    @for (p of tennisService.players(); track p.lastName) {
    <tr>
      <td>{{ p.firstName }} {{ p.lastName }}</td>
      <td>{{ p.grandSlamWins }}</td>
      <td>{{ p.favorite ? 'Favorite' : '' }}</td>
      <td><button (click)="tennisService.setFavorite(p)">Set Favorite</button></td>
    </tr>
    }
  </tbody>
</table>

```
