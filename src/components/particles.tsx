"use client"

import { useTheme } from "next-themes";
import Particles from "./magicui/particles"
import { useEffect, useState } from "react";

const ParticlesComp = () => {
    const { theme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(theme === "dark" || theme === "system" ? "#ffffff" : "#000000");
    }, [theme]);
    return (
        <Particles
            className="absolute inset-0"
            quantity={200}
            ease={300}
            color={color}
            refresh
        />
    )
}

export default ParticlesComp