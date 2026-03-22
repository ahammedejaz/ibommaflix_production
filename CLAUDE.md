# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

iBommaFlix is a movie streaming/discovery platform built with Create React App (React 19). It showcases Telugu (Tollywood), Hindi (Bollywood), and English (Hollywood) movies using the OMDb API for movie data (posters, ratings, plots). There is no authentication or backend-dependent features currently active in production.

## Commands

```bash
npm install --legacy-peer-deps   # Install dependencies (--legacy-peer-deps required due to peer dep conflicts)
npm start                        # Dev server on http://localhost:3000 with hot reload
npm run build                    # Production build to /build directory
npm test                         # Run Jest tests (CRA default runner)
```

## Architecture

**Stack:** React 19 + React Router v7 + Bootstrap 5 + Material-UI + Tailwind CSS 4 + Axios

**Routing:** Single-route SPA — `App.js` uses BrowserRouter with only `/` → `Home` component. Footer renders outside Routes.

**Data flow:**
1. `src/data/movieList.js` exports three static arrays (~150 titles each): `tollywoodMovies`, `bollywoodMovies`, `hollywoodMovies`
2. `Home.js` randomly selects titles from these arrays and fetches details from OMDb API (`https://www.omdbapi.com/`)
3. Results are cached in `localStorage` (keys: `movies_{title}`, `movie_{searchTerm}`) to avoid repeated API calls
4. `MovieCarousel.js` independently fetches 18 random posters from the same OMDb API
5. Search triggers `fetchMovie()` in Home.js, displaying results in a Material-UI Modal

**Verdict logic (in Home.js):** IMDb rating mapped to text — <5: "Not worth watching", 5-6.5: "Average", 6.5-8: "Good to watch", >8: "Worth watching"

**State management:** Local component state via React hooks only (useState, useEffect, useCallback). No Redux or Context API.

## Environment Variables

Defined in `.env`, prefixed with `REACT_APP_` (embedded in build, not secret):
- `REACT_APP_OMDB_API_KEY` — OMDb API key
- `REACT_APP_BACKEND_URL` — Backend server URL (sentiment analysis endpoint, currently inactive)

## Styling

Three CSS frameworks coexist:
- **Bootstrap 5** — grid layout, navbar (imported globally in `index.js`)
- **Tailwind CSS 4** — utility classes (directives in `src/index.css`)
- **Material-UI** — Modal, Button, Typography, Box components

Design theme: gold (`#FFD700`) on black backgrounds, Poppins font.

## Deployment

- **Docker:** Multi-stage build (Node 18 build → Apache httpd:alpine serve on port 80)
- **Kubernetes:** `frontend-deployment.yaml` deploys to GCR (`gcr.io/ibommaflix/ibommaflix-frontend:latest`), LoadBalancer service on port 80

## Unused Code

- `MovieDetails.js` — exists in pages/ but has no route
- `MovieCard.js` — references a localhost sentiment API (`http://127.0.0.1:4121/api/sentiment/analyze`) not used by Home.js
- `ContactUs.js` — imported but not rendered
