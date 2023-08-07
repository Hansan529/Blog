import { NextResponse } from 'next/server';
import Admin from '../../../../models/Admin';

export async function POST(req: Response) {
  const formData = await req.formData();
  const id = formData.get('id');
  const pw = formData.get('pw');
  const pw2 = formData.get('pw2') || '';
  const email = formData.get('email') || '';
  const socialLogin = formData.get('socialLogin') || '';

  try {
    // 중복 아이디, 이메일이 있거나 비밀번호가 같지 않다면 생성 취소
    const already = await Admin.exists({ id, email });
    if (already) {
      return NextResponse.json({ join: false });
    }

    // 소셜로그인일 경우 별도 생성
    if (socialLogin) {
      const username = formData.get('username') || '';
      const avatarImg = formData.get('avatarImg') || '';
      const data = {
        socialLogin,
        avatarImg,
        username,
        id,
        pw,
        email,
      };
      await Admin.create(data);
      return NextResponse.json({ join: true });
    }

    if (pw !== pw) {
      return NextResponse.json({ join: false });
    }

    // 일반 관리자 추가
    const data = {
      id,
      pw,
      email,
    };
    await Admin.create(data);
    return NextResponse.json({ join: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ join: false });
  }
}
