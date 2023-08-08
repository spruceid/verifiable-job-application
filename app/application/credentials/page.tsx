'use client'
import { useState } from 'react'

const fakeCredentials = [
  {
    id: '1',
    type: "Driver's License",
    iss: 'DMV',
    subject: 'John Doe',
    credential: {
      'License Number': '123456789',
      DOB: '01-01-1980',
      Address: '123 Main St, Anytown, USA',
      'License Type': 'Class C',
    },
  },
  {
    id: '5',
    type: "Driver's License",
    iss: 'DMV',
    subject: 'John Doe',
    credential: {
      'License Number': '123456789',
      DOB: '01-01-1980',
      Address: '123 Main St, Anytown, USA',
      'License Type': 'Class C',
    },
  },
  {
    id: '2',
    type: 'Passport',
    iss: 'Department of State',
    subject: 'John Doe',
    credential: {
      'Passport Number': '987654321',
      DOB: '01-01-1980',
      Nationality: 'USA',
      'Expiration Date': '01-01-2030',
    },
  },
  {
    id: '3',
    type: 'Credit Card',
    iss: 'Bank of Anytown',
    subject: 'John Doe',
    credential: {
      'Card Number': '1111-2222-3333-4444',
      'Expiration Date': '01/23',
      CVV: '123',
    },
  },
  {
    id: '4',
    type: 'Social Security Card',
    iss: 'Social Security Administration',
    subject: 'John Doe',
    credential: {
      SSN: '012-34-5678',
    },
  },
]

export default function Credentials() {
  const credentials = fakeCredentials
  const [selected, setSelected] = useState([])

  const handleSelect = (id) => {
    setSelected((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((selectedId) => selectedId !== id) : [...prevSelected, id]))
  }

  const credentialTypes = [...new Set(credentials.map((cred) => cred.type))]

  return (
    <div className="mx-auto grid max-w-screen-lg gap-4 p-4">
      <h2 className="text-2xl font-normal">Credentials</h2>
      {credentialTypes.map((type) => (
        <div key={type} className="credentials-card grid gap-4">
          <h3 className="col-span-4 text-lg font-bold">{type}</h3>
          {credentials
            .filter((cred) => cred.type === type)
            .map(({ id, iss, subject, credential }) => (
              <div
                key={id}
                className="credentials-card-inner bg-card flex cursor-pointer flex-col rounded-lg p-6 shadow-sm dark:border-neutral-700"
                onClick={() => handleSelect(id)}>
                <div className="flex flex-col">
                  <div className="font-semibold">{iss}</div>
                  <div className="font-semibold">{subject}</div>
                  {Object.entries(credential).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-bold">{key}:</span> {value}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center">
                  <input checked={selected.includes(id)} className="mr-2" type="checkbox" onChange={() => handleSelect(id)} />
                  Include in Application
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
