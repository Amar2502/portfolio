// File: app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, Mail, Menu, X, ExternalLink, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  // Navigation items
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#github", label: "GitHub" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth"
    });
  };

  // Project data
  const projects = [
    {
      title: "CodeShare",
      description: "A real-time code sharing platform with syntax highlighting and website sharing feature with just a single click without any hosting knowledge required.",
      tags: ["Nextjs", "React", "MongoDB", "Tailwindcss", "Shadcn"],
      github: "https://github.com/Amar2502/codeshare",
      demo: "https://codeshare.space",
      image: "/codeshare.png"
    },
    {
      title: "Library Management System",
      description: "A comprehensive library management solution with features for book tracking, user management, admin dashboard, and more.",
      tags: ["React.js", "JavaScript", "Node.js", "Express.js", "MongoDB", "Tailwindcss"],
      github: "https://github.com/Amar2502/Library_Management",
      demo: "https://amarpandey.in/librarymanagement",
      image: "/libraryManagement.png"
    },
    {
      title: "Interactive Quiz App",
      description: "A dynamic quiz application with real-time scoring, leaderboards, and customizable question sets for engaging learning experiences.",
      tags: ["React", "Tailwind CSS"],
      github: "https://github.com/Amar2502/Quiz_App",
      demo: "https://amarpandey.in/quizapp",
      image: "/QuizApp.png"
    }
  ];

  // Blog data
  const blogs = [
    {
      title: "Understanding React Hooks",
      excerpt: "A deep dive into React's Hooks API and how it changed the way we write components.",
      date: "March 1, 2025",
      tags: ["React", "JavaScript", "Web Development"],
      slug: "/blog/understanding-react-hooks"
    },
    {
      title: "Building with Next.js 14",
      excerpt: "Exploring the new features and improvements in Next.js 14 and how to leverage them.",
      date: "February 15, 2025",
      tags: ["Next.js", "React", "Server Components"],
      slug: "/blog/building-with-nextjs-14"
    },
    {
      title: "Mastering Tailwind CSS",
      excerpt: "Tips and tricks for getting the most out of Tailwind CSS in your projects.",
      date: "January 28, 2025",
      tags: ["CSS", "Tailwind", "Design"],
      slug: "/blog/mastering-tailwind-css"
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
              YourName
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
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden space-x-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Hi, I'm <span className="text-black dark:text-white">Your Name</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Full Stack Developer specializing in modern web technologies
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#projects" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-md transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square">
                <Image
                  src="/amar.jpg"
                  alt="Amar Pandey"
                  fill
                  className="object-cover object-[-100px_center]"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I'm a passionate developer with expertise in building modern web applications. 
                  I enjoy solving complex problems and creating intuitive user experiences.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  With a background in computer science and several years of industry experience,
                  I bring a unique perspective to every project I work on.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-md transition-colors"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
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
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
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

      {/* GitHub Section */}
      <section id="github" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">GitHub Contributions</h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Github className="mr-2" />
                  <span className="font-semibold">github.com/yourusername</span>
                </div>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-md transition-colors"
                >
                  View Profile
                </a>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array(52).fill(0).map((_, i) => (
                  <div key={i} className="grid grid-rows-7 gap-1">
                    {Array(7).fill(0).map((_, j) => {
                      // Random contribution level (0-4)
                      const level = Math.floor(Math.random() * 5);
                      const colors = [
                        "bg-gray-200 dark:bg-gray-600",
                        "bg-green-100 dark:bg-green-900",
                        "bg-green-300 dark:bg-green-700",
                        "bg-green-500 dark:bg-green-500",
                        "bg-green-700 dark:bg-green-300"
                      ];
                      return (
                        <div 
                          key={j} 
                          className={`w-3 h-3 rounded-sm ${colors[level]}`}
                          title={`${level} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Displaying a simplified version of GitHub contributions. Visit my profile for more details.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={blog.slug} className="block h-full">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                      <div className="p-6 flex-grow">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{blog.date}</div>
                        <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.excerpt}</p>
                      </div>
                      <div className="px-6 pb-6 flex flex-wrap gap-2">
                        {blog.tags.map((tag, tagIndex) => (
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
              ))}
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
            <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    disabled={formStatus === 'loading'}
                    className={`w-full px-4 py-2 text-white rounded-md transition-colors ${
                      formStatus === 'loading' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                  {formStatus === 'success' && (
                    <p className="mt-2 text-green-600 dark:text-green-400 text-center">Message sent successfully!</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="mt-2 text-red-600 dark:text-red-400 text-center">Failed to send message. Please try again.</p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social" className="py-16 bg-gradient-to-b from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Connect With Me</h2>
            <div className="flex justify-center gap-6 mb-8">
              <motion.a 
                href="https://github.com/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-4 rounded-full hover:scale-110 transition-transform"
                whileHover={{ y: -5 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-4 rounded-full hover:scale-110 transition-transform"
                whileHover={{ y: -5 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a 
                href="https://twitter.com/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-4 rounded-full hover:scale-110 transition-transform"
                whileHover={{ y: -5 }}
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a 
                href="mailto:your.email@example.com" 
                className="bg-white text-gray-900 p-4 rounded-full hover:scale-110 transition-transform"
                whileHover={{ y: -5 }}
              >
                <Mail size={24} />
              </motion.a>
            </div>
            <p className="text-xl">
              Let's build something amazing together!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400 text-center">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="text-sm mt-2">Built with Next.js, Tailwind CSS, and ♥</p>
        </div>
      </footer>
    </main>
  );
}