// app/skills/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Code, Database, Layout, Server, 
  Cpu, Layers, PenTool, Terminal, 
  DatabaseZap,
  Lightbulb
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SkillsPage() {
  const categories = [
    {
      id: "frontend",
      title: "Frontend",
      icon: Layout,
      description: "Technologies and frameworks I use to build user interfaces",
      skills: [
        { name: "HTML/CSS", level: 100 },
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 80 },
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 70 },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      icon: Server,
      description: "Server-side technologies and frameworks",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "Python", level: 65 },
        { name: "RESTful APIs", level: 90 },
      ],
    },
    {
      id: "database",
      title: "Database",
      icon: Database,
      description: "Database systems and data modeling",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "Firebase", level: 80 },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      icon: PenTool,
      description: "Development tools and environments",
      skills: [
        { name: "Git", level: 90 },
        { name: "VS Code", level: 95 },
      ],
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold mb-4">My Skills</h1>
        <p className="text-lg text-muted-foreground">
          I&apos;ve worked with a variety of technologies and tools throughout my career.
          Here&apos;s a comprehensive overview of my technical skillset.
        </p>
      </motion.div>

      <Tabs defaultValue="frontend" className="mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2 cursor-pointer">
              <category.icon className="h-4 w-4" />
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" /> {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-6"
                >
                  {category.skills.map((skill) => (
                    <motion.div key={skill.name} variants={item}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Additional Technical Knowledge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" /> Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" /> C++
                </li>
                <li className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" /> Python
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" /> Data Structures and Algorithms
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" /> DBMS
                </li>
                <li className="flex items-center gap-2">
                  <DatabaseZap className="h-4 w-4 text-primary" /> SQL
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" /> DevOps & Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> AWS (S3, EC2, Lambda)
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> Vercel
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> GitHub Actions
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}