import { NextResponse } from 'next/server';

// This is a sample project data. In a real application, this would come from a database.
const projects = [
  {
    id: '1',
    title: "CodeShare",
    description:
      "A real-time code sharing platform with syntax highlighting and website sharing feature with just a single click without any hosting knowledge required.",
    tags: ["Next.js", "React", "MongoDB", "Tailwindcss", "Shadcn"],
    githubUrl: "https://github.com/Amar2502/codeshare",
    liveUrl: "https://codeshare.space",
    image: "/codeshare.png",
    date: '2024-02-28',
  },
  {
    id: '2',
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
    githubUrl: "https://github.com/Amar2502/Library_Management",
    liveUrl: "https://amarpandey.in/librarymanagement",
    image: "/libraryManagement.png",
    date: '2023-12-01',
  },
  {
    id: '3',
    title: "Interactive Quiz App",
    description:
      "A dynamic quiz application with real-time scoring, leaderboards, and customizable question sets for engaging learning experiences.",
    tags: ["React", "Tailwind CSS"],
    githubUrl: "https://github.com/Amar2502/Quiz_App",
    liveUrl: "https://amarpandey.in/quizapp",
    image: "/QuizApp.png",
    date: '2023-11-15',
  },
];

export async function GET() {
  return NextResponse.json(projects);
} 