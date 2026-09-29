create extension if not exists pgcrypto;

create type user_role as enum ('admin', 'receptionist', 'doctor', 'patient');
create type appointment_status as enum (
  'Scheduled',
  'Checked In',
  'Waiting',
  'In Consultation',
  'Completed',
  'Cancelled',
  'No Show'
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  role user_role not null,
  full_name text not null,
  email text not null unique,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  patient_number text not null unique,
  profile_id uuid references public.profiles(id) on delete set null,
  first_name text not null,
  middle_name text,
  last_name text not null,
  date_of_birth date,
  gender text,
  blood_group text,
  phone text,
  alternate_phone text,
  email text,
  aadhaar_number text,
  address text,
  city text,
  state text,
  pincode text,
  emergency_contact_name text,
  emergency_contact_phone text,
  marital_status text,
  occupation text,
  preferred_language text,
  known_allergies text,
  chronic_conditions text,
  current_medications text,
  previous_surgeries text,
  family_history text,
  medical_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  department_id uuid references public.departments(id),
  specialization text,
  qualification text,
  experience integer default 0,
  consultation_availability text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.receptionists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  appointment_number text not null unique,
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id),
  department_id uuid not null references public.departments(id),
  appointment_date date not null,
  appointment_time text not null,
  reason text not null,
  status appointment_status not null default 'Scheduled',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id) on delete set null,
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id),
  visit_date date not null,
  chief_complaint text,
  symptoms text,
  duration text,
  examination text,
  assessment text,
  diagnosis text,
  treatment_plan text,
  doctor_notes text,
  follow_up_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vitals (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid not null references public.visits(id) on delete cascade,
  temperature text,
  blood_pressure text,
  heart_rate text,
  respiratory_rate text,
  oxygen_saturation text,
  weight text,
  height text,
  bmi text,
  created_at timestamptz not null default now()
);

create table if not exists public.prescriptions (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid not null references public.visits(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id),
  prescription_date date not null default current_date,
  general_instructions text,
  created_at timestamptz not null default now()
);

create table if not exists public.prescription_items (
  id uuid primary key default gen_random_uuid(),
  prescription_id uuid not null references public.prescriptions(id) on delete cascade,
  medicine_name text not null,
  dosage text,
  frequency text,
  route text,
  duration text,
  instructions text,
  created_at timestamptz not null default now()
);

create table if not exists public.lab_reports (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  visit_id uuid references public.visits(id) on delete set null,
  doctor_id uuid references public.doctors(id),
  test_name text not null,
  test_date date not null,
  file_path text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  visit_id uuid references public.visits(id) on delete set null,
  document_type text not null,
  file_path text not null,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete cascade,
  title text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_patients_patient_number on public.patients(patient_number);
create index if not exists idx_patients_phone on public.patients(phone);
create index if not exists idx_appointments_date_status on public.appointments(appointment_date, status);
create index if not exists idx_visits_patient_date on public.visits(patient_id, visit_date desc);
create index if not exists idx_lab_reports_patient on public.lab_reports(patient_id, test_date desc);
create index if not exists idx_documents_patient on public.documents(patient_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.patients enable row level security;
alter table public.doctors enable row level security;
alter table public.receptionists enable row level security;
alter table public.appointments enable row level security;
alter table public.visits enable row level security;
alter table public.prescriptions enable row level security;
alter table public.lab_reports enable row level security;
alter table public.documents enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles_are_visible_to_owner" on public.profiles
for select using (auth.uid() = user_id);

create policy "admins_manage_profiles" on public.profiles
for all using (
  exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'admin'
  )
) with check (
  exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'admin'
  )
);

create policy "patients_read_own_record" on public.patients
for select using (
  profile_id in (
    select id from public.profiles where user_id = auth.uid()
  )
);

create policy "staff_read_patients" on public.patients
for select using (
  exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role in ('admin', 'receptionist', 'doctor')
  )
);

create policy "receptionists_manage_patient_records" on public.patients
for update using (
  exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'receptionist'
  )
) with check (
  exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'receptionist'
  )
);

create policy "doctors_read_relevant_history" on public.visits
for select using (
  doctor_id in (
    select d.id from public.doctors d join public.profiles p on d.profile_id = p.id where p.user_id = auth.uid()
  )
  or patient_id in (
    select p.id from public.patients p join public.profiles pr on p.profile_id = pr.id where pr.user_id = auth.uid()
  )
);

create policy "patients_read_own_visits" on public.visits
for select using (
  patient_id in (
    select p.id from public.patients p join public.profiles pr on p.profile_id = pr.id where pr.user_id = auth.uid()
  )
);

create policy "doctors_manage_visit_records" on public.visits
for insert with check (
  exists (
    select 1 from public.doctors d join public.profiles p on d.profile_id = p.id where p.user_id = auth.uid()
  )
);

create policy "doctor_updates_their_own_visit" on public.visits
for update using (
  doctor_id in (
    select d.id from public.doctors d join public.profiles p on d.profile_id = p.id where p.user_id = auth.uid()
  )
);

create policy "patients_read_own_prescriptions" on public.prescriptions
for select using (
  patient_id in (
    select p.id from public.patients p join public.profiles pr on p.profile_id = pr.id where pr.user_id = auth.uid()
  )
);

create policy "doctors_manage_prescriptions" on public.prescriptions
for insert with check (
  exists (
    select 1 from public.doctors d join public.profiles p on d.profile_id = p.id where p.user_id = auth.uid()
  )
);

create policy "patients_read_own_lab_reports" on public.lab_reports
for select using (
  patient_id in (
    select p.id from public.patients p join public.profiles pr on p.profile_id = pr.id where pr.user_id = auth.uid()
  )
);

create policy "staff_read_reports" on public.lab_reports
for select using (
  exists (
    select 1 from public.profiles p where p.user_id = auth.uid() and p.role in ('admin', 'receptionist', 'doctor')
  )
);

create policy "patients_read_own_documents" on public.documents
for select using (
  patient_id in (
    select p.id from public.patients p join public.profiles pr on p.profile_id = pr.id where pr.user_id = auth.uid()
  )
);

create policy "staff_manage_notifications" on public.notifications
for all using (
  user_id in (
    select id from public.profiles where user_id = auth.uid()
  )
) with check (
  user_id in (
    select id from public.profiles where user_id = auth.uid()
  )
);

create policy "admin_reads_audit_logs" on public.audit_logs
for select using (
  exists (
    select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin'
  )
);

create policy "doctors_view_appointments" on public.appointments
for select using (
  doctor_id in (
    select d.id from public.doctors d join public.profiles p on d.profile_id = p.id where p.user_id = auth.uid()
  )
  or exists (
    select 1 from public.profiles p where p.user_id = auth.uid() and p.role in ('admin', 'receptionist')
  )
);

create policy "patients_read_own_appointments" on public.appointments
for select using (
  patient_id in (
    select p.id from public.patients p join public.profiles pr on p.profile_id = pr.id where pr.user_id = auth.uid()
  )
);
