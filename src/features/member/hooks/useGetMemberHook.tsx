import { useQuery } from '@tanstack/react-query'
import { getMemberInfo } from '../api'

export const useGetMemberHooks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['member'],
    queryFn: getMemberInfo,
  })
  return { data, isLoading }
}
