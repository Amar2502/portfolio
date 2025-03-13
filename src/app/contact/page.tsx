"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Copy, Check, Send, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copiedText, setCopiedText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    { icon: Mail, title: "Email", value: "amarpandey2502@gmail.com" },
    { icon: Phone, title: "Phone", value: "+91 8291613471" },
    { icon: MapPin, title: "Location", value: "Mumbai, India" },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-lg text-muted-foreground">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TooltipProvider>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <Card key={index} className="flex flex-row items-center gap-4 p-4 py-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground break-words">{item.value}</p>
                </div>
                {(item.title === "Email" || item.title === "Phone") && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() => handleCopy(item.value)}
                      >
                        {copiedText === item.value ? (
                          <Check className="h-5 w-5 text-green-500 cursor-pointer" />
                        ) : (
                          <Copy className="h-5 w-5 cursor-pointer" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {copiedText === item.value ? "Copied!" : "Copy"}
                    </TooltipContent>
                  </Tooltip>
                )}
              </Card>
            ))}
          </motion.div>
        </TooltipProvider>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Send a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                      Thank you for your message! I'll get back to you shortly.
                    </AlertDescription>
                  </Alert>
                  <Button onClick={() => setFormStatus("idle")} variant="outline">
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" required value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Message subject" value={formData.subject} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message" rows={5} required value={formData.message} onChange={handleChange} />
                  </div>
                  <Button type="submit" className="w-full" disabled={formStatus === "loading"}>
                    {formStatus === "loading" ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
