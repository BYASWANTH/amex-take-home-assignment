# People Directory Web Application

A lightweight React application demonstrating server-side and client-side data loading using a custom framework. The app includes a mock API layer using MSW, a Fastify backend, and esbuild for bundling.

---

## Installation

```bash
npm install
npm start
```

This will:
- Clean the `dist` folder
- Build the server and client using esbuild
- Start the Fastify backend

Visit the app at:  
👉 `http://localhost:3000` or `http://[::1]:3000`

---

## Features

- `/appWithSSRData` – Server-Side Rendered (SSR) people directory  
- `/appWithoutSSRData` – Client-Side Rendered (CSR) people directory  
- Mocked API responses using MSW (Mock Service Worker)  
- Uses caching-fetch logic (to be implemented in Task 2)

---

## Project Structure

```
├── framework/
│   ├── server/         # Fastify backend entry
│   └── mock-server/    # MSW worker file
├── caching-fetch-library/  # Custom fetch logic to implement
├── dist/               # Build output (gitignored)
├── .idea/              # IDE settings (gitignored)
└── README.md
```

---

## Tooling Notes

- **esbuild** is used for fast, zero-config bundling  
- **rimraf** replaces `rm -rf` for cross-platform compatibility  
- `.gitignore` includes:
  - `node_modules/`
  - `dist/`
  - `.idea/`

---

## Known Issues & Next Steps

- `useCachingFetch` and `preloadCachingFetch` are not yet implemented
- Linting and formatting tools like ESLint and Prettier are not yet configured
- Testing framework not included (recommend Vitest or Jest)
- No CI/CD integration configured

---

## Scripts

| Script            | Description                                      |
|-------------------|--------------------------------------------------|
| `npm start`       | Builds and launches the app                      |
| `npm run build`   | Builds server and client bundles via esbuild     |
| `npm run clean`   | Deletes the `dist/` directory                    |
