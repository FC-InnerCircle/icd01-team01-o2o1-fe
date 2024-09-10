import { useForm } from 'react-hook-form'
import { isValid, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const createMemberFormSchema = z.object({
  nickName: z
    .string()
    .min(2, '닉네임을 2자 이상 입력해주세요')
    .max(20, '닉네임은 20자 이하로 입력해주세요'),
  contact: z.string().regex(/^[0-9]{10,11}$/, '올바른 전화번호를 입력해주세요'),
  addressDetail: z.string().optional(),
})

export type CreateMemberFormDataType = z.infer<typeof createMemberFormSchema>

// useSignupForm 훅 정의
export const useSignUpFormHook = () => {
  const form = useForm<CreateMemberFormDataType>({
    resolver: zodResolver(createMemberFormSchema),
    mode: 'onChange',
    defaultValues: {
      nickName: '',
      contact: '',
      addressDetail: '',
    },
  })

  return form
}
