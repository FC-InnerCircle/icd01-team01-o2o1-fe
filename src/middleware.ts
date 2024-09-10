import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET })

  console.log(session)

  // 현재 요청 경로
  const path = req.nextUrl.pathname

  // 루트 페이지('/')는 인증이 필요하지 않음
  if (path === '/') {
    return NextResponse.next()
  }

  // 루트 페이지를 제외한 모든 페이지에서 인증 필요
  if (!session) {
    // 무한 리디렉션 방지
    if (path === '/') {
      return NextResponse.next()
    }

    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  // 이미 로그인한 사용자가 로그인 페이지에 접근하는 경우
  if (path === '/') {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // 인증된 사용자의 경우 요청을 그대로 진행
  return NextResponse.next()
}

// 미들웨어를 적용할 경로 설정
export const config = {
  // 정규표현식을 사용하여 public 경로를 제외한 모든 경로에 미들웨어 적용
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)'],
}
