import { NextRequest, NextResponse } from 'next/server';
import Portfolio from '../../../models/Portfolio';
import Info from '../../../models/Info';
import Admin from '../../../models/Admin';
import connectMongoDB from '../../../libs/mongodb';

export const GET = async () => {
  await connectMongoDB();
  const portfolio = await Portfolio.find({}).sort({ dateSearch: 'desc' });
  const info = await Info.find({}).sort({ date: 'desc' });
  const admin = await Admin.find({});
  return NextResponse.json({ portfolio, admin, info });
};

// export async function POST(req: NextRequest) {
//   return NextResponse.json({ done: 'ok' });
// }
