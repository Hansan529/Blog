import { NextResponse } from 'next/server';
import Admin from '../../../../models/Admin';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get('id');
  const pw = formData.get('pw');

  //   비밀번호 해싱
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pw, salt);

  //   데이터베이스에서 추출
  const list = await Admin.findOne({ id }).exec();

  //   비밀번호가 일치하는지 계산
  const exec = await bcrypt.compare(pw, list.pw);
  return NextResponse.json(exec);
}
