import React from 'react'

import { SSXProvider as _SSXProvider } from '@spruceid/ssx-react'
import { useWalletClient } from 'wagmi'

export function SSXProvider({ children }: any) {
  const { data: walletClient } = useWalletClient()

  const web3Provider = {
    provider: walletClient,
  }
  const ssxConfig = {
    siweConfig: {
      statement: 'Sign into Verifiable Job Application!',
    },
    modules: {
      storage: {
        prefix: 'verifiable-job-app',
      },
      credentials: true,
    },
    resolveEns: true,
  }

  return (
    <_SSXProvider ssxConfig={ssxConfig} web3Provider={web3Provider}>
      {children}
    </_SSXProvider>
  )
}
