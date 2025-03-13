"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2, ImagePlus, Bold, Italic, List, ListOrdered, Quote, Code, Strikethrough } from "lucide-react";
import ImageComponent from "next/image";
import { toast } from "sonner";

export default function BlogAdminPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // TipTap Editor Setup
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
      Image,
      HardBreak,
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose max-w-none border bg-zinc-900 border-zinc-700 p-4 rounded-lg min-h-[300px] focus:outline-none text-white",
      },
    },
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setCoverImage(data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed!");
    }
  };

  const handlePublish = async () => {
    if (!title || !editor?.getHTML() || !excerpt || !tags) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: editor.getHTML(),
          coverImage,
          excerpt,
          tags: tags.split(","),
        }),
      });
      if (response.ok) {
        toast.success("Blog published successfully!");
        router.push("/blogs");
      } else {
        toast.error("Failed to publish blog!");
      }
    } catch (error) {
      console.error("Failed to publish blog:", error);
      toast.error("Failed to publish blog!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-background border border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Write a Blog
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Input type="text" placeholder="Title" className="bg-zinc-900 border-zinc-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input type="text" placeholder="Short description..." className="bg-zinc-900 border-zinc-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
              <Input type="text" placeholder="Tags (comma-separated)" className="bg-zinc-900 border-zinc-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={tags} onChange={(e) => setTags(e.target.value)} />

              {!coverImage && (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-zinc-900 border-zinc-700 hover:bg-gray-750 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">Drag & drop an image or click to upload</p>
                    </div>
                    <input type="file" className="hidden" onChange={(e) => e.target.files && uploadImage(e.target.files[0])} />
                  </label>
                </div>
              )}

              {coverImage && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative w-full h-90 rounded-lg overflow-hidden">
                  <ImageComponent src={coverImage} alt="Cover" fill className="object-cover" />
                </motion.div>
              )}

              {/* Toolbar */}
              <div className="flex gap-2 mb-4">
                <Button onClick={() => editor?.chain().focus().toggleBold().run()}><Bold /></Button>
                <Button onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic /></Button>
                <Button onClick={() => editor?.chain().focus().toggleStrike().run()}><Strikethrough /></Button>
                <Button onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered /></Button>
                <Button onClick={() => editor?.chain().focus().toggleBulletList().run()}><List /></Button>
                <Button onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote /></Button>
                <Button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}><Code /></Button>
              </div>

              {/* Editor */}
              <div className="border rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-lg transition-all hover:shadow-xl outline-0">
                <EditorContent editor={editor} />
              </div>

              <Button onClick={handlePublish} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2" disabled={loading}>
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</> : "Publish"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
