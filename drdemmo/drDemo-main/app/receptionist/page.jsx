import { useState } from "react";
import { RoleShell } from "@/components/role-shell";
import { appointmentRows, patientRows, queueRows, statsByRole } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

export default function ReceptionistDashboard() {
    const stats = statsByRole.receptionist;
    const [activeModal, setActiveModal] = useState(null);
    
    return (<RoleShell role="receptionist" title="Reception Dashboard" subtitle="Patient flow and appointment desk">
      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={() => setActiveModal("register")}>Register New Patient</Button>
        <Button variant="outline" onClick={() => setActiveModal("book")}>Book Appointment</Button>
        <Button variant="outline" onClick={() => setActiveModal("payment")}>Collect Payment</Button>
      </div>

      <Modal isOpen={activeModal === "register"} onClose={() => setActiveModal(null)} title="Register Patient">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" className="w-full rounded-lg border p-2" placeholder="Patient name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input type="text" className="w-full rounded-lg border p-2" placeholder="+91" />
          </div>
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === "book"} onClose={() => setActiveModal(null)} title="Book Appointment">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div>
            <label className="block text-sm font-medium mb-1">Select Patient</label>
            <input type="text" className="w-full rounded-lg border p-2" placeholder="Search patient..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date & Time</label>
            <input type="datetime-local" className="w-full rounded-lg border p-2" />
          </div>
          <Button type="submit" className="w-full">Confirm Booking</Button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === "payment"} onClose={() => setActiveModal(null)} title="Collect Payment">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div>
            <label className="block text-sm font-medium mb-1">Patient ID / Name</label>
            <input type="text" className="w-full rounded-lg border p-2" placeholder="Search..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <input type="number" className="w-full rounded-lg border p-2" placeholder="0.00" />
          </div>
          <Button type="submit" className="w-full">Process Payment</Button>
        </form>
      </Modal>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (<div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</h3>
            <p className="mt-2 text-sm text-slate-500">{stat.helper}</p>
          </div>))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Today&apos;s appointments</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">12 Oct 2026</span>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
          </div>
          <div className="table-scroll">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-3">Patient</th>
                  <th className="pb-3">Doctor</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointmentRows.map((appointment) => (<tr key={appointment.id} className="border-t border-slate-100">
                    <td className="py-3 font-medium text-slate-700">{appointment.patient}</td>
                    <td className="py-3 text-slate-600">{appointment.doctor}</td>
                    <td className="py-3 text-slate-600">{appointment.time}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">{appointment.status}</span>
                    </td>
                    <td className="py-3">
                      <Button variant="outline" size="sm">Check In</Button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Queue</h3>
          <div className="mt-4 space-y-3">
            {queueRows.map((item) => (<div key={item.token} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{item.patient}</span>
                  <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">{item.status}</span>
                </div>
                <div className="mt-2 text-sm text-slate-500">Token {item.token} • {item.doctor} • {item.time}</div>
              </div>))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Patient search</h3>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Search by ID, name, phone or DOB</span>
            <Button size="sm">Search</Button>
          </div>
        </div>
        <div className="table-scroll">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-3">Patient ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Age</th>
                <th className="pb-3">Gender</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {patientRows.map((patient) => (<tr key={patient.id} className="border-t border-slate-100">
                  <td className="py-3 font-medium text-slate-700">{patient.id}</td>
                  <td className="py-3 text-slate-700">{patient.name}</td>
                  <td className="py-3 text-slate-600">{patient.age}</td>
                  <td className="py-3 text-slate-600">{patient.gender}</td>
                  <td className="py-3 text-slate-600">{patient.phone}</td>
                  <td className="py-3 text-slate-600">{patient.lastVisit}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </RoleShell>);
}
