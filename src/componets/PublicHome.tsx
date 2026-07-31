'use client'
import React from 'react'
import VehicleSlider from './VehicleSlider'
import HeroSection from './HeroSection'
import AuthModel from './AuthModel'

function PublicHome() {
  const [authopen, setauthopen] = React.useState(true)

  return (
    <>
     <HeroSection onAuthRequired={() => setauthopen(true)} />
      <VehicleSlider/>
      <AuthModel open={authopen} onClose={() => setauthopen(false)} />
    </>
  )
}

export default PublicHome
                             