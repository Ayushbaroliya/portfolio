

// import profileImg from './img/profile.jpg'; // File does not exist


const quoteImg = new URL('./img/Quotegenerator.png', import.meta.url).href;
const weatherImg = new URL('./img/auraweather.png', import.meta.url).href;
const calcImg = new URL('./img/calculator.png', import.meta.url).href;
const caloriexImg = new URL('./img/caloriex.png', import.meta.url).href;
const robotImg = new URL('./img/obstacleRobo.avif', import.meta.url).href;
const colorImg = new URL('./img/randomcolour.png', import.meta.url).href;
const spsImg = new URL('./img/stone-paper-scissor.png', import.meta.url).href;
const todoImg = new URL('./img/todoList.png', import.meta.url).href;
const wildfireImg = new URL('./img/wildfireProtection.png', import.meta.url).href;
const profileImg = new URL('./img/profile.png', import.meta.url).href;

export const profile = {
  name: "Ayush Sharma",
  role: "Web Developer | IoT Innovator",
  bio: "I am a B.Tech Computer Science Engineering student who enjoys building web applications and working on IoT-based projects. I like creating things that are useful in real life, from small web tools to hardware systems using sensors and microcontrollers.I work mainly with HTML, CSS, JavaScript, React, and Tailwind CSS for web development, and Arduino and ESP32 for IoT projects. I focus on writing clean simple code so my projects are easy to use and improve.I learn best by building projects, and my goal is to grow as a developer and create solutions that solve real problems.",
  email: "ayushbaroliya5@gmail.com",
  github: "https://github.com/Ayushbaroliya",
  linkedin: "https://www.linkedin.com/in/ayushsharma27",
  instagram: "https://www.instagram.com/ayush_baroliya/?__pwa=1",
  geeksforgeeks: "https://www.geeksforgeeks.org/profile/ayushsharma2005?from=explore",
  leetcode: "https://leetcode.com/u/Ayush_Sharma27",
  photo: profileImg
};

import { FaReact, FaNodeJs, FaGithub, FaPython, FaBrain, FaMicrochip, FaWifi, FaProjectDiagram, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiCplusplus, SiEspressif, SiArduino } from 'react-icons/si';

export const skills = [
  { name: "React", icon: FaReact, color: "text-cyan-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "C++", icon: SiCplusplus, color: "text-blue-500" },
  { name: "IoT", icon: FaWifi, color: "text-indigo-400" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "ESP32", icon: SiEspressif, color: "text-red-500" },
  { name: "Git & GitHub", icon: FaGithub, color: "text-white" },
  { name: "Python", icon: FaPython, color: "text-blue-300" },
  { name: "Arduino", icon: SiArduino, color: "text-teal-500" },
  { name: "ML", icon: FaBrain, color: "text-pink-500" },
  { name: "Electronics", icon: FaMicrochip, color: "text-orange-300" },
  { name: "DSA", icon: FaProjectDiagram, color: "text-violet-400" },
  { name: "Java", icon: FaJava, color: "text-red-600" }
];

export const projects = [
  {
    title: "Random Color Generator",
    desc: "Generates random colors with copy-to-clipboard support and clean UI.",
    img: colorImg,
    demo: "https://randomcolorayush.netlify.app/",
    github: "https://github.com/Ayushbaroliya/random-color-generator",
    tech: "HTML, CSS, JavaScript"
  },
  {
    title: "Stone Paper Scissor",
    desc: "Classic Stone Paper Scissor game against the computer.",
    img: spsImg,
    demo: "https://ayushbaroliya.github.io/Stone-Paper-Scissor/",
    github: "https://github.com/Ayushbaroliya/Stone-Paper-Scissor",
    tech: "HTML, CSS, JavaScript"
  },
  {
    title: "Random Quote Generator",
    desc: "A simple application that generates inspiring quotes.",
    img: quoteImg,
    demo: "https://ayushbaroliya.github.io/RandomQuote/",
    github: "https://github.com/Ayushbaroliya/RandomQuote",
    tech: "HTML, CSS, JavaScript"
  },
  {
    title: "Calculator App",
    desc: "Responsive calculator with basic arithmetic operations and modern styling.",
    img: calcImg,
    demo: "https://calculatorayush.netlify.app/",
    github: "https://github.com/Ayushbaroliya/calculator-app",
    tech: "HTML, CSS, JavaScript"
  },
  {
    title: "CalorieX – Calorie Tracker",
    desc: "Calorie tracking web app to help users manage daily intake.",
    img: caloriexImg,
    demo: "https://caloriex1.onrender.com/",
    github: "https://github.com/Ayushbaroliya/caloriex",
    tech: "HTML, CSS, JavaScript, Backend"
  },
  {
    title: "Neon To-Do List",
    desc: "Neon-styled to-do list with streak tracking and clock display.",
    img: todoImg,
    demo: "https://neonetodolistayush.netlify.app/",
    github: "https://github.com/Ayushbaroliya/neon-todo-list",
    tech: "HTML, CSS, JavaScript"
  },
  {
    title: "Aura Weather App",
    desc: "Weather forecast app using public API with dynamic UI updates.",
    img: weatherImg,
    demo: "https://ayushbaroliya.github.io/Aura-Weather/",
    github: "https://github.com/Ayushbaroliya/Aura-Weather",
    tech: "HTML, CSS, JavaScript, API"
  },
  {
    title: "Wildfire Detection System",
    desc: "IoT-based wildfire detection using sensors and ML for early alerts.",
    img: wildfireImg,
    demo: "#",
    github: "https://github.com/Ayushbaroliya/wildfire-detection",
    tech: "ESP32, Sensors, Python, ML"
  },
  {
    title: "Arduino Obstacle Avoiding Robot",
    desc: "Autonomous Arduino robot that avoids obstacles using ultrasonic sensors.",
    img: robotImg,
    demo: "#",
    github: "https://github.com/Ayushbaroliya/arduino-robot",
    tech: "Arduino, C++, Ultrasonic Sensor"
  }
];


