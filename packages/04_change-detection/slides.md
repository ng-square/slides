```yaml
theme: default
class: text-center
lineNumbers: false
drawings:
  persist: false
title: Change Detection
```

# Change Detection

## Welcome

---

- What is a change anyway?
- What causes a change?
- Who notifies Angular?
- Change Detection
- Performance
- Smarter Change Detection
  - Immutable
  - Observables
  - OnPush

---

```yaml
layout: image
image: /images/slide-2.svg
class: background-size-contain
```

---

```yaml
layout: image
image: /images/slide-3.svg
class: background-size-contain
```

---

```yaml
layout: fact
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
layout: fact
```

# Who notifies Angular?

## Zone.js

<iframe src="https://giphy.com/embed/NmerZ36iBkmKk" width="480" height="323" frameBorder="0" class="giphy-embed"></iframe>

---

```yaml
layout: image
image: /images/event-loop.png
class: background-size-contain
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
layout: fact
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
class: background-size-contain
```

---

```yaml
layout: image
image: /images/Slide - 23.svg
class: background-size-contain
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
layout: fact
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
class: background-size-contain
```

---

```yaml
layout: image
image: /images/Slide - 31.svg
class: background-size-contain
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
class: background-size-contain
```

---

```yaml
layout: image
image: /images/Slide - 37.svg
class: background-size-contain
```

---

```yaml
layout: image
image: /images/Slide - 38.svg
class: background-size-contain
```

---

```yaml
layout: image
image: /images/Slide - 39.svg
class: background-size-contain
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
layout: image
image: /images/Slide - 41.svg
class: background-size-contain
```

---

```yaml
layout: image
image: /images/Slide - 42.svg
class: background-size-contain
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
class: background-size-contain
```

---

```yaml
layout: image
image: /images/Slide - 45.svg
class: background-size-contain
```

---

```yaml
layout: image
image: /images/Slide - 46.svg
class: background-size-contain
```

---

```yaml
layout: intro
```

# Any Questions ?

---

```yaml
layout: intro
class: sum-up
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
