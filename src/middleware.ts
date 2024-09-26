import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const withAuthList = [
  '/signup',
  '/home',
  '/my',
  '/order',
  '/search',
  '/store',
  '/order-status',
  '/cart',
]

// 미들웨어에서 처리할 필요 없는 파일 확장자 목록 (이미지, CSS, JS 등)
const EXCLUDE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.css', '.js', '.svg']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 특정 확장자를 가진 요청은 로그에서 제외
  if (EXCLUDE_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
    return NextResponse.next()
  }
  // 토큰을 가져옴 (falsey 하면 로그인 안된 상태)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  // 인증이 필요한 페이지이면서 토큰이 없는 경우 리다이렉트
  if (!token && withAuthList.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', req.url)) // '/'로 리다이렉트
  }

  // 토큰이 있거나 인증이 필요없는 페이지라면 정상적으로 응답 처리
  return NextResponse.next()
}

// 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능
export const config = {
  matcher: ['/signup', '/home', '/my', '/order', '/search', '/store', '/order-status', '/cart'],
}
