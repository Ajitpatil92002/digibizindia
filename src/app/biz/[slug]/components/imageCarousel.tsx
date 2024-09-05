"use client"

import { Button } from "@/components/ui/button"
import { Images } from "@prisma/client"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export const ImageCarousel = ({ images, Images }: { images: string[], Images: Images[] }) => {
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
                    src={Images[currentIndex].secure_url}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full aspect-square object-cover  ease-in-out transition-opacity flex  duration-700 "
                />
            </div>
            {images.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80"
                        onClick={prevSlide}
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80"
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