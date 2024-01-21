```yaml
title: Baloise Design System - ngSquare
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

## Baloise 
# Design System

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
layout: image-right
image: overview.png
```

# Definition

A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications

<br/>

[Documentation](https://design.baloise.dev/?path=/docs/design-system--documentation)

---

```yaml
layout: image-right
image: tokens.png
```

# Design Tokens

Design tokens serve as the definitive source for naming and storing design choices.

<br/>

- [All Tokens](https://design.baloise.dev/?path=/docs/foundation-design-tokens--documentation)
- [Theming](https://design.baloise.dev/?path=/docs/development-theming--documentation)

<br/>
<br/>

```css
.my-component {
  color: var(--bal-color-primary);
}
```

```css
:root {
  --bal-color-primary: pink;
}
```

---

```yaml
layout: image-right
image: icons.png
class: image-right-full
```

# Iconography

Icon and Brand Icon collection for <br/>
Baloise applications.

<br/>

- [Documentation](https://design.baloise.dev/?path=/docs/foundation-iconography--documentation)
- [Component](https://design.baloise.dev/?path=/docs/components-data-display-icon--documentation)

<br/>

```html
<bal-icon name="info-circle" size="large"></bal-icon>
```

<br/>

```ts
import { balBrandIconCarCrashWithAnimalGreen } from '@baloise/design-system-brand-icons'

@Component({...})
export class AppComponent {
  myIcon = balBrandIconCarCrashWithAnimalGreen
}
```

```html
<bal-icon color="auto" [svg]="myIcon"></bal-icon>
```

---

```yaml
layout: image-right
class: image-right-full
image: typo.png
```

# Typography

Font files are provided in a separate package.

<br/>

- [Documentation](https://design.baloise.dev/?path=/docs/foundation-typography--documentation)
- [Heading](https://design.baloise.dev/?path=/docs/components-typography-heading--documentation)
- [Text](https://design.baloise.dev/?path=/docs/components-typography-text--documentation)

<br/>

```html
<bal-heading level="h1">Heading</bal-heading> <bal-text>Text</bal-text>
```

---

# Assets

## Favicons

Package with the Baloise favicons for web applications.

- [Documentation](https://design.baloise.dev/?path=/docs/foundation-brand-assets--documentation#favicons)
- [Dev Guide](https://design.baloise.dev/?path=/docs/development-assets--documentation#favicon)

## Maps

A collection of map markes images in the Baloise design and the maps style configuration.

- [Documentation](https://design.baloise.dev/?path=/docs/foundation-brand-assets--documentation#maps)
- [Dev Guide](https://design.baloise.dev/?path=/docs/development-assets--documentation#google-maps)

---

```yaml
layout: image-right
class: image-right-full
image: css.png
```

# CSS Utilities

CSS utility classes streamline component<br/>
styling with pre-defined styles <br/>
applied directly to HTML elements.

[Overview](https://design.baloise.dev/?path=/docs/css-utilities-overview--documentation)

```html
<div class="bg-green p-normal">
  Green background with a normal padding around
</div>
```

<br/>
<br/>

## Grid System

```html
<div class="grid">
  <div class="col">Column A</div>
  <div class="col">Column B</div>
</div>
```

---

# Components

The components of the Baloise Design System are builded with the library [Stencil](https://stenciljs.com/).

This creates [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) that run everywhere.

```ts
import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
})
export class MyComponent {
  @Prop() first: string;
  @Prop() last: string;

  private getText = () => format(this.first, this.last);

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
```

--- 

# Testing

--- 

```yaml
layout: image-right
image: issues.png
```

# Bugs / Features & Co.

The Design System is developed on on [GitHub](https://github.com/baloise/design-system).

<br/>

Bugs, Features or any other issue can be raised there with a valid GitHub user.

[New Issue](https://github.com/baloise/design-system/issues/new/choose)

<br/>

Documentation is automatically deployed on Vercel.

[design.baloise.dev](https://design.baloise.dev)

---

```yaml
layout: image-right
image: question.svg
hideInToc: true
```

# Any Questions