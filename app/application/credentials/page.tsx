'use client'
import { useState } from 'react'

import { useSSX } from '@spruceid/ssx-react'

import { useApp } from '../app_context'

export default function Credentials() {
  const { ssx } = useSSX()
  const { credentials, selectedCredentials } = useApp()
  // const credentials = fakeCredentials
  const [selected, setSelected] = useState(selectedCredentials)

  const handleSelect = async (id) => {
    setSelected((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((selectedId) => selectedId !== id) : [...prevSelected, id]))
    await ssx?.storage.put('selectedCredentials', selected)
  }
  console.log(credentials)
  const credentialTypes = Object.keys(credentials)

  return (
    <div className="mx-auto grid max-w-screen-lg gap-4 p-4">
      <h2 className="text-2xl font-normal">Credentials</h2>
      <h3 className="text-lg font-normal">
        Get credentials from the{' '}
        <a className="font-bold text-blue-600 underline" href="https://issuer.sprucekit.dev/" rel="noopener noreferrer" target="_blank">
          SpruceKit Credential Issuer.
        </a>{' '}
        Select the credentials you would like to include in your application.
      </h3>
      {credentialTypes.map((type) => (
        <div key={type} className="credentials-card grid gap-4">
          <h3 className="col-span-4 text-lg font-bold">{type}</h3>
          {credentials[type].map(
            ({
              content: {
                id,
                issuer,
                credentialSubject: { id: did, sameAs },
              },
              jwt,
            }) => (
              <div
                key={id}
                className="credentials-card-inner bg-card flex cursor-pointer flex-col rounded-lg p-6 shadow-sm dark:border-neutral-700"
                onClick={() => handleSelect(id)}>
                <div className="flex flex-col">
                  <div className="font-semibold">{issuer}</div>
                  <div className="font-semibold">{sameAs}</div>
                  <div>
                    <span className="font-bold">DID:</span> {did}
                    <span className="font-bold">Same as:</span> {sameAs}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <input checked={selected.includes(id)} className="mr-2" type="checkbox" onChange={() => handleSelect(id)} />
                  Include in Application
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  )
}
