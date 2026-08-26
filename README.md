# CeylonCart

A data-driven e-commerce Single Page Application built with Vue 3, TypeScript, and Tailwind CSS, consuming live product data from the [DummyJSON](https://dummyjson.com) API.

# Tech Stack

Vue 3
TypeScript
Vite — build tool and dev server
Tailwind CSS — utility-first styling
Pinia — global state management (auth, cart, wishlist)
Vue Router — client-side routing

# Features

Product listing with search and category filtering
Product detail view via dynamic routing (`/product/:id`)
Simulated authentication (DummyJSON `/auth/login`) with protected routes
Shopping cart and wishlist with `localStorage` persistence across reloads
Dark mode toggle (Tailwind `dark:` variant)
Fully responsive layout (mobile, tablet, desktop)

# Prerequisites

Node.js v18 or later (v22 recommended)
npm (bundled with Node.js)

# Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd ceyloncart
npm install
```

## Running the Project

### Development server

Starts the app locally with hot-reload:

```bash
npm run dev
```

## Project Structure

src/
├── assets/           # Static assets
├── components/       # Reusable UI components (NavBar, ProductCard, SearchBar, ...)
├── composables/       # Reusable composition functions (e.g. useProducts)
├── router/           # Vue Router route definitions and navigation guards
├── services/         # API layer (fetch calls to DummyJSON)
├── stores/           # Pinia stores (auth, cart, wishlist)
├── types/            # TypeScript interfaces for API data
├── views/            # Route-level page components
├── App.vue           # Root component
└── main.ts           # App entry point


## Notes

All product and category data is fetched live from `https://dummyjson.com` — Therefore an internet connection is required.
Authentication is simulated using DummyJSON's test users; see the [DummyJSON docs](https://dummyjson.com/docs/auth) for sample credentials.

`node_modules/` and `dist/` are excluded from version control — run `npm install` after cloning before doing anything else.
