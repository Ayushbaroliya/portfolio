import { useState } from "react";
import { RoleShell } from "@/components/role-shell";
import { billingRows, statsByRole } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

export default function BillingDashboard() {
    const stats = statsByRole.billing;
    const [activeModal, setActiveModal] = useState(null);

    return (<RoleShell role="billing" title="Billing Dashboard" subtitle="Manage invoices and payments">
      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={() => setActiveModal("invoice")}>Generate Invoice</Button>
        <Button variant="outline" onClick={() => setActiveModal("payment")}>Record Payment</Button>
      </div>

      <Modal isOpen={activeModal === "invoice"} onClose={() => setActiveModal(null)} title="Generate Invoice">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div>
            <label className="block text-sm font-medium mb-1">Select Patient</label>
            <input type="text" className="w-full rounded-lg border p-2" placeholder="Search patient..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Consultation / Services</label>
            <input type="text" className="w-full rounded-lg border p-2" placeholder="e.g. General Checkup" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total Amount (₹)</label>
            <input type="number" className="w-full rounded-lg border p-2" placeholder="500.00" />
          </div>
          <Button type="submit" className="w-full">Create Invoice</Button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === "payment"} onClose={() => setActiveModal(null)} title="Record Payment">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
          <div>
            <label className="block text-sm font-medium mb-1">Invoice ID</label>
            <input type="text" className="w-full rounded-lg border p-2" placeholder="INV-" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select className="w-full rounded-lg border p-2 bg-white">
              <option>Cash</option>
              <option>Credit Card</option>
              <option>UPI</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Confirm Payment</Button>
        </form>
      </Modal>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (<div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</h3>
            <p className="mt-2 text-sm text-slate-500">{stat.helper}</p>
          </div>))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Invoices</h3>
        </div>
        <div className="table-scroll">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-3">Invoice ID</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {billingRows.map((row) => (<tr key={row.id} className="border-t border-slate-100">
                  <td className="py-3 font-medium text-slate-700">{row.id}</td>
                  <td className="py-3 text-slate-600">{row.patient}</td>
                  <td className="py-3 text-slate-600">{row.date}</td>
                  <td className="py-3 font-medium text-slate-700">{row.amount}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${row.status === "Paid" ? "bg-emerald-50 text-emerald-700" :
                row.status === "Pending" ? "bg-amber-50 text-amber-700" :
                    "bg-blue-50 text-blue-700"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">View Receipt</Button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </RoleShell>);
}
