import Logo from "./Logo";
import { useAuthStore } from "../../store/useAuthStore";
import { Button } from "./button";
import { MoveLeftIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user, logout, loading } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className='bg-card h-16 shadow-md w-full sticky top-0 z-999'>
      <div className='container mx-auto flex items-center justify-between h-full w-300'>
        <div>
          <Logo />
        </div>
        <div className='flex gap-x-4 items-center'>
          {isAuthenticated ? (
            <>
              <div className='bg-[#2D9EE0] w-10 h-10 flex items-center justify-center text-white rounded-full font-medium'>
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <Button
                className='p-4'
                variant={"destructive"}
                onClick={async () => {
                  await logout();
                  navigate("/signin", { replace: true });
                }}
              >
                <MoveLeftIcon /> Log out
              </Button>
            </>
          ) : (
            <>
              <p
                className='text-sm text-gray-500 hover:text-black cursor-pointer'
                onClick={() => {
                  navigate("/", { replace: true });
                }}
              >
                Home
              </p>
              <p
                className='text-sm text-gray-500 hover:text-black cursor-pointer'
                onClick={() => {
                  navigate("/signin", { replace: true });
                }}
              >
                Sign in
              </p>
              <p
                className='bg-black text-white rounded-2xl p-2 px-5 cursor-pointer'
                onClick={() => {
                  navigate("/signin", { replace: true });
                }}
              >
                Get Started
              </p>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
