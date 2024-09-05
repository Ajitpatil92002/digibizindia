import { NextResponse } from "next/server"
import * as z from "zod"
import { v2 as cloudinary } from "cloudinary"


import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Biz } from "@prisma/client"


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

export async function POST(request: Request, { params }: { params: {} }) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            throw new Error("not allowed")
        }

        const json = await request.json()
        const body = BIZ_SCHEMA.parse(json)

        let logo_result
        let bannerImg_result
        if (body.logo) {
            logo_result = await cloudinary.uploader.upload(body.logo, {
                folder: `/digibizindia/${body.slug}`
            });
        }
        if (body.bannerImg) {
            bannerImg_result = await cloudinary.uploader.upload(body.bannerImg, {
                folder: `/digibizindia/${body.slug}`,
            });
        }

        await db.biz.update({
            where: {
                id: body.id
            },
            data: {
                bizname: body.bizname,
                userId: user.id,
                heading: body.heading,
                subheading: body.subheading,
                type: body.type || "PRODUCT",
                phonenumbers: body.phonenumbers,
                address: body.address,
                timings: body.timings,
                email: body.email,
                fblink: body.fblink,
                instalink: body.instalink,
                otherslink: body.otherslink ? body.otherslink : [],
                ...(logo_result ? {
                    logo_public_id: logo_result?.public_id,
                    logo_secure_url: logo_result?.secure_url,
                } : {}),
                ...(bannerImg_result ? {
                    bannerImg_public_id: bannerImg_result?.public_id,
                    bannerImg_secure_url: bannerImg_result?.secure_url,
                } : {}),
            }
        })

        return new NextResponse(
            JSON.stringify({
                msg: "updated successfully",
                data: {

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


const BIZ_SCHEMA = z.object({
    id: z.string(),
    slug: z.string(),
    bizname: z.string(),
    heading: z.string(),
    email: z.string().optional(),
    subheading: z.string(),
    type: z.enum(['PRODUCT', 'SERVICES']),
    logo: z.string().optional(),
    phonenumbers: z.string().optional(),
    address: z.string(),
    timings: z.string(),
    fblink: z.string(),
    instalink: z.string(),
    bannerImg: z.string().optional(),
    otherslink: z.array(z.string()).optional(),
})