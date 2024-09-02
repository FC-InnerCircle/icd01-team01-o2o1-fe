// components/search/SearchInput.test.tsx

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchInput from './SearchInput'

describe('SearchInput Component', () => {
  it('renders input with the correct placeholder', () => {
    render(<SearchInput searchTerm="" onSearchChange={() => {}} />)
    const inputElement = screen.getByPlaceholderText('레스토랑 이름을 검색하세요')
    expect(inputElement).toBeInTheDocument()
  })

  it('displays the initial search term', () => {
    const initialTerm = '치킨'
    render(<SearchInput searchTerm={initialTerm} onSearchChange={() => {}} />)
    const inputElement = screen.getByDisplayValue(initialTerm)
    expect(inputElement).toBeInTheDocument()
  })

  it('calls onSearchChange when input value changes', () => {
    const handleSearchChange = jest.fn()
    render(<SearchInput searchTerm="" onSearchChange={handleSearchChange} />)

    const inputElement = screen.getByPlaceholderText('레스토랑 이름을 검색하세요')
    fireEvent.change(inputElement, { target: { value: '고기' } })

    expect(handleSearchChange).toHaveBeenCalledTimes(1)
    expect(handleSearchChange).toHaveBeenCalledWith('고기')
  })
})
