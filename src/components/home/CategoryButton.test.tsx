// __tests__/CategoryButton.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoryButton from './CategoryButton'

describe('CategoryButton', () => {
  it('버튼이 올바른 카테고리 텍스트로 렌더링되는지 확인합니다', () => {
    const category = 'Technology'
    render(<CategoryButton category={category} />)

    expect(screen.getByRole('button', { name: category })).toBeInTheDocument()
  })

  it('버튼이 올바른 클래스명을 가지고 있는지 확인합니다', () => {
    const category = 'Science'
    render(<CategoryButton category={category} />)

    const button = screen.getByRole('button', { name: category })

    expect(button).toHaveClass(
      'mr-2',
      'inline-block',
      'rounded-lg',
      'border',
      'border-black',
      'px-4',
      'py-2',
      'text-black',
    )
  })
})
