"use client"

import { Share2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { useParams } from "next/navigation"

const ShareButton = ({ title, text, url }: { title: string, text: string, url: string }) => {
    const params = useParams()
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url,
                })
            } catch (error) {
                alert("Error sharing")
                console.error("Error sharing:", error)
            }
        } else {
            alert("Share not supported")
        }
    }
    return (
        <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2Icon className="h-5 w-5" />
            <span className="sr-only">Share product</span>
        </Button>
    )
}

export default ShareButton