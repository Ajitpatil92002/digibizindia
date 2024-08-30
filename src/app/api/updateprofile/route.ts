import { NextResponse } from "next/server"
import * as z from "zod"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Gender } from "@prisma/client"

export async function POST(request: Request, { params }: { params: {} }) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            throw new Error("not allowed")
        }

        const json = await request.json()
        const body = PROFILE_SCHEMA.parse(json)

        const userData = await db.user.update({
            where: {
                id: user.id
            }, data: {
                name: body.name,
                email: body.email,
                phonenumber: body.phoneNumber,
                gender: body.gender as Gender
            }
        })


        return new NextResponse(
            JSON.stringify({
                msg: "Updated",
                data: {

                },
            }),
            { status: 200 }
        )
    } catch (error: any) {
        console.log("[PROFILE_UPDATE]", JSON.stringify(error))
        return new NextResponse(JSON.stringify({ msg: error.message }), {
            status: 500,
        })
    }
}


const PROFILE_SCHEMA = z.object({
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    gender: z.string(),
})
