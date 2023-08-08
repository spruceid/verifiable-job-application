'use client'

import { HTMLAttributes } from 'react'

import { useSSX } from '@spruceid/ssx-react'

interface ButtonSSXLogoutProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
}

export const ButtonSSXLogout = ({ className, label = 'Logout', children, ...props }: ButtonSSXLogoutProps) => {
  const { ssx } = useSSX()

  const handleLogout = async () => {
    await ssx?.signOut()
  }

  return (
    <button className={className} onClick={handleLogout} {...props}>
      {children || label}
    </button>
  )
}
