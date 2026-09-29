# Hospital Digital Entry & Patient Management System

## Project overview
This project is a healthcare information management MVP built with React, Vite, TypeScript, Tailwind CSS, and an architecture ready for Supabase integration. It focuses on role-based access, patient longitudinal tracking, appointment management, consultation records, prescriptions, and lab report metadata.

## Technology stack
- React 19
- Vite 6
- React Router 6
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- RLS-ready schema

## Prerequisites
- Node.js 20+ recommended
- npm
- Supabase project

## Installation
```bash
npm install
npm run dev
```

## Environment variables
Create a `.env.local` file:
```bash
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-public-or-anon-key"
```

## Supabase setup
1. Create a new Supabase project.
2. Run the migration in `supabase/migrations/20260926_initial_hospital_schema.sql`.
3. Run `supabase/seed/demo_seed.sql` in the SQL editor for demo data.
4. Configure storage buckets such as `patient-documents` and keep them private.
5. Review RLS policies before production use.

## Database migration instructions
```bash
# using the Supabase CLI when available
supabase db push
```

## RLS explanation
This schema enables RLS on patient-related tables and uses role-based checks to restrict access. Potentially sensitive tables should be guarded by policies that verify `auth.uid()` and the user’s role before data is returned or mutated.

## Storage setup
- Create a private bucket named `patient-documents`.
- Store only file paths in PostgreSQL.
- Generate signed URLs in server-side flows when an authorized user requests a document.

## Seed data instructions
The dashboards currently display static sample data from `lib/demo-data.ts`. To preview them without Supabase, sign in using one of the demo accounts below and the password `demo123`. Demo sign-in does not connect to or save anything in Supabase; changes are not persisted. The SQL seed file is separate and is only for a configured Supabase database.

## Development commands
```bash
npm run dev
npm run build
```

## Production deployment
Deploy the generated `dist/` directory to a static host configured to serve `index.html` for unknown paths, then configure the public Supabase environment variables. Do not expose service-role credentials to the browser.

## Security considerations
- Never put the Supabase service role key in frontend code.
- Use signed URLs for documents.
- Demo login uses tab-scoped browser storage and is not production authentication or authorization.
- Do not trust browser-provided role values; production access control must be enforced by a trusted backend and Supabase RLS.
- Use RLS to enforce patient access boundaries.
- Audit critical actions in `audit_logs`.

## Demo users
- Admin: admin@hospital.demo / demo123
- Receptionist: receptionist@hospital.demo / demo123
- Doctor: doctor@hospital.demo / demo123
- Patient: patient@hospital.demo / demo123

These accounts are for local UI preview only and are not Supabase Auth users. Demo authentication is client-side only and must not be used to protect real patient data.

## Project structure
```text
app/
  admin/
  receptionist/
  doctor/
  patient/
  login/
  main.tsx
  router.tsx
components/
lib/
index.html
vite.config.ts
supabase/
  migrations/
  seed/
```

## Notes
This is a structured MVP and demo app for healthcare record management. It is designed to demonstrate the architecture and workflow boundaries for a real hospital system, but it should be treated as a foundation requiring a production-grade Supabase configuration and security review before live deployment.
## drDemo
