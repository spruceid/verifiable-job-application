'use client'

import { ReactNode } from 'react'

import { useSSX } from '@spruceid/ssx-react'

interface IsSignedInProps {
  children: ReactNode
}

export const IsSignedIn = ({ children }: IsSignedInProps) => {
  const { ssx } = useSSX()

  if (ssx?.address()) return <>{children}</>

  return null
}
