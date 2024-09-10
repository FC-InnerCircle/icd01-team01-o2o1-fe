import axiosInst from '@/util/axiosInst'
import { Address } from '../types'

export interface MemberResponse {
  response: {
    memberId: number
    nickName: string
    contact: string
    name: string
  }
  statusCode: number
  msg: string
}

export const getMemberInfo = async () => {
  const { data } = await axiosInst.get<MemberResponse>('/member')
  return data.response
}

type Member = {
  nickName: string
  contact: string
  address: Address
}

export const createMember = async (formData: Member) => {
  const { data } = await axiosInst.post<MemberResponse>('/member', { ...formData })
  return data.statusCode === 200
}
