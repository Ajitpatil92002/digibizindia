import React from 'react'
import Makedark from '../../demo/makedark'
import { MobileBottomNavbar } from '../../demo/bottomNav'
import Component from '../../demo/client'
import { db } from '@/lib/db'
import { Metadata, ResolvingMetadata } from 'next'


type Props = {
    params: { slug: string }
    searchParams: {}
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { slug } = params

    const biz = await db.biz.findUniqueOrThrow({
        where: {
            slug
        },
    })

    return {
        title: biz.bizname,
        description: biz.heading,
    }
}


const BizSitepage = async ({ params }: {
    params: {
        slug: string
    }
}) => {
    const { slug } = params

    const biz = await db.biz.findUniqueOrThrow({
        where: {
            slug
        }, include: {
            Product: true
        }
    })

    return (
        <div className=''>
            <Makedark />
            <MobileBottomNavbar isProducts={true} />
            <Component products={biz.Product.map((pro) => ({
                id: pro.id,
                title: pro.title,
                description: pro.desc || "",
                price: pro.price,
                images: pro.imgs,
            }))} phone={biz.phonenumbers || ""} name={biz.bizname} title={biz.heading || ""} desc={
                biz.subheading || ""
            } address={biz.address || ""} timings={biz.timings || ""} fb={biz.fblink || ""} insta={biz.instalink || ""} />
            <div className='h-screen'>
            </div>
        </div>
    )
}

export default BizSitepage