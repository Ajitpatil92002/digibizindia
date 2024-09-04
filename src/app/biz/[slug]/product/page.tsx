import { db } from '@/lib/db'
import React from 'react'
import ProductComponent from './client'

import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import Makedark from '@/app/demo/makedark'
import { MobileBottomNavbar } from '@/components/bottomNav'

type Props = {
    params: { slug: string }
    searchParams: { productId: string }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { productId } = searchParams

    const product = await db.product.findUniqueOrThrow({
        where: {
            id: productId
        }
    })

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = product.imgs || []

    return {
        title: product.title,
        description: product.desc,
        openGraph: {
            images: [...previousImages],
        },
    }
}

const Productpage = async ({ searchParams, params }: {
    params: {
        slug: string
    }
    searchParams: {
        productId: string
    }
}) => {

    const { productId } = searchParams
    if (!productId) {
        notFound()
    }
    const product = await db.product.findUniqueOrThrow({
        where: {
            id: productId
        }
    })

    return (
        <div className=''>
            <Makedark />
            <MobileBottomNavbar isProducts={true} link={`biz/${params.slug}`} />
            <ProductComponent product={product} />
        </div>
    )
}

export default Productpage