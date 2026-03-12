# Copilot instructions for backend-evaluacion1

This file contains repository-specific guidance for AI coding agents to be productive quickly.

- **Project purpose:** lightweight Express (ESM) demo API serving console data from `server.js`.
- **Entry point:** `server.js` (ES module). Run with `npm start` which maps to `node --watch server.js`.
- **Runtime:** Node 18+ recommended (uses `--watch` and ESM `import` syntax).

- **Where routes live:** there is a `routes/` folder but current, working endpoints are defined directly in `server.js` (see `/api/consolas` and `/api/consolas/:id`). When adding routes, follow the existing pattern: export an Express router and mount it from `server.js` (or update `server.js` to `app.use('/api/consolas', router)`).

- **Data location:** sample data array `consolasTest` is declared at the bottom of `server.js`. When extracting data into a module, keep the shape identical (objects with `nombre`, `fabricante`, `año`, `generacion`, `descripcion`, `precioEstimado`).

- **Patterns and conventions:**
  - Use ESM `import`/`export` (package.json has `type": "module"`).
  - Keep ports and simple config in `server.js` constants (currently `PORT = 3000`).
  - Prefer `res.json(...)` for all API responses and use `res.status(404).json({ mensaje: '...' })` for not-found semantics.

- **Dependencies:** `express` (v5.x declared). No other dependencies currently used.

- **Common edits you'll make:**
  - Move route handlers from `server.js` into `routes/*.route.js` files and export an Express router.
  - Replace the in-file `consolasTest` with an import from a `data/` module when adding persistence or tests.
  - If adding middleware, call `app.use(express.json())` in `server.js` before route registration.

- **Build / test / debug commands:**
  - Start dev server: `npm start`
  - No tests currently; avoid adding test runners without updating `package.json` scripts.

- **Project-specific gotchas:**
  - `routes/consolas.route.js` exists but is currently empty/unfinished — check `server.js` for the canonical implementation.
  - `package.json` uses ESM; importing CommonJS-style `module.exports` will fail unless wrapped.

- **Example change to follow (pattern):**
  - Create `routes/consolas.route.js`:
    - export `const router = express.Router()`
    - add handlers `router.get('/', ...)` and `router.get('/:id', ...)`
    - in `server.js` replace inline endpoints with `import consolasRouter from './routes/consolas.route.js'` then `app.use('/api/consolas', consolasRouter)`

- **When to open a PR:** small work can be committed directly; for design changes (introducing DB, tests, or config files) open a PR and describe migration from in-file data to modules.

If anything looks unclear or you want the file content adapted to stricter rules (linting, tests, CI), tell me what to emphasize and I'll iterate.
