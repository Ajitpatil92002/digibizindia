/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Briefcase, ThumbsUp, Plus, Camera, HeartIcon, ChevronRightIcon, ChevronLeftIcon, Share2Icon, PhoneIcon, HomeIcon, Circle, Clock12Icon, Facebook, Instagram } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"


export default function Component({ name, title, desc, phone, address, timings, fb, insta, products, bannerImg }: { name: string, title: string, desc: string, phone: string, address: string, timings: string, fb: string, insta: string, products: Product[], bannerImg: string }) {
    return (
        <div className="max-w-2xl mx-auto space-y-6 p-4">
            <Card id="home" >
                <CardHeader className="p-0">
                    <div className="relative h-48 bg-gradient-to-r from-red-400 to-red-600">
                        <img
                            src={bannerImg || ""}
                            alt="Profile background"
                            width={1000}
                            height={1000}
                            className="rounded-t-lg h-auto w-auto"
                        />
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-100"
                        >
                            <Camera className="h-4 w-4" />
                            <span className="sr-only">Edit background image</span>
                        </Button>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="flex flex-row items-center justify-center sm:space-x-4">
                            <Avatar className="w-32 h-32 border-4 border-white -mt-16 relative z-10">
                                <AvatarImage src="/placeholder-avatar.jpg" alt={name} />
                                <AvatarFallback className="text-lg">{name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                            </Avatar>

                        </div>
                        <div className="text-justify flex flex-col items-center justify-center sm:space-x-4">
                            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
                            <p className="text-gray-200">{title}</p>
                            <p className="text-sm text-gray-500">
                                {desc}
                            </p>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <div id="products" className="">
                <h4 className="my-10 text-2xl text-center font-bold">Products</h4>
                <div className="md:grid grid-cols-2 gap-2">
                    {
                        products.map((product) => <Product key={product.id} product={product} />)
                    }
                </div>
            </div>
            <div id="contact" >
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
                                    href={`tel:${phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:underline"
                                >
                                    {phone}
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
                                    {address}
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
                                    {timings}
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
                                    href={`${fb}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:underline"
                                >
                                    {fb}
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
                                    href={`${insta}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:underline"
                                >
                                    {insta}
                                </a>
                            </div>
                        </div>
                    </CardContent>

                </Card>

            </div>
        </div >
    )
}


const ImageCarousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Change image every 3 seconds
        return () => clearInterval(interval); // Cleanup the interval on component unmount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]); // Dependency array ensures the effect runs on currentIndex change

    return (
        <div className="relative bg-red-400">
            <div className="transition-transform duration-700 ease-in-out">
                <Image
                    width={1000}
                    height={1000}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full aspect-square object-cover  ease-in-out transition-opacity flex  duration-700 "
                />
            </div>
            {images.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={prevSlide}
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={nextSlide}
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1.5 w-1.5 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

interface Product {
    id: string | number
    title: string
    description: string
    price: string
    images: string[]
}

const Product = ({ product }: { product: Product }) => {
    const params = useParams()
    const handleShare = async () => {
        if (navigator.share) {

            try {
                if (product.images) {
                    const blobs = product.images.map(dataUrl => {
                        const byteString = atob(dataUrl.split(',')[1]);
                        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
                        const ab = new ArrayBuffer(byteString.length);
                        const ia = new Uint8Array(ab);
                        for (let i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                        }
                        return new Blob([ab], { type: mimeString });
                    });

                    // Create File objects from Blobs
                    const files = blobs.map((blob, index) => new File([blob], `image${index + 1}.png`, { type: blob.type }));
                    await navigator.share({
                        title: product.title,
                        text: product.description,
                        url: window.location.href,
                        files: files,
                    })
                } else {
                    await navigator.share({
                        title: product.title,
                        text: product.description,
                        url: window.location.href,
                    })
                }
            } catch (error) {
                alert("Error sharing")
                console.error("Error sharing:", error)
            }
        } else {
            alert("Share not supported")
        }
    }
    return (
        <Link href={`/biz/${params.slug || ""}/product?productId=${product.id}`}>
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <ImageCarousel images={product.images} />
                    <div className="p-3">
                        <div className="flex justify-between items-start w-full">
                            <div>
                                <h2 className="text-lg font-semibold">{product.title}</h2>
                                <p className="text-sm text-gray-500">{product.description}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="text-xl font-bold">{product.price} Rs</span>
                            <Button variant="ghost" size="icon" onClick={handleShare}>
                                <Share2Icon className="h-5 w-5" />
                                <span className="sr-only">Share product</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}