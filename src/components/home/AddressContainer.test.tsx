import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IoLocationOutline } from 'react-icons/io5'
import AddressContainer from '@/components/home/AddressContainer'

describe('AddressContainer 컴포넌트', () => {
  const mockAddress = '서울 강남구 강남대로 396'

  it('주소가 올바르게 렌더링되는지 확인합니다', () => {
    render(<AddressContainer address={mockAddress} />)
    expect(screen.getByText(mockAddress)).toBeInTheDocument()
  })
})
