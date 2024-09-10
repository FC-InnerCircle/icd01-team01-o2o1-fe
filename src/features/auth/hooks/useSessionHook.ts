import { useSession } from 'next-auth/react'
import { SessionType } from '../auth'

export const useSessionHook = () => {
  const { data: session, status } = useSession()
  const userSession = { ...session } as SessionType

  return {
    session: userSession,
    status,
  }
}
