```yaml
title: Observables - ngSquare
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

# Observables

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

# What are Observables?

A core feature of reactive programming in Angular.

- Emit multiple values
- Handle asynchronous data sources like user input, network requests, and timers
- Can be transformed, combined and composed in various ways to create more complex data streams

---

```yaml
layout: image-right
image: rx.png
```

# RxJS Library

Reactive Extensions Library for JavaScript

> Think of RxJS as Lodash for events.

[Docs](https://rxjs.dev/)

## Concepts

- **Observable**
- **Observer**
- **Subscription**
- **Operators**
- **Subject**

---

# Observable

represents the idea of an invokable collection of future values or events.

```ts
import { of } from 'rxjs';

const myObservable = of(1, 2, 3);
```

---

# Observer

is a collection of callbacks that knows how to listen to values delivered by the Observable.

```ts
const myObservable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
});

// initiate execution
observable.subscribe((value) => {
  // observer handles notifications
});
```

<br />

```ts
const myPromise = new Promise((resolve) => {
  resolve(1);
});
promise.then((value) => {
  // handle result here
});
```

very similar to promises, but with observables we can emit multiple values.

[Observables compared to promises](https://angular.io/guide/comparing-observables#observables-compared-to-promises)

---

# Subscription

represents the execution of an Observable, is primarily useful for cancelling the execution.

```ts
import { of } from 'rxjs';

const numbers = of(1, 2, 3);

const subscription = numbers.subscribe(
  // handles each value emitted by the Observable
  (value) => console.log(value),
  // handles errors during the Observable stream
  (error) => console.error(error),
  // called when the Observable completes
  () => console.log('Completed')
);

// Unsubscribing removes the listener from receiving further values,
// and notifies the subscriber function to cancel work.
subscription.unsubscribe();
```

The console should log `1`, `2`, `3` and followed by the message `Completed`.

> Observables are lazy, so they won’t emit any values until you subscribe to them.

---

# Operators

are pure functions that enable a functional programming style of dealing with collections with operations like:

`tap`, `map`, `filter`, `concat`, `reduce`, `merge` etc.

<br/>

```ts
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const numbers = of(1, 2, 3);
const squared = numbers.pipe(map((x) => x * x));

squared.subscribe((x) => console.log(x)); // Output: 1, 4, 9
```

---

# Subject

is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.

```ts
import { BehaviorSubject } from 'rxjs';

export class MyService {
  private subject = new BehaviorSubject<string>('initial value');

  get value() {
    return this.subject.asObservable();
  }

  emitValue(value: string) {
    this.subject.next(value);
  }
}
```

---

# `async` Pipe

The AsyncPipe subscribes to an **observable or promise** and **returns the latest value** it has emitted. 

When a **new value is emitted**, the pipe marks the component to be **checked for changes**.

When the **component gets destroyed**, the async pipe **unsubscribes automatically** to avoid potential memory leaks.

```ts
@Component({
  template: `<div>Time: {{ time | async }}</div>`,
})
export class AsyncObservablePipeComponent {
  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
```

[Docs](https://angular.io/guide/observables-in-angular#async-pipe)

---

# Task

Lets create a global store for our favorite tennis player.

```ts
export type TennisPlayer = Immutable<{
  name: string;
}>;
```

<br/>

## TennisService

1. Create a tennis service file with the generator.
2. Define a BehaviorSubject with the type TennisPlayer.
3. Define a getter `player` which returns `asObservable`.
4. Define a method `change` to set the new favorite player.

---

# Task

Lets create a global store for our favorite tennis player.


## TennisService

1. Create a tennis service file with the generator.
2. Define a BehaviorSubject with the type TennisPlayer.
3. Define a getter `player` which returns `asObservable`.
4. Define a method `change` to set the new favorite player.