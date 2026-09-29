"use client";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { demoUsers } from "@/lib/demo-data";
import { signInDemo } from "@/lib/auth";
import BlurText from "@/components/BlurText";
const roleOrder = ["receptionist", "doctor", "billing"];
export default function LoginPage() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState("receptionist");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState(demoUsers[0].email);
    const [password, setPassword] = useState(demoUsers[0].password);
    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus("Checking demo account...");
        if (!signInDemo(email, password, selectedRole)) {
            setStatus("Invalid demo credentials. Choose a demo account and use password demo123.");
            return;
        }
        navigate(`/${selectedRole}`);
    };
    return (<div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl">
          <div className="mb-10 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-50">
            Secure patient care
          </div>
          <BlurText text="Hospital Digital Entry & Patient Management System" delay={150} animateBy="words" direction="top" className="max-w-lg text-4xl font-bold leading-tight md:text-5xl"/>
          <p className="mt-5 max-w-xl text-base text-blue-50/90">
            Register, search, consult, prescribe, and track longitudinal patient care with role-based access, audit logs, and medical record integrity.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
            ["1,240", "Active patient records"],
            ["96", "Appointments today"],
            ["18", "Departments managed"],
            ["24/7", "Secure access"],
        ].map(([value, label]) => (<div key={label} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{value}</div>
                <div className="mt-1 text-sm text-blue-50/80">{label}</div>
              </div>))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Welcome back</p>
            <h2 className="mt-2 text-3xl font-bold">Sign in</h2>
            <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Demo mode: sample records only. No Supabase connection is used for this sign-in.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
              <div className="grid gap-3 sm:grid-cols-2">
                {roleOrder.map((role) => (<button key={role} type="button" onClick={() => {
                setSelectedRole(role);
                const user = demoUsers.find((entry) => entry.role === role);
                if (user) {
                    setEmail(user.email);
                    setPassword(user.password);
                }
            }} className={`rounded-xl border px-3 py-2.5 text-left font-medium transition ${selectedRole === role
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:bg-white"/>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:bg-white"/>
            </div>

            <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">
              Continue to {selectedRole} dashboard
            </button>
            {status ? <p className="pt-2 text-sm text-slate-600">{status}</p> : null}
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-700">Demo accounts (password: demo123)</p>
            <div className="space-y-3">
              {demoUsers.map((user) => (<button key={user.role} type="button" onClick={() => {
                setSelectedRole(user.role);
                setEmail(user.email);
                setPassword(user.password);
                setStatus("");
            }} className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm">
                  <span>
                    <span className="block font-medium text-slate-800">{user.name}</span>
                    <span className="text-slate-500">{user.email}</span>
                  </span>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium uppercase text-blue-700">{user.role}</span>
                </button>))}
            </div>
          </div>

          <div className="mt-5 text-center text-sm text-slate-500">
            Need password reset? <Link to="/login" className="font-medium text-blue-600">Use demo credentials</Link>
          </div>
        </div>
      </div>
    </div>);
}
