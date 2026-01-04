"use client";
import FacebookIcon from "@/icons/FacebookIcon";
import { InstagramIcon } from "@/icons/InstagramIcon";
import { TwitterIcon } from "@/icons/TwitterIcon";
import { YoutubeIcon } from "@/icons/YoutubeIcon";
import { cn } from "@/lib/utils";
import { ChevronsLeft, Grid, MenuIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const asideItems = [
  {
    name: "All",
    type: "all",
    icon: <Grid size={40} color='#5D9CEC' className='ml-1' />,
    color: "#5D9CEC",
  },
  {
    name: "Instagram",
    type: "instagram",
    icon: <InstagramIcon />,
    color: "#E1306C",
  },
  {
    name: "YouTube",
    type: "youtube",
    icon: <YoutubeIcon />,
    color: "#FF0000",
  },
  {
    name: "Facebook",
    type: "facebook",
    icon: <FacebookIcon />,
    color: "#1877F2",
  },
  {
    name: "Twitter",
    type: "twitter",
    icon: <TwitterIcon />,
    color: "#1DA1F2",
  },
];

export function Navigation() {
  const [activeType, setActiveType] = useState<string>("");
  const [isHovered, setIsHovered] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const matches = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (matches) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [matches]);
  return (
    <>
      <aside
        className={cn(
          "bg-white border-r shadow z-99999 transition-all ease-in-out duration-200 overflow-hidden",
          isOpen ? "w-20 flex items-center flex-col" : "w-96"
        )}
      >
        <div className='flex items-center p-4 justify-between border-b'>
          {!isOpen && (
            <div className='flex gap-x-2 items-center'>
              <Image
                src={"/brainstorm.png"}
                width={40}
                height={40}
                alt='brain'
              />
              <h1 className='text-xl font-bold font-mono'>SecondBrain</h1>
            </div>
          )}
          <div
            className='cursor-pointer p-2 rounded-sm hover:bg-gray-200'
            role='button'
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {!isOpen ? <ChevronsLeft /> : <MenuIcon />}
          </div>
        </div>
        <div className='mt-8 space-y-4'>
          {asideItems.map((x, index) => {
            const isActive = activeType === x.type;
            const Hovered = isHovered === x.type;

            return (
              <div
                key={index}
                onClick={() => setActiveType(x.type)}
                onMouseEnter={() => setIsHovered(x.type)}
                onMouseLeave={() => setIsHovered("")}
                style={{
                  backgroundColor:
                    isActive || Hovered ? `${x.color}20` : "transparent",
                  color: isActive ? x.color : "#444",
                }}
                className='rounded-lg cursor-pointer transition-all duration-200 text-accent font-sans'
              >
                <div className='flex gap-x-2 items-center p-3'>
                  {React.cloneElement(x.icon, {
                    style: { color: isActive || isHovered ? x.color : "#777" },
                  })}
                  {!isOpen && <h1>{x.name}</h1>}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
