```yaml
title: Change Detection - ngSquare
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

<Toc maxDepth="1"></Toc>

---

```yaml
layout: image
image: /images/slide-2.svg
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /images/slide-3.svg
class: background-size-contain--dark
```

---

```yaml
layout: section
```

# What causes change?

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
  firstname: string = "Pascal";
  lastname: string = "Precht";

  changeName() {
    this.firstname = "Brad";
    this.lastname = "Green";
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
      .get("/contacts")
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

> They are all asynchronous

---

```yaml
layout: center
```

# Who notifies Angular?

## Zone.js

<iframe src="https://giphy.com/embed/NmerZ36iBkmKk" width="480" height="323" frameBorder="0" class="giphy-embed"></iframe>

---

```yaml
layout: image
image: /images/event-loop.png
class: background-size-contain--dark
```

## Event Loop

---

## Zone.js

```ts
zone.run(() => {
  foo();
  setTimeout(doSth, 0);
  bar();
});
```

setTimeout() at this time is already monkey-patched

---

## Zone.js

Zones hooks can be extended

```ts
zone
  .fork({
    name: "loggerZone",
    onEnter: () => {
      console.log("start");
    },
    onLeave: () => {
      console.log("end");
    },
  })
  .run(() => {
    foo();
    setTimeout(doSth, 0);
    bar();
  });
```

---

## Angular has its own Zone

```ts
// very simplified version of actual source
class ApplicationRef {

  changeDetectorRefs:ChangeDetectorRef[] = [];

  constructor(private zone: NgZone) {
    this.zone.onTurnDone
      .subscribe(() => this.zone.run(() => this.tick());
  }

  tick() {
    this.changeDetectorRefs
      .forEach((ref) => ref.detectChanges());
  }
}
```

NgZone is a forked zone with additional API’s based on Observables

---

```yaml
layout: section
```

# Change Detection

---

```yaml
layout: image
image: /images/Slide - 21.svg
```

---

```yaml
layout: image
image: /images/Slide - 22.svg
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /images/Slide - 23.svg
class: background-size-contain--dark
```

---

## How fast is it?

Angular generates VM friendly code for better performance

Can perform hundreds of thousands of simple checks in a few milliseconds

---

## Facts

- Change Detection Graph is a directed tree
- Way more predictable
- Gets stable after a single pass
- Generates VM friendly code for better performance

---

```yaml
layout: cover
hideInToc: true
```

# Smarter

## Change Detection

---

```yaml
layout: section
```

# Mutable Objects

---

```ts
@Component({
  template: '<v-card [vData]="vData"></v-card>',
})
class VCardApp {
  constructor() {
    this.vData = {
      name: "Christoph Burgdorf",
      email: "christoph@thoughtram.io",
    };
  }

  changeData() {
    this.vData.name = "Pascal Precht";
  }
}
```

---

```yaml
layout: image
image: /images/Slide - 30.svg
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /images/Slide - 31.svg
class: background-size-contain--dark
```

---

```yaml
layout: section
```

# Immutable Objects

---

This pseudo code demonstrates it:

```typescript
const vData = someAPIForImmutables.create({
  name: "Pascal Precht",
});

const vData2 = vData.set("name", "Christoph Burgdorf");

vData === vData2; // false
```

---

## Reducing the number of checks

Angular can skip entire Change Detection
subtrees when input properties don’t change\*.

<br/>

\*we learned that: change = new reference

---

```yaml
layout: image
image: /images/Slide - 36.svg
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /images/Slide - 37.svg
class: background-size-contain--dark
```

---

```yaml
layout: section
```

# OnPush Strategy

---

```yaml
layout: image
image: /images/Slide - 38.svg
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /images/Slide - 39.svg
class: background-size-contain--dark
```

---

```ts
@Component({
  template: "{{counter}}",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CartBadgeCmp {
  @Input() addItemStream: Observable<any>;
  counter = 0;

  ngOnInit() {
    this.addItemStream.subscribe(() => {
      this.counter++; // application state changed
    });
  }
}
```

---

```yaml
layout: section
```

# Observables

---

```yaml
layout: image
image: /images/Slide - 41.svg
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /images/Slide - 42.svg
class: background-size-contain--dark
```

---

```ts
@Component({
  template: "{{counter}}",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CartBadgeCmp {
  @Input() addItemStream: Observable<any>;
  counter = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.addItemStream.subscribe(() => {
      this.counter++; // application state changed
      this.cd.markForCheck(); // marks path
    });
  }
}
```

---

```yaml
layout: image
image: /images/Slide - 44.svg
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /images/Slide - 45.svg
class: background-size-contain--dark
```

---

```yaml
layout: image
image: /images/Slide - 46.svg
class: background-size-contain--dark
```

---

```yaml
layout: image-right
image: images/question.svg
hideInToc: true
```

# Any Questions

---

```yaml
layout: image-right
image: images/sum-up.svg
class: sum-up
hideInToc: true
```

# Sum Up

<v-click>

- Use onPush when ever you can

</v-click>
<v-click>

- Run third-party libs outside Zone.js

</v-click>
<v-click>

- Use immutable data structures

</v-click>
<v-click>

- Split components into smart and dumb

</v-click>
