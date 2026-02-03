
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      className="bg-black/40 border border-amber-400/20 rounded-2xl shadow-lg overflow-hidden"
    >
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h4 className="text-xl font-semibold">
          {project.title}
        </h4>

        <p className="text-gray-400 text-sm mt-2">
          {project.desc}
        </p>

        <p className="text-xs mt-2 text-amber-300">
          {project.tech}
        </p>

        <div className="flex gap-3 mt-4">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 bg-amber-500 text-black rounded hover:bg-amber-400 transition"
          >
            Live
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 border border-amber-400 rounded hover:bg-amber-500 hover:text-black transition"
          >
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
