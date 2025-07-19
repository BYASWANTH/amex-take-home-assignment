# People Directory Web Application

This is a lightweight React-based web app that demonstrates both server-side and client-side rendering of data using a custom framework. The backend uses Fastify, while MSW (Mock Service Worker) mocks API responses for development without a real backend. It includes a caching layer to prevent redundant network calls and ensure smoother data access in both SSR and CSR scenarios.

---

## Getting Started

To install dependencies and run the app locally:

```bash
npm install
npm start
```

This will:
- Clean the `dist` folder
- Build the server and client using esbuild
- Start the Fastify server

Once running, the app is accessible at:
- http://localhost:3000
- http://[::1]:3000

---

## App Routes

- `/appWithSSRData`  
  Renders a list of people using server-side rendering. Data is fetched on the server and passed to the client without needing a browser-side fetch.

- `/appWithoutSSRData`  
  Renders the same list using client-side rendering. The browser fetches the data after the initial render.

These pages demonstrate the same dataset rendered with different strategies, and both utilize a shared caching fetch mechanism.

---

## Project Structure

```
├── framework/
│   ├── server/             # Fastify server and route handling
│   ├── client/             # React entry point
│   └── mock-server/        # MSW configuration
├── caching-fetch-library/  # Custom caching fetch hook and SSR preload logic
├── dist/                   # Compiled output (ignored in Git)
├── .idea/                  # IDE settings (ignored in Git)
└── README.md
```

---

## Tooling and Dependencies

- **React 18** for UI rendering
- **Fastify** as the backend framework
- **MSW** to mock API responses
- **esbuild** for ultra-fast builds
- **rimraf** as a cross-platform alternative to `rm -rf`
- `.gitignore` includes `node_modules`, `dist`, `.idea`

---

## Available Scripts

```
npm start       # Builds and launches the app
npm run build   # Builds both server and client bundles
npm run clean   # Deletes the dist/ directory
```

---

## Caching Fetch Overview

The app implements a simple shared in-memory cache to avoid redundant network requests. It includes:

- `useCachingFetch(url)` — Fetches and caches data on the client
- `preloadCachingFetch(url)` — Fetches and caches data on the server before rendering
- `serializeCache()` — Converts the cache into a string for injecting into the client HTML
- `initializeCache()` — Rehydrates the client cache using the serialized data from the server
- `wipeCache()` — Clears the in-memory cache

This ensures that:
- On `/appWithSSRData`, no network request happens on the client after hydration
- On `/appWithoutSSRData`, only one network request is made, no matter how many components consume the data

---

## Limitations

- The in-memory cache is scoped to a single session and doesn't persist across page reloads. For production, a persistent layer (like localStorage or Redis) would be appropriate.
- The SSR/CSR flow is designed for a single-user context. Multi-user session support could be added with proper session management.

