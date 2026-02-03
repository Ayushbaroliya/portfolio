import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Certificates from "./pages/Certificates";
import { profile } from "./data/content";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950 text-white font-sans">
        <Navbar profile={profile} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates" element={<Certificates />} />
        </Routes>

        {/* Footer */}
        <footer className="text-center p-4 text-gray-500 border-t border-amber-400/20">
          © 2026 {profile.name}. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}
