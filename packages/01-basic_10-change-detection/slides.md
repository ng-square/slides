```yaml
title: Change Detection - ngSquare
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

# Change Detection

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

## <Toc maxDepth="1"></Toc>

---

```yaml
layout: quote
```

# What causes change?

---

```yaml
layout: image
image: /slide-2.svg
class: background-size-contain--dark
transition: fade
```

---

```yaml
layout: image
image: /slide-3.svg
class: background-size-contain--dark
```

---

## Click Event

```ts
@Component({
  template: `
    <h1>{{ firstname }} {{ lastname }}</h1>
    <button (click)="changeName()">Change name</button>
  `,
})
class MyApp {
  firstname = 'Pascal';
  lastname = 'Precht';

  changeName() {
    this.firstname = 'Brad';
    this.lastname = 'Green';
  }
}
```

---

## HTTP Request

```ts
@Component()
class ContactsApp implements OnInit {
  contacts: Contact[] = [];

  constructor(private http: Http) {}

  ngOnInit() {
    this.http
      .get('/contacts')
      .map((res) => res.json())
      .subscribe((contacts) => (this.contacts = contacts));
  }
}
```

---

## Things that causes change

Basically application state change can be caused by:

- Events - click, submit, …
- XHR - Fetching data from a remote server
- Timers - setTimeout(), setInterval()

<v-click>
<br/>
<br/>
<h1>They are all asynchronous</h1> 
</v-click>

---

```yaml
layout: section
```

# Change Detection

Lets understand how change detections works.

---

```yaml
layout: image
image: /Slide - 22.svg
class: background-size-contain--dark
transition: fade
```

---

```yaml
layout: image
image: /Slide - 23.svg
class: background-size-contain--dark
```

---

```yaml
layout: two-cols-header
```

## Using `default` change detection

::left::

```ts
@Component({
  template: ` <my-app-b [user]="user"></my-app-b>
    <input [value]="user.name" (input)="changeName($event.detail)" />
    <button (click)="changeName()">Change</button>`,
})
export class AComponent {
  private user = { name: 'Roger' };

  changeName(name = 'Rafa') {
    this.user.name = name;
  }
}
```

::right::

```ts
@Component({
  selector: 'my-app-b',
  template: ` <strong>{{ username }}</strong> `,
})
export class BComponent {
  @Input() user!: { name: string };

  get username() {
    return this.user.name;
  }
}
```

---

```yaml
layout: image
image: /demo-1.png
class: background-size-contain--dark
```

---

```yaml
layout: quote
```

# How can we improve that?

Achieve **better performance**, have **less side effects** and **more control** over rendering.

<br/>
<br/>

- `Immutable` Data Structures
- Use `OnPush` Change Detection Strategy

---

```yaml
layout: section
```

# `Immutable` Data Structures

Improve change detection with shallow comparison.

Reference checks instead of deep checks.

---

## Why `Immutable` Data Structures

With every change detection cycle angular checks by default every input object deeply,
if any of the prop has changed.

**This takes a lot of time.**

<br/>

First they check if the reference has changed, which is a simple comparison `a == b`.

So with `immutable` data structure we create with each change a new reference.

---

## How to create new reference

**Spread operator** allows you to write immutable code in an easier way.

```ts
const user = { name: 'Roger' };

const newUser = { ...user, name: 'Rafa' };
```

> This can be tricky especially with some object helpers like `slice` and `splice`

---

```yaml
layout: image-right
image: /immer-logo.svg
```

## Use Immutable

[Immer.js](https://immerjs.github.io/immer/)

Immer (German for: always) is a tiny package that allows you to work with immutable state in a more convenient way.

<br/>

```ts
import produce from 'immer';

type User = Immutable<{
    name: string
}>

const user: User = { name: 'Roger' };

user.name = 'Rafa' // cannot be modified here

const newUser = produce(user, draft => {
  draft.name = 'Rafa';
});
```

---

```yaml
layout: image
image: /immer.png
class: background-size-contain
```

---

```yaml
layout: section
```

# `OnPush` Strategy

Detect if a value has changed much faster.

---

## Using `OnPush`

```ts {2-4,8-9,14-16}
@Component({
  // a bound event is received triggered on the component itself
  template: `<button (click)="change()">change</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Component {

  // an `@Input` reference is changed (shallow comparison ==)
  @Input() username = 'Roger'

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  triggerChangeDetection() {
    // trigger the change detection manually
    this.changeDetectorRef.markForCheck();
  }

  change(){...}
}
```

[Docs](https://angular.io/guide/change-detection-skipping-subtrees#using-onpush)

---

```yaml
layout: two-cols-header
transition: fade
```

## Using `OnPush` - shallow comparison

> This will not trigger a change detection, since the object reference stayed the same.

<br/>

::left::

```ts {2,10-12}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <my-app-b [user]="user"></my-app-b>
    <input [value]="user.name" (input)="changeName($event.detail)" />
    <button (click)="changeName()">Change</button>`,
})
export class AComponent {
  user = { name: 'Roger' };

  changeName(name = 'Rafa') {
    this.user.name = name;
  }
}
```

::right::

```ts {3,7}
@Component({
  selector: 'my-app-b',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <strong>{{ username }}</strong> `,
})
export class BComponent {
  @Input() user!: { name: string };

  get username() {
    return this.user.name;
  }
}
```

---

```yaml
layout: two-cols-header
```

## Using `OnPush` - shallow comparison

> By creating a new object it also creates new reference, so the component b gets rendered.

<br/>

::left::

```ts {10-15}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <my-app-b [user]="user"></my-app-b>
    <input [value]="user.name" (input)="changeName($event.detail)" />
    <button (click)="changeName()">Change</button>`,
})
export class AComponent {
  user = { name: 'Roger' };

  changeName(name = 'Rafa') {
    this.user = {
      ...this.user,
      name,
    };
  }
}
```

::right::

```ts {0}
@Component({
  selector: 'my-app-b',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <strong>{{ username }}</strong> `,
})
export class BComponent {
  @Input() user!: { name: string };

  get username() {
    return this.user.name;
  }
}
```

---

```yaml
layout: image
image: /demo-2.png
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /Slide - 38.svg
class: background-size-contain--dark
transition: fade
```

---

```yaml
layout: image
image: /Slide - 39.svg
class: background-size-contain--dark
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

# Sum Up

<v-click>

- Use `OnPush` strategy

</v-click>
<v-click>

- Create new references with data changes

</v-click>
<v-click>

- Try to use `immutable` data structures

</v-click>
