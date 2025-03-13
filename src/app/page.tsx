// app/page.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Hi, I'm</span> <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Amar Pandey
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-muted-foreground">
            Full Stack Developer & Software Engineer
          </h2>
          <p className="text-lg mb-10 max-w-2xl text-muted-foreground">
            I build scalable, responsive, and high-performance web applications
            using modern technologies. My focus is on writing clean,
            maintainable code and delivering seamless user experiences.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-12 border-t"
      >
        <h3 className="text-2xl font-semibold mb-6">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "CodeShare",
              description:
                "A real-time code sharing platform for developers to share their frontedn without the need of github or hosting. Built with Next.js, Tailwind CSS, and Firebase.",
              link: "https://codeshare.space",
            },
            {
              title: "Library Management System",
              description:
                "A web-based system for managing book registrations, listings, and user access. Developed with MERN for seamless user experience.",
              link: "https://github.com/Amar2502/Library_Management",
            },
          ].map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="rounded-lg border bg-card text-card-foreground shadow p-6"
            >
              <h4 className="text-xl font-medium mb-2">{project.title}</h4>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                View Project →
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" asChild>
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="py-12 border-t"
      >
        <h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
