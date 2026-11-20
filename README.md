# Connectify

> A modern social media web application for creating posts, joining communities, and engaging through comments and likes.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://connectify-teal.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Live application:** [https://connectify-teal.vercel.app](https://connectify-teal.vercel.app)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Application Routes](#application-routes)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Supabase Setup](#supabase-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Development Notes](#development-notes)
- [Deployment](#deployment)
- [Contributing](#contributing)


## Overview

Connectify is a full-stack social media experience built with React and Supabase. It provides an interface for sharing posts, organizing conversations into communities, and participating in discussions through comments and likes.

The frontend uses React 19, React Router 7, TanStack Query, and Tailwind CSS 4. Supabase supplies authentication and backend data services.

## Features

- Supabase authentication and session management
- Create and publish posts
- Browse posts and open individual post details
- Like posts
- Add comments and view comment threads
- Create communities
- Browse all communities
- View posts associated with a community
- Responsive, dark-themed interface
- Cached server state and request management with TanStack Query

## Tech Stack

| Category | Technology |
| --- | --- |
| Frontend | React 19, TypeScript |
| Build tool | Vite 7 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| State/data fetching | TanStack React Query 5 |
| Backend/auth/database | Supabase |
| Linting | ESLint 9 |
| Hosting | Vercel |

## Application Routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Displays the post feed |
| `/create` | Create Post | Creates a new post |
| `/post/:id` | Post Details | Displays a post, likes, and comments |
| `/communities` | Communities | Lists available communities |
| `/community/create` | Create Community | Creates a new community |
| `/community/:id` | Community | Displays a community and its content |

## Project Structure

```text
connectify/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images and frontend assets
│   ├── components/         # Reusable UI and feature components
│   │   ├── CommentItem.tsx
│   │   ├── CommentSection.tsx
│   │   ├── CommunityDisplay.tsx
│   │   ├── CommunityList.tsx
│   │   ├── CreateCommunity.tsx
│   │   ├── CreatePost.tsx
│   │   ├── LikeButton.tsx
│   │   ├── NavBar.tsx
│   │   ├── PostDetail.tsx
│   │   ├── PostItem.tsx
│   │   └── PostList.tsx
│   ├── context/            # Authentication context and provider
│   ├── pages/              # Route-level page components
│   ├── App.tsx             # Application routes
│   ├── main.tsx            # React, router, query, and auth providers
│   ├── index.css           # Global styles
│   └── supabase-client.ts  # Supabase client initialization
├── .gitignore
├── eslint.config.js
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

Ensure the following tools are installed:

- [Node.js](https://nodejs.org/) 20 or newer
- npm (included with Node.js)
- A [Supabase](https://supabase.com/) project

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Pauline-Oraro/connectify.git
cd connectify
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env.local
```

> If `.env.example` is not available, create `.env.local` manually using the variable format below.

4. Add the required Supabase environment variable.

5. Start the development server:

```bash
npm run dev
```

Vite will print the local URL, typically `http://localhost:5173`.

## Supabase Setup

The application connects to a Supabase project using the project URL in `src/supabase-client.ts`. Authentication and application data are accessed using the key from `VITE_SUPABASE_ANON_KEY`.

To connect the app to your own Supabase project:

1. Create a project in Supabase.
2. Open **Project Settings > API**.
3. Copy the project URL and publishable/anonymous key.
4. Create the required database tables and storage buckets for posts, communities, comments, likes, and media uploads.
5. Configure Supabase authentication providers and redirect URLs.
6. Enable and review Row Level Security (RLS) policies before making the application public.

Never expose a Supabase service-role key in the frontend. Only the anonymous/publishable key should be used by this Vite application.

## Environment Variables

Create `.env.local` in the project root:

```dotenv
VITE_SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key
```

Restart the Vite development server after changing environment variables.

To use a separate Supabase project, also update `const supabaseURL` in `src/supabase-client.ts`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

## Development Notes

- `main.tsx` wraps the application with `StrictMode`, React Query, authentication context, and `BrowserRouter`.
- Authentication state is centralized in `src/context/AuthProvider.tsx` and exposed through `src/context/AuthContext.tsx`.
- Route-level views are located in `src/pages/`.
- Reusable interface and data components are located in `src/components/`.
- Tailwind CSS is enabled through `@tailwindcss/vite` in `vite.config.ts`.

## Deployment

The live site is hosted on Vercel.

For a production deployment:

1. Import the repository into Vercel or another Vite-compatible host.
2. Set `VITE_SUPABASE_ANON_KEY` in the hosting provider's environment settings.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Configure the host to rewrite unknown paths to `index.html` for React Router routes.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make and test your changes.
4. Run linting and a production build:

```bash
npm run lint
npm run build
```

5. Commit your changes and open a pull request.

Please keep changes focused, follow the existing TypeScript and React conventions, and avoid committing secrets or local environment files.


