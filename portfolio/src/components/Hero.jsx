import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";
const resumePdf = new URL('../utils/AyushDeloite.pdf', import.meta.url).href;

export default function Hero({ profile }) {
  return (
    <motion.section
      className="flex flex-col items-center justify-center text-center px-6 py-24"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <img
        src={profile.photo}
        alt="profile"
        loading="eager"
        className="w-32 h-32 rounded-full border-4 border-amber-400 mb-6"
      />

      <h2 className="text-5xl font-bold">
        Hi, I'm{" "}
        <span className="text-amber-300">{profile.name}</span>
      </h2>

      {/* Role removed as requested */}

      {/* Bio removed from Hero section */}

      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <a
          href={resumePdf}
          download="Ayush_Sharma_Resume.pdf"
          className="px-5 py-2 bg-amber-500 text-black rounded-xl hover:bg-amber-400 transition"
        >
          Download Resume
        </a>

        <a
          href="#projects"
          className="px-5 py-2 border border-amber-400 text-amber-300 rounded-xl hover:bg-amber-500 hover:text-black transition"
        >
          View Projects
        </a>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 border border-amber-400 rounded-xl hover:bg-amber-500 hover:text-black transition"
        >
          GitHub
        </a>
      </div>
    </motion.section>
  );
}
