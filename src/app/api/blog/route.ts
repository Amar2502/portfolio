import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface BlogPost {
  _id?: ObjectId | string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  views?: number;
  lastUpdated?: string;
}

// Enhanced error handling utility
function handleServerError(error: unknown, context: string) {
  console.error(`❌ Error in ${context}:`, error);
  
  return NextResponse.json({ 
    error: "Internal Server Error", 
    message: error instanceof Error ? error.message : "An unexpected error occurred" 
  }, { status: 500 });
}

// Validation function
function validateBlogPost(data: BlogPost): BlogPost | null {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }

  if (!data.content || data.content.trim().length < 10) {
    errors.push("Content must be at least 10 characters long");
  }

  if (!data.excerpt || data.excerpt.trim().length < 10) {
    errors.push("Excerpt must be at least 10 characters long");
  }

  if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push("At least one tag is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join('; '));
  }

  return {
    title: data.title.trim(),
    content: data.content.trim(),
    excerpt: data.excerpt.trim(),
    tags: Array.isArray(data.tags) 
      ? data.tags.map((tag: string) => tag.trim()).filter(Boolean)
      : [],
    date: new Date().toISOString(),
    views: 0
  };
}

// GET all blog posts with enhanced filtering and pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const skip = (page - 1) * limit;

    // Optional filtering
    const tag = searchParams.get('tag');

    const db = await dbConnect();
    const query = tag 
      ? db.collection('blogs').find({ tags: tag }) 
      : db.collection('blogs').find();

    const totalPosts = await query.count();
    const posts = await query
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        limit
      }
    });
  } catch (error) {
    return handleServerError(error, 'GET blog posts');
  }
}

// POST a new blog post with improved validation
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const validatedPost = validateBlogPost(data);

    const db = await dbConnect();
    const result = await db.collection<BlogPost>('blogs').insertOne(validatedPost as BlogPost);

    if (!result.acknowledged) {
      throw new Error('Failed to insert blog post');
    }

    return NextResponse.json({ 
      message: "Blog post created successfully",
      post: { ...validatedPost, _id: result.insertedId }
    }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes('must be at least')) {
      return NextResponse.json({ 
        error: "Validation Failed", 
        details: error.message 
      }, { status: 400 });
    }
    return handleServerError(error, 'POST blog post');
  }
}

// PUT (update) a blog post with enhanced validation
export async function PUT(request: Request) {
  try {
    const data = await request.json();

    if (!data._id) {
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    const validatedPost = validateBlogPost(data);

    const db = await dbConnect();
    
    const result = await db.collection('blogs').updateOne(
      { _id: new ObjectId(data._id) },
      { 
        $set: {
          ...validatedPost,
          lastUpdated: new Date().toISOString()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Blog post updated successfully",
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('must be at least')) {
      return NextResponse.json({ 
        error: "Validation Failed", 
        details: error.message 
      }, { status: 400 });
    }
    return handleServerError(error, 'PUT blog post');
  }
}

// DELETE a blog post with enhanced error handling
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();
    
    const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Blog post deleted successfully",
      deletedAt: new Date().toISOString()
    });
  } catch (error) {
    return handleServerError(error, 'DELETE blog post');
  }
}