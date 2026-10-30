import { NextResponse } from 'next/server';
import connectDB from './db';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Wraps a route handler: connects to MongoDB and turns thrown errors into JSON responses.
export const route = (fn) => async (req, ctx) => {
  try {
    await connectDB();
    const params = ctx?.params ? await ctx.params : {};
    return await fn(req, params);
  } catch (err) {
    return errorResponse(err);
  }
};

function errorResponse(err) {
  let status = err.status || 500;
  let message = err.message || 'Something went wrong';

  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]));
    return NextResponse.json({ message: Object.values(errors)[0], errors }, { status: 400 });
  }
  if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid ID';
  }
  if (err.code === 11000) {
    status = 409;
    message = `Already exists: ${Object.keys(err.keyValue || {}).join(', ')}`;
  }
  if (status >= 500) console.error(err);
  return NextResponse.json({ message }, { status });
}

export const json = (data, init) => NextResponse.json(data, init);

export async function readJson(req) {
  try {
    return (await req.json()) || {};
  } catch {
    throw new HttpError(400, 'Invalid request body');
  }
}

export const slugify = (text) =>
  String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

// Picks only allowed keys (avoids mass-assignment of protected fields).
export const pick = (obj, keys) =>
  keys.reduce((acc, k) => {
    if (obj?.[k] !== undefined) acc[k] = obj[k];
    return acc;
  }, {});

export const escapeRx = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const pageParams = (searchParams, defLimit = 20, maxLimit = 100) => {
  const page = Math.max(1, parseInt(searchParams.get('page'), 10) || 1);
  const limit = Math.min(maxLimit, parseInt(searchParams.get('limit'), 10) || defLimit);
  return { page, limit, skip: (page - 1) * limit };
};

export const cleanMobile = (m) => String(m || '').replace(/\D/g, '').slice(-10);
