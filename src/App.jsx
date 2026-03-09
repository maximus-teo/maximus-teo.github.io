import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import PrismaticBurst from './components/react-bits/PrismaticBurst';
import BlurText from "./components/react-bits/BlurText";
import "@fontsource/inter";
import { FaArrowRight, FaGithub, FaEnvelope, FaLinkedin, FaTwitter, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaTimes, FaUser, FaDocker, FaBrain, FaCss3Alt, FaHtml5, FaJava } from 'react-icons/fa';
import { SiReact, SiVuedotjs, SiTailwindcss, SiPython, SiTypescript, SiNodedotjs, SiFastapi, SiJavascript } from 'react-icons/si';
import { Figma, Cpu, Globe, BarChart2, Database, Medal } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

// Import assets to ensure they are bundled
import profile from './assets/portfolio_aboutme_photo.jpeg';
import nbc1 from './assets/nbcm_hackathon1.jpg';
import nbc2 from './assets/nbcm_hackathon2.jpg';
import nbc3 from './assets/nbcm_hackathon3.jpg';
import aws1 from './assets/aws_workshop1.png';
import aws2 from './assets/aws_workshop2.png';
import aws3 from './assets/aws_workshop3.png';
import bite from './assets/screenshot_lettherebebite.png';
import wordle from './assets/screenshot_wordle.png';
import logo from './assets/website_logo.png';
import title from './assets/website_title.png';

// Map of tech name -> { icon component, label }
const ICON_MAP = {
  'React': { Icon: SiReact, label: 'React' },
  'React/Vue': { Icon: SiReact, label: 'React / Vue' },
  'Vue': { Icon: SiVuedotjs, label: 'Vue' },
  'Tailwind': { Icon: SiTailwindcss, label: 'Tailwind CSS' },
  'Docker': { Icon: FaDocker, label: 'Docker' },
  'Python': { Icon: SiPython, label: 'Python' },
  'FastAPI': { Icon: SiFastapi, label: 'FastAPI' },
  'spaCy': { Icon: Cpu, label: 'spaCy' },
  'Groq': { Icon: Cpu, label: 'Groq' },
  'Render': { Icon: Globe, label: 'Render' },
  'Node.js': { Icon: SiNodedotjs, label: 'Node.js' },
  'HTML': { Icon: FaHtml5, label: 'HTML5' },
  'CSS': { Icon: FaCss3Alt, label: 'CSS3' },
  'Java': { Icon: FaJava, label: 'Java' },
  'JavaScript': { Icon: SiJavascript, label: 'JavaScript' },
  'TypeScript': { Icon: SiTypescript, label: 'TypeScript' },
  'Solace Agent Mesh': { Icon: Cpu, label: 'Solace Agent Mesh' },
  'AI/ML': { Icon: FaBrain, label: 'AI / ML' },
  'UI/UX': { Icon: Figma, label: 'UI / UX (Figma)' },
  'Pandas': { Icon: BarChart2, label: 'Pandas (Data Analysis)' },
  'SQL': { Icon: Database, label: 'SQL (Database)' },
};

// Renders a single monotone white tech icon with a tooltip
function TechIcon({ tag, size = 20 }) {
  const entry = ICON_MAP[tag];
  if (!entry) return null;
  const { Icon, label } = entry;
  return (
    <span
      title={label}
      aria-label={label}
      className="flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <Icon size={size} style={{ display: 'block' }} />
    </span>
  );
}

