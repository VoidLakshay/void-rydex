'use client'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/redux/UserSlice'

function useGetMe() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getMe = async () => {
        try {
            const { data } = await axios.get("/api/user/me")
            dispatch(setUserData(data))
        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }
    getMe()
  }, [dispatch])
}

export default useGetMe
