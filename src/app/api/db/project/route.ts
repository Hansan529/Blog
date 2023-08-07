import { NextResponse } from 'next/server';
import Project from '../../../../models/Project';
import Info from '../../../../models/Info';
import Admin from '../../../../models/Admin';

export async function GET() {
  const project = await Project.find({})
    .sort({ dateSearch: 'desc' })
    .populate('developer');
  const info = await Info.find({}).sort({ date: 'desc' });
  // const admin = await Admin.find({});
  return NextResponse.json({ project, info });
}

export async function POST(req: Request) {
  return NextResponse.json('');
}
