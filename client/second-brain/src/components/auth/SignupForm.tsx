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

type Props = {
  values: { email: string; username: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: any) => void;
  show: boolean;
  loading: boolean;
  setShow: (e: any) => void;
};

const SignupForm = (props: Props) => {
  const { values, onSubmit, handleChange, show, setShow, loading } = props;

  const navigate = useNavigate();

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
          <form onSubmit={onSubmit} className='space-y-5'>
            <div className='space-y-1.5'>
              <Label className='text-md'>Email</Label>
              <Input
                placeholder='useExample@gmail.com'
                type='email'
                onChange={handleChange}
                name='email'
                value={values.email}
              />
            </div>
            <div className='space-y-1.5'>
              <Label className='text-md'>Username</Label>
              <Input
                placeholder='John Doe'
                onChange={handleChange}
                name='username'
                value={values.username}
              />
            </div>
            <div className='space-y-1.5 relative'>
              <Label className='text-md'>Password</Label>
              <Input
                type={show ? "text" : "password"}
                placeholder='••••••••'
                onChange={handleChange}
                name='password'
                value={values.password}
                className='relative'
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
            </div>
            <div>
              <Button
                className='w-full'
                size={"lg"}
                type='submit'
                disabled={!values.password || !values.username || !values.email}
              >
                {loading ? "Creating ..." : "Create Account"}
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
