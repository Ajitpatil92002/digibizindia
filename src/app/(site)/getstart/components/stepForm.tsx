"use client"

import confetti from "canvas-confetti";
import { useState } from "react"
import BizdetailsForm from "./bizdetailsForm"
import ContactForm from "./contatcForm"
import ProductsForm from "./products"
import CongratsComponent from "./congrats";

const StepForm = () => {

    const [state, setstate] = useState<"BIZ_DETAILS" | "CONTACT" | "PRODUCTS" | "CONGRATS">("BIZ_DETAILS")
    const [bizId, setbizId] = useState<null | string>(null)

    const populateConfetti = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };

        frame();
    };

    const handleForm = (bizId: string) => {
        (setbizId(bizId))
        if (state == "BIZ_DETAILS") {
            setstate("CONTACT")
        } else if (state == "CONTACT") {
            setstate("PRODUCTS")
        } else {
            setstate("CONGRATS")
            populateConfetti()
        }
    }

    if (state == "BIZ_DETAILS") {
        return <BizdetailsForm handleform={handleForm} />
    } else if (state == "CONTACT") {
        return <ContactForm bizId={bizId || ""} handleform={handleForm} />
    } else if (state == "PRODUCTS") {
        return <ProductsForm bizId={bizId || ""} handleform={handleForm} />
    } else {
        return <CongratsComponent
            link=""
            title="Congratulations!"
            message="You have successfully Created Your Businnes Site. Great job!"
        />
    }
}

export default StepForm