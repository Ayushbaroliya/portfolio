-- Demo seed data for development and UX validation.
-- Replace with real Supabase Auth user creation in production.

insert into public.departments (id, name, description, status)
values
  ('11111111-1111-4111-8111-111111111111', 'General Medicine', 'Primary care and outpatient consultations', 'active'),
  ('22222222-2222-4222-8222-222222222222', 'Cardiology', 'Heart conditions and cardiovascular care', 'active'),
  ('33333333-3333-4333-8333-333333333333', 'Neurology', 'Neurological evaluations and follow-up', 'active')
on conflict (id) do nothing;

insert into public.profiles (id, user_id, role, full_name, email, phone)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-4000-8000-000000000001', 'admin', 'Alicia Morgan', 'admin@hospital.demo', '+91 90000 11111'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-4000-8000-000000000002', 'receptionist', 'Ritika Nair', 'receptionist@hospital.demo', '+91 90000 22222'),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', '00000000-0000-4000-8000-000000000003', 'doctor', 'Dr. Sharma', 'doctor@hospital.demo', '+91 90000 33333'),
  ('dddddddd-dddd-4ddd-8ddd-dddddddddddd', '00000000-0000-4000-8000-000000000004', 'patient', 'Rahul Sharma', 'patient@hospital.demo', '+91 90000 44444')
on conflict (id) do nothing;

insert into public.doctors (id, profile_id, department_id, specialization, qualification, experience, consultation_availability, status)
values
  ('44444444-4444-4444-8444-444444444444', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', '22222222-2222-4222-8222-222222222222', 'Cardiology', 'MD Cardiology', 12, 'Mon-Fri 09:00-17:00', 'active')
on conflict (id) do nothing;

insert into public.receptionists (id, profile_id, status)
values
  ('55555555-5555-4555-8555-555555555555', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'active')
on conflict (id) do nothing;

insert into public.patients (
  id, patient_number, profile_id, first_name, last_name, date_of_birth, gender, blood_group,
  phone, email, address, city, state, pincode, emergency_contact_name, emergency_contact_phone,
  known_allergies, chronic_conditions, current_medications, previous_surgeries, family_history, medical_notes
)
values (
  '66666666-6666-4666-8666-666666666666', 'PAT-2026-00001', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
  'Rahul', 'Sharma', '1990-06-18', 'Male', 'O+', '+91 98765 43210', 'rahul@demo.patient',
  '17 Rosewood Avenue', 'Bengaluru', 'Karnataka', '560001', 'Anita Sharma', '+91 99887 65432',
  'Penicillin', 'Hypertension', 'Amlodipine 5mg', 'Appendectomy', 'Father: diabetes', 'Prefers morning consults'
)
on conflict (id) do nothing;

insert into public.appointments (id, appointment_number, patient_id, doctor_id, department_id, appointment_date, appointment_time, reason, status, created_by)
values (
  '77777777-7777-4777-8777-777777777777', 'APT-2401', '66666666-6666-4666-8666-666666666666',
  '44444444-4444-4444-8444-444444444444', '22222222-2222-4222-8222-222222222222',
  '2026-10-12', '10:30 AM', 'Routine cardiac review', 'Scheduled', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
)
on conflict (id) do nothing;

insert into public.visits (id, appointment_id, patient_id, doctor_id, visit_date, chief_complaint, symptoms, examination, assessment, diagnosis, treatment_plan, doctor_notes, follow_up_date)
values (
  '88888888-8888-4888-8888-888888888888', '77777777-7777-4777-8777-777777777777', '66666666-6666-4666-8666-666666666666',
  '44444444-4444-4444-8444-444444444444', '2026-09-10', 'Chest discomfort', 'Shortness of breath',
  'No acute distress; auscultation normal', 'Stable cardiopulmonary function', 'Observation only',
  'Continue medication and review labs', 'Patient reports mild discomfort; advised rest', '2026-09-24'
)
on conflict (id) do nothing;

insert into public.prescriptions (id, visit_id, patient_id, doctor_id, prescription_date, general_instructions)
values (
  '99999999-9999-4999-8999-999999999999', '88888888-8888-4888-8888-888888888888', '66666666-6666-4666-8666-666666666666',
  '44444444-4444-4444-8444-444444444444', '2026-09-10', 'Take after food and maintain hydration.'
)
on conflict (id) do nothing;

insert into public.prescription_items (id, prescription_id, medicine_name, dosage, frequency, route, duration, instructions)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-000000000001', '99999999-9999-4999-8999-999999999999', 'Paracetamol', '500 mg', 'Twice Daily', 'Oral', '5 days', 'After food'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-000000000002', '99999999-9999-4999-8999-999999999999', 'Amlodipine', '5 mg', 'Once Daily', 'Oral', '30 days', 'Continue as prescribed')
on conflict (id) do nothing;

insert into public.notifications (id, user_id, patient_id, title, message)
values (
  'cccccccc-cccc-4ccc-8ccc-000000000003', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', '66666666-6666-4666-8666-666666666666',
  'Appointment confirmed', 'Your cardiology visit has been confirmed for 12 October 2026 at 10:30 AM.'
)
on conflict (id) do nothing;
