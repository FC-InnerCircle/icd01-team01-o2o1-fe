import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from '../LoadingSpinner'
import { useQueryClient } from '@tanstack/react-query'

interface PullToRefreshProps {
  children: React.ReactNode
  elementRef: React.RefObject<HTMLDivElement>
  handleRefresh: () => void
}

const PULL_DISTANCE_LIMIT = 60

const PullToRefresh = ({ children, elementRef, handleRefresh }: PullToRefreshProps) => {
  const [refreshing, setRefreshing] = useState(false)
  const [startY, setStartY] = useState(0)
  const queryClient = useQueryClient()

  useEffect(() => {
    function handleTouchStart(event: TouchEvent) {
      setStartY(event.touches[0].clientY)
    }

    function handleTouchMove(event: TouchEvent) {
      if (!elementRef.current) return

      const moveY = event.touches[0].clientY
      const pullDistance = moveY - startY

      if (pullDistance > PULL_DISTANCE_LIMIT) {
        handleRefresh()
        elementRef.current.style.transform = 'translate(0, 40px)'
        elementRef.current.style.transition = '0.3s'
        setRefreshing(true)
      }
    }

    function handleTouchEnd() {
      if (refreshing) {
        setTimeout(() => {
          setRefreshing(false)
          if (!elementRef.current) return
          elementRef.current.style.transform = 'translate(0,0)'
        }, 1000)
      }
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [refreshing, startY, elementRef, handleRefresh])

  return (
    <div>
      {refreshing && (
        <div className="flex items-center justify-center pt-4">
          <LoadingSpinner />
        </div>
      )}
      {children}
    </div>
  )
}

export default PullToRefresh
