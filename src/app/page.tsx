// File: app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Menu,
  X,
  ExternalLink,
  Moon,
  Sun,
  Instagram,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  slug: string;
}

export default function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const response = await fetch('/api/blog?limit=3');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const posts = await response.json();
        setRecentPosts(posts.map((post: any) => ({
          ...post,
          date: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          slug: `/blog/${post._id}`
        })));
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentPosts();
  }, []);

  // Navigation items
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  // Project data
  const projects = [
    {
      title: "CodeShare",
      description:
        "A real-time code sharing platform with syntax highlighting and website sharing feature with just a single click without any hosting knowledge required.",
      tags: ["Nextjs", "React", "MongoDB", "Tailwindcss", "Shadcn"],
      github: "https://github.com/Amar2502/codeshare",
      demo: "https://codeshare.space",
      image: "/codeshare.png",
    },
    {
      title: "Library Management System",
      description:
        "A comprehensive library management solution with features for book tracking, user management, admin dashboard, and more.",
      tags: [
        "React.js",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwindcss",
      ],
      github: "https://github.com/Amar2502/Library_Management",
      // demo: "https://amarpandey.in/librarymanagement",
      image: "/libraryManagement.png",
    },
    {
      title: "Interactive Quiz App",
      description:
        "A dynamic quiz application with real-time scoring, leaderboards, and customizable question sets for engaging learning experiences.",
      tags: ["React", "Tailwind CSS"],
      github: "https://github.com/Amar2502/Quiz_App",
      // demo: "https://amarpandey.in/quizapp",
      image: "/QuizApp.png",
    },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a
              href="#"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              Amar Pandey
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                  onClick={handleScroll}
                >
                  {item.label}
                </a>
              ))}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden space-x-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}
              <button
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4"
              >
                <div className="flex flex-col space-y-2 py-4">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                      onClick={(e) => {
                        handleScroll(e);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-36 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            bounce: 0.4
          }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Hi, I'm{" "}
            <motion.span 
              className="text-black dark:text-white"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Amar Pandey
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Full Stack Developer specializing in modern web technologies
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a
              href="#projects"
              onClick={handleScroll}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              onClick={handleScroll}
              className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-md transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <motion.div 
                className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square max-w-sm mx-auto w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/amar.jpg"
                  alt="Amar Pandey"
                  fill
                  className="object-cover object-[-100px_center]"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  I'm a passionate developer with expertise in modern web
                  development. I enjoy solving complex problems and building
                  intuitive, efficient applications.
                </p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  With a strong background in computer science and hands-on
                  experience in full-stack development, I bring an innovative
                  and practical approach to every project I work on.
                </p>
                <motion.div 
                  className="flex justify-center sm:justify-start"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-md transition-colors text-sm sm:text-base text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download Resume
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div 
              className="text-center mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3 sm:mb-4"
              >
                Featured Projects
              </motion.h2>
              <motion.p 
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                A collection of my recent works showcasing my skills and expertise
              </motion.p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <a 
                      href={project.demo || project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block relative h-40 sm:h-48 overflow-hidden"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <motion.span 
                          className="px-4 sm:px-6 py-2 sm:py-3 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white rounded-full flex items-center gap-2 font-medium shadow-lg text-sm sm:text-base"
                          whileHover={{ scale: 1.05 }}
                        >
                          <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                          {project.demo ? 'View Demo' : 'View on GitHub'}
                        </motion.span>
                      </motion.div>
                    </a>
                    <div className="p-4 sm:p-6">
                      <motion.h3 
                        className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2"
                        whileHover={{ x: 5 }}
                      >
                        {project.description}
                      </motion.p>
                      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 
                              text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium
                              border border-blue-100 dark:border-blue-800"
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <Github size={16} className="sm:w-5 sm:h-5" />
                          <span>Code</span>
                        </motion.a>
                        {project.demo && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                            <span>Live Demo</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/projects"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300
                  hover:scale-105 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects 
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills & Education Section */}
      <section id="skills" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
              Skills & Education
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* Skills Section */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  <code className="text-blue-600 dark:text-blue-400 mr-2">
                    {"<Skills />"}
                  </code>
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-medium mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Tailwind CSS",
                        "HTML5",
                        "CSS3",
                        "JavaScript",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium mb-2">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Node.js",
                        "Express.js",
                        "MongoDB",
                        "PostgreSQL",
                        "RESTful APIs",
                        "GraphQL",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium mb-2">Tools & Others</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Git",
                        "Docker",
                        "AWS",
                        "Firebase",
                        "VS Code",
                        "Figma",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  <code className="text-blue-600 dark:text-blue-400 mr-2">
                    {"<Education />"}
                  </code>
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-medium">
                      Bachelor of Technology
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      Computer Engineering
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Dr. Babasaheb Ambedkar Technological University
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      2020 - 2024
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        "Data Structures",
                        "Algorithms",
                        "Web Development",
                        "Database Management",
                        "Operating Systems",
                        "Computer Networks",
                      ].map((course) => (
                        <span
                          key={course}
                          className="px-2 sm:px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-xs sm:text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Latest Blog Posts
            </motion.h2>
            <motion.p 
              className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Insights, tutorials, and thoughts on web development
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {loading ? (
                <div className="col-span-3 text-center py-8 sm:py-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </motion.div>
                </div>
              ) : recentPosts.length > 0 ? (
                recentPosts.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <a href={`/blog/${blog._id}`} className="block h-full">
                      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                        <div className="p-4 sm:p-6 flex-grow">
                          <motion.div 
                            className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mb-2 sm:mb-3 font-medium"
                            whileHover={{ x: 5 }}
                          >
                            {blog.date}
                          </motion.div>
                          <motion.h3 
                            className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            {blog.title}
                          </motion.h3>
                          <motion.p 
                            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-3"
                            whileHover={{ x: 5 }}
                          >
                            {blog.excerpt}
                          </motion.p>
                        </div>
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 
                                  text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium
                                  border border-blue-100 dark:border-blue-800"
                                whileHover={{ 
                                  scale: 1.05,
                                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                                  transition: { duration: 0.2 }
                                }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 sm:py-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm sm:text-base text-gray-500 dark:text-gray-400"
                  >
                    No blog posts available yet.
                  </motion.div>
                </div>
              )}
            </div>

            <motion.div 
              className="text-center mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/blog"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300
                  hover:scale-105 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Posts 
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
              Get In Touch
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className={`w-full px-4 py-2.5 text-sm sm:text-base text-white rounded-md transition-colors ${
                      formStatus === "loading"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {formStatus === "loading" ? "Sending..." : "Send Message"}
                  </button>
                  {formStatus === "success" && (
                    <p className="mt-2 text-sm sm:text-base text-green-600 dark:text-green-400 text-center">
                      Message sent successfully!
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="mt-2 text-sm sm:text-base text-red-600 dark:text-red-400 text-center">
                      Failed to send message. Please try again.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section
        id="social"
        className="py-6 sm:py-8 md:py-12 bg-gradient-to-b from-blue-600 to-purple-600 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Connect With Me
            </motion.h2>
            <motion.div 
              className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { 
                  icon: <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, 
                  href: "https://github.com/amar2502",
                  label: "GitHub"
                },
                { 
                  icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, 
                  href: "https://www.linkedin.com/in/amar-pandey-486ab6337/",
                  label: "LinkedIn"
                },
                { 
                  icon: <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, 
                  href: "https://x.com/amarpandey2502",
                  label: "Twitter"
                },
                { 
                  icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, 
                  href: "https://instagram.com/amarpandey2502",
                  label: "Instagram"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="bg-white text-gray-900 p-2 sm:p-3 md:p-4 rounded-full hover:scale-110 transition-transform"
                  whileHover={{ 
                    y: -5, 
                    scale: 1.2,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
            <motion.p 
              className="text-sm sm:text-base md:text-lg font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Let's build something amazing together!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-3 sm:py-4 bg-gray-900/95 backdrop-blur-sm text-gray-400 text-center border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2 gap-y-1 text-[10px] sm:text-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span>©{new Date().getFullYear()}</span>
            <span className="font-medium text-gray-300">Amar Pandey</span>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <div className="flex items-center gap-x-1">
              <span>Made with</span>
              <motion.span 
                className="text-red-500 inline-block"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ♥
              </motion.span>
              <span>using</span>
              <motion.a 
                href="https://nextjs.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Next.js
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </main>
  );
}

