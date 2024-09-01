"use client"

import { LoaderIcon, MailIcon, PhoneIcon, UserIcon, UsersIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Biz } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"


const Profileclient = ({ data }: {
    data: {
        name: string,
        email: string,
        phoneNumber: string,
        gender: string,
        img: string,
        bizes: Biz[]
    }
}) => {
    return (
        <div className="container mx-auto p-2 md:p-6 space-y-8">
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center justify-between">
                        <span>Profile</span>
                        <UpdateProfileComponent name={data.name} email={data.email} phoneNumber={data.phoneNumber} gender={data.gender} />
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 items-center justify-center md:items-start md:justify-normal">
                    <div className="md:flex items-center md:space-x-4 space-y-2">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={data.img} alt="User" />
                            <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">{data.name}</h2>
                            <div className="flex items-center space-x-2">
                                <MailIcon className="w-4 h-4" />
                                <span>{data.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PhoneIcon className="w-4 h-4" />
                                <span>{data.phoneNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <UserIcon className="w-4 h-4" />
                                <span>{data.gender}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {data.bizes.map((biz) => (
                    <Link key={biz.id} href={`/biz/${biz.slug}`}>
                        <Card id="home" >
                            <CardHeader className="p-0">
                                <div className="relative h-48 bg-gradient-to-r from-red-400 to-red-600">
                                    <Image
                                        src={biz.bannerImg || ""}
                                        alt="Profile background"
                                        width={1000}
                                        height={1000}
                                        className="rounded-t-lg h-auto w-auto"
                                    />
                                </div>
                                <div className="px-6 pb-6">
                                    <div className="flex flex-row items-center justify-center sm:space-x-4">
                                        <Avatar className="w-32 h-32 border-4 border-white bg-background -mt-16 relative z-10">
                                            <AvatarImage src={biz.logo || ""} alt={biz.bizname || ""} />
                                            <AvatarFallback className="text-lg">{biz.bizname.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="text-justify flex flex-col items-center justify-center sm:space-x-4">
                                        <CardTitle className="text-2xl font-bold">{biz.bizname}</CardTitle>
                                        <p className="">{biz.heading}</p>
                                        <p className="text-sm text-gray-400">
                                            {biz.subheading}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Profileclient



function UpdateProfileComponent({ name, email, phoneNumber, gender }: { name: string, email: string, phoneNumber: string, gender: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubtting, setIsSubtting] = useState(false)
    const [formData, setFormData] = useState({
        name,
        email,
        phoneNumber,
        gender
    })
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubtting(true)
        try {
            await axios.post("/api/updateprofile", {
                ...formData
            })
            alert("Profile Updated")
            router.refresh()
        } catch (error) {
            alert("Something gone wrong")
        } finally {
            setIsSubtting(false)
            setIsOpen(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                    Update Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
                        <UsersIcon className="w-6 h-6 text-purple-500" />
                        <span>Update Profile</span>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium flex items-center space-x-2">
                            <UserIcon className="w-4 h-4 text-purple-500" />
                            <span>Name</span>
                        </Label>
                        <Input
                            disabled={isSubtting}
                            id="name"
                            name="name"
                            placeholder="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium flex items-center space-x-2">
                            <MailIcon className="w-4 h-4 text-purple-500" />
                            <span>Email</span>
                        </Label>
                        <Input
                            disabled={isSubtting}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@gmail.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center space-x-2">
                            <PhoneIcon className="w-4 h-4 text-purple-500" />
                            <span>Phone Number</span>
                        </Label>
                        <Input
                            disabled={isSubtting}
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="1234567890"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center space-x-2">
                            <UsersIcon className="w-4 h-4 text-purple-500" />
                            <span>Gender</span>
                        </Label>
                        <RadioGroup
                            disabled={isSubtting}
                            name="gender"
                            value={formData.gender}
                            onValueChange={(value: any) => setFormData(prev => ({ ...prev, gender: value }))}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="MALE" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="FEMALE" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="OTHERS" id="other" />
                                <Label htmlFor="other">Other</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button
                        disabled={isSubtting}
                        type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                        {isSubtting && <LoaderIcon className="animate-spin h-4 w-4 mx-2" />}
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}