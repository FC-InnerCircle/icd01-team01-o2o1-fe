import React from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

// QueryClient 생성 함수
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 4 * 1000,
        refetchInterval: 4 * 1000,
      },
    },
  })

// renderWithQuery 함수에 SessionProvider 추가
const renderWithQuery = (
  ui,
  {
    client = createTestQueryClient(),
    session = null, // session prop 기본값 설정
    ...options
  } = {},
) => {
  return render(
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    </SessionProvider>,
    options,
  )
}

export const wrapper = ({ children }) => (
  <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
)

// re-export everything
export * from '@testing-library/react'

// override render method
export { renderWithQuery as render }
