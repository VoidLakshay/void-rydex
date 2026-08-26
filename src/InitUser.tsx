'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import useGetMe from './hooks/useGetMe'

// Helper component to avoid React "Rules of Hooks" violation
// since we can't conditionally call useGetMe() directly inside an if-statement.
function AuthenticatedUserInit() {
    useGetMe()
    return null
}

function InitUser() {
    const { status } = useSession()
    
    if (status === "authenticated") {
        return <AuthenticatedUserInit />
    }
    
    return null
}

export default InitUser
