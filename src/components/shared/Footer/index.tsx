'use client'
import { cn } from '@/lib/utils'
import React from 'react'

interface FooterProps {
  text: string
  onClick: () => void
  disabled?: boolean
  footerClassName?: string
  buttonClassName?: string
}

const Footer = ({ text, onClick, ...props }: FooterProps) => {
  return (
    <footer className={cn(props.footerClassName)}>
      <button
        className={cn(
          `h-20 w-full hover:bg-[#0d98e8] ${props.disabled ? 'bg-[#949494] hover:bg-[#949494]' : 'bg-[#0FA5FA]'} py-2 text-xl text-white transition duration-300`,
          props.buttonClassName,
        )}
        onClick={onClick}
        disabled={props.disabled}
      >
        {text}
      </button>
    </footer>
  )
}

export default Footer
