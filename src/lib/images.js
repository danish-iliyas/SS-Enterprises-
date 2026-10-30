import sharp from 'sharp';
import Image from '../models/Image.js'; // relative so the seed script can run it in plain Node

const FULL_MAX = 1200;
const THUMB_MAX = 480;

// Compresses an image to WebP (full + thumbnail) and stores both in MongoDB.
export async function saveImage(buffer, originalName = 'image') {
  const base = sharp(buffer, { failOn: 'none' }).rotate(); // respect phone-camera orientation

  const full = await base
    .clone()
    .resize({ width: FULL_MAX, height: FULL_MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 72, effort: 4 })
    .toBuffer({ resolveWithObject: true });

  const thumb = await base
    .clone()
    .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 65, effort: 4 })
    .toBuffer();

  return Image.create({
    data: full.data,
    thumb,
    width: full.info.width,
    height: full.info.height,
    size: full.data.length,
    thumbSize: thumb.length,
    originalName,
    originalSize: buffer.length,
  });
}

export async function deleteImages(ids = []) {
  const list = ids.filter(Boolean);
  if (list.length) await Image.deleteMany({ _id: { $in: list } });
}
