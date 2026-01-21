import { useState, useEffect, useRef } from 'react';
import './App.css';
import PrismaticBurst from './components/react-bits/PrismaticBurst';
import BlurText from "./components/react-bits/BlurText";
import "@fontsource/inter";
import { FaArrowRight, FaGithub, FaEnvelope, FaLinkedin, FaTwitter, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'motion/react';

const projects = [
  {
    title: "Market Analysis System",
    description: "A next-gen dashboard for intelligent investment strategies and stock market analysis.",
    tags: ["React/Vue", "Solace Agent Mesh", "Tailwind", "Docker"],
    link: "https://devpost.com/software/uottahack-8",
    color: "from-black-500 to-gray-500"
  },
  {
    title: "ATS Resume Analyser",
    description: "ATS Resume Analyser for job applications.",
    tags: ["Python", "FastAPI", "spaCy", "Tailwind", "PDFMiner"],
    link: "https://github.com/maximus-teo/resume-analyser",
    color: "from-black-500 to-gray-500"
  },
  {
    title: "Wordle Clone",
    description: "A fully-featured Wordle clone built with React and CSS.",
    tags: ["React", "Node.js", "HTML", "CSS"],
    link: "https://maximus-teo.github.io/wordle",
    color: "from-black-500 to-gray-500"
  },
  {
    title: "Let There Be Bite",
    description: "An AI recipe generator that reduces waste by suggesting meal ideas based on available ingredients.",
    tags: ["Java", "JavaScript", "Node.js", "HTML", "CSS"],
    link: "https://maximus-teo.github.io/lettherebebite",
    color: "from-black-500 to-gray-500"
  }
];

const mediaItems = [
  { id: 1, type: 'image', src: 'src/assets/aws_workshop_6.png' },
  { id: 2, type: 'image', src: 'src/assets/aws_workshop_5.png' },
  { id: 3, type: 'image', src: 'src/assets/aws_workshop_2.png' },
  { id: 4, type: 'image', src: 'src/assets/screenshot_lettherebebite.png' },
  { id: 5, type: 'image', src: 'src/assets/screenshot_wordle1.png' },
];

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="relative w-full min-h-screen font-sans text-white overflow-x-hidden selection:bg-white-500 selection:text-white">

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={1.5}
          speed={0.5}
          distort={0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={0}
          mixBlendMode="lighten"
          colors={['#392e4e', '#ff007a', '#4d3dff']}
          color0=""
          color1=""
          color2=""
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 text-white">
        <a href="#" className="text-2xl font-bold tracking-tighter text-white">M / T</a>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase opacity-100">
          <a href="#projects" className="hover:text-white transition-opacity duration-300 text-white">Work</a>
          <a href="#media" className="hover:text-white transition-opacity duration-300 text-white">Media</a>
          <a href="#contact" className="hover:text-white transition-opacity duration-300 text-white">Contact</a>
        </div>
        <a
          href="https://github.com/maximus-teo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all text-white backdrop-blur-sm"
        >
          <FaGithub size={16} />
          <span>GitHub</span>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="space-y-6 max-w-2xl mx-auto mt-20">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-light tracking-[0.2em] mb-4">
              CREATIVE DEVELOPER
            </p>
          </motion.div>

          <div className="overflow-hidden flex items-center justify-center">
            <BlurText
              text="Maximus Teo"
              delay={50}
              animateBy="letters"
              direction="bottom"
              className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-lg md:text-2xl text-white/70 max-w-2xl font-light">
              Crafting digital experiences that bridge the gap between imagination and reality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <a href="#projects" className="group flex items-center gap-3 mt-8 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 text-white">
              <span className="text-sm font-bold tracking-widest uppercase">Explore Work</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-mono text-white/40 flex flex-col items-center gap-2"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 px-6 md:px-12 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-20 tracking-tight"
          >
            Selected Works <span className="text-purple-500">.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative block h-[400px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-white-300 transition-colors">{project.title}</h3>
                    <p className="text-white/60 mb-6 line-clamp-2 max-w-sm">{project.description}</p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      View Source <FaExternalLinkAlt size={14} />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Media Gallery <span className="text-blue-500">.</span>
            </h2>
            <p className="text-white/50 max-w-md mt-6 md:mt-0">
              A collection of my visual experiments, motion design, and shared experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-2xl overflow-hidden group ${index === 0 ? 'md:col-span-2' : ''}`}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt="Gallery item"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 px-6 md:px-12 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <BlurText
            text="LET'S CREATE TOGETHER"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-12"
          />

          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {[
              { icon: FaEnvelope, label: 'Email Me', href: 'mailto:maximus.teo@outlook.com' },
              { icon: FaGithub, label: 'GitHub', href: 'https://github.com/maximus-teo' },
              { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/maximus-teo' },
              { icon: FaTwitter, label: 'Twitter', href: '#' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
              >
                <social.icon size={20} />
                <span className="font-medium">{social.label}</span>
              </a>
            ))}
          </div>

          <footer className="text-white/30 text-sm">
            © {new Date().getFullYear()} Maximus Teo. All 'lights' reserved.
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;