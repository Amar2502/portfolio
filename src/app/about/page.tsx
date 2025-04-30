// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  Code,
  Download,
  Lightbulb,
  GraduationCap,
  Database,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const skills = [
    { name: "Development", icon: Code },
    { name: "Data Structures & Algorithm", icon: Lightbulb },
    { name: "DBMS", icon: Database },
  ];

  const projects = [
    {
      title: "CodeShare",
      description:
        "Developed a code and website sharing platform with a single shareable url, using Next.js and MongoDB",
    },
    {
      title: "Library Management System",
      description: "Developed a library management system using MERN",
    },
    {
      title: "Portfolio Website",
      description: "Designed and developed my personal portfolio",
    },
    {
      title: "Quiz App",
      description: "Developed a quiz application using RapidAPI and React",
    }
  ];

  const educationDetails = [
    {
      degree: "BTech in Computer Engineering",
      institution: "Dr. Babasaheb Ambedkar Technological University",
      period: "2023 - 2027",
      description:
        "Focusing on software development, data structures, and algorithms, Computer Networks and Database Management.",
    },
    {
      degree: "Higher Secondary Education",
      institution: "St. Thomas Junior College",
      period: "2020 - 2022",
      description: "Completed with focus on Mathematics and Science.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-8"
      >
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <p className="text-lg mb-4">
              Hello! I&apos;m Amar, an aspiring developer with a passion for
              creating intuitive and engaging web experiences.
            </p>
            <p className="text-lg mb-4">
              I&apos;m currently exploring the world of web development and
              constantly learning new technologies. While I&apos;m early in my
              journey, I&apos;m enthusiastic about building my skills and taking
              on new challenges.
            </p>
            <p className="text-lg mb-6">
              I believe in writing clean, readable code and focusing on
              user-centered design. I&apos;m excited to grow my portfolio and
              contribute to meaningful projects.
            </p>

            <div className="flex gap-4 mb-8">
              <Button asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/resume.pdf" download legacyBehavior passHref>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:bg-zinc-800 hover:text-amber-50 p-1 rounded-lg "
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </a>
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src="/amar.jpg"
                  alt="Amar's Profile"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-right
                   rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Education Section (replaces Photo Gallery) */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="py-8 border-t"
      >
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" /> Education
        </h2>
        <div className="space-y-6">
          {educationDetails.map((education, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-card border rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-xl font-medium">{education.degree}</h3>
              <p className="text-sm font-medium text-primary">
                {education.institution}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                {education.period}
              </p>
              <p className="text-muted-foreground">{education.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="py-8 border-t"
      >
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Code className="mr-2 h-5 w-5" /> Skills & Interests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-card border rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <skill.icon className="h-6 w-6 mr-2 text-primary" />
                <h3 className="text-xl font-medium">{skill.name}</h3>
              </div>
              <div className="space-y-2">
                {skill.name === "Development" && (
                  <>
                    <p className="text-muted-foreground">
                      • Building full-stack applications
                    </p>
                    <p className="text-muted-foreground">
                      • Learning advanced frameworks
                    </p>
                    <p className="text-muted-foreground">
                      • Exploring scalable architectures
                    </p>
                  </>
                )}
                {skill.name === "Data Structures & Algorithm" && (
                  <>
                    <p className="text-muted-foreground">
                      • Practicing problem-solving
                    </p>
                    <p className="text-muted-foreground">
                      • Improving algorithmic efficiency
                    </p>
                    <p className="text-muted-foreground">
                      • Preparing for coding challenges
                    </p>
                  </>
                )}
                {skill.name === "DBMS" && (
                  <>
                    <p className="text-muted-foreground">
                      • Understanding relational databases
                    </p>
                    <p className="text-muted-foreground">
                      • Learning query optimization
                    </p>
                    <p className="text-muted-foreground">
                      • Exploring NoSQL and scaling techniques
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="py-8 border-t"
      >
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <BookOpen className="mr-2 h-5 w-5" /> Projects
        </h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex border-l-4 border-primary pl-4"
            >
              <div>
                <h3 className="text-xl font-medium">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="py-8 border-t"
      >
        <h2 className="text-2xl font-semibold mb-6">What I&apos;m Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Technical Skills</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• React, Next.js, and TypeScript</li>
              <li>• Tailwind CSS and ShadCN UI</li>
              <li>• JavaScript, DOM, and Firebase</li>
              <li>• Full-stack development with MongoDB</li>
              <li>• Data Structures & Algorithms (C++)</li>
            </ul>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Personal Development</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Problem-solving approaches</li>
              <li>• Time management</li>
              <li>• Project organization</li>
              <li>• Continuous learning habits</li>
              <li>• Passion for innovation and cutting-edge tech</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
