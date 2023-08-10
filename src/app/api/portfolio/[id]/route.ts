import { NextRequest, NextResponse } from 'next/server';
import Portfolio from '../../../../models/Portfolio';
import { unlink } from 'fs/promises';
import { join } from 'path';

export const GET = async (request, context: any) => {
  const id = context.params.id;
  const data = await Portfolio.findById(id);
  return NextResponse.json(data);
};

export const DELETE = async (req: NextRequest, context: any) => {
  const data = await req.json();
  const id = context.params.id;

  const deletePath = join(process.cwd(), 'public', data.ogImageUrl);
  try {
    await Portfolio.findByIdAndDelete(id);
    await unlink(deletePath);
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error('포트폴리오 삭제 중에 문제가 생겼습니다.', err);
    return NextResponse.json({ status: 400 });
  }
};