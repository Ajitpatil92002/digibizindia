"use client"
import { cn } from "@/lib/utils";
import { Biz } from "@prisma/client";
import { Bell, BookOpenIcon, HomeIcon, LayoutDashboard, PhoneIcon, Settings, Settings2, ShapesIcon, Share2Icon, ShareIcon, User, Users2, UserSquareIcon } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";



export const MobileBottomNavbar = ({ isProducts, link, biz }: { biz: Biz | null, isProducts: boolean, link: string }) => {

    const pathname = usePathname()
    const params = useParams()

    const items = [
        {
            id: "m;avlnM",
            title: "Home",
            href: `/${link}#home`,
            icon: HomeIcon,
        }, {
            id: "anlsm",
            title: isProducts ? "Products" : "Services",
            href: `/${link}#product`,
            icon: ShapesIcon,
        },
        {
            id: "mankcow",
            title: "Contact",
            href: `/${link}#contact`,
            icon: PhoneIcon,
        },
    ]

    function isActive(href: string) {
        return href == pathname
    }

    return (
        <nav className="max-w-2xl mx-auto fixed inset-x-0 bottom-0 z-50 flex justify-between border-t bg-red-800 text-white p-4 shadow-lg ">
            {items.map((item, index) => (
                <Link key={item.href} href={item.href}>
                    <div className={cn("flex flex-col items-center", isActive(item.href)
                        ? "font-bold"
                        : "text-lg font-medium ")}>
                        <div className="mb-1 text-lg">{item.icon && <item.icon className="my-1 h-4 w-4" />}</div>
                        <div className="text-xs">{item.title}</div>
                    </div>
                </Link>
            ))}
            <div className={cn("flex flex-col items-center")} onClick={async () => {
                if (navigator.share) {
                    await navigator.share({
                        title: biz?.bizname,
                        text: biz?.bizname + "\n" + biz?.heading + "\n" + biz?.subheading,
                        url: window.location.href,
                    })
                } else {
                    alert("Error sharing")
                    console.error("Error sharing:")
                }
            }}>
                <div className="mb-1 text-lg"><Share2Icon /></div>
                <div className="text-xs">Share</div>
            </div>
        </nav>
    );
};