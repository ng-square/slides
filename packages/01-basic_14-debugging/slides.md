```yaml
title: Debugging - ngSquare
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

# Debugging

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

# Console log

- Simple method of printing debug statements to the browser console
- Similar to `System.out.println()` in Java
- Can be used to print strings, but also complex values
  - Example: `console.log('test');`
- Multiple arguments can be passed to properly print complex objects 
  - Example: `console.log('value', {test: 'blubb'});`

---

# Source maps 

- During build, TS code of your app is converted to JS 
- When using source maps, a `.map` file is created additionally to link the executed JS code to your app code
- Browsers make it possible to debug TS code instead of compiled JS
- Benefits: More readable, easier debugging
- Has to be configured in the `angular.json`


---

# Debugger keyword

- Similar to breakpoints in IDE
- Keyword `debugger;` can be added to JS code
- If debugging is enabled in the browser, the code execution is stopped there and one can continue debugging from there


---
layout: two-cols-header
---

# Angular dev tools

- Chrome extension specifically for Angular apps
- Inspection of component hierarchy, performance metrics, and component variables

::left::

![devtools](/devtools-1.png)

::right::

![devtools](/devtools-2.png)