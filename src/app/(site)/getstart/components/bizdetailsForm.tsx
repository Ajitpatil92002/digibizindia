"use client"

import axios from "axios"

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
    bizname: string;
    heading: string;
    subheading: string;
    type: 'PRODUCT' | 'SERVICES';
    logo: string;
    bannerImg: string;
}

const BizdetailsForm = ({ handleform }: { handleform: (bizId: string) => void }) => {
    const [formData, setFormData] = useState<FormData>({
        bizname: '',
        type: 'PRODUCT',
        heading: "",
        subheading: "",
        logo: '',
        bannerImg: '',
    });

    const [isSubmitting, setisSubmitting] = useState(false)


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (e.target.name === 'logo') {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({
                        ...formData,
                        logo: reader.result as string, // Store the data URL
                    });
                };
                reader.readAsDataURL(file);
            }
        } else if (e.target.name == "bannerImg") {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({
                        ...formData,
                        bannerImg: reader.result as string, // Store the data URL
                    });
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setisSubmitting(true)
            const resp = await axios.post("/api/getstarted", {
                ...formData
            })
            handleform(resp.data.data.bizId)
        } catch (error: any) {
            alert("error" + error.response.data.msg || error.message)
        } finally {
            setisSubmitting(false)
        }
        // Handle form submission logic here
    };

    return (
        <div className="p-4 flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background p-6 rounded-lg shadow-lg w-full max-w-lg"
            >
                <h2 className="col-span-full text-2xl font-bold mb-6 text-center">Business Details</h2>
                <div className="mb-4">
                    <label className="block">Business Name <span className="text-red-600">*</span></label>
                    <Input
                        disabled={isSubmitting}
                        type="text"
                        name="bizname"
                        value={formData.bizname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Type <span className="text-red-600">*</span></label>
                    <select
                        disabled={isSubmitting}

                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="PRODUCT">PRODUCT</option>
                        <option value="SERVICES">SERVICES</option>
                    </select>
                </div>
                <div className="mb-4 col-span-full">
                    <label className="block">Heading</label>
                    <Textarea
                        disabled={isSubmitting}
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4 col-span-full">
                    <label className="block">subheading</label>
                    <Textarea
                        disabled={isSubmitting}
                        name="subheading"
                        value={formData.subheading}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block">Logo </label>
                    <Input
                        disabled={isSubmitting}
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    {formData.logo && (
                        <Image
                            width={1000}
                            height={1000}
                            src={formData.logo}
                            alt="Selected Logo"
                            className="mt-4 w-full h-auto rounded-lg"
                        />
                    )}
                </div>
                <div className="mb-6">
                    <label className="block">Background Image </label>
                    <Input
                        disabled={isSubmitting}
                        type="file"
                        name="bannerImg"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    {formData.bannerImg && (
                        <Image
                            width={1000}
                            height={1000}
                            src={formData.bannerImg}
                            alt="Selected bannerImg"
                            className="mt-4 w-full h-auto rounded-lg"
                        />
                    )}
                </div>

                <Button
                    disabled={isSubmitting}

                    type="submit"
                    className="col-span-full w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    {isSubmitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
                    Next
                </Button>
            </form>
        </div>
    )
}

export default BizdetailsForm