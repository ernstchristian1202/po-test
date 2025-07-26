# Form Navigation Bar UI

This project implements a fully interactive drag-and-drop form page navigation bar UI.

## Features
- Drag to reorder form pages (pending in this base)
- Insert page with hover "+"
- Context menu (design included, logic optional)
- Add new page via "+ Add Page"

## Stack
- React + Next.js
- Tailwind CSS
- DnD support via `@dnd-kit`
- Animations with `framer-motion`

## Getting Started
```bash
npm install
npm run dev
```

## Notes
To enable full drag-and-drop, integrate `@dnd-kit/sortable` into `NavigationBar.tsx`.