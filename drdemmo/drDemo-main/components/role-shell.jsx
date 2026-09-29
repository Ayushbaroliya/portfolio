"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, CalendarRange, FileText, HeartPulse, LayoutDashboard, LogOut, Users, Menu, X } from "lucide-react";
import { signOutDemo } from "@/lib/auth";

const navByRole = {
    receptionist: [
        { href: "/receptionist", label: "Dashboard", icon: LayoutDashboard },
        { href: "/receptionist/patients", label: "Patients", icon: Users },
        { href: "/receptionist/appointments", label: "Appointments", icon: CalendarRange },
        { href: "/receptionist/queue", label: "Queue", icon: Activity },
    ],
    doctor: [
        { href: "/doctor", label: "Dashboard", icon: LayoutDashboard },
        { href: "/doctor/patients", label: "Patients", icon: Users },
        { href: "/doctor/appointments", label: "Appointments", icon: CalendarRange },
        { href: "/doctor/consultations", label: "Consultations", icon: HeartPulse },
        { href: "/doctor/prescriptions", label: "Prescriptions", icon: FileText },
    ],
    billing: [
        { href: "/billing", label: "Dashboard", icon: LayoutDashboard },
        { href: "/billing/invoices", label: "Invoices", icon: FileText },
        { href: "/billing/payments", label: "Payments", icon: Activity },
        { href: "/billing/reports", label: "Reports", icon: FileText },
    ],
};

export function RoleShell({ role, title, subtitle, children }) {
    const links = navByRole[role];
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        signOutDemo();
        navigate("/login");
    };

    const SidebarContent = () => (
        <>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                HD
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Hospital</p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">Digital Entry</h1>
            </div>
            {/* Mobile Close Button */}
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {links.map(({ href, label, icon: Icon }) => (<Link key={href} to={href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
                <Icon className="h-4 w-4"/>
                {label}
              </Link>))}
          </nav>

          <div className="mt-8 border-t border-slate-200 pt-5">
            <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <LogOut className="h-4 w-4"/>
              Logout
            </button>
          </div>
        </>
    );

    return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex max-w-[1600px] gap-6 p-4 lg:p-6">
        
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex flex-col">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}
        
        {/* Mobile Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <SidebarContent />
        </aside>

        <main className="flex-1 min-w-0">
          <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <button 
                  className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{role.toUpperCase()}</p>
                  <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
                </div>
              </div>
              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 ring-1 ring-emerald-200 self-start sm:self-auto inline-block">
                {subtitle}
              </div>
            </div>
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Demo mode: dashboard values are sample data and are not saved to Supabase.
            </p>
          </header>

          {children}
        </main>
      </div>
    </div>
    );
}
