

import { FaGithub, FaInstagram, FaLinkedin, FaJava } from "react-icons/fa";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ profile }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToSection = (id) => {
    if (isHome) {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 sticky top-0 bg-black/40 backdrop-blur z-50 border-b border-white/5">
      <Link to="/" className="text-xl font-bold text-amber-300">
        {profile.name}
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <div className="space-x-6 hidden md:block font-medium">
          <Link to="/" onClick={() => scrollToSection("about")} className="hover:text-amber-300 transition cursor-pointer">About</Link>
          <Link to="/" onClick={() => scrollToSection("skills")} className="hover:text-amber-300 transition cursor-pointer">Skills</Link>
          <Link to="/" onClick={() => scrollToSection("experience")} className="hover:text-amber-300 transition cursor-pointer">Experience</Link>
          <Link to="/" onClick={() => scrollToSection("projects")} className="hover:text-amber-300 transition cursor-pointer">Projects</Link>
          <Link to="/certificates" className="hover:text-amber-300 transition text-amber-100">Certificates</Link>
          <Link to="/" onClick={() => scrollToSection("contact")} className="hover:text-amber-300 transition cursor-pointer">Contact</Link>
        </div>

        <div className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><FaGithub /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><FaLinkedin /></a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><SiLeetcode /></a>
          <a href={profile.instagram} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><FaInstagram /></a>
          <a href={profile.geeksforgeeks} target="_blank" rel="noreferrer" className="text-xl hover:text-amber-300 transition"><SiGeeksforgeeks /></a>
        </div>
      </div>
    </nav>
  );
}
