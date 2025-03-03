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
      description: 'The requested blog post could not be found.',
    }
  }
}

async function fetchPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  });
  
  if (!res.ok) throw new Error('Failed to fetch post');
  
  return res.json();
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  let post;
  try {
    post = await fetchPost(params.id);
  } catch (error) {
    notFound();
  }

  return <BlogPostContent post={post} />;
} 