import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { profile, skills, projects } from "../data/content";
import { fadeUp, stagger } from "../utils/animations";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
const resumePdf = new URL('../utils/AyushDeloite.pdf', import.meta.url).href;

export default function Home() {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('Sending...');

        // EmailJS Configuration
        // NOTE: You still need to replace 'YOUR_TEMPLATE_ID' and 'YOUR_PUBLIC_KEY'
        emailjs.sendForm('service_mr7mvbc', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
            .then((result) => {
                setStatus('Message Sent! Thank you.');
                e.target.reset();
            }, (error) => {
                setStatus('Failed to send. Please check console.');
                console.error(error);
            });

    };

    return (
        <>
            <Hero profile={profile} />

            {/* Experience & Education Timeline */}
            <Section id="experience" title="Education & Experience">
                <div className="relative border-l border-amber-500/30 ml-3 md:ml-6 space-y-8 pl-6 md:pl-8">
                    <div className="relative">
                        <span className="absolute -left-[35px] md:-left-[41px] top-1 h-5 w-5 rounded-full border border-amber-500 bg-black"></span>
                        <h3 className="text-xl font-bold text-amber-300">Web Developer & IoT Innovator</h3>
                        <span className="text-sm text-gray-400">Freelance & Projects</span>
                        <p className="mt-2 text-gray-300">Building responsive websites and smart hardware solutions.</p>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[35px] md:-left-[41px] top-1 h-5 w-5 rounded-full border border-amber-500 bg-black"></span>
                        <h3 className="text-xl font-bold text-amber-300">B.Tech in Computer Science</h3>
                        <span className="text-sm text-gray-400">2022 - Present | Shri Ram Institute Of Technology</span>
                        <p className="mt-2 text-gray-300">Focusing on Full Stack Development, DSA, and IoT systems.</p>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[35px] md:-left-[41px] top-1 h-5 w-5 rounded-full border border-amber-500 bg-black"></span>
                        <h3 className="text-xl font-bold text-amber-300">Higher Secondary Education</h3>
                        <span className="text-sm text-gray-400">Excellence School, Chhapara, District Seoni (MP)</span>
                        <p className="mt-2 text-gray-300">Completed schooling with a focus on Science and Mathematics.</p>
                    </div>
                </div>
            </Section>

            {/* About */}
            <Section id="about" title="About Me">
                <p className="text-gray-300 max-w-3xl">
                    {profile.bio}
                </p>
            </Section>

            {/* Skills */}
            <Section id="skills" title="Skills">
                <motion.div
                    className="flex flex-wrap justify-center gap-6"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {skills.map((skill, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-amber-500/50 transition duration-300 w-28 h-28 cursor-pointer"
                        >
                            <skill.icon className={`text-3xl mb-2 ${skill.color}`} />
                            <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* Projects */}
            <Section id="projects" title="Projects">
                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} />
                    ))}
                </motion.div>
            </Section>

            {/* Contact Form */}
            <Section id="contact" title="Contact Me">
                <p className="text-gray-400 mb-6">
                    Have a project in mind? Send me a message!
                </p>

                <form ref={form} onSubmit={sendEmail} className="max-w-lg mx-auto space-y-4 text-left">
                    <input type="text" name="user_name" placeholder="Your Name" required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-amber-500 text-white" />
                    <input type="email" name="user_email" placeholder="Your Email" required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-amber-500 text-white" />
                    <textarea name="message" rows="4" placeholder="Message" required className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-amber-500 text-white"></textarea>

                    <button type="submit" className="w-full py-3 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition">
                        {status || "Send Message"}
                    </button>
                </form>

                <div className="mt-8 flex gap-4 justify-center items-center">
                    <a
                        href={`mailto:${profile.email}`}
                        className="text-amber-500 hover:text-amber-300 transition text-sm"
                    >
                        Or email me directly
                    </a>
                    <span className="text-gray-600">|</span>
                    <a
                        href={resumePdf}
                        download="Ayush_Sharma_Resume.pdf"
                        className="text-amber-500 hover:text-amber-300 transition text-sm"
                    >
                        Download Resume
                    </a>
                </div>
            </Section>
        </>
    );
}
