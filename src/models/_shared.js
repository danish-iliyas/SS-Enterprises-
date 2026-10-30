import mongoose from 'mongoose';

// Bilingual text: English + Hinglish. Hinglish falls back to English on the client.
export const i18nText = (required = false) =>
  new mongoose.Schema(
    { en: { type: String, trim: true, required }, hi: { type: String, trim: true, default: '' } },
    { _id: false }
  );
