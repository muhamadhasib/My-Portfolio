# Muhammad Hasib Portfolio Website

## Overview

This project is a modern, animated portfolio website for Muhammad Hasib, an AI & ML Engineer and Computer Science student. It features a neural-themed design with brain-like animations, implemented as a single-page application. The website includes a full-stack architecture with contact forms, newsletter subscription functionality, and is fully responsive.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for 3D animations and transitions
- **State Management**: React Query (TanStack Query)
- **Routing**: Wouter
- **Form Handling**: React Hook Form with Zod validation
- **UI/UX Decisions**: Neural-themed design with brain-like animations, glass morphism effects, dark/light mode support, Inter font family, Lucide React icons with 3D animated effects.

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Storage**: In-memory storage (MemoryStorage class in server/storage.ts)
- **API Design**: RESTful API with JSON responses
- **Session Management**: express-session with memorystore
- **Auth**: Custom session-based auth using bcryptjs for password hashing

### Key Features
- **3D Portfolio Features**: Animated particle system (neural background), interactive circular avatar with mouse-tracking parallax, typewriter effect for roles, glass-card effects.
- **Revolutionary Modal System**: Immersive contact and newsletter modals with glass morphism and animated neural patterns. Includes client-side Zod validation, toast notifications, keyboard navigation, and ARIA compliance.
- **Analytics Integration**: Client-side analytics for event tracking (console-based, no external service).
- **SEO**: Dynamic sitemap, robots.txt, Open Graph/Twitter meta tags, Schema.org JSON-LD.

### API Endpoints
- `POST /api/contact` — submit contact form (name, email, message)
- `POST /api/newsletter` — subscribe to newsletter (email)
- `POST /api/auth/register` — register a user
- `POST /api/auth/login` — login
- `POST /api/auth/logout` — logout
- `GET /api/auth/me` — check session status
- `GET /sitemap.xml`, `GET /robots.txt`, `GET /structured-data.json` — SEO endpoints

### Environment Variables
- `SESSION_SECRET` — secret for express-session (set as Replit secret)

## Project Structure

```
/
├── client/           # React SPA
│   └── src/
│       ├── components/   # UI components
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utilities
│       └── pages/        # Page components
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API routes
│   ├── storage.ts    # In-memory storage
│   └── vite.ts       # Vite dev middleware
├── shared/           # Shared types/schemas
└── vite.config.ts    # Vite configuration
```

## External Dependencies

### Core Frontend
- React, React DOM, React Hook Form
- Vite, Tailwind CSS, Framer Motion
- TanStack React Query, Wouter

### UI Component Libraries
- Radix UI, Lucide React, Class Variance Authority

### Backend
- Express.js, express-session, memorystore, bcryptjs
- @sendgrid/mail (installed but not actively integrated — contact/newsletter currently log to console only)

### Development Tools
- TypeScript, ESBuild, cross-env
