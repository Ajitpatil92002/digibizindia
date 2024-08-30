'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Share2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@prisma/client'



export default function ProductComponent({ product }: { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imgs.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imgs.length) % product.imgs.length)
    }

    const handleShare = async () => {
        if (navigator.share) {

            try {
                if (product.imgs) {
                    const blobs = product.imgs.map(dataUrl => {
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
                        text: product.desc || "",
                        url: window.location.href,
                        files: files,
                    })
                } else {
                    await navigator.share({
                        title: product.title,
                        text: product.desc || "",
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
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="relative overflow-hidden">
                    <CardContent className="p-0">
                        <div className="relative aspect-square">
                            <Image
                                src={product.imgs[currentImageIndex]}
                                alt={`Product image ${currentImageIndex + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-between p-4">
                            <Button variant="outline" size="icon" onClick={prevImage} className="rounded-full bg-background/80">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={nextImage} className="rounded-full bg-background/80">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    {product.desc && <p className="text-muted-foreground mb-6">{product.desc}</p>}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-2xl font-semibold">{product.price} Rs</span>
                        <Button size="icon" onClick={handleShare}>
                            <Share2Icon className="h-5 w-5" />
                            <span className="sr-only">Share product</span>
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        {product.imgs.map((_, index) => (
                            <Button
                                key={index}
                                variant={index === currentImageIndex ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentImageIndex(index)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}