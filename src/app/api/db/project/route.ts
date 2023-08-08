import { NextRequest, NextResponse } from 'next/server';
import Portfolio from '../../../../models/Portfolio';
import Info from '../../../../models/Info';
import Admin from '../../../../models/Admin';

export const GET = async () => {
  const portfolio = await Portfolio.find({})
    .sort({ dateSearch: 'desc' })
    .populate('developer');
  const info = await Info.find({}).sort({ date: 'desc' });
  const admin = await Admin.find({});
  return NextResponse.json({ portfolio, admin, info });
};

export async function POST(req: NextRequest) {
  return NextResponse.json({ done: 'ok' });
}
