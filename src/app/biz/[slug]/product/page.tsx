import { db } from '@/lib/db'
import React from 'react'
import ProductComponent from './client'

import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
    params: { id: string }
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

const Productpage = async ({ searchParams }: {
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
        <ProductComponent product={product} />
    )
}

export default Productpage