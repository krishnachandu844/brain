import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { submitSignin } from "../../services/SigninService";

type SigninFormFields = {
  username: string;
  password: string;
};

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormFields>();
  const { getUser } = useAuthStore();
  const [show, setShow] = useState(false);

  const onSubmit: SubmitHandler<SigninFormFields> = async (
    data: SigninFormFields,
  ) => {
    try {
      const res = await submitSignin(data);
      await getUser();
      navigate("/dashboard", { replace: true });
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const navigate = useNavigate();
  return (
    <div className='py-32 bg-muted'>
      <div className='w-300 contianer mx-auto max-w-lg space-y-3 flex flex-col items-center'>
        <Card className='w-full max-w-md text-center p-4 space-y-10'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold mt-6'>
              Welcome Back
            </CardTitle>
            <CardDescription>Access your second brain.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className='space-y-5 pb-10' onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-1.5'>
                <Label className='text-md'>Username</Label>
                <Input
                  placeholder='John Doe'
                  {...register("username", {
                    required: "Username is Required",
                    minLength: {
                      value: 5,
                      message: "Username must have at least 5 charachters",
                    },
                  })}
                />
                {errors.username && (
                  <p className='text-red-500 text-left pt-1'>
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className='space-y-1.5 relative'>
                <Label className='text-md'>Password</Label>
                <Input
                  placeholder='••••••••'
                  {...register("password", {
                    required: "Password is Required",
                    minLength: {
                      value: 5,
                      message: "Password must have at least be 5 charachters",
                    },
                  })}
                  type={show ? "text" : "password"}
                />
                {show ? (
                  <Eye
                    className='w-5 h-5 absolute right-3 top-8 cursor-pointer'
                    onClick={() => setShow(false)}
                  />
                ) : (
                  <EyeOff
                    className='w-5 h-5 absolute right-3 top-8 cursor-pointer'
                    onClick={() => setShow(true)}
                  />
                )}
                {errors.password && (
                  <p className='text-red-500 text-left pt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <Button
                  className='w-full'
                  size={"lg"}
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Submit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div>
          <p className='text-sm'>
            Don't have an account?{"  "}
            <span
              className='text-primary cursor-pointer hover:underline hover:font-semibold'
              onClick={() => navigate("/signup", { replace: true })}
            >
              Join Free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
