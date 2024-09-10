import React from 'react'
import { Form } from '@/components/ui/form'
import InputFormItem from '@/components/shared/InputFormItem'
import { UseFormReturn } from 'react-hook-form'
import AddressInput from '@/components/shared/AddressInput'
import { CreateMemberFormDataType } from '@/features/member/hooks/useCreateMemberForm'
import { Address } from '@/features/member/types'

interface CreateMemberFormProps {
  form: UseFormReturn<CreateMemberFormDataType>
  setAddress: (address: Address) => void
}

const CreateMemberForm = ({ form, setAddress }: CreateMemberFormProps) => {
  return (
    <>
      <Form {...form}>
        <form className="flex w-full flex-col gap-4">
          <InputFormItem
            control={form.control}
            name="nickName"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            required
          />
          <InputFormItem
            name="contact"
            control={form.control}
            label="연락처"
            placeholder="연락처를 입력해주세요"
            required
          />
          <AddressInput
            name="address"
            control={form.control}
            label="주소"
            setAddress={setAddress}
            required
          />
          <InputFormItem
            name="addressDetail"
            control={form.control}
            label="상세 주소"
            placeholder="상세 주소를 입력해주세요"
          />
        </form>
      </Form>
    </>
  )
}

export default CreateMemberForm
