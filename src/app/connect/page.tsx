"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M17.7 3H21l-7.5 8.6L22 21h-6.4l-4.8-6.1L5 21H1.3l8-9.2L2 3h6.5l4.3 5.5L17.7 3zM16 19h2.1L7.3 5H5.1l10.9 14z" />
  </svg>
);

const PeerlistIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M8.87 3h6.26a6 6 0 0 1 5.963 5.337l.21 1.896c.131 1.174.131 2.36 0 3.534l-.21 1.896A6 6 0 0 1 15.13 21H8.87a6 6 0 0 1-5.963-5.337l-.21-1.896a16 16 0 0 1 0-3.534l.21-1.896A6 6 0 0 1 8.87 3" />
      <path d="M9 17v-4m0 0V7h4a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3z" />
    </g>
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 432 432"
  >
    <path
      fill="currentColor"
      d="M364.5 65Q427 127 427 214.5T364.5 364T214 426q-54 0-101-26L0 429l30-109Q2 271 2 214q0-87 62-149T214 3t150.5 62zM214 390q73 0 125-51.5T391 214T339 89.5T214 38T89.5 89.5T38 214q0 51 27 94l4 6l-18 65l67-17l6 3q42 25 90 25zm97-132q9 5 10 7q4 6-3 25q-3 8-15 15.5t-21 9.5q-18 2-33-2q-17-6-30-11q-8-4-15.5-8.5t-14.5-9t-13-9.5t-11.5-10t-10.5-10.5t-8.5-9.5t-7-8.5t-5.5-7t-3.5-5L128 222q-22-29-22-55q0-24 19-44q6-7 14-7q6 0 10 1q8 0 12 9q2 3 6 13l7 17.5l3 8.5q3 5 1 9q-3 7-5 9l-3 3l-3 3.5l-2 2.5q-6 6-3 11q13 22 30 37q13 11 43 26q7 3 11-1q12-15 17-21q4-6 12-3q6 3 36 17z"
    />
  </svg>
);

export default function ConnectWithMe() {

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/amar2502" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/amar-pandey-486ab6337/",
    },
    { name: "X", icon: XIcon, url: "https://x.com/amarpandey2502" },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/amarpandey2502/",
    },
    {
      name: "PeerList",
      icon: PeerlistIcon,
      url: "https://peerlist.io/amar2502",
    },
    {
      name: "Whatsapp",
      icon: WhatsAppIcon,
      url: "https://wa.me/qr/T3HUCVOZBRPQD1",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col items-center text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Connect with Me
      </motion.h2>
      <motion.p
        className="text-lg text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Feel free to reach out through any of the platforms below!
      </motion.p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 border rounded-lg bg-card shadow-md hover:bg-primary hover:text-white transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <link.icon className="w-6 h-6" />
            <span className="text-sm font-medium">{link.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
