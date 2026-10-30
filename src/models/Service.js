import mongoose from 'mongoose';
import { i18nText } from './_shared.js';

const listItem = new mongoose.Schema({ en: String, hi: String }, { _id: false });

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    appliance: { type: String, required: true }, // links to the booking form's appliance key
    icon: { type: String, default: 'ro' }, // illustration key used by the frontend
    name: { type: i18nText(true), required: true },
    short: { type: i18nText(), default: () => ({}) },
    description: { type: i18nText(), default: () => ({}) },
    offerings: [listItem],
    problems: [listItem],
    solutions: [listItem],
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', default: null },
    imageCredit: { type: String, trim: true, default: '' }, // shown under the photo when a licence requires credit
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
