// app/page.js
'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Github, Twitter, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Add smooth scrolling behavior
    const handleNavLinkClick = (e) => {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        if (link === e.target) {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset to account for fixed header
              behavior: 'smooth'
            });
          }
        }
      });
    };

    // Add event listeners to all navbar links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    // Cleanup event listeners
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="px-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-backdrop-blur:bg-white/60 dark:border-slate-800">
          <div className="container flex h-16 items-center justify-between">
            <div className="font-bold text-xl">Amar Pandey</div>
            <nav className="hidden md:flex gap-6">
              <a href="#about" className="hover:text-slate-600 dark:hover:text-slate-300">About</a>
              <a href="#projects" className="hover:text-slate-600 dark:hover:text-slate-300">Projects</a>
              <a href="#skills" className="hover:text-slate-600 dark:hover:text-slate-300">Skills</a>
              <a href="#contact" className="hover:text-slate-600 dark:hover:text-slate-300">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button>Contact Me</Button>
            </div>
          </div>
        </header>
        
        {/* Hero Section */}
        <section className="container py-24 md:py-32 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-2/3 space-y-4">
              <Badge variant="outline" className="px-3 py-1 text-sm rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 text-violet-900 dark:text-violet-300">
                Computer Engineering Student
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold">
                Hi, I'm Amar Pandey<br />
                <span className="text-violet-600 dark:text-violet-400">Aspiring Developer</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl">
                Second-year Computer Engineering student passionate about building web applications with modern technologies.
              </p>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="gap-2">
                  Download Resume <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <Avatar className="h-64 w-64 border-4 border-violet-200 dark:border-violet-800">
                <AvatarImage src="/api/placeholder/400/400" alt="Profile" />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="bg-slate-50 dark:bg-slate-800/50 py-20 px-5">
          <div className="container space-y-12">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">About Me</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                A passionate student exploring the world of web development
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">My Journey</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  I'm currently in my second year of Computer Engineering. What started as curiosity has evolved into a dedicated 
                  pursuit of creating functional solutions.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  I've completed several projects during my learning journey, including 2 full-stack 
                  applications and various smaller React projects. I'm constantly exploring new 
                  technologies and improving my skills through hands-on projects and online courses.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 space-y-2">
                    <div className="text-4xl font-bold text-violet-600 dark:text-violet-400">2</div>
                    <div className="font-medium">Full-Stack Projects</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-2">
                    <div className="text-4xl font-bold text-violet-600 dark:text-violet-400">5+</div>
                    <div className="font-medium">React Projects</div>
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardContent className="p-6 space-y-2">
                    <div className="text-4xl font-bold text-violet-600 dark:text-violet-400">2nd</div>
                    <div className="font-medium">Year Computer Engineering Student</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container space-y-12">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">My Projects</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                A collection of my learning projects and academic work
              </p>
            </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Card key={item} className="overflow-hidden group">
                      <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                        <img 
                          src={`/api/placeholder/400/300`} 
                          alt={`Project ${item}`}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <Button size="sm" variant="secondary" className="h-8">View Project</Button>
                          <Button size="sm" variant="outline" className="h-8 bg-transparent text-white border-white hover:bg-white/20">
                            <Github className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-1 flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{item <= 2 ? "Full-Stack" : "React"}</Badge>
                          <Badge variant="secondary" className="text-xs">{item <= 2 ? "MERN" : "Frontend"}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg">Project {item}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item <= 2 
                            ? "A complete web application with frontend and backend components." 
                            : "A React-based interface with responsive design and modern features."}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="bg-slate-50 dark:bg-slate-800/50 py-20">
          <div className="container space-y-12">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">My Skills</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Technologies and tools I'm currently learning and using in my projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v6l-4 2"/><path d="m2 10 4 2v6l-4 2"/><path d="m10 12 4 2v6l-4 2"/><path d="m10 12 4-2"/><path d="m14 14 4-2"/><path d="m6 14 4-2"/><path d="m18 18v-6"/><path d="m6 18v-6"/></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Frontend Development</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                      Building responsive user interfaces with modern frameworks.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['React', 'Next.js', 'HTML/CSS', 'JavaScript', 'Tailwind CSS'].map((skill) => (
                      <Badge key={skill} variant="outline" className="justify-center">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><path d="M16 22c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-4Z"/></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Backend Development</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                      Creating APIs and server-side applications.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Node.js', 'Express', 'MongoDB', 'REST API', 'Firebase'].map((skill) => (
                      <Badge key={skill} variant="outline" className="justify-center">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="bg-slate-50 dark:bg-slate-800/50 py-20">
          <div className="container space-y-12">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Get In Touch</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Interested in collaborating on a project or just want to say hi? Feel free to reach out!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          placeholder="Your name"
                          className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <input
                        id="subject"
                        placeholder="What's this about?"
                        className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Your message here..."
                        rows={5}
                        className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      ></textarea>
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-300">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Email</div>
                        <div>amarpandey2502@gmail.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">University</div>
                        <div>Computer Engineering Department</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                  <div className="flex gap-4">
                    <a href="https://github.com/Amar2502" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="https://x.com/amarpandey2502" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="https://linkedin.com/in/amar-pandey-486ab6337/" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Open to Opportunities</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      I'm looking for internships and student projects to apply my skills and continue learning. Let's connect!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t py-12 mt-20">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="font-bold text-xl mb-2">Amar.dev</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Computer Engineering Student & Web Developer
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-end">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  © {new Date().getFullYear()} Amar Pandey. All rights reserved.
                </div>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}