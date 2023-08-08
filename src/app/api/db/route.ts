// import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export const GET = async (req: Request) => {
  const db = mongoose.connection;
  let result: string = 'disconnected';
  if (db.readyState >= 1) {
    result = 'connected';
  } else {
    mongoose.connect(process.env.DB_URL);
  }
  return NextResponse.json(result);
};
