'use client'
import { Modal } from '@/components/shared/Modal'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'

const MyPageMenu = () => {
  return (
    <div>
      <Link href="/my/address" className="text-xl">
        주소 관리
      </Link>
      <Separator className="my-6" />
      <Link href="/my/order" className="my-6 text-xl">
        주문 내역
      </Link>
      <Separator className="my-6" />
      <Modal
        onSubmit={() => {}}
        submitText="확인"
        submitType="alert"
        content="로그아웃 하시겠습니까?"
        title="로그아웃"
      >
        <div className="my-6 text-xl">로그아웃</div>
      </Modal>
      <Separator className="my-6" />
      <Modal
        onSubmit={() => {}}
        submitText="확인"
        submitType="alert"
        content="탈퇴하시겠습니까?"
        title="탈퇴"
      >
        <div className="my-6 text-xl">탈퇴</div>
      </Modal>

      <Separator className="my-6" />
    </div>
  )
}

export default MyPageMenu
