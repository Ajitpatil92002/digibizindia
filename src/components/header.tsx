import React from "react";
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { MainNav } from "./mainnav";
import { ModeToggle } from "./mode-toogle";
import LoginButton from "./loginbtn";
import { getCurrentUser } from "@/lib/session";
import Logoutbtn from "./logoutbtn";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = async () => {
    const user = await getCurrentUser()
    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-background shadow-md backdrop-blur-md">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                    <MainNav />
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <ModeToggle />
                        <nav className="hidden md:flex items-center space-x-4">
                            {user ? <><UserProfileLinkComponent name={user.name || ""} avatarSrc={user.image || ""} /><Logoutbtn /></> : <LoginButton />}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;

interface UserProfileLinkProps {
    name: string
    avatarSrc: string
}

function UserProfileLinkComponent({ name, avatarSrc }: UserProfileLinkProps) {
    return (
        <Link href={`/profile`}>
            <Avatar className="w-12 h-12 border-2  shadow-sm">
                <AvatarImage src={avatarSrc} alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
        </Link>
    )
}