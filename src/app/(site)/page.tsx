import Header from "@/components/header";
import LoginButton from "@/components/loginbtn";
import Particles from "@/components/magicui/particles";
import ParticlesComp from "@/components/particles";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Video from "@/components/video";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const user = await getCurrentUser()
  return (
    <>
      <Header />
      <main className="app">
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <ParticlesComp />
          <section className="grid items-center gap-6 pb-8 pt-6 md:py-10 z-auto">
            <div className="flex-center w-full flex-col">
              <h1 className="text-4xl md:head_text text-center ">
                Digitalize Your Business
                <br className="" />
                <span className="orange_gradient">Elevate Your Online Presence.</span>
              </h1>
              <p className="desc text-center">
                Go, Grow, Simplify digital and Make your business shine online with our expert digitalization app!
              </p>
            </div>
          </section>
          <div className="flex-center gap-4 hover:cursor-pointer">
            <Link href={"/getstart"} className={cn(buttonVariants(), "absolute bottom-4 md:bottom-[80px]")}>
              Get Started
            </Link>
            <Link href={"/demo"} className={cn(buttonVariants(), "absolute bottom-4 md:bottom-[80px]")}>
              Demo
            </Link>
            {
              user && <Link href={"/profile"} className={cn(buttonVariants(), "absolute bottom-4 md:bottom-[80px]")}>
                View Profile
              </Link>
            }

          </div>
        </div>
        <section className="feed mt-14">
          <Suspense fallback={
            <>
              <Skeleton className="h-40 w-full" />
            </>
          }>
            <Video />
          </Suspense>
        </section>
      </main>
    </>
  );
}
