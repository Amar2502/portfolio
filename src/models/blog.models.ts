import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Blog interface for TypeScript
interface IBlog extends Document {
  title: string;
  content: string;
  coverImage: string;
  excerpt: string;
  tags: string[];
  date: Date;
  views: number;
}

// Define the Mongoose schema
const BlogSchema: Schema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String},
    excerpt: { type: String, required: true },
    tags: { type: [String], required: true },
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create the model or use existing one to prevent recompilation issues
const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default BlogModel;
