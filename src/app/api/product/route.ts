import { NextResponse } from "next/server"
import * as z from "zod"
import { v2 as cloudinary } from "cloudinary"
import pLimit from "p-limit";

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Biz } from "@prisma/client"

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

const limit = pLimit(10)

const PRODUCT_SCHEMA = z.object({
    id: z.string().optional(),
    bizId: z.string(),
    title: z.string(),
    desc: z.string().optional(),
    imgs: z.array(z.string()).optional(),
    price: z.string(),
})

export async function PATCH(request: Request, { params }: { params: {} }) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            throw new Error("not allowed")
        }

        const json = await request.json()
        const body = PRODUCT_SCHEMA.parse(json)

        if (body.id) {
            throw new Error("product id is required !!");
        }

        const biz = await db.biz.findUniqueOrThrow({
            where: {
                slug: body.bizId,
                userId: user.id
            }
        })

        let imagesToUpload: any = []
        let uploads: any = []
        if (body.imgs) {
            imagesToUpload = body.imgs.map((image) => {
                return limit(async () => {
                    const result = await cloudinary.uploader.upload(image, {
                        folder: `/digibizindia/${biz.slug}`
                    });
                    return result;
                })
            });
            uploads = await Promise.all(imagesToUpload);
        }

        await db.product.update({
            where: {
                id: body.id
            },
            data: {
                bizId: biz.id,
                title: body.title,
                price: body.price,
                // imgs: body.imgs,
                desc: body.desc,
                ...(uploads?.length ? {
                    Images: {
                        createMany: {
                            data: uploads.map((u: any) => {
                                return {
                                    public_id: u.public_id,
                                    secure_url: u.secure_url
                                }
                            })

                        }
                    }
                } : {})
            }
        })

        return new NextResponse(
            JSON.stringify({
                msg: "updated successfully",
                data: {
                    bizId: biz.slug
                },
            }),
            { status: 200 }
        )


    } catch (error: any) {
        console.log("[POST]", JSON.stringify(error))
        return new NextResponse(JSON.stringify({ msg: error.message }), {
            status: 500,
        })
    }
}

export async function POST(request: Request, { params }: { params: {} }) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            throw new Error("not allowed")
        }

        const json = await request.json()
        const body = PRODUCT_SCHEMA.parse(json)
        if (!body.imgs?.length) {
            throw new Error("images are required");
        }
        const biz = await db.biz.findUniqueOrThrow({
            where: {
                id: body.bizId,
                userId: user.id
            }
        })

        let imagesToUpload: any = []
        let uploads: any = []
        if (body.imgs) {
            imagesToUpload = body.imgs.map((image) => {
                return limit(async () => {
                    const result = await cloudinary.uploader.upload(image, {
                        folder: `/digibizindia/${biz.slug}`
                    });
                    return result;
                })
            });
            uploads = await Promise.all(imagesToUpload);
        }

        await db.product.create({
            data: {
                bizId: biz.id,
                title: body.title,
                price: body.price,
                // imgs: body.imgs,
                desc: body.desc,
                Images: {
                    createMany: {
                        data: uploads.map((u: any) => {
                            return {
                                public_id: u.public_id,
                                secure_url: u.secure_url
                            }
                        })

                    }
                }
            }
        })

        return new NextResponse(
            JSON.stringify({
                msg: "Created successfully",
                data: {
                    bizId: biz.slug
                },
            }),
            { status: 200 }
        )
    } catch (error: any) {
        console.log("[POST]", JSON.stringify(error))
        return new NextResponse(JSON.stringify({ msg: error.message }), {
            status: 500,
        })
    }
}