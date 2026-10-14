# MSU-IIT CampusLink

MSU-IIT CampusLink is a campus portal for the Mindanao State University - Iligan Institute of Technology community. It brings campus information, student services, publications, and issue reporting into one mobile-friendly website for students, faculty, student council members, and administrators.

The repository is named **msu-iit-connect**, while the application uses **MSU-IIT CampusLink** as its display name. It was created with [Lovable](https://lovable.dev/projects/93ac4a50-abde-4a29-9080-f11c7e0d2967).

## Academic project and recognition

This website was developed as an academic project for **CCC181 - Application Development and Emerging Technologies**. It received **2nd Runner-Up for Most Innovative**.

## Features

- **Campus feed:** Browse posts and announcements, with support for likes and comments.
- **Student publications:** Visit pages for Silahis, Sidlak, Cassayuran, Motherboard, Sindaw, Ad Infinitum, Caduceus, and Thuum, including Facebook content embeds.
- **E-services:** Submit student ID, certificate of registration, and transcript requests, as well as enrollment and grade-related concerns. Review submitted requests through your account.
- **Issue reporting:** Report campus concerns with an optional uploaded or camera-captured photo. Administrators can review reports and update their status.
- **Campus resources:** Access a campus map with zoom and download controls, emergency contact information, service links, and institutional core values.
- **Accounts:** Sign up, sign in, manage profile information and avatars, and access account settings.
- **Role-based dashboards:** Separate spaces for administrators, faculty, and student council members. Administrative pages cover posts, users, service requests, issues, analytics, and settings.

Most application pages require sign-in. Administrator access is checked through user roles; faculty and student council access is checked through profile information.

### Current implementation

The website combines database-backed workflows with static content. Posts, profiles, roles, service requests, issues, likes, and comments use the backend. The separate Campus News page currently contains hardcoded example announcements, the campus map is an image rather than live navigation, and some account preferences are stored in the browser's local storage.

E-service forms record requests for administrative processing; they do not directly issue documents or retrieve official grades. Email delivery requires deployed edge functions and configured email credentials.

## Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | TypeScript, React 18, Vite |
| Styling and components | Tailwind CSS, shadcn/ui, Radix UI, Lucide icons |
| Routing and data fetching | React Router, TanStack Query, Supabase JavaScript client |
| Forms and validation | React Hook Form, Zod |
| Backend | TypeScript edge functions running on Deno |
| Database | SQL / PostgreSQL, migrations, and row-level security policies |
| Backend services | Lovable Cloud using Supabase integrations for authentication, database access, and file storage |
| Email | Resend, called from edge functions |

## Run locally

### Prerequisites

- Node.js and npm compatible with Vite 5.
- Access to the project's Lovable Cloud backend, or a compatible Supabase project configured with the repository's schema and services.

### Setup

```sh
git clone https://github.com/djaverhassan/msu-iit-connect.git
cd msu-iit-connect
npm ci
```

Create a `.env.local` file in the project root with your backend values:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

These variables are read by `src/integrations/supabase/client.ts`. The repository also includes a `.env` file; `.env.local` lets you override its values for local development. Use the backend's public client key here, never a service-role key or an email API secret.

```sh
npm run dev
```

Open **http://localhost:8080**, then sign in or create an account against the configured backend. Starting Vite runs the frontend only; it does not create the database or deploy edge functions.

### Backend configuration

When setting up a separate backend:

1. Apply the SQL migrations in `supabase/migrations/` in timestamp order. They define application tables, access policies, triggers, and the `avatars` and `issue-attachments` storage buckets.
2. Configure authentication and allowed redirect URLs for your local and deployed frontend origins.
3. Deploy the `send-id-request-email` and `send-issue-report` functions from `supabase/functions/` to the backend's edge function runtime.
4. Set `RESEND_API_KEY` as a backend secret. Review the sender addresses in both functions and configure an appropriate sender in Resend before relying on email delivery.
5. Configure the user roles and profile types needed for the administrator, faculty, and student council dashboards.

Keep backend secrets in the backend environment. Variables prefixed with `VITE_` are exposed to the browser.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 8080 |
| `npm run build` | Build the production frontend into `dist/` |
| `npm run build:dev` | Build the frontend in development mode |
| `npm run preview` | Preview the built frontend locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  assets/                 Campus images and publication logos
  components/             Shared components and shadcn/ui components
  contexts/               Authentication state and role checks
  hooks/                  Shared hooks, including campus post data
  integrations/supabase/  Backend client, generated types, and auth storage
  pages/                  Campus pages and service request forms
    account/              Profile settings and request history
    admin/                Administrative tools
    council/              Student council dashboard
    faculty/              Faculty dashboard
    publications/         Individual publication pages
supabase/
  functions/              Deno edge functions for email workflows
  migrations/             PostgreSQL schema and access policies
public/                   Static public assets
```

## Deployment

Edit and publish the project through its [Lovable workspace](https://lovable.dev/projects/93ac4a50-abde-4a29-9080-f11c7e0d2967). For another frontend host, run `npm run build`, publish `dist/`, configure frontend environment variables before building, and route application URLs back to `index.html` for React Router. Configure the backend and email functions separately.

## Contributing

Create a branch from `main`, make a focused change, and open a pull request describing the update and how it was checked. For application code changes, run `npm run lint` and `npm run build` before submitting.
