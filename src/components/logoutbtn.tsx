"use client"

import { Button } from "./ui/button"
import { signOut } from "next-auth/react"



const Logoutbtn = () => {

    return (
        <Button onClick={() => signOut({
            callbackUrl: `/`,
        })}>
            Logout
        </Button>
    )
}

export default Logoutbtn