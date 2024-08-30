import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"


export async function MainNav() {
    const items = [
        {
            href: "Home",
            disabled: false,
            title: ""
        },
        {
            href: "Pricing",
            disabled: false,
            title: ""
        },
        {
            href: "About",
            disabled: false,
            title: ""
        },
        {
            href: "Contact",
            disabled: false,
            title: ""
        }
    ]
    return (
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
                <span className="orange_gradient  inline-block  font-bold sm:text-2xl ">
                    DigiBizIndia
                </span>
            </Link>
            {(
                <nav className="flex gap-6">
                    {items?.map(
                        (item, index) =>
                            item.href && (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center text-sm font-medium text-muted-foreground",
                                        item.disabled && "cursor-not-allowed opacity-80"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            )
                    )}
                </nav>
            )}
        </div>
    )
}