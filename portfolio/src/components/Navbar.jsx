

import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ profile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToSection = (id) => {
    setIsMenuOpen(false); // Close menu on click
    if (isHome) {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 sticky top-0 bg-black/40 backdrop-blur z-50 border-b border-white/5">
      <Link to="/" className="text-xl font-bold text-amber-300 z-50">
        {profile.name}
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm">
        <div className="space-x-6 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to="/"
              onClick={() => scrollToSection(link.id)}
              className="hover:text-amber-300 transition cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/certificates" className="hover:text-amber-300 transition text-amber-100">
            Certificates
          </Link>
        </div>

        <div className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><FaGithub /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><FaLinkedin /></a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><SiLeetcode /></a>
          <a href={profile.instagram} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><FaInstagram /></a>
          <a href={profile.geeksforgeeks} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><SiGeeksforgeeks /></a>
        </div>
      </div>

      {/* Mobile Hamburger & Menu */}
      <div className="md:hidden z-50 flex items-center gap-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-white">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Full Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-neutral-950 flex flex-col justify-center items-center gap-8 text-xl z-40">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to="/"
              onClick={() => scrollToSection(link.id)}
              className="hover:text-amber-300 transition"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/certificates"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-amber-300 transition text-amber-100"
          >
            Certificates
          </Link>

          <div className="flex gap-6 mt-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-2xl hover:text-amber-300 transition"><FaGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-2xl hover:text-amber-300 transition"><FaLinkedin /></a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer" className="text-2xl hover:text-amber-300 transition"><SiLeetcode /></a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="text-2xl hover:text-amber-300 transition"><FaInstagram /></a>
            <a href={profile.geeksforgeeks} target="_blank" rel="noreferrer" className="text-2xl hover:text-amber-300 transition"><SiGeeksforgeeks /></a>
          </div>
        </div>
      )}
    </nav>
  );
}
