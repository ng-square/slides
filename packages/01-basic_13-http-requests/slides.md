```yaml
title: HTTP Requests - ngSquare
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

# HTTP Requests

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

# HTTP(S)

- Protocol for transmitting hypertext over the internet
- Enables communication between web browsers and servers
- Often used with RESTful APIs to perform CRUD operations on data
- Methods:
  - GET: Request data from server
  - POST: Submit new data to server
  - PUT: Update existing data on server
  - DELETE: Remove data from server
  - ...

---

# Setup in Angular

- Import and inject `HttpClient` in your Angular service
- Injection of HttpClient is configured in `app.config.ts` with `provideHttpClient()`

Example: 

```ts
// config
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};

// injection
constructor(private httpClient: HttpClient) {}
```


---

# Make a GET request

```ts

getPlayers(): Signal<Player[] | undefined> {
  return toSignal(this.httpClient.get<Player[]>('/api/players'));
} 

```

- Return type is a `Signal` of `Players`
- Makes HTTP GET request to `/api/players` to fetch all the players; expects an array of `Player` objects
- `toSignal` converts the observable which the HttpClient returns to a signal


---

# Make a POST request

```ts

postPlayer(player: Player): Signal<Player | undefined> {
  return toSignal(this.httpClient.post<Player>('/api/players', player));
} 

```

- Return type is a `Signal` of `Player` 
- Makes HTTP POST request to `/api/players` to create a new player; expects a single `Player` object
- `toSignal` converts the observable which the HttpClient returns to a signal


---

# Handling responses

- Methods of HttpClient return Observables
- The response can be handled by subscribing to the Observable (remember to unsubscribe!) 

```ts
this.httpClient.get<Player[]>('/api/players').subscribe(
  (data) => { /* Handle successful response */ },
  (error) => { /* Handle error response */ }
);
```

- RxJS operators can be used to work with the Observable
- Observables can be converted to signals

---

# Handling responses with Promises

Simplify the one-time API call action into a `Promise` for a better readability

```ts
try {
  await firstValueFrom(this.http.get<Player[]>(`/api/players`))
} catch(error) {
  // Implement error handling
}
```

- **Single value**: It resolves with the first emitted value from the Observable and then completes
- **Simplicity**: Ideal for one-time API calls, simplifying code by avoiding Observable subscriptions
- **Cleaner Syntax**: async/await with Promises results in more readable code
- **Error Handling**: try/catch blocks provide straightforward error management
- **Reduced Overhead**: Eliminates the need to maintain Observable subscriptions for single values
- **Easier Integration**: Seamlessly works with APIs or libs expecting Promises, reducing conversion efforts

---
layout: image
image: task.svg
class: task-full
hideInToc: true
---

# Task B13.A - HTTP requests

- Check what data is returned from the API
- Update the service named `TennisLegendsService`
- In the service, inject a `HttpClient`
- Create a method to fetch tennis players from the API

`https://ng-square-api.vercel.app/api/tennis/legends`

--- 
hideInToc: true
class: scrollable
---

# Solution B13.A

## TennisLegendsService

```typescript{3,4,10,15-22}
import { computed, inject, Injectable, signal } from '@angular/core';
import { TennisPlayer } from './tennis.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TennisService {
  private http = inject(HttpClient)
  private store = signal<TennisPlayer[]>([]);

  players = computed(() => this.store())

  constructor(){
    this.fetch()
  }

  async fetch() {
    const players = await firstValueFrom(this.http.get<TennisPlayer[]>(`https://ng-square-api.vercel.app/api/tennis/legends`))
    this.store.set(players)
  }

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
