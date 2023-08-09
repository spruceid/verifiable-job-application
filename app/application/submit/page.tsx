'use client'
import { useState } from 'react'

import { useSSX } from '@spruceid/ssx-react'
import { motion } from 'framer-motion'

import { WalletAddress } from '@/components/blockchain/wallet-address'
import { WalletBalance } from '@/components/blockchain/wallet-balance'
import { WalletNonce } from '@/components/blockchain/wallet-nonce'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageDashboardAccount() {
  const { ssx } = useSSX()

  const [jsonText, setJsonText] = useState('')

  const handleGenerateClick = () => {
    // handle the submit event here
  }

  return (
    <motion.div
      animate="show"
      className="flex-center flex h-full w-full"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show">
      <IsWalletConnected>
        <div className="card w-[420px]">
          <h3 className="text-2xl font-normal">Submit</h3>
          <hr className="my-3 dark:opacity-30" />
          <div className="mt-3">
            <span className="mr-1 font-bold">Address:</span> {ssx?.session?.ens?.domain || ssx?.address()}
          </div>
          <hr className="my-3 dark:opacity-30" />

          <div className="mt-3 flex items-center">
            <input checked disabled className="mr-2" type="checkbox" />
            <span className="mr-1 font-bold">Application</span>
          </div>
          <div className="mt-3 flex items-center">
            <input checked disabled className="mr-2" type="checkbox" />
            <span className="mr-1 font-bold">Credentials</span>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleGenerateClick}>
            Generate Submission
          </button>
          <textarea readOnly className="mt-3 h-48 w-full bg-gray-200 text-black" value={jsonText}></textarea>
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">Connect Wallet to view your personalized dashboard.</h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}
