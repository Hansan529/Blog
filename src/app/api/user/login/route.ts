import { NextRequest, NextResponse } from 'next/server';
import Admin from '../../../../models/Admin';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const id = formData.get('id');
  const pw = formData.get('pw') || '';
  const email = formData.get('email') || '';

  //   비밀번호 해싱
  if (pw) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);

    //   데이터베이스에서 추출
    const list = await Admin.findOne({ id }).exec();

    //   데이터베이스에서 존재하지 않을 경우
    if (!list) {
      return NextResponse.json({ database: false });
    }
    //   비밀번호가 일치하는지 계산
    const exec = await bcrypt.compare(pw, list.pw);
    return NextResponse.json({ login: exec });
  }
  //   아이디 체크
  const exec = (await Admin.findOne({ id, email }).exec()) || false;
  return NextResponse.json({ login: exec });
};
