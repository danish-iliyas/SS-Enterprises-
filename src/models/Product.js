import mongoose from 'mongoose';
import { i18nText } from './_shared.js';

const specSchema = new mongoose.Schema(
  { label: { type: String, trim: true }, value: { type: String, trim: true } },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: i18nText(true), required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    shortDescription: { type: i18nText(), default: () => ({}) },
    description: { type: i18nText(), default: () => ({}) },
    specs: [specSchema],
    // Customer price = mrp minus discountPercent (the offer). Empty mrp shows "price on request".
    mrp: { type: Number, min: 0, default: null },
    discountPercent: { type: Number, min: 0, max: 90, default: 30 },
    stock: { type: Number, min: 0, default: 0 },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    brand: { type: String, trim: true, default: '' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual('price').get(function price() {
  if (this.mrp == null) return null;
  return Math.round(this.mrp * (1 - (this.discountPercent || 0) / 100));
});

productSchema.virtual('inStock').get(function inStock() {
  return this.available && this.stock > 0;
});

productSchema.index({ 'name.en': 'text', 'name.hi': 'text', brand: 'text' });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
