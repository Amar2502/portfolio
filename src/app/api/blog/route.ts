import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';

interface BlogPost {
  _id?: ObjectId;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
}

// GET all blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const limitNum = limit ? parseInt(limit) : undefined;

    console.log('📖 GET /api/blog - Fetching blog posts', { limit: limitNum });
    
    const db = await dbConnect();
    const query = db.collection('blogs').find().sort({ date: -1 });
    
    if (limitNum) {
      query.limit(limitNum);
    }
    
    const posts = await query.toArray();
    console.log(`✅ Successfully fetched ${posts.length} blog posts`);
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

// POST a new blog post
export async function POST(request: Request) {
  console.log('📝 POST /api/blog - Creating new blog post');
  try {
    const data = await request.json();
    console.log('📦 Received data:', { 
      title: data.title,
      excerpt: data.excerpt?.substring(0, 50) + '...',
      contentLength: data.content?.length,
      tags: data.tags
    });

    // Validate required fields
    if (!data.title || !data.content || !data.excerpt || !data.tags) {
      console.warn('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const blogPost: BlogPost = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      tags: Array.isArray(data.tags) ? data.tags : data.tags.split(',').map((tag: string) => tag.trim()),
      date: new Date().toISOString(),
    };
    console.log('✅ Blog post object created:', { 
      title: blogPost.title,
      tagsCount: blogPost.tags.length,
      date: blogPost.date
    });

    const db = await dbConnect();
    console.log('✅ Database connection established');
    
    const result = await db.collection('blogs').insertOne(blogPost);
    console.log('📊 Database operation result:', {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });

    if (!result.acknowledged) {
      throw new Error('Failed to insert blog post');
    }

    console.log('✅ Blog post created successfully');
    return NextResponse.json({ 
      message: "Blog post created successfully",
      post: { ...blogPost, _id: result.insertedId }
    });
  } catch (error) {
    console.error('❌ Error creating blog post:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create blog post";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT (update) a blog post
export async function PUT(request: Request) {
  console.log('✏️ PUT /api/blog - Updating blog post');
  try {
    const data = await request.json();
    console.log('📦 Received update data:', { 
      _id: data._id,
      title: data.title,
      contentLength: data.content?.length,
      tags: data.tags
    });

    if (!data._id || !data.title || !data.content || !data.excerpt) {
      console.warn('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updateData = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      tags: Array.isArray(data.tags) ? data.tags : data.tags.split(',').map((tag: string) => tag.trim()),
    };
    console.log('✅ Update object created');

    const db = await dbConnect();
    console.log('✅ Database connection established');
    
    const result = await db.collection('blogs').updateOne(
      { _id: new ObjectId(data._id) },
      { $set: updateData }
    );
    console.log('📊 Update operation result:', {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });

    if (result.matchedCount === 0) {
      console.warn('❌ Blog post not found for update');
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    console.log('✅ Blog post updated successfully');
    return NextResponse.json({ message: "Blog post updated successfully" });
  } catch (error) {
    console.error('❌ Error updating blog post:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update blog post";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a blog post
export async function DELETE(request: Request) {
  console.log('🗑️ DELETE /api/blog - Deleting blog post');
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('📦 Received delete request for ID:', id);

    if (!id) {
      console.warn('❌ Validation failed: Missing blog post ID');
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();
    console.log('✅ Database connection established');
    
    const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });
    console.log('📊 Delete operation result:', {
      deletedCount: result.deletedCount
    });

    if (result.deletedCount === 0) {
      console.warn('❌ Blog post not found for deletion');
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    console.log('✅ Blog post deleted successfully');
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error('❌ Error deleting blog post:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete blog post";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 