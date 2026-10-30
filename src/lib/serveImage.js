import mongoose from 'mongoose';
import Image from '@/models/Image';
import { HttpError, route } from './http';

// Streams a stored image. Content for an id never changes, so it is cached "forever".
export const serveImage = (field) =>
  route(async (req, { id }) => {
    if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Image not found');
    const etag = `"${id}-${field}"`;
    if (req.headers.get('if-none-match') === etag) return new Response(null, { status: 304, headers: { ETag: etag } });

    const img = await Image.findById(id).select(`${field} contentType`).lean();
    if (!img) throw new HttpError(404, 'Image not found');

    const bin = img[field];
    const body = Buffer.isBuffer(bin) ? bin : Buffer.from(bin.buffer);
    return new Response(body, {
      headers: {
        'Content-Type': img.contentType || 'image/webp',
        'Content-Length': String(body.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
        ETag: etag,
      },
    });
  });
