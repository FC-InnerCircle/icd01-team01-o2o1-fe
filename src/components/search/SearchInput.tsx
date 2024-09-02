'use client'
import * as React from 'react'

interface SearchInputProps {
  searchTerm: string
  onSearchChange: (newTerm: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full rounded-md border p-2"
        placeholder="레스토랑 이름을 검색하세요"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
