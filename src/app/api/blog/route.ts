import { NextResponse } from "next/server";
import BlogModel from "@/models/blog.models";
import { dbConnect } from "@/lib/db";

export async function GET(req: Request) {
  console.time('blogFetch');
  try {
    // Add a timeout for database connection
    const connectionPromise = dbConnect();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database connection timeout')), 5000)
    );

    await Promise.race([connectionPromise, timeoutPromise]);

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    let query = BlogModel.find().sort({ date: -1 });

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        query = query.limit(parsedLimit);
      }
    }

    // Add query timeout
    query.maxTimeMS(10000);  // 10 seconds max query time

    const blogs = await query;

    console.timeEnd('blogFetch');
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Blog Fetch Error:', error);
    console.timeEnd('blogFetch');
    return NextResponse.json({ 
      message: "Error fetching blogs", 
      errorDetails: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  console.time('blogCreate');
  try {
    await dbConnect();
    const { title, content, excerpt, tags } = await req.json();

    if (!title || !content || !excerpt || !tags) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newBlog = new BlogModel({ title, content, excerpt, tags });
    await newBlog.save();

    console.timeEnd('blogCreate');
    return NextResponse.json({ message: "Blog created successfully", blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Blog Create Error:', error);
    console.timeEnd('blogCreate');
    return NextResponse.json({ 
      message: "Error creating blog", 
      errorDetails: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}