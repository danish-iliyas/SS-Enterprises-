import mongoose from 'mongoose';
import { i18nText } from './_shared.js';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: '' },
    text: { type: i18nText(true), required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
