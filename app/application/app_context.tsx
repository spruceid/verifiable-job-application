import React, { createContext, useContext, useEffect, useState } from 'react'

import { useSSX } from '@spruceid/ssx-react'
import { useRouter } from 'next/navigation'

import { toCredentialEntry } from './rebase'

const initialProfile = {
  basicInfo: {
    name: '',
    address: '',
    phone: '',
    email: '',
  },
  skills: {
    description: '',
  },
  employmentHistory: [],
}

export interface AppContextInterface {
  initialized: boolean
  profile: Partial<typeof initialProfile>
  credentialList: any[]
  selectedCredentials: any[]
  credentials: any
}

/** Default, uninitialized context. */
const AppContext = createContext<AppContextInterface>({
  initialized: false,
  profile: initialProfile,
  credentialList: [],
  selectedCredentials: [],
  credentials: {},
})

/** SSX Provider Component. */
export const AppProvider = ({ children }: { children: any }) => {
  const { ssx } = useSSX()
  console.log(ssx)
  const Router = useRouter()

  const [initialized, setInitialized] = useState(false)
  const [profile, setProfile] = useState(initialProfile)
  const [credentials, setCredentials] = useState<>()
  const [credentialList, setCredentialList] = useState([])

  const fetchProfile = async () => {
    if (!ssx) {
      return Router.push('/')
    }
    if (initialized) return
    const { data: profile = {} } = await ssx?.storage?.get('profile')
    const { data: selectedCredentials = [] } = await ssx?.storage?.get('selectedCredentials')

    const { data: credentialListData } = await ssx.credentials?.list?.({ removePrefix: true })
    console.log('profile', profile)
    console.log('credentialList', credentialListData)

    setProfile(deepMerge(initialProfile, profile))
    setCredentialList(credentialListData)
    setInitialized(true)

    const rawCredentials = credentialListData.map((credential) => {
      console.log(credential)
      return ssx?.credentials.get(credential)
    })
    console.log(rawCredentials)
    const credentialsResponse = await Promise.all(rawCredentials)
    console.log(credentialsResponse)
    const allCredentials = credentialsResponse.map(({ data }) => toCredentialEntry(data))

    console.log(credentials)
    const credentialMap = transformCredentialData(allCredentials)
    setCredentials(credentialMap)
    // await fetchCredentials()
  }

  function transformCredentialData(data) {
    const credentials = {}

    // Iterate through the array
    data.forEach((item) => {
      // Get the credential type
      const type = item.content.type

      // Iterate through all types in an item
      type.forEach((credentialType) => {
        // Ignore 'VerifiableCredential'
        if (credentialType !== 'VerifiableCredential') {
          // If this type has not been added to 'credentials', add it with an empty array
          if (!credentials[credentialType]) {
            credentials[credentialType] = []
          }
          credentials[credentialType].push(item)
        }
      })
    })

    return credentials
  }

  useEffect(() => {
    void fetchProfile()
  }, [ssx])

  const AppProviderValue: AppContextInterface = {
    initialized,
    profile,
    credentialList,
    credentials,
  }

  return (
    <>
      <AppContext.Provider value={AppProviderValue}>{children}</AppContext.Provider>
    </>
  )
}

/** Hook for accessing SSX instance and state. */
export const useApp = (): AppContextInterface => {
  return useContext(AppContext)
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

function deepMerge(target, source) {
  const output = Object.assign({}, target)
  for (const key in source) {
    if (isObject(source[key])) {
      if (!(key in target)) Object.assign(output, { [key]: source[key] })
      else output[key] = deepMerge(target[key], source[key])
    } else {
      Object.assign(output, { [key]: source[key] })
    }
  }
  return output
}
