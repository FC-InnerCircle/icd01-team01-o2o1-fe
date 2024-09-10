import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateMemberForm from './CreateMemberForm'
import { useForm } from 'react-hook-form'
import {
  CreateMemberFormDataType,
  createMemberFormSchema,
} from '@/features/member/hooks/useCreateMemberForm'
import { zodResolver } from '@hookform/resolvers/zod'
const TestWrapper = () => {
  const form = useForm<CreateMemberFormDataType>({
    resolver: zodResolver(createMemberFormSchema),
    mode: 'onChange',
    defaultValues: {
      nickName: '',
      contact: '',
      addressDetail: '',
    },
  })
  return <CreateMemberForm form={form} setAddress={() => {}} />
}

describe('CreateMemberForm', () => {
  it('renders all form fields', () => {
    render(<TestWrapper />)

    expect(screen.getByText('닉네임')).toBeInTheDocument()
    expect(screen.getByText('연락처')).toBeInTheDocument()
    expect(screen.getByText('주소')).toBeInTheDocument()
    expect(screen.getByText('상세 주소')).toBeInTheDocument()
  })

  it('validates nickname field', async () => {
    render(<TestWrapper />)
    const nicknameInput = screen.getByPlaceholderText('닉네임을 입력해주세요')

    // 닉네임이 너무 짧은 경우
    await userEvent.type(nicknameInput, 'a')
    await waitFor(() => {
      expect(screen.getByText('닉네임을 2자 이상 입력해주세요')).toBeInTheDocument()
    })

    await userEvent.clear(nicknameInput)
    await userEvent.type(nicknameInput, 'test')
    await waitFor(() => {
      expect(screen.queryByText('닉네임을 2자 이상 입력해세요')).not.toBeInTheDocument()
    })
  })

  it('validates contact field', async () => {
    render(<TestWrapper />)

    const addressInput = screen.getByPlaceholderText('연락처를 입력해주세요')

    // 잘못된 전화번호 형식
    await userEvent.type(addressInput, 'test')
    await waitFor(() => {
      expect(screen.getByText('올바른 전화번호를 입력해주세요')).toBeInTheDocument()
    })
    await userEvent.clear(addressInput)
    await userEvent.type(addressInput, '01000000000')
    await waitFor(() => {
      expect(screen.queryByText('올바른 전화번호를 입력해주세요')).not.toBeInTheDocument()
    })
  })
})
