'use client'
import Image from 'next/image'
// Components
import { Button } from '@/components/ui/button'

// third party
import { cn } from '@/lib/utils'
import { useSignIn } from '@/features/auth/hooks/useSignIn'

export default function LoginPage() {
  const { signInKakao, isLoading } = useSignIn()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div>
        <Image src="/logo-icon-96.png" alt="logo" width={100} height={100} />
        <div className="text-2xl">배달이써</div>
      </div>
      <Button onClick={signInKakao} className="w-80 bg-yellow-300 text-black" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : '카카오로 시작하기'}
      </Button>
    </div>
  )
}

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('animate-spin', className)}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{
        animationDuration: '1.5s',
        animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        stroke: '#22222',
      }}
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
