'use client'
import React, { useEffect, useState } from 'react'

import { useSSX } from '@spruceid/ssx-react'
import { motion } from 'framer-motion'

import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

import { useApp } from '../app_context'

const PageDashboardAccount = () => {
  const { ssx } = useSSX()
  const { profile: currentProfile } = useApp()
  const [profile, setProfile] = useState(currentProfile)

  const handleFieldChange = (section, field, value, index = undefined) => {
    if (index !== undefined) {
      setProfile((prevProfile) => {
        const updatedSection = [...prevProfile[section]]
        updatedSection[index][field] = value
        return { ...prevProfile, [section]: updatedSection }
      })
    } else {
      setProfile((prevProfile) => ({ ...prevProfile, [section]: { ...prevProfile[section], [field]: value } }))
    }
  }

  const handleSubmit = async (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    e.preventDefault()
    console.log(profile)
    await ssx?.storage.put('profile', profile)
  }

  const addEmployment = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      employmentHistory: [...prevProfile.employmentHistory, { company: '', position: '', description: '', startDate: '', endDate: '' }],
    }))
  }

  const deleteEmployment = (indexToRemove) => {
    if (window.confirm('Are you sure you want to delete this Employment History?')) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        employmentHistory: prevProfile.employmentHistory.filter((_, index) => index !== indexToRemove),
      }))
    }
  }

  return (
    <IsWalletConnected>
      <motion.div
        animate="show"
        className="flex h-screen w-full items-center justify-center p-4"
        initial="hidden"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        viewport={{ once: true }}
        whileInView="show">
        <div className="card max-w-full rounded-lg p-6">
          <h3 className="text-2xl font-normal dark:text-white">Profile</h3>
          <hr className="my-3 dark:opacity-30" />
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <h3 className="my-2 text-xl font-semibold dark:text-white">Basic Info</h3>
              <label>Name</label>
              <input
                className="input"
                name="name"
                value={profile.basicInfo.name}
                onChange={(e) => handleFieldChange('basicInfo', 'name', e.target.value)}
              />

              <label>Address</label>
              <input
                className="input"
                name="address"
                value={profile.basicInfo.address}
                onChange={(e) => handleFieldChange('basicInfo', 'address', e.target.value)}
              />

              <label>Phone</label>
              <input
                className="input"
                name="phone"
                value={profile.basicInfo.phone}
                onChange={(e) => handleFieldChange('basicInfo', 'phone', e.target.value)}
              />

              <label>Email</label>
              <input
                className="input"
                name="email"
                value={profile.basicInfo.email}
                onChange={(e) => handleFieldChange('basicInfo', 'email', e.target.value)}
              />
            </div>
            <div className="mt-3">
              <h3 className="my-2 text-xl font-semibold dark:text-white">Skills and Qualifications:</h3>
              <textarea
                className="input"
                name="skills"
                value={profile.skills.description}
                onChange={(e) => handleFieldChange('skills', 'description', e.target.value)}
              />
            </div>
            <div className="mt-3">
              <h3 className="my-2 text-xl font-semibold dark:text-white">Employment History</h3>
              {profile.employmentHistory.map((employment, index) => (
                <div key={index} className="px-8 py-4">
                  <h3 className="my-2 text-xl font-semibold dark:text-white">
                    Employer {index + 1}
                    <button className="btn btn-sm btn-red ml-4 py-1 px-2" type="button" onClick={() => deleteEmployment(index)}>
                      Delete
                    </button>
                  </h3>
                  <label>Company: </label>
                  <input
                    className="input"
                    name="company"
                    value={employment.company}
                    onChange={(e) => handleFieldChange('employmentHistory', 'company', e.target.value, index)}
                  />

                  <label>Position: </label>
                  <input
                    className="input"
                    name="position"
                    value={employment.position}
                    onChange={(e) => handleFieldChange('employmentHistory', 'position', e.target.value, index)}
                  />

                  <label>Description: </label>
                  <input
                    className="input"
                    name="description"
                    value={employment.description}
                    onChange={(e) => handleFieldChange('employmentHistory', 'description', e.target.value, index)}
                  />

                  <label>Start Date:</label>
                  <input
                    className="input"
                    name="startDate"
                    type="date"
                    value={employment.startDate}
                    onChange={(e) => handleFieldChange('employmentHistory', 'startDate', e.target.value, index)}
                  />

                  <label>End Date:</label>
                  <input
                    className="input"
                    name="endDate"
                    type="date"
                    value={employment.endDate}
                    onChange={(e) => handleFieldChange('employmentHistory', 'endDate', e.target.value, index)}
                  />
                </div>
              ))}
              <button className="btn btn-primary mt-3" type="button" onClick={addEmployment}>
                Add employment history
              </button>
            </div>
            <button className="btn btn-primary mt-5" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </motion.div>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal dark:text-white">Connect Wallet to view your personalized dashboard.</h3>
      </IsWalletDisconnected>
    </IsWalletConnected>
  )
}

export default PageDashboardAccount
