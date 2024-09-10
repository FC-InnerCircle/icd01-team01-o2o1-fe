import { useMutation } from '@tanstack/react-query'
import { createMember } from '../api'
import { useRouter } from 'next/navigation'

export const useCreateMemberHooks = () => {
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: createMember,
    onSuccess: async () => {
      router.push('/home')
    },
    onError: () => {
      // error 처리
      console.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
    },
  })
  return { mutate }
}
