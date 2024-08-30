import Header from '@/components/header'
import LoginButton from '@/components/loginbtn'
import { getCurrentUser } from '@/lib/session'
import React from 'react'
import Profileclient from './client'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'

const Profilepage = async ({ params, searchParas }: {
    params: {},
    searchParas: {}
}) => {
    const user = await getCurrentUser()

    if (!user) {
        return <div>
            <Header />
            <div className='flex items-center justify-center'>
                <LoginButton />
            </div>
        </div>
    }

    let userData = await db.user.findUnique({
        where: {
            id: user.id
        }, include: {
            Biz: true
        }
    })

    if (!userData) {
        return notFound()
    }

    const data = {
        name: user.name || "",
        email: user.email || "",
        phoneNumber: userData.phonenumber || "",
        img: userData.image || "",
        gender: userData.gender || "",
        biz: userData.Biz
    }

    return (
        <div>
            <Header />
            <div className=''>
                <Profileclient data={data} />
            </div>
        </div>
    )
}

export default Profilepage