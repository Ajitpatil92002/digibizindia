import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'
import Image from 'next/image'


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Makedark from '../../demo/makedark'
import { MobileBottomNavbar } from '@/components/bottomNav'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock12Icon, EyeIcon, Facebook, HomeIcon, Instagram, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { ImageCarousel } from './components/imageCarousel'
import ShareButton from '@/components/shareButton'
import { Biz, Images, Product } from '@prisma/client'
import { buttonVariants } from '@/components/ui/button'
import { BizForm } from '@/components/biz-form'
import { getCurrentUser } from '@/lib/session'
import ProductsForm from './components/addProduct'


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
    const currentuser = await getCurrentUser()
    const { slug } = params

    const biz = await db.biz.findUniqueOrThrow({
        where: {
            slug
        }, include: {
            Product: {
                include: {
                    Images: true
                }
            }
        }
    })
    const isAdmin = currentuser?.id == biz.userId
    return (
        <div className=''>
            <Makedark />
            <MobileBottomNavbar biz={biz} isProducts={true} link={`biz/${slug}`} />
            <div className="max-w-2xl mx-auto space-y-6 p-4">
                <BizProfile biz={biz} isAdmin={isAdmin} />
                <div id="products" className="">
                    <div className='flex items-center justify-between'>
                        <h4 className="my-10 text-2xl text-center font-bold">{biz.type == "PRODUCT" ? "Products" : "Services"}</h4>
                        <div>
                            <ProductsForm bizId={biz.id} />
                        </div>
                    </div>
                    <div className="md:grid grid-cols-2 gap-4">

                        {
                            biz.Product.map((product) => <BizProduct slug={biz.slug} key={product.id} product={product} />)
                        }
                    </div>
                </div>
                <BizContact biz={biz} />
            </div >
            <div className='h-screen'>
            </div>
        </div>
    )
}

export default BizSitepage

function BizProfile({ biz, isAdmin }: { biz: Biz, isAdmin: boolean }) {
    return <Card id="home" >
        <CardHeader className="p-0">
            <div className="relative h-48 bg-gradient-to-r from-red-400 to-red-600">
                <Image
                    src={biz.bannerImg || ""}
                    alt="Profile background"
                    layout="fill" // Use fill to make the image responsive
                    objectFit="cover" // Cover the container while maintaining aspect ratio
                    objectPosition="center" // Center the image
                    className="rounded-t-lg"
                />
            </div>
            <div className="px-6 pb-6">
                <div className="flex flex-row items-center justify-center sm:space-x-4">
                    <Avatar className="w-32 h-32 border-4 border-white -mt-16 relative z-10">
                        <AvatarImage src={biz.logo || ""} alt={biz.bizname || ""} />
                        <AvatarFallback className="text-lg">{biz.bizname.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    {isAdmin && <BizForm biz={{
                        slug: biz.slug,
                        id: biz.id,
                        bizname: biz.bizname,
                        heading: biz.heading || "",
                        subheading: biz.subheading || "",
                        type: biz.type,
                        logo: biz.logo || undefined,
                        phonenumbers: biz.phonenumbers || "",
                        email: biz.email || "",
                        address: biz.address || "",
                        timings: biz.timings || "",
                        fblink: biz.fblink || "",
                        instalink: biz.instalink || "",
                        bannerImg: biz.bannerImg || undefined,
                        otherslink: biz.otherslink.join(",") || "",
                    }} />}
                </div>
                <div className="text-justify flex flex-col items-center justify-center sm:space-x-4">
                    <CardTitle className="text-2xl font-bold">{biz.bizname}</CardTitle>
                    <p className="text-gray-200">{biz.heading}</p>
                    <p className="text-sm text-gray-500">
                        {biz.subheading}
                    </p>
                </div>
            </div>
        </CardHeader>
    </Card>
}

function BizContact({ biz }: { biz: Biz }) {
    return <div id="contact" >
        <Card>
            <CardHeader>
                <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4 py-2">
                    <div className="flex-shrink-0 bg-red-500 rounded-full p-2">
                        <PhoneIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Phone Number</p>
                        <a
                            href={`tel:${biz.phonenumbers}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                        >
                            {biz.phonenumbers}
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-4 py-2">
                    <div className="flex-shrink-0 bg-red-500 rounded-full p-2">
                        <HomeIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Address</p>
                        <p
                            className="text-sm"
                        >
                            {biz.address}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4 py-2">
                    <div className="flex-shrink-0 bg-red-500 rounded-full p-2">
                        <Clock12Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Timings</p>
                        <p
                            className="text-sm"
                        >
                            {biz.timings}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4 py-2">
                    <div className="flex-shrink-0 bg-red-500 rounded-full p-2">
                        <Facebook className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Facebook</p>
                        <a
                            href={`${biz.fblink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                        >
                            {biz.fblink}
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-4 py-2">
                    <div className="flex-shrink-0 bg-red-500 rounded-full p-2">
                        <Instagram className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Instagram</p>
                        <a
                            href={`${biz.instalink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                        >
                            {biz.instalink}
                        </a>
                    </div>
                </div>
            </CardContent>

        </Card>

    </div>
}

interface IProduct extends Product {
    Images: Images[]
}

function BizProduct({ product, slug }: { product: IProduct, slug: string }) {

    return (

        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <ImageCarousel Images={product.Images} images={product.imgs} />
                <div className="p-3">
                    <div className="flex justify-between items-start w-full">
                        <div>
                            <h2 className="text-lg font-semibold">{product.title}</h2>
                            <p className="text-sm text-gray-500">{product.desc}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <span className="text-xl font-bold">{product.price} Rs</span>
                        <div className='flex items-center gap-2'>
                            <Link href={`/biz/${slug}/product?productId=${product.id}`} className={buttonVariants({ size: "icon", variant: "outline" })}>
                                <EyeIcon className='h-4 w-4' />
                            </Link>
                            <ShareButton files={product.imgs} title={product.title} text={product.title} url={`/biz/${slug}/product?productId=${product.id}`} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


