import { useEffect, useState } from 'react'
import { useSessionHook } from './useSessionHook'
import { signIn } from 'next-auth/react'
import { useSignUp } from './useSignup'

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { session, status } = useSessionHook()
  const { mutate: signUp } = useSignUp()
  useEffect(() => {
    if (session?.accessToken) {
      signUp({
        accessToken: session.accessToken,
        subId: session.subId as string,
        name: session.name as string,
      })
    }
  }, [session.accessToken])

  const signInKakao = async () => {
    try {
      setIsLoading(true)
      await signIn('kakao', { redirect: false })
    } catch (error) {
      console.error('Error during login process:', error)
    } finally {
      setIsLoading(false)
    }
  }
  return {
    isSigning: status === 'authenticated' || status === 'loading',
    signInKakao,
    isLoading,
  }
}
