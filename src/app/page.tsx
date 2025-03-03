// File: app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
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
      demo: "https://amarpandey.in/librarymanagement",
      image: "/libraryManagement.png",
    },
    {
      title: "Interactive Quiz App",
      description:
        "A dynamic quiz application with real-time scoring, leaderboards, and customizable question sets for engaging learning experiences.",
      tags: ["React", "Tailwind CSS"],
      github: "https://github.com/Amar2502/Quiz_App",
      demo: "https://amarpandey.in/quizapp",
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
                      className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md"
                      onClick={(e) => {
                        setIsMenuOpen(false);
                        handleScroll(e);
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
      <section className="container mx-auto px-4 py-24 md:py-32 mt-16">
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
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
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
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Full Stack Developer specializing in modern web technologies
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a
              href="#projects"
              onClick={handleScroll}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              onClick={handleScroll}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square"
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
              >
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I'm a passionate developer with expertise in modern web
                  development. I enjoy solving complex problems and building
                  intuitive, efficient applications.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  With a strong background in computer science and hands-on
                  experience in full-stack development, I bring an innovative
                  and practical approach to every project I work on.
                </p>
                <motion.div 
                  className="flex gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-md transition-colors"
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
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                    <div className="h-48 relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 pb-6 flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                      >
                        <ExternalLink size={16} />
                        <span>Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="/projects"
                className="px-4 py-2 flex items-center justify-center mx-auto w-max bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills & Education Section */}
      <section id="skills" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Skills & Education
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Skills Section */}
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <code className="text-blue-600 dark:text-blue-400 mr-2">
                    {"<Skills />"}
                  </code>
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">Frontend</h4>
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
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Backend</h4>
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
                          className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Tools & Others</h4>
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
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <code className="text-blue-600 dark:text-blue-400 mr-2">
                    {"<Education />"}
                  </code>
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium">
                      Bachelor of Technology
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Computer Engineering
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Dr. Babasaheb Ambedkar Technological University
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      2020 - 2024
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Relevant Coursework</h4>
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
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm"
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
      <section id="blog" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Latest Blog Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400">
                  Loading posts...
                </div>
              ) : recentPosts.length > 0 ? (
                recentPosts.map((blog) => (
                  <motion.div
                    key={blog._id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href={blog.slug} className="block h-full">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                        <div className="p-6 flex-grow">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {blog.date}
                          </div>
                          <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {blog.excerpt}
                          </p>
                        </div>
                        <div className="px-6 pb-6 flex flex-wrap gap-2">
                          {blog.tags.map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400">
                  No blog posts available yet.
                </div>
              )}
            </div>
            <div className="text-center mt-10">
              <a
                href="/blog"
                className="px-4 py-2 flex items-center justify-center mx-auto w-max bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Get In Touch
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className={`w-full px-4 py-2 text-white rounded-md transition-colors ${
                      formStatus === "loading"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {formStatus === "loading" ? "Sending..." : "Send Message"}
                  </button>
                  {formStatus === "success" && (
                    <p className="mt-2 text-green-600 dark:text-green-400 text-center">
                      Message sent successfully!
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="mt-2 text-red-600 dark:text-red-400 text-center">
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
        className="py-16 bg-gradient-to-b from-blue-600 to-purple-600 text-white"
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
              className="text-3xl font-bold mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Connect With Me
            </motion.h2>
            <motion.div 
              className="flex justify-center gap-6 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { icon: <Github size={24} />, href: "https://github.com/amar2502" },
                { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/amar-pandey-486ab6337/" },
                { icon: <Twitter size={24} />, href: "https://x.com/amarpandey2502" },
                { icon: <Instagram size={24} />, href: "https://instagram.com/amarpandey2502" },
                { icon: <Mail size={24} />, href: "mailto:amarpandey2502@gmail.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 p-4 rounded-full hover:scale-110 transition-transform"
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
              className="text-xl"
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
        className="py-6 bg-gray-900/95 backdrop-blur-sm text-gray-400 text-center text-sm border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span>©{new Date().getFullYear()}</span>
            <span className="font-medium text-gray-300">Amar Pandey</span>
            <span className="text-gray-500">•</span>
            <span>Made with</span>
            <motion.span 
              className="text-red-500"
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
              className="text-blue-400 hover:text-blue-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Next.js
            </motion.a>
          </motion.div>
        </div>
      </motion.footer>
    </main>
  );
}

