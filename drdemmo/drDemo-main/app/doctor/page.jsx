import { useState } from "react";
import { RoleShell } from "@/components/role-shell";
import { appointmentRows, queueRows, statsByRole, visitHistory } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

export default function DoctorDashboard() {
    const stats = statsByRole.doctor;
    const [activeModal, setActiveModal] = useState(null);
    
    return (<RoleShell role="doctor" title="Doctor Dashboard" subtitle="Good Morning, Dr. Sharma">
      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={() => setActiveModal("consultation")}>Start Next Consultation</Button>
        <Button variant="outline" onClick={() => setActiveModal("prescription")}>Write Prescription</Button>
        <Button variant="outline" onClick={() => setActiveModal("labs")}>View Lab Results</Button>
      </div>

      <Modal isOpen={activeModal === "consultation"} onClose={() => setActiveModal(null)} title="Next Patient: Amit Singh">
        <div className="space-y-4">
          <p className="text-slate-600">Are you ready to call the next patient from the queue?</p>
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={() => setActiveModal(null)}>Call Patient In</Button>
            <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === "prescription"} onClose={() => setActiveModal(null)} title="Write Prescription">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div>
            <label className="block text-sm font-medium mb-1">Medicines</label>
            <textarea className="w-full rounded-lg border p-2 h-24" placeholder="e.g. Paracetamol 500mg - 1-0-1 for 3 days"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Diet / Advice</label>
            <input type="text" className="w-full rounded-lg border p-2" placeholder="Drink warm water" />
          </div>
          <Button type="submit" className="w-full">Sign & Save</Button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === "labs"} onClose={() => setActiveModal(null)} title="Lab Results">
        <div className="space-y-4">
          <p className="text-slate-600">Select a report to view details.</p>
          <div className="space-y-2">
            <div className="flex justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <span className="font-medium">CBC Blood Test - Priya Verma</span>
              <span className="text-blue-600 text-sm">View PDF</span>
            </div>
            <div className="flex justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <span className="font-medium">Chest X-Ray - Priya Verma</span>
              <span className="text-blue-600 text-sm">View Image</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => setActiveModal(null)}>Close</Button>
        </div>
      </Modal>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr] mb-6">
        {/* Current Patient Section */}
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Current Patient</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">Priya Verma</h2>
              <p className="text-sm text-slate-500 mt-1">29 YRS • FEMALE • PAT-2026-00004</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">In Consultation</span>
              <p className="text-sm text-slate-500 mt-2">Started 10 mins ago</p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Reported Symptoms</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>High fever (102°F)</li>
                <li>Dry cough & fatigue</li>
                <li>Body ache</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Recent Reports</h4>
              <div className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-600">CBC Blood Test</span>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600">View</Button>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-600">Chest X-Ray</span>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600">View</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {stats.slice(0, 4).map((stat) => (<div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-center">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="mt-1 text-xs text-slate-500">{stat.helper}</p>
            </div>))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Today&apos;s patient queue</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {queueRows.map((item) => (<div key={item.token} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-slate-50 transition cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-800">{item.patient}</div>
                  <div className="text-sm text-slate-500">{item.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">{item.status}</span>
                  <Button size="sm">Call</Button>
                </div>
              </div>))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Appointment summary</h3>
          <div className="mt-4 space-y-3">
            {appointmentRows.map((appointment) => (<div key={appointment.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">{appointment.patient}</span>
                  <span className="text-xs text-slate-500">{appointment.status}</span>
                </div>
                <div className="mt-1 text-sm text-slate-500">{appointment.date} • {appointment.time}</div>
              </div>))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Recent medical history</h3>
        <div className="mt-4 space-y-4">
          {visitHistory.map((visit) => (<div key={visit.date} className="rounded-xl border border-slate-200 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="font-semibold text-slate-800">{visit.date}</div>
                <div className="text-sm text-slate-500">{visit.doctor} • {visit.department}</div>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                <p><span className="font-medium text-slate-800">Complaint:</span> {visit.complaint}</p>
                <p className="mt-1"><span className="font-medium text-slate-800">Assessment:</span> {visit.assessment}</p>
                <p className="mt-1"><span className="font-medium text-slate-800">Follow-up:</span> {visit.followUp}</p>
              </div>
            </div>))}
        </div>
      </div>
    </RoleShell>);
}
