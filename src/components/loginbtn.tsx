"use client"

import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { signIn } from "next-auth/react"

const LoginButton = () => {
    return (
        <button onClick={() => {
            signIn("google")
        }} aria-label="Log in with Google" className={buttonVariants({ size: "lg" })}>
            Login
        </button>
    )
}

export default LoginButton