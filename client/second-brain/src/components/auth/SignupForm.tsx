import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { submitSignUp } from "../../services/SignupService";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";

type SignUpFormFields = {
  email: string;
  username: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({
    mode: "onChange",
  });
  const [show, setShow] = useState(false);
  const { getUser } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    try {
      const res = await submitSignUp(data);
      await getUser();
      navigate("/dashboard", { replace: true });
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='w-full max-w-lg flex flex-col items-center  space-y-3'>
      <Card className='w-full max-w-md text-center p-4 space-y-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold mt-6'>
            Build your second brain
          </CardTitle>
          <CardDescription>
            Save what inspires you,recall it forever.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-1.5'>
              <Label className='text-md'>Email</Label>
              <Input
                placeholder='userExample@gmail.com'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500 text-sm text-left'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className='space-y-1.5'>
              <Label className='text-md'>Username</Label>
              <Input
                placeholder='John Doe'
                {...register("username", {
                  required: "Username is Required",
                  minLength: {
                    value: 4,
                    message: "Username should be atleast 4 charachters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Username should be 10 charachters",
                  },
                })}
              />
              {errors.username && (
                <p className='text-red-500 text-sm text-left'>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className='space-y-1.5 relative'>
              <Label className='text-md'>Password</Label>
              <Input
                type={show ? "text" : "password"}
                placeholder='••••••••'
                {...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 4,
                    message: "Password should be atleast 4 charachters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password should be 10 charachters",
                  },
                })}
                className='relative'
              />
              {errors.password && (
                <p className='text-red-500 text-sm text-left'>
                  {errors.password.message}
                </p>
              )}
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
            </div>
            <div>
              <Button
                className='w-full'
                size={"lg"}
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating ..." : "Create Account"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div>
        <p className='text-sm'>
          Already have an account?{" "}
          <span
            className='text-primary cursor-pointer hover:underline hover:font-semibold'
            onClick={() => navigate("/signin", { replace: true })}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
