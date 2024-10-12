'use client'
import Link from 'next/link'
import React from 'react'
import { House, Search, FileCheck, CircleUserRound } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import QueryProvider from '@/context/QueryProvider'
import CartIcon from './_components/CartIcon'

export const linkList = [
  {
    href: '/home',
    icon: <House size={24} />,
    text: '홈',
  },
  {
    href: '/search',
    icon: <Search size={24} />,
    text: '검색',
  },
  {
    href: '/order',
    icon: <FileCheck size={24} />,
    text: '주문',
  },
  {
    href: '/cart',
    icon: <CartIcon />,
    text: '카트',
  },
  {
    href: '/my',
    icon: <CircleUserRound size={24} />,
    text: 'My',
  },
]

const mainPages = {
  home: '/home',
  order: '/order',
  user: '/my',
  search: '/search',
}

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname() || ''
  const isMainPage = Object.values(mainPages).includes(pathname)

  return (
    <main className="relative m-auto h-screen min-h-screen min-w-[280px] max-w-[480px] border-l-2 border-r-2 border-gray-100">
      <SessionProvider>
        <QueryProvider>{children}</QueryProvider>
      </SessionProvider>
      {isMainPage && (
        <nav className="fixed bottom-0 z-50 h-14 w-full min-w-[280px] max-w-[480px] border-t-2 bg-white">
          <ul className="flex h-full items-center justify-between px-8">
            {linkList.map((link) => (
              <li key={link.href}>
                <Link className="flex flex-col items-center" href={link.href}>
                  {link.icon}
                  <p className="text-center text-xs">{link.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </main>
  )
}

export default Layout
