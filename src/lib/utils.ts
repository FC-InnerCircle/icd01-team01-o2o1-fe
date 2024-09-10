import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAddressCoords = (address: string) => {
  const geoCoder = new kakao.maps.services.Geocoder()
  return new Promise((resolve, reject) => {
    geoCoder.addressSearch(address, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].x, result[0].y)
        const latitude = coords.getLat()
        const longitude = coords.getLng()
        resolve({ latitude, longitude })
      } else {
        // 에러처리 필요 -> 추후 작성
        reject(status)
      }
    })
  })
}
