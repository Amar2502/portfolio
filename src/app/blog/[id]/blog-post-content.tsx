"use client"

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const readingTime = Math.ceil(post.content.length / 1000);
  
  // Format date consistently
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.a
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
            whileHover={{ x: -5 }}
            variants={itemVariants}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </motion.a>

          <motion.header 
            className="mb-12"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6"
              variants={itemVariants}
            >
              {post.title}
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                <Calendar className="w-4 h-4 text-blue-500" />
                <time dateTime={post.date}>{formattedDate}</time>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                <Clock className="w-4 h-4 text-purple-500" />
                <span>{readingTime} min read</span>
              </motion.div>
            </motion.div>

            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              {post.excerpt}
            </motion.p>
          </motion.header>

          <motion.div 
            className="prose dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-img:rounded-xl prose-img:shadow-lg
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
              prose-code:text-blue-600 dark:prose-code:text-blue-400
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-ul:list-disc prose-ul:text-gray-700 dark:prose-ul:text-gray-300
              prose-ol:list-decimal prose-ol:text-gray-700 dark:prose-ol:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
            variants={itemVariants}
          />

          <motion.div 
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-xl font-semibold mb-6 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Tags
            </motion.h2>
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 
                    text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium
                    border border-blue-100 dark:border-blue-800"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    transition: { duration: 0.2 }
                  }}
                  variants={itemVariants}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.article>
      </div>
    </main>
  );
} 