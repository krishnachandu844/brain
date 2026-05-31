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
  values: { username: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: any) => void;
  show: boolean;
  loading: boolean;
  setShow: (e: any) => void;
};

const SigninForm = (props: Props) => {
  const { values, onSubmit, handleChange, show, setShow, loading } = props;

  const navigate = useNavigate();

  return (
    <div className='w-full max-w-lg flex flex-col items-center space-y-3'>
      <Card className='w-full max-w-md text-center p-4 space-y-10'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold mt-6'>
            Welcome Back
          </CardTitle>
          <CardDescription>Access your second brain.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-5 pb-10' onSubmit={onSubmit}>
            <div className='space-y-1.5'>
              <Label className='text-md'>Username</Label>
              <Input
                placeholder='John Doe'
                name='username'
                onChange={handleChange}
                value={values.username}
              />
            </div>
            <div className='space-y-1.5 relative'>
              <Label className='text-md'>Password</Label>
              <Input
                placeholder='••••••••'
                type={show ? "text" : "password"}
                name='password'
                onChange={handleChange}
                value={values.password}
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
                disabled={!values.username || !values.password}
              >
                {loading ? "Sign in ..." : "Sign in "}
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
  );
};

export default SigninForm;
