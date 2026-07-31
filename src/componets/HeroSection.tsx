'use client'
import React from 'react'
import { delay, motion } from 'framer-motion'
import { Bike, Bus, Car, Truck } from 'lucide-react'

function HeroSection({ onAuthRequired }: { onAuthRequired: () => void }) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden   '>
    <div className=' absolute inset-0 bg-cover bg-center' style={{backgroundImage: "url('/heroImage.jpg')"}}>
    <div className='absolute inset-0 bg-black/80' />
          <div className='relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center max-w-3xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl sm:text-5xl font-extrabold text-white md:text-7xl'
            >
              Book any vehicle

            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl'
            >
            From daily rides to heavy transport - all in one platform
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='mt-8 flex flex-wrap justify-center gap-8 text-gray-300'
            >
              <Bike size={30} /> 
              <Car size={30} />
              <Bus size={30} />
              <Truck size={30} />

            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className='mt-12 bg-white shadow-xl hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-fullmt-12 bg-white shadow-xl hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-full hover:scale-110 active:scale-95 transition-all duration-300 ease-out
               
            '
           onClick={onAuthRequired} >
              Book Now
            </motion.button>
          </div>
    </div>
      
    </div>
  )
}

export default HeroSection
