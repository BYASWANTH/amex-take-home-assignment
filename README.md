# People Directory Web App

This is a small React app I built to experiment with both server-side rendering (SSR) and client-side rendering (CSR). It uses Fastify for the backend and MSW (Mock Service Worker) to fake API responses during development. I also added a basic caching layer to avoid making the same network request multiple times.

## Getting Started

To run the app locally:

```bash
npm install
npm start
```

This will clean the `dist/` folder, build both the server and client using esbuild, and start the Fastify server.

Once it's running, open your browser and go to:

```
http://localhost:3000
```

## App Routes

- `/appWithSSRData`: Loads a list of people on the server and sends it to the browser. No extra fetch needed after loading.
- `/appWithoutSSRData`: Loads the same data on the client side after the page renders.

Each person entry shows fields like name, email, balance, and created date. Both pages use the same caching logic so the data only needs to be fetched once.

## Tools & Dependencies

- React 18 – frontend library
- Fastify – backend server
- MSW – used to mock API responses during development
- esbuild – for fast builds
- rimraf – to clean folders across platforms

## NPM Scripts

- `npm start` – Builds everything and starts the server
- `npm run build` – Builds the client and server only
- `npm run clean` – Deletes the `dist/` folder

## Caching Overview

A simple in-memory cache is used to avoid repeated network calls.

- `useCachingFetch(url)` – Caches client-side fetches
- `preloadCachingFetch(url)` – Used on the server to load data before rendering
- `serializeCache()` – Turns the cache into a string so it can be passed to the client
- `initializeCache()` – Restores the cache on the client
- `wipeCache()` – Clears it manually

This ensures:
- On `/appWithSSRData`, the browser doesn’t need to refetch anything after the page loads.
- On `/appWithoutSSRData`, only one fetch happens even if multiple components request the same data.
