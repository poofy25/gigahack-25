# Overview

This is a cybersecurity scanning application built with Next.js and TypeScript. The application provides domain scanning capabilities to detect and prevent cybersecurity attacks. It features a modern dark-themed UI built with React components and Tailwind CSS, with a PostgreSQL database for data persistence using Drizzle ORM.

The application includes user authentication functionality and a scanning interface where users can input domains for security analysis. The frontend uses shadcn/ui components for a consistent, professional design system.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 14 with App Router for server-side rendering and routing
- **Language**: TypeScript for type safety and better developer experience
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with custom server setup using Next.js API routes
- **Database ORM**: Drizzle ORM for type-safe database operations and migrations
- **Authentication**: bcryptjs for password hashing and user authentication
- **Session Management**: PostgreSQL-based sessions using connect-pg-simple

## Database Design
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Tables**: User management with username/password authentication system
- **Connection**: Neon serverless driver for efficient database connections

## Development Tools
- **Build System**: Vite for fast development builds and hot module replacement
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Server**: Custom Express-like server with Vite integration for development
- **Asset Management**: Static asset handling with attached_assets directory

## Deployment Strategy
- **Production Build**: ESBuild for server-side bundling and Vite for client-side optimization
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection
- **External Packages**: Neon serverless package externalized for proper server-side execution

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect support

## UI and Design System
- **Radix UI**: Accessible component primitives for complex UI components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library for consistent iconography
- **Inter Font**: Google Fonts integration for typography

## Development and Build Tools
- **Vite**: Fast build tool with React plugin for development experience
- **ESBuild**: JavaScript bundler for production server builds
- **TypeScript**: Static type checking and enhanced developer experience
- **Replit Integration**: Vite plugins for Replit development environment support

## Authentication and Security
- **bcryptjs**: Password hashing library for secure user authentication
- **connect-pg-simple**: PostgreSQL session store for server-side session management

## State Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Performance-focused form library with minimal re-renders
- **Zod**: Schema validation library for runtime type checking