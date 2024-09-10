'use client'
import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * submitType에 따라
 * Alert, Confirm 역할을 수행
 */
export interface DialogProps {
  title: string
  content: string | React.ReactNode
  children: React.ReactNode
  submitText: string | React.ReactNode
  submitType?: 'alert'
  onSubmit: () => void
  contentClassName?: string
}

export function Modal({
  title,
  content,
  submitType,
  submitText,
  onSubmit,
  children,
  contentClassName,
}: DialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    onSubmit()
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn('h-[300px] p-6 sm:max-w-[296px] md:max-w-[445px]', contentClassName)}
      >
        <DialogHeader className="flex flex-col items-center justify-center gap-12">
          <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-gray-500">{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center !justify-center gap-12">
          <Button
            className="bg-gray-50 text-gray-500"
            onClick={() => {
              setOpen(false)
            }}
            variant="outline"
          >
            취소
          </Button>
          <Button
            className={cn('bg-gray-50', { 'text-red-500': submitType === 'alert' })}
            onClick={handleSubmit}
            variant="outline"
          >
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
