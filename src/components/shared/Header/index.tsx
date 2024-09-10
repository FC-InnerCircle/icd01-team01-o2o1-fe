// src/Header.tsx
import React from 'react'

export interface HeaderProps {
  left?: React.ReactNode
  center?: string
  right?: React.ReactNode
  className?: string
  position?: 'static' | 'fixed' | 'absolute'
}

const Header = ({ left, center, right, position = 'static', ...props }: HeaderProps) => {
  return (
    <header
      className={`flex h-12 items-center justify-between px-4 ${position} w-full max-w-[480px] ${props.className} `}
    >
      <div className="w-1/3">{left || <div />}</div>
      <div className="flex w-1/3 items-center justify-center font-semibold">
        {center || <div />}
      </div>
      <div className="flex w-1/3 items-center justify-end">{right || <div />}</div>
    </header>
  )
}

export default Header
