"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


interface FormData {
    title: string;
    desc?: string;
    imgs: string[]; // Array of image data URLs
    price: string;
}

const ProductsForm = ({ bizId }: { bizId: string, }) => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        desc: '',
        imgs: [],
        price: '',
    });

    const [isSubmitting, setisSubmitting] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        newImages.push(reader.result as string);
                        if (newImages.length === files.length) {
                            setFormData({
                                ...formData,
                                imgs: newImages,
                            });
                        }
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setisSubmitting(true)
            const resp = await axios.post("/api/product/", {
                id: bizId,
                bizId,
                ...formData
            })
            setFormData({
                title: '',
                desc: '',
                imgs: [],
                price: '',
            })
        } catch (error: any) {
            alert("error" + error.response.data.msg || error.message)
        } finally {
            setisSubmitting(false)
        }
    };

    return (
        <Sheet>
            <SheetTrigger>
                <Button>Add Product</Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
                <SheetHeader>
                    <div className="flex md:items-center md:justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md"
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-6 md:text-center">Product Information</h2>
                            </div>

                            <div className="mb-4">
                                <label className="block">Title <span className="text-red-600">*</span></label>
                                <Input
                                    disabled={isSubmitting}
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block">Description</label>
                                <Textarea
                                    disabled={isSubmitting}

                                    name="desc"
                                    value={formData.desc || ''}
                                    onChange={handleChange}
                                    rows={4}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block">Price <span className="text-red-600">*</span></label>
                                <Input
                                    disabled={isSubmitting}
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block">Images</label>
                                <Input
                                    disabled={isSubmitting}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="w-full p-2 border rounded mt-1"
                                />
                            </div>

                            {formData.imgs.length > 0 && (
                                <div className="mb-6">
                                    <label className="block">Image Previews</label>
                                    <div className="flex flex-wrap gap-4">
                                        {formData.imgs.map((img, index) => (
                                            <Image
                                                width={1000}
                                                height={1000}
                                                key={index}
                                                src={img}
                                                alt={`Preview ${index}`}
                                                className="w-24 h-24 object-cover border rounded"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                            >
                                {
                                    isSubmitting && <LoaderIcon className='animate-spin h-4 w-4' />
                                }
                                Submit
                            </Button>
                        </form>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default ProductsForm;
