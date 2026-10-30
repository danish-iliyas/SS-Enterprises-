import mongoose from 'mongoose';
import { i18nText } from './_shared.js';

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: i18nText(true), required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
