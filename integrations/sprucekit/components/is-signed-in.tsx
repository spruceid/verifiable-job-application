'use client'

import { ReactNode, useEffect, useState } from 'react'

import { useSSX } from '@spruceid/ssx-react'

interface IsSignedInProps {
  children: ReactNode
}

export const IsSignedIn = ({ children }: IsSignedInProps) => {
  const { ssx } = useSSX()
  const [isSignedIn, setIsSignedIn] = useState(false)
  useEffect(() => {
    if (ssx && ssx?.address()) {
      setIsSignedIn(true)
    }
  }, [ssx])

  if (isSignedIn) return <>{children}</>

  return null
}
