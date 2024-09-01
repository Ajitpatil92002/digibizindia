import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"


export async function MainNav() {
    return (
        <div className="flex md:gap-10">
            <Link href="/" className="flex items-center space-x-1">
                <span className="orange_gradient  inline-block text-lg  font-bold sm:text-2xl ">
                    DigiBizIndia
                </span>
            </Link>
        </div>
    )
}