import { NextRequest, NextResponse } from 'next/server';
import Portfolio from '../../../../models/Portfolio';
import connectMongoDB from '../../../../libs/mongodb';

export const GET = async (request, context: any) => {
  const id = context.params.id;
  await connectMongoDB();
  const data = await Portfolio.findById(id);
  return NextResponse.json(data);
};
