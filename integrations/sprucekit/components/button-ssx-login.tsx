'use client'

import { HTMLAttributes } from 'react'

import { useSSX } from '@spruceid/ssx-react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

import { cn } from '@/lib/utils'

interface ButtonSSXLoginProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
  disabled?: boolean
}
export const ButtonSSXLogin = ({ className, label = 'Sign-In With Ethereum', disabled, children, ...props }: ButtonSSXLoginProps) => {
  // const { mutateUser } = useUser()
  const { isLoading } = useSignMessage()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { ssx } = useSSX()

  const handleCreateMessage = async () => {
    try {
      if (!address || !chain?.id) return
      const session = await ssx?.signIn()
      if (session) {
        // logged in
        dispatchEvent(new Event('verified'))
      }
    } catch (error) {
      console.error(error)
    }
  }
  const classes = cn('relative', className)
  const labelClasses = cn({
    'opacity-0': isLoading,
  })

  return (
    <button className={classes} disabled={disabled} type="button" onClick={handleCreateMessage} {...props}>
      {isLoading && <span className="lds-dual-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <span className={labelClasses}>{children || label || 'Logout'}</span>
    </button>
  )
}
