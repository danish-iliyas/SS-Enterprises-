import mongoose from 'mongoose';
import { i18nText } from './_shared.js';

const bannerSchema = new mongoose.Schema({
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', default: null },
  title: { type: i18nText(), default: () => ({}) },
  subtitle: { type: i18nText(), default: () => ({}) },
  active: { type: Boolean, default: true },
});

// Single document holding editable site-wide content.
const settingSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    businessName: { type: String, default: 'SS Enterprises' },
    tagline: { type: i18nText(), default: () => ({}) },
    phone: { type: String, default: '8182818841' },
    whatsapp: { type: String, default: '918182818841' },
    email: { type: String, default: '' },
    address: { type: i18nText(), default: () => ({}) },
    hours: { type: i18nText(), default: () => ({}) },
    serviceArea: { type: i18nText(), default: () => ({}) },
    mapEmbedUrl: { type: String, default: '' },
    mapLink: { type: String, default: '' },
    about: { type: i18nText(), default: () => ({}) },
    defaultDiscount: { type: Number, min: 0, max: 90, default: 30 },
    banners: [bannerSchema],
  },
  { timestamps: true }
);

settingSchema.statics.get = async function getSettings() {
  let doc = await this.findOne({ key: 'site' });
  if (!doc) doc = await this.create({ key: 'site' });
  return doc;
};

export default mongoose.models.Setting || mongoose.model('Setting', settingSchema);
