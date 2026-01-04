"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, User } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function SignUpPage() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/signup`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        Cookies.set("braintoken", response.data.token);
        router.push("/contents");
        toast.success("Signup Successfully");
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center  from-background to-muted p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl'>Create Account</CardTitle>
          <CardDescription>
            Sign up to get started with your account
          </CardDescription>
        </CardHeader>
        <CardContent className=''>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <User className='w-4 h-4' />
                Username
              </label>
              <Input
                type='text'
                placeholder='John Doe'
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Mail className='w-4 h-4' />
                Email
              </label>
              <Input
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Lock className='w-4 h-4' />
                Password
              </label>
              <Input
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type='submit' className='w-full'>
              Sign Up
            </Button>
          </form>

          <div className='mt-4 text-center text-sm'>
            <p className='text-muted-foreground'>
              Already have an account?{" "}
              <Link
                href='/signin'
                className='text-primary hover:underline font-medium'
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
