# Portfolio — Edu Juanda Pratama

A personal portfolio (React + Vite, TypeScript, Tailwind v4, Framer Motion, Lenis smooth scroll) for full-stack developer Edu Juanda Pratama.

## Structure
- pnpm monorepo. Main artifact lives in `artifacts/portfolio/`.
- Sections: Hero, About, Work, Expertise, Experience, Contact, Footer.
- Custom cursor + Lenis smooth scroll wrap the app in `src/App.tsx`.

## Run
- Workflow `Start application` runs `PORT=5000 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev` and serves on port 5000.

## Recent UI/UX improvements
- More vibrant primary orange in light & dark themes for stronger accent contrast.
- Replaced global `cursor: none` with a `(hover: hover) and (pointer: fine)` media query so touch users and form inputs keep proper cursors.
- Added a subtle vignette grid backdrop on Hero for visual depth.
- Initial loader shortened (900 ms) and auto-skipped when `prefers-reduced-motion` is set.
- Fixed conditional hooks bug in `Hero` `KineticText` (parallax hooks now always run in stable order).
- Replaced deprecated `motionValue.onChange()` with `motionValue.on("change", …)` in `App.tsx` and `Work.tsx`.
