import mongoose from 'mongoose';

// Images are compressed with sharp (WebP) and stored directly in MongoDB.
// `data` is the full image (max 1200px), `thumb` a small version for cards/lists.
const imageSchema = new mongoose.Schema(
  {
    data: { type: Buffer, required: true },
    thumb: { type: Buffer, required: true },
    contentType: { type: String, default: 'image/webp' },
    width: Number,
    height: Number,
    size: Number,
    thumbSize: Number,
    originalName: String,
    originalSize: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model('Image', imageSchema);
