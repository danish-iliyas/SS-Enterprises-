import { HttpError, json, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { saveImage } from '@/lib/images';

const MAX_BYTES = 4 * 1024 * 1024; // Vercel request limit is ~4.5 MB; the admin UI shrinks photos before upload.
const ALLOWED = /^image\/(jpe?g|png|webp|gif|avif|heic|heif)$/i;

// Admin: upload images (multipart field "images"). Each is compressed to WebP and stored in MongoDB.
export const POST = route(async (req) => {
  await requireAdmin(req);
  const form = await req.formData();
  const files = form.getAll('images').filter((f) => typeof f === 'object' && f.size);
  if (!files.length) throw new HttpError(400, 'No image selected');
  if (files.length > 6) throw new HttpError(400, 'Upload at most 6 images at a time');

  const saved = [];
  for (const file of files) {
    if (!ALLOWED.test(file.type)) throw new HttpError(400, `${file.name}: only image files are allowed`);
    if (file.size > MAX_BYTES) throw new HttpError(400, `${file.name}: image is too large (max 4 MB)`);
    try {
      const img = await saveImage(Buffer.from(await file.arrayBuffer()), file.name);
      saved.push({ id: img._id, width: img.width, height: img.height, size: img.size, originalSize: img.originalSize });
    } catch {
      throw new HttpError(400, `Could not read image: ${file.name}`);
    }
  }
  return json(saved, { status: 201 });
});
