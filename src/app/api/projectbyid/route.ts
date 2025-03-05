import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ObjectId } from 'mongodb';

<<<<<<< HEAD:src/app/api/projectbyid/route.ts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('📖 GET /api/blog/[id] - Fetching blog post by ID:', id);

    if (!id) {
      console.warn('❌ Validation failed: Missing blog post ID');
      return NextResponse.json(
        { error: "Blog post ID is required" },
=======
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
>>>>>>> 1634dc9ae881629037225a9916fdcbecc3524aa0:src/app/api/blog/[id]/route.ts
        { status: 400 }
      );
    }

<<<<<<< HEAD:src/app/api/projectbyid/route.ts
=======
    console.log('📖 GET /api/blog - Fetching blog post:', id);
    
>>>>>>> 1634dc9ae881629037225a9916fdcbecc3524aa0:src/app/api/blog/[id]/route.ts
    const db = await dbConnect();
    const post = await db.collection('blogs').findOne({ 
      _id: new ObjectId(id) 
    });

    if (!post) {
      console.warn('❌ Blog post not found');
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    console.log('✅ Successfully fetched blog post');
    return NextResponse.json(post);
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
} 