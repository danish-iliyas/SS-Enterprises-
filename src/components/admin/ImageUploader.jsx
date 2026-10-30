'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Star, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import { imageUrl } from '@/lib/format';
import { useToast } from './Toast';

const MAX_SIDE = 1600;

// Shrinks big phone photos in the browser before upload (faster on slow internet and keeps
// requests under Vercel's 4.5 MB limit). The server then compresses again to WebP.
async function shrink(file) {
  if (!/^image\/(jpe?g|png|webp)$/i.test(file.type) || file.size < 300 * 1024) return file;
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.85));
    return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }) : file;
  } catch {
    return file;
  }
}

const kb = (n) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);

/**
 * value: array of image ids. multiple=false keeps only one image.
 */
export default function ImageUploader({ value = [], onChange, multiple = true, max = 6, label = 'Photos' }) {
  const input = useRef(null);
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  const upload = async (fileList) => {
    const files = [...fileList].slice(0, multiple ? max - value.length : 1);
    if (!files.length) return;
    setBusy(true);
    try {
      const form = new FormData();
      let before = 0;
      for (const f of files) {
        before += f.size;
        form.append('images', await shrink(f));
      }
      const saved = await api('/api/images', { method: 'POST', form });
      const after = saved.reduce((s, i) => s + i.size, 0);
      onChange(multiple ? [...value, ...saved.map((s) => s.id)] : [saved[0].id]);
      toast(`Uploaded ${saved.length} image(s): ${kb(before)} → ${kb(after)} after compression`);
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  };

  const move = (i, dir) => {
    const next = [...value];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange(next);
  };

  return (
    <div>
      <p className="label">{label}</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {value.map((id, i) => (
          <div key={id} className="group relative aspect-square overflow-hidden rounded-xl border-2 border-navy/10 bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl(id, true)} alt="" className="h-full w-full object-cover" />
            {i === 0 && multiple && (
              <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-md bg-sun px-1.5 py-0.5 text-[11px] font-bold">
                <Star className="h-3 w-3" /> Main
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-navy/70 p-1">
              {multiple && (
                <button type="button" className="grid h-8 w-8 place-items-center rounded text-white disabled:opacity-30" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move left">
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <button type="button" className="grid h-8 w-8 place-items-center rounded text-red-300 hover:text-red-200" onClick={() => onChange(value.filter((x) => x !== id))} aria-label="Remove image">
                <Trash2 className="h-4 w-4" />
              </button>
              {multiple && (
                <button type="button" className="grid h-8 w-8 place-items-center rounded text-white disabled:opacity-30" disabled={i === value.length - 1} onClick={() => move(i, 1)} aria-label="Move right">
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {(multiple ? value.length < max : value.length === 0) && (
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={busy}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-brand/40 bg-brand-50 text-sm font-semibold text-brand hover:bg-brand-100"
          >
            {busy ? <Loader2 className="h-7 w-7 animate-spin" /> : <ImagePlus className="h-7 w-7" />}
            {busy ? 'Uploading…' : 'Add photo'}
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-navy/50">Photos are compressed automatically and saved in the database. First photo is the main one.</p>
      <input ref={input} type="file" accept="image/*" multiple={multiple} hidden onChange={(e) => upload(e.target.files)} />
    </div>
  );
}
