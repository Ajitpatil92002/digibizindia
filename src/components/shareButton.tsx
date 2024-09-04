"use client"

import { Share2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { useParams } from "next/navigation"

const ShareButton = ({ title, text, url, files }: { title: string, text: string, url: string, files: string[] }) => {
    const params = useParams()
    const handleShare = async () => {
        if (navigator.share) {

            try {
                if (files) {
                    const blobs = files.map(dataUrl => {
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
                    const sfiles = blobs.map((blob, index) => new File([blob], `image${index + 1}.png`, { type: blob.type }));
                    await navigator.share({
                        title: title,
                        text: text,
                        url,
                        files: sfiles,
                    })
                } else {
                    await navigator.share({
                        title: title,
                        text: text,
                        url,
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
        <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2Icon className="h-5 w-5" />
            <span className="sr-only">Share product</span>
        </Button>
    )
}

export default ShareButton