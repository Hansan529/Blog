import axios from 'axios';
import { NextResponse } from 'next/server';

interface Config {
  client_id: string;
  allow_signup: boolean;
  scope: string;
}

export async function GET() {
  const baseURL = 'https://github.com/login/oauth/authorize';
  console.log('baseURL: ', baseURL);
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
}

export async function POST(req: Request) {
  const { code } = await req.json();
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
    // console.log('userData: ', userData);
    const { data: emailData } = await getData.get('/user/emails');
    console.log('emailData: ', emailData);
    // userData.avatar_url, userData.name, emailData.email;
    let email: string;
    if (emailData[0].primary && emailData[0].verified) {
      email = emailData[0].email;
    }
  }
  return NextResponse.json('test');
}
