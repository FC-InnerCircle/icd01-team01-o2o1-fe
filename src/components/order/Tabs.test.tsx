import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Tabs from './Tabs'

describe('Tabs', () => {
  test('올바른 탭이 활성화되어 있는지 확인', () => {
    const onTabClickMock = jest.fn()
    render(<Tabs activeTab="past" onTabClick={onTabClickMock} />)

    const pastButton = screen.getByText('과거 주문내역')
    expect(pastButton).toHaveClass('border-b-2 border-black font-semibold')

    const preparingButton = screen.getByText('준비중')
    expect(preparingButton).not.toHaveClass('border-b-2 border-black font-semibold')
  })

  test('탭 클릭 시 콜백 함수가 호출되는지 확인', () => {
    const onTabClickMock = jest.fn()
    render(<Tabs activeTab="past" onTabClick={onTabClickMock} />)

    const preparingButton = screen.getByText('준비중')
    fireEvent.click(preparingButton)

    expect(onTabClickMock).toHaveBeenCalledWith('preparing')
  })

  test('올바른 스타일이 각 탭에 적용되는지 확인', () => {
    const onTabClickMock = jest.fn()
    render(<Tabs activeTab="preparing" onTabClick={onTabClickMock} />)

    const preparingButton = screen.getByText('준비중')
    expect(preparingButton).toHaveClass('border-b-2 border-black font-semibold')

    const pastButton = screen.getByText('과거 주문내역')
    expect(pastButton).not.toHaveClass('border-b-2 border-black font-semibold')
  })
})
