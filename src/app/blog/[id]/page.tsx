import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from './blog-post-content';

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const post = await fetchPost(params.id);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} | Amar Pandey's Blog`,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: ['Amar Pandey'],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      }
    }
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
      description: `The requested blog post could not be found, ${error}`,
    }
  }
}

async function fetchPost(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  try {
    const post = await fetchPost(params.id);
    return <BlogPostContent post={post} />;
  } catch (error) {
    notFound();
  }
} 