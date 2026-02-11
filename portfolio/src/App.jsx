import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { profile } from "./data/content";
import { Suspense, lazy } from "react";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const Certificates = lazy(() => import("./pages/Certificates"));

// Loading Spinner Component
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center bg-neutral-950 text-amber-500">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950 text-white font-sans">
        <Navbar profile={profile} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates" element={<Certificates />} />
        
          </Routes>
        </Suspense>

        {/* Footer */}
        <footer className="text-center p-4 text-gray-500 border-t border-amber-400/20">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}
