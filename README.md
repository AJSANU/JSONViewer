# Twist JSON Suite (React + TypeScript)

A beautiful, modular platform of JSON tools. Starts with **Twist JSON Viewer** — a supercharged JSON viewer featuring:

- Collapsible tree with hover actions (copy key/value, export subtree, edit, delete)
- Global search with highlight
- JSONPath executor (results highlighted in tree + graph)
- Insights panel (depth, total keys, arrays, largest array, most frequent key)
- Graph visualization of JSON structure (React Flow)
- Dark mode, Tailwind UI, Framer Motion, lucide icons
- Routing: Home (cards) → Viewer page

## Quickstart

```bash
pnpm create vite twist-json-suite --template react-ts
cd twist-json-suite

# replace the scaffold with these files (or just unzip into this folder)

pnpm install
pnpm dev
```

Or simply unzip and run:
```bash
pnpm install
pnpm dev
```

## Tech
- Vite, React 18, TypeScript
- Tailwind CSS
- React Router
- React Flow
- JSONPath Plus
- Framer Motion
- lucide-react
- Minimal shadcn-like UI wrappers in `src/components/ui/*`

## Structure

```text
src/
 ├─ pages/
 │   ├─ Home.tsx            # Landing page with cards
 │   └─ JsonViewer.tsx      # Viewer page
 ├─ components/
 │   ├─ ui/                 # Minimal UI primitives (button/card/input/...)
 │   ├─ json-tree/          # Tree and row
 │   ├─ graph/              # ReactFlow graph
 │   └─ panels/             # Input, Insights, JSONPath panels
 ├─ hooks/                  # (reserved for future custom hooks)
 ├─ utils/                  # json helpers
 ├─ types/                  # shared types
 ├─ App.tsx                 # Layout & navbar
 └─ main.tsx                # Router
```

## Notes
- UI primitives mimic shadcn API style so you can swap to real shadcn/ui later.
- Graph layout uses random positions for simplicity; switch to dagre for stable layout if needed.
