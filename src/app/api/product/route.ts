import { NextResponse } from "next/server"
import * as z from "zod"


import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Biz } from "@prisma/client"

export async function POST(request: Request, { params }: { params: {} }) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            throw new Error("not allowed")
        }

        const json = await request.json()
        const body = PRODUCT_SCHEMA.parse(json)

        await db.product.create({
            data: {
                bizId: body.bizId,
                title: body.title,
                price: body.price,
                imgs: body.imgs,
                desc: body.desc
            }
        })

        return new NextResponse(
            JSON.stringify({
                msg: "",
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

const PRODUCT_SCHEMA = z.object({
    bizId: z.string(),
    title: z.string(),
    desc: z.string().optional(),
    imgs: z.array(z.string()),
    price: z.string(),
})
