import axios from 'axios';
import { NextResponse } from 'next/server';
import Admin from '../../../../models/Admin';
import { api, formApi } from '../../../../axios';
// import connectMongoDB from '../../../../libs/mongodb';

interface Config {
  client_id: string;
  allow_signup: boolean;
  scope: string;
}

// 깃허브 측 정보 요청 홈페이지 반환
export const GET = async () => {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const config: Config = {
    client_id: process.env.CLIENT_ID,
    allow_signup: false,
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams();
  params.append('client_id', config.client_id);
  params.append('allow_signup', String(config.allow_signup));
  params.append('scope', config.scope);
  const url = `${baseURL}?${params}`;
  return NextResponse.json(url);
};

// 토큰을 통해 유효성 체크 후 사용자의 데이터 반환
export const POST = async (req: Request) => {
  const { code } = await req.json();
  // await connectMongoDB();
  const baseURL = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
  };
  const params = new URLSearchParams();
  params.append('client_id', config.client_id);
  params.append('client_secret', config.client_secret);
  params.append('code', config.code);

  const url = `${baseURL}?${params}`;

  const { access_token } = await (
    await axios(url, {
      method: 'POST',
      headers: { Accept: 'application/json' },
    })
  ).data;

  if (access_token) {
    const apiUrl = 'https://api.github.com';
    const getData = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const { data: userData } = await getData.get('/user');
    const { data: emailData } = await getData.get('/user/emails');
    let email: string;
    if (emailData[0].primary && emailData[0].verified) {
      email = emailData[0].email;
    }
    const formData = new FormData();
    formData.append('id', userData.login);
    formData.append('email', email);

    // 로그인 시도
    const {
      data: { login },
    } = await formApi.post('/user/login', formData);
    if (login) {
      return NextResponse.json({ login: true });
    }
    // 로그인에 실패했을 경우 관리자 추가 시도
    formData.append('username', userData.name);
    formData.append('avatarImg', userData.avatar_url);
    formData.append('socialLogin', 'true');
    const {
      data: { join },
    } = await formApi.post('/user/join', formData);
    if (join) {
      return NextResponse.json({ join: true, login: true });
    }
    // console.log('data: ', data);
  }
  return NextResponse.json({ login: false });
};
