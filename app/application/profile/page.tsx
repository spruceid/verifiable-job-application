'use client'
import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

const initialProfile = {
  basicInfo: {
    name: '',
    address: '',
    phone: '',
    email: '',
  },
  skills: '',
  employmentHistory: [],
}

const PageDashboardAccount = () => {
  const [profile, setProfile] = useState(initialProfile)

  // Updating the page based on the changes in profile object
  useEffect(() => {
    // Fetch data and setProfile here
    // By default, it is setting to initial values.
    setProfile(initialProfile)
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(profile)
    // Here you can handle the submission of the form, i.e., updating the profile
    // You can make a POST request through Axios or Fetch API
  }

  const addEmployment = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      employmentHistory: [...prevProfile.employmentHistory, { company: '', position: '', description: '', startDate: '', endDate: '' }],
    }))
  }

  return (
    <IsWalletConnected>
      <motion.div
        animate="show"
        className="flex h-full w-full items-center justify-center"
        initial="hidden"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        viewport={{ once: true }}
        whileInView="show">
        <div className="card w-[420px] rounded-lg p-6">
          <h3 className="text-2xl font-normal">Profile</h3>
          <hr className="my-3 dark:opacity-30" />
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
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
              <label>Skills and Qualifications:</label>
              <textarea className="input" name="skills" value={profile.skills} onChange={(e) => handleFieldChange('skills', null, e.target.value)} />
            </div>
            <div className="mt-3">
              {profile.employmentHistory.map((employment, index) => (
                <div key={index}>
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
                Add another employment history
              </button>
            </div>
            <button className="btn btn-primary mt-5" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </motion.div>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">Connect Wallet to view your personalized dashboard.</h3>
      </IsWalletDisconnected>
    </IsWalletConnected>
  )
}

export default PageDashboardAccount
