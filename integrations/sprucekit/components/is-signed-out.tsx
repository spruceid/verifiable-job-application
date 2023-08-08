'use client'

import { ReactNode } from 'react'

import { useSSX } from '@spruceid/ssx-react'

interface IsSignedOutProps {
  children: ReactNode
}

export const IsSignedOut = ({ children }: IsSignedOutProps) => {
  const { ssx } = useSSX()

  if (!ssx || !ssx?.address()) return <>{children}</>

  return null
}