const projects = [
  {
    title: "Financial Bias Detector",
    description: "A tool that detects harmful patterns in trading history and produce personalized insights to improve performance.",
    tags: ["Python", "FastAPI", "Pandas", "SQL", "React", "Tailwind"],
    link: "https://github.com/maximus-teo/financial-bias-detector",
    color: "from-black-500 to-gray-500",
    award: "2nd Place @ NBC Hackathon 2026"
  },
  {
    title: "Multi-Agent Financial Advisor",
    description: "A next-gen dashboard for intelligent investment strategies and stock market analysis.",
    tags: ["React/Vue", "Solace Agent Mesh", "Tailwind", "Docker"],
    link: "https://devpost.com/software/uottahack-8",
    color: "from-black-500 to-gray-500"
  },
  {
    title: "ATS Resume Analyser",
    description: "Smart AI-powered resume analyser for optimising your resume.",
    tags: ["Python", "FastAPI", "spaCy", "Tailwind", "Groq", "Render"],
    link: "https://resume-analyser-r2jy.onrender.com/",
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
  { id: 1, type: 'image', src: nbc1, caption: 'Achieved 2nd Place at National Bank of Canada Hackathon - February 2026' },
  { id: 2, type: 'image', src: nbc2, caption: 'Achieved 2nd Place at National Bank of Canada Hackathon - February 2026' },
  { id: 3, type: 'image', src: nbc3, caption: 'Achieved 2nd Place at National Bank of Canada Hackathon - February 2026' },
  { id: 4, type: 'image', src: aws1, caption: 'uOttawa AWS Workshop - September 2025' },
  { id: 5, type: 'image', src: aws2, caption: 'uOttawa AWS Workshop - September 2025' },
  { id: 6, type: 'image', src: aws3, caption: 'uOttawa AWS Workshop - September 2025' },
  { id: 7, type: 'image', src: bite, caption: 'Project: Let There Be Bite - AI Recipe Generator' },
  { id: 8, type: 'image', src: wordle, caption: 'Project: Wordle - React Clone' },
];

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i - 1 + mediaItems.length) % mediaItems.length), []);

  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i + 1) % mediaItems.length), []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, prevImage, nextImage, closeLightbox]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

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

      {/* Navigation — hidden when lightbox is open */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 text-white transition-opacity duration-300 ${lightboxOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <a href="#" aria-label="Home" className="flex items-center">
          <img src={logo} alt="Maximus Teo logo" className="h-24 w-auto object-contain" />
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase opacity-100">
          <a href="#about" className="hover:text-white transition-opacity duration-300 text-white">About</a>
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

          <div className="overflow-hidden flex items-center justify-center">
            <BlurText
              text="CREATIVE DEVELOPER"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-xl md:text-xl text-white/70 max-w-xl font-light tracking-[0.2em]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="overflow-hidden flex items-center justify-center"
          >
            <img src={title} alt="Maximus Teo title" />
          </motion.div>

          <div className="overflow-hidden flex items-center justify-center">
            <BlurText
              text="Creating digital experiences that bring imagination to reality."
              delay={100}
              animateBy="words"
              direction="bottom"
              className="text-lg md:text-xl text-white/70 max-w-xl font-light justify-center" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <a href="#about" className="group flex items-center gap-3 mt-8 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 text-white">
              <span className="text-sm font-bold tracking-widest uppercase">Learn More</span>
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

      {/* About Me Section */}
      <section id="about" className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-20 tracking-tight"
          >
            About Me <span className="text-pink-500">.</span>
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-shrink-0"
            >
              <div className="relative w-56 h-75 md:w-72 md:h-96 rounded-3xl overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center group">
                <img
                  src={profile}
                  alt={"Maximus Teo's picture"}
                  loading="lazy"
                />
                {/* Subtle animated border glow */}
                <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-purple-500/30 transition-colors duration-500" />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-6 max-w-2xl"
            >
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Maximus</span>: a
                developer who loves building stuff.
              </h3>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                I'm a creative developer passionate about creating digital experiences that are beautiful <em>and</em> functional.
                Whether it's a sleek web interface or a full-stack application, I love bringing ideas to life through clean code and
                thoughtful design.
              </p>
              <p className="text-white/50 text-base md:text-lg leading-relaxed">
                Currently studying at the University of Ottawa, I enjoy building projects that solve real-world problems, from
                AI-based tools to interactive web experiences. When I'm not coding, you'll find me tinkering with new
                tech and pushing the boundaries of what's possible on the web.
              </p>
              <div className="flex flex-wrap gap-5 mt-2 items-center">
                {['React', 'TypeScript', 'Python', 'Node.js', 'AI/ML', 'UI/UX'].map((skill) => (
                  <TechIcon key={skill} tag={skill} size={24} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 px-6 md:px-12 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-15 tracking-tight"
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

                {/* Award Badge — Top Right */}
                {project.award && (
                  <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Medal size={14} className="text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200/90 whitespace-nowrap">
                      {project.award}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Tech icons row — wraps and stays within box */}
                    <div className="flex flex-wrap gap-4 mb-5 items-center">
                      {project.tags.map(tag => (
                        <TechIcon key={tag} tag={tag} size={20} />
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-white-300 transition-colors">{project.title}</h3>
                    <p className="text-white/60 mb-6 line-clamp-3 max-w-sm">{project.description}</p>
                    {/* Desktop: View Source label; Mobile: just the icon */}
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      <span className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity delay-100">View Source</span>
                      <FaExternalLinkAlt
                        size={14}
                        className="mb-5 md:mb-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity delay-100"
                      />
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
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-15 tracking-tight"
          >
            Media Gallery <span className="text-blue-500">.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${index === 0 ? 'md:col-span-2' : ''}`}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${item.caption}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
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
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-sm font-medium tracking-wide">{item.caption}</span>
                </div>
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
            © {new Date().getFullYear()} Maximus Teo. All rights reserved.
          </footer>
        </div>
      </section>

      {/* Lightbox Modal — rendered at root level so z-index is clean */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
            onClick={closeLightbox}
          >
            {/* Close button — sits ABOVE the inner container so it's not eaten by stopPropagation */}
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-200 p-2 z-10"
            >
              <FaTimes size={24} />
            </button>

            {/* Inner container — stops click-through to overlay for content area */}
            <div
              className="relative flex flex-col items-center max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={mediaItems[lightboxIndex].src}
                  alt={mediaItems[lightboxIndex].caption}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[70vh] w-full object-contain rounded-2xl shadow-2xl"
                />
              </AnimatePresence>

              {/* Caption */}
              <p className="mt-6 text-white/80 text-base md:text-lg font-medium text-center tracking-wide">
                {mediaItems[lightboxIndex].caption}
              </p>

              {/* Counter */}
              <p className="mt-1 text-white/30 text-xs font-mono">
                {lightboxIndex + 1} / {mediaItems.length}
              </p>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-6 mt-6">
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200"
                >
                  <FaChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200"
                >
                  <FaChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;