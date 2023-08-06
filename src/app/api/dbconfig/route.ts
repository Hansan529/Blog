// import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(req: Request) {
  mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  let result: string = 'disconnected';
  if (db.readyState >= 1) {
    result = 'connected';
  }
  return NextResponse.json(result);
}
