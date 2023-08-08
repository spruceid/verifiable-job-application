import React, { createContext, useContext, useEffect, useState } from 'react'

import { SSXProvider as _SSXProvider } from '@spruceid/ssx-react'
import { providers } from 'ethers'
import { WalletClient } from 'wagmi'
import { useDisconnect, useWalletClient } from 'wagmi'

// export interface SSXContextInterface {
//   /** SSX Instance. */
//   ssx: SSX | undefined
//   /** SSX Instance loading state. */
//   signingIn: boolean
// }

// /** Default, uninitialized context. */
// const SSXContext = createContext<SSXContextInterface>({
//   ssx: undefined,
//   signingIn: false,
// })

// /** SSX Provider Component. */
// export const SSXProvider = ({ children }: { children: any }) => {
//   // const { data: signer } = useSigner();
//   const { data: client } = useWalletClient()

//   const { disconnect } = useDisconnect()

//   const [ssx, setSSX] = useState<SSX | undefined>(undefined)
//   const [signingIn, setSigningIn] = useState<boolean>(false)

//   const watchSigner = async () => {
//     if (client) {
//       const signer = walletClientToEthers5Signer(client)

//       /*
//       We verify SSX here to prevent a new sign in when changing the account.
//       If you want to sign in when the account changes, remove this return.
//       */
//       if (ssx) return

//       setSigningIn(true)

//       const ssxConfig = {
//         siweConfig: {
//           statement: 'Sign into Verifiable Job Application!',
//         },
//         modules: {
//           storage: {
//             prefix: 'verifiable-job-app',
//           },
//         },
//         providers: {
//           web3: {
//             driver: signer?.provider,
//           },
//         },
//       }

//       try {
//         const ssxInstance = new SSX(ssxConfig)
//         setSSX(ssxInstance)
//       } catch (e) {
//         console.error(e)
//         disconnect()
//       }
//       setSigningIn(false)
//     } else {
//       try {
//         await ssx?.signOut()
//       } catch (e) {
//         // User rejected the connection after the wallet selection on web3modal
//       }
//       setSSX(undefined)
//       setSigningIn(false)
//     }
//   }

//   useEffect(() => {
//     void watchSigner()
//   }, [client])

//   const SSXProviderValue: SSXContextInterface = {
//     ssx,
//     signingIn,
//   }

//   return (
//     <>
//       <SSXContext.Provider value={SSXProviderValue}>{children}</SSXContext.Provider>
//     </>
//   )
// }

// /** Hook for accessing SSX instance and state. */
// export const useSSX = (): SSXContextInterface => {
//   return useContext(SSXContext)
// }

// export function walletClientToEthers5Signer(walletClient: WalletClient) {
//   const { account, chain, transport } = walletClient
//   const network = {
//     chainId: chain.id,
//     name: chain.name,
//     ensAddress: chain.contracts?.ensRegistry?.address,
//   }
//   const provider = new providers.Web3Provider(transport, network)
//   const signer = provider.getSigner(account.address)
//   return signer
// }

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
  }

  return (
    <_SSXProvider ssxConfig={ssxConfig} web3Provider={web3Provider}>
      {children}
    </_SSXProvider>
  )
}
