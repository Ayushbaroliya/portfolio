export const demoUsers = [
    {
        role: "receptionist",
        name: "Ritika Nair",
        email: "receptionist@hospital.demo",
        password: "demo123",
        subtitle: "Registration Desk",
    },
    {
        role: "doctor",
        name: "Dr. Sharma",
        email: "doctor@hospital.demo",
        password: "demo123",
        subtitle: "Cardiology Consultant",
    },
    {
        role: "billing",
        name: "Suresh Kumar",
        email: "billing@hospital.demo",
        password: "demo123",
        subtitle: "Billing & Accounts",
    },
];
export const statsByRole = {
    receptionist: [
        { label: "Today's Patients", value: "34", helper: "12 checked in" },
        { label: "Appointments", value: "42", helper: "8 waiting" },
        { label: "Waiting Queue", value: "6", helper: "3 in consultation" },
        { label: "Completed", value: "19", helper: "2 no-show" },
    ],
    doctor: [
        { label: "Today's Patients", value: "12", helper: "3 waiting" },
        { label: "Consultations", value: "8", helper: "4 follow-ups" },
        { label: "Pending Notes", value: "5", helper: "Review required" },
        { label: "Lab Reviews", value: "3", helper: "2 urgent" },
    ],
    billing: [
        { label: "Pending Bills", value: "12", helper: "₹45,000 to collect" },
        { label: "Completed Today", value: "24", helper: "₹1,20,000 collected" },
        { label: "Insurance Claims", value: "5", helper: "Processing" },
        { label: "Total Revenue", value: "₹1.6L", helper: "Today" },
    ],
};
export const patientRows = [
    {
        id: "PAT-2026-00001",
        name: "Rahul Sharma",
        age: 35,
        gender: "Male",
        phone: "+91 98765 43210",
        lastVisit: "2026-09-08",
        doctor: "Dr. Sharma",
    },
    {
        id: "PAT-2026-00004",
        name: "Priya Verma",
        age: 29,
        gender: "Female",
        phone: "+91 98990 22334",
        lastVisit: "2026-09-12",
        doctor: "Dr. Mehta",
    },
    {
        id: "PAT-2026-00009",
        name: "Amit Singh",
        age: 42,
        gender: "Male",
        phone: "+91 99887 66554",
        lastVisit: "2026-09-10",
        doctor: "Dr. Rao",
    },
    {
        id: "PAT-2026-00012",
        name: "Neha Kapoor",
        age: 31,
        gender: "Female",
        phone: "+91 97654 23441",
        lastVisit: "2026-09-16",
        doctor: "Dr. Sharma",
    },
];
export const appointmentRows = [
    { id: "APT-2401", patient: "Rahul Sharma", doctor: "Dr. Sharma", date: "2026-10-12", time: "10:30 AM", status: "Scheduled" },
    { id: "APT-2402", patient: "Priya Verma", doctor: "Dr. Mehta", date: "2026-10-12", time: "11:00 AM", status: "Waiting" },
    { id: "APT-2403", patient: "Amit Singh", doctor: "Dr. Rao", date: "2026-10-12", time: "12:15 PM", status: "Checked In" },
    { id: "APT-2404", patient: "Neha Kapoor", doctor: "Dr. Sharma", date: "2026-10-13", time: "09:00 AM", status: "Completed" },
];
export const queueRows = [
    { token: "001", patient: "Rahul Sharma", doctor: "Dr. Sharma", time: "10:00 AM", status: "Waiting" },
    { token: "002", patient: "Priya Verma", doctor: "Dr. Mehta", time: "10:15 AM", status: "In Consultation" },
    { token: "003", patient: "Amit Singh", doctor: "Dr. Rao", time: "10:30 AM", status: "Scheduled" },
];
export const visitHistory = [
    {
        date: "2026-09-10",
        doctor: "Dr. Sharma",
        department: "Cardiology",
        complaint: "Chest discomfort",
        assessment: "Stable cardiac status; follow-up after blood work.",
        followUp: "Review in 2 weeks",
    },
    {
        date: "2026-06-15",
        doctor: "Dr. Mehta",
        department: "General Medicine",
        complaint: "Seasonal fever and fatigue",
        assessment: "Viral symptoms, hydration advised.",
        followUp: "Repeat if symptoms persist",
    },
];
export const prescriptionRows = [
    {
        title: "Prescription 2026-09-10",
        medicines: "Paracetamol 500mg, Atorvastatin 20mg",
        doctor: "Dr. Sharma",
        status: "Active",
    },
    {
        title: "Prescription 2026-06-15",
        medicines: "Cetrizine 10mg, Vitamin C",
        doctor: "Dr. Mehta",
        status: "Completed",
    },
];
export const reportRows = [
    { name: "ECG Report", type: "Cardiology", date: "2026-09-10", uploadedBy: "Dr. Sharma" },
    { name: "CBC Report", type: "Lab", date: "2026-07-18", uploadedBy: "Lab Team" },
];
export const billingRows = [
    { id: "INV-001", patient: "Rahul Sharma", date: "2026-09-29", amount: "₹1,200", status: "Pending" },
    { id: "INV-002", patient: "Priya Verma", date: "2026-09-29", amount: "₹850", status: "Paid" },
    { id: "INV-003", patient: "Amit Singh", date: "2026-09-29", amount: "₹3,400", status: "Insurance" },
];
