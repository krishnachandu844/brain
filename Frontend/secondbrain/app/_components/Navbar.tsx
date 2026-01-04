"use client";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const scrolled = useScrollTop();
  const router = useRouter();

  return (
    <div
      className={cn(
        "z-50 fixed top-0 flex items-center p-4 border-b w-full bg-background",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <Image
        src={"/brainstorm.png"}
        width={30}
        height={30}
        alt='brain'
        className='md:hidden'
      />

      <div className='flex items-center gap-x-4 ml-auto'>
        <Button
          onClick={() => {
            router.push("/signup");
          }}
        >
          Signup
        </Button>
        <Button
          onClick={() => {
            router.push("/signin");
          }}
        >
          Signin
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
