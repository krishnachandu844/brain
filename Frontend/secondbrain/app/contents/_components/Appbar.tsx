"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useContentStore } from "@/store/useContent";

interface UserType {
  id: string;
  username: string;
  email: string;
}

export default function Appbar() {
  const [user, setUser] = useState<UserType>();

  const setUserName = useContentStore((state) => state.setUserName);

  const onClickLogout = () => {
    Cookies.remove("braintoken");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = Cookies.get("braintoken");
    const init = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserName(response.data.user.username);
      setUser(response.data.user);
    };
    init();
  }, []);

  return (
    <div className='bg-background border-b p-4.5 flex items-center justify-end gap-x-4'>
      <Tooltip>
        <TooltipTrigger>
          <Avatar className='bg-black text-white'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className=''>
          <div className='text-sm font-mono'>
            <p className='font-semibold'>{user?.username}</p>
            <p className='text-white'>{user?.email}</p>
          </div>
        </TooltipContent>
      </Tooltip>

      <Button onClick={onClickLogout}>Log out</Button>
    </div>
  );
}
