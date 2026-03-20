# Optical Planet - Project Folder Structure

This documentation provides an overview of the folder structure for the Optical Planet e-commerce platform. It is intended to help developers easily navigate and understand the codebase.

```text
d:\Optical_planet
├── .next/                  # Next.js build output directory (auto-generated)
├── node_modules/           # Project dependencies
├── prisma/                 # Prisma ORM setup
│   └── schema.prisma       # Database schema definition
├── public/                 # Static assets (images, fonts, favicon, etc.)
│
├── src/                    # Source code directory
│   ├── app/                # Next.js App Router (Pages, Layouts, API Routes)
│   │   ├── admin/          # Admin dashboard pages and layouts
│   │   ├── api/            # Backend API routes
│   │   │   ├── admin/      # Admin-related API endpoints
│   │   │   ├── ai/         # AI recommendation API endpoints
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── checkout/   # Checkout & order processing endpoints
│   │   │   ├── email/      # Email automation (Resend, etc.) endpoints
│   │   │   └── stripe/     # Stripe payment webhook and endpoints
│   │   ├── cart/           # Shopping cart page
│   │   ├── checkout/       # Checkout flow pages
│   │   ├── find-your-frame/# Feature: Frame recommendation pages
│   │   ├── login/          # User authentication: Login page
│   │   ├── products/       # Product listing and detail pages
│   │   ├── signup/         # User authentication: Signup page
│   │   ├── virtual-try-on/ # Feature: Virtual Try-On pages
│   │   ├── globals.css     # Global Tailwind CSS styles
│   │   ├── layout.tsx      # Root application layout
│   │   └── page.tsx        # Homepage (Hero, Featured Products, Services)
│   │
│   ├── components/         # Reusable React components
│   │   ├── admin/          # Admin-specific UI components
│   │   ├── home/           # Homepage specific components (Hero, Features, etc.)
│   │   ├── layout/         # Layout components (Navbar, Footer, Sidebar, etc.)
│   │   ├── products/       # Product components (ProductCard, Grid, etc.)
│   │   ├── ui/             # Core/Shared UI components (Buttons, Inputs, Modals, etc.)
│   │   ├── virtual-tryon/  # Virtual Try-On specific components
│   │   └── WhatsAppButton.tsx # Floating WhatsApp chat component
│   │
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Shared utilities, configs, and library integrations
│   │   ├── email/          # Email templates and utility functions
│   │   ├── seo/            # SEO meta configurations
│   │   ├── validation/     # Zod schemas for form validation
│   │   ├── auth.ts         # NextAuth configuration and helpers
│   │   ├── prisma.ts       # Prisma client instantiation
│   │   └── utils.ts        # General helper functions (e.g., Tailwind merge)
│   │
│   ├── store/              # Global state management (Zustand, Redux, Context, etc.)
│   ├── types/              # TypeScript type definitions and interfaces
│   └── middleware.ts       # Next.js middleware for route protection and edge functions
│
├── .env                    # Environment variables (Do not commit)
├── .gitignore              # Git ignored files configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and NPM scripts
├── postcss.config.mjs      # PostCSS configuration for Tailwind CSS
├── prisma.config.ts        # Prisma configuration
└── tsconfig.json           # TypeScript compiler options
```

## Key Architectural Highlights

*   **App Router (`src/app`)**: The project uses the Next.js App Router for routing. Any directory containing a `page.tsx` becomes a publicly accessible route (unless protected by `middleware.ts`).
*   **API Routes (`src/app/api`)**: All serverless backend endpoints are neatly organized by domain (auth, stripe, email, ai, checkout). They handle database operations using Prisma and external integrations.
*   **Atomic Components (`src/components`)**: Reusable UI elements are categorized by their context. Base building blocks go in `ui/`, specific page block components go in `home/` or `admin/`, and structural components go in `layout/`.
*   **Data & Services (`src/lib`)**: Contains critical services linking your app to external or core logic (like `auth.ts` for NextAuth, `prisma.ts` for database connections, and `email/` logic).
*   **Type Safety (`src/types`)**: Stores shared TypeScript definitions ensuring proper data validation across components and APIs.
