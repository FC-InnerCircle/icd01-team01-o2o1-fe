import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginPage from './page'

import { render } from '@/util/test-utils'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@/features/auth/hooks/useSignIn'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../features/auth/hooks/useSignIn', () => ({
  useSignIn: jest.fn(),
}))

describe('LoginPage ', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const mockSignInKakao = jest.fn().mockResolvedValueOnce({ isSignup: true })
    ;(useSignIn as jest.Mock).mockReturnValue({
      signInKakao: mockSignInKakao,
      isLoading: false,
    })
    render(<LoginPage />)
    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument()

    const appName = screen.getByText('배달이써')
    expect(appName).toBeInTheDocument()

    const loginButton = screen.getByRole('button', { name: '카카오로 시작하기' })
    expect(loginButton).toBeInTheDocument()
  })

  it('버튼 클릭 후 data 받아오기 전까지 로딩 스피너 + disabled 확인', async () => {
    const user = userEvent.setup()
    let isLoading = false
    const mockSignInKakao = jest.fn()

    const { rerender } = render(<LoginPage />)
    const loginButton = screen.getByRole('button', { name: '카카오로 시작하기' })

    expect(loginButton).not.toBeDisabled()
    expect(loginButton).toHaveTextContent('카카오로 시작하기')

    await user.click(loginButton)

    isLoading = true
    ;(useSignIn as jest.Mock).mockReturnValue({
      signInKakao: mockSignInKakao,
      isLoading,
    })
    // 버튼 클릭 후 data 받아오기 전까지 disabled 상태인지 확인
    rerender(<LoginPage />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('로그인 성공시 signup 라우팅', async () => {
    const user = userEvent.setup()

    const mockPush = jest.fn()

    // 모킹된 useSignIn 훅
    const mockSignInKakao = jest.fn().mockResolvedValueOnce({ isSignup: true })
    ;(useSignIn as jest.Mock).mockReturnValue({
      signInKakao: mockSignInKakao,
      isLoading: false,
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: mockPush,
    })

    const { rerender } = render(<LoginPage />)
    const loginButton = screen.getByRole('button', { name: '카카오로 시작하기' })
    await user.click(loginButton)
    expect(mockSignInKakao).toHaveBeenCalledTimes(1)
  })
})
