'use client'

import CreateMemberForm from '@/app/signup/_components/CreateMemberForm'
import Footer from '@/components/shared/Footer'
import BackButton from '@/components/shared/BackButton'
import Header from '@/components/shared/Header'
import { useSignUpFormHook } from '@/features/member/hooks/useCreateMemberForm'
import React, { useEffect, useState } from 'react'
import { Address } from '@/features/member/types'
import { useCreateMemberHooks } from '@/features/member/hooks/useCreateMemberHook'

const SignUpPage = () => {
  const form = useSignUpFormHook()
  const [addressData, setAddressData] = useState<Address>()
  const { mutate: createMember } = useCreateMemberHooks()

  const handleSubmit = () => {
    const nickName = form.getValues('nickName')
    const contact = form.getValues('contact')
    if (addressData?.latitude && addressData?.longitude && addressData?.address) {
      const address = {
        ...addressData,
        addressDetail: form.getValues('addressDetail') || '',
      }
      const formData = {
        nickName,
        contact,
        address,
      }
      createMember(formData)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header left={<BackButton />} />
      <main className="flex flex-grow justify-center p-14">
        <CreateMemberForm form={form} setAddress={setAddressData} />
      </main>
      <Footer
        text="완료"
        disabled={!form.formState.isValid || !addressData?.address}
        onClick={() => handleSubmit()}
      />
    </div>
  )
}

export default SignUpPage
