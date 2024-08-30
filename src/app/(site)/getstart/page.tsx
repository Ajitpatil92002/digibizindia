import Header from '@/components/header'
import LoginButton from '@/components/loginbtn'
import { getCurrentUser } from '@/lib/session'
import React from 'react'
import StepForm from './components/stepForm'

const GetStartpage = async () => {
    const user = await getCurrentUser()
    if (!user) {
        return <div>
            <Header />
            <div className='flex items-center justify-center'>
                <LoginButton />
            </div>
        </div>
    }
    return (
        <div>
            <Header />
            <div className=''>
                <StepForm />
            </div>
        </div>
    )
}

export default GetStartpage