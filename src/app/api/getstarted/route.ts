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
        const body = GETSTARED_SCHEMA.parse(json)

        let biz: Biz | null = null

        if (body.bizId) {
            biz = await db.biz.update({
                where: {
                    slug: body.bizId
                },
                data: {
                    phonenumbers: body.phonenumbers,
                    address: body.address,
                    timings: body.timings,
                    fblink: body.fblink,
                    instalink: body.instalink,
                    otherslink: body.otherslink ? body.otherslink : [],
                }
            })
        } else {
            const slug = titleToSlug(body.bizname ? body.bizname.trim() : "")
            let logo_result
            let bannerImg_result
            if (body.logo) {
                logo_result = await cloudinary.uploader.upload(body.logo, {
                    folder: `/digibizindia/${slug}`
                });
            }
            if (body.bannerImg) {
                bannerImg_result = await cloudinary.uploader.upload(body.bannerImg, {
                    folder: `/digibizindia/${slug}`,
                });
            }

            biz = await db.biz.create({
                data: {
                    slug,
                    bizname: body.bizname || "",
                    userId: user.id,
                    heading: body.heading,
                    subheading: body.subheading,
                    type: body.type || "PRODUCT",
                    phonenumbers: body.phonenumbers,
                    address: body.address,
                    timings: body.timings,
                    fblink: body.fblink,
                    instalink: body.instalink,
                    otherslink: body.otherslink ? body.otherslink : [],
                    logo_public_id: logo_result?.public_id,
                    logo_secure_url: logo_result?.secure_url,
                    bannerImg_public_id: bannerImg_result?.public_id,
                    bannerImg_secure_url: bannerImg_result?.secure_url,
                }
            })
        }

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

const GETSTARED_SCHEMA = z.object({
    bizId: z.string().optional(),
    bizname: z.string().optional(),
    heading: z.string().optional(),
    subheading: z.string().optional(),
    type: z.enum(['PRODUCT', 'SERVICES']).optional(),
    logo: z.string().optional(),
    phonenumbers: z.string().optional(),
    address: z.string().optional(),
    timings: z.string().optional(),
    fblink: z.string().optional(),
    instalink: z.string().optional(),
    bannerImg: z.string().optional(),
    otherslink: z.array(z.string()).optional(),
})

function titleToSlug(title: string): string {
    // Convert to lowercase
    let slug = title.toLowerCase();

    // Replace spaces with hyphens
    slug = slug.replace(/\s+/g, '-');

    // Remove any special characters
    slug = slug.replace(/[^a-z0-9\-]/g, '');

    // Remove multiple hyphens
    slug = slug.replace(/-+/g, '-');

    // Trim hyphens from start and end
    slug = slug.replace(/^-|-$/g, '');

    return slug;
}
