import { NextRequest, NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // console.log('request', req.nextUrl.pathname);
  // 경로가 /로 시작함
  // if (req.nextUrl.pathname.startsWith('/')) {
  //   console.log('mw ran');
  // }
  // 쿠키를 설정하고 얻고, 체크
  // const allCookies = req.cookies.set('auth', '5');
  // const getCookie = req.cookies.get('auth');
  // console.log('auth', req.cookies.has('auth'), getCookie);

  // *
  // 쿠키 헤더 설정
  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });
  const cookieChk = req.cookies.get('x-connectDB');
  if (!cookieChk) {
    const db = await fetch(`${process.env.SERVER_ENDPOINT}/db`);
    response.cookies.set('x-connectDB', 'true', { maxAge: 3600 });
  }
  // 헤더 요소 확인
  // response.headers.forEach((header) => console.log('header', header));

  // 헤더에 쿠키 추가하기
  // response.headers.set('x-custom-auth-header', 'isAuthed');
  // console.log('header response', response.headers.get('x-custom-auth-header'));
  // console.log('response.header: ', response.headers);
  return response;
}

// 특정 경로에서 실행되도록 설정
export const config = {
  matcher: '/',
};
