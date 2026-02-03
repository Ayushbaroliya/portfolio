import { motion } from "framer-motion";
import Section from "../components/Section";
import { fadeUp, stagger } from "../utils/animations";
// import { certificates } from "../data/content"; 
// Using placeholder data until content.js is updated

const certificates = [
    {
        title: "Introduction to Networks",
        issuer: "Cisco",
        date: "2024",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png",
        link: "#"
    },
    {
        title: "Python for Data Science",
        issuer: "IBM",
        date: "2023",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/100px-IBM_logo.svg.png",
        link: "#"
    }
];

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
                        <div className="h-40 bg-white/10 p-6 flex items-center justify-center">
                            <img src={cert.img} alt={cert.title} className="max-h-full max-w-full object-contain filter group-hover:brightness-110 transition" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">{cert.title}</h3>
                            <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                                <span>{cert.issuer}</span>
                                <span>{cert.date}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
}
