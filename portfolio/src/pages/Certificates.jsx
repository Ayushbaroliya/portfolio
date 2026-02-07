import { motion } from "framer-motion";
import Section from "../components/Section";
import { fadeUp, stagger } from "../utils/animations";
import { certificates } from "../data/content";

export default function Certificates() {
    return (
        <Section id="certificates" title="Certifications & Achievements">
            <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                {certificates.map((cert, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/50 transition group"
                    >
                        <div className="h-48 bg-white/10 p-4 flex items-center justify-center overflow-hidden">
                            <img
                                src={cert.img}
                                alt={cert.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition line-clamp-1">{cert.title}</h3>
                            <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                                <span>{cert.issuer}</span>
                                <span>{cert.issuer}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
}
