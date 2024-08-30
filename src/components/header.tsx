import React from "react";

import { MainNav } from "./mainnav";
import { ModeToggle } from "./mode-toogle";
import LoginButton from "./loginbtn";
import { getCurrentUser } from "@/lib/session";
import Logoutbtn from "./logoutbtn";

const Header = async () => {
    const user = await getCurrentUser()
    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-background shadow-md backdrop-blur-md">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                    <MainNav />
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <ModeToggle />
                        <nav className="hidden md:flex items-center space-x-1">
                            {user ? <><span className="p-2 font-medium text-2xl">{user.name} </span><Logoutbtn /></> : <LoginButton />}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;