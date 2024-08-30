// __tests__/StoreCard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Star from '@images/home/star.svg'
import StoreCard from './StoreCard'

// Mocked Restaurant Data
const mockRestaurant = {
  id: 1,
  name: '테스트 식당',
  imageSrc: Star,
  rating: 4.5,
  reviews: 120,
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    const { objectFit, layout, ...rest } = props
    return <img src={src} alt={alt} {...rest} />
  },
}))

jest.mock('@images/home/star.svg', () => '../../../public/images/home/star.svg')

describe('StoreCard', () => {
  it('컴포넌트가 올바르게 렌더링되는지 확인합니다', () => {
    render(<StoreCard restaurant={mockRestaurant} />)

    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument()

    const starImage = screen.getByAltText('별점')
    expect(starImage).toBeInTheDocument()
    expect(starImage).toHaveAttribute('src', mockRestaurant.imageSrc)

    expect(
      screen.getByText(`${mockRestaurant.rating}(${mockRestaurant.reviews})`),
    ).toBeInTheDocument()
  })

  it('레스토랑 이미지가 올바르게 렌더링되는지 확인합니다', () => {
    render(<StoreCard restaurant={mockRestaurant} />)

    const restaurantImage = screen.getByAltText(mockRestaurant.name)
    expect(restaurantImage).toBeInTheDocument()
    expect(restaurantImage).toHaveAttribute('src', mockRestaurant.imageSrc)
  })
})
