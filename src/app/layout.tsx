import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../../globals.d.ts'
import Layout from '@/components/Layout/Layout'
import { MSWProvider } from '@/mocks/MSWProvider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '배달이써',
  description: '배달 서비스를 이용해보세요',
  icons: {
    icon: '/logo-icon-96.png',
  },
}

if (process.env.NEXT_RUNTIME === 'nodejs') {
  console.log('SERVER LISTEN')

  const { server } = require('../mocks/node')
  server.listen()

  Reflect.set(fetch, '__FOO', 'YES')
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {process.env.NODE_ENV === 'development' ? (
          <MSWProvider>
            <Layout>{children}</Layout>
          </MSWProvider>
        ) : (
          <Layout>{children}</Layout>
        )}
        {/* 우편번호 검색 API는 페이지가 상호작용 가능해진 후 로드 */}
        <Script
          strategy="afterInteractive"
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        />
        <Script
          strategy="beforeInteractive"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9c0c8ad489cd94f5d723e45543526e40&libraries=services"
        ></Script>
        {/* next14 문제인지는 모르겠으나 원래라면 위 스크립트로 아래 스크립트들을 가져와야햇는데 못가져와서 직접 박아넣음 (현재 문의 넣어놈...) */}
        <Script src="http://t1.daumcdn.net/mapjsapi/js/main/4.4.19/kakao.js"></Script>
        <Script src="http://t1.daumcdn.net/mapjsapi/js/libs/services/1.0.2/services.js"></Script>
      </body>
    </html>
  )
}
