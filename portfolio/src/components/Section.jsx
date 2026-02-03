
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

export default function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      className="max-w-6xl mx-auto px-6 py-16"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="text-3xl font-semibold mb-8 text-amber-300">
        {title}
      </h3>
      {children}
    </motion.section>
  );
}

