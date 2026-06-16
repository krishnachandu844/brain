import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col py-36 items-center text-center space-y-6'>
      <h1 className='text-6xl max-w-2xl font-semibold'>
        One vault for your
        <span className='text-transparent bg-clip-text bg-linear-to-r from-[#fc00ff] to-[#00dbde]'>
          {" "}
          digital inspiration.
        </span>
      </h1>
      <p className='text-xl text-gray-500 max-w-4xl'>
        Save insights from LinkedIn, Instagram, Twitter, YouTube, and Facebook.
        Organize your second brain without the clutter of endless tabs.
      </p>
      <div className='space-x-4'>
        <Button size={"lg"} className='p-6'>
          Start your vault-free
        </Button>
        <Button
          variant={"ghost"}
          className='p-6 bg-secondary'
          onClick={() => {
            navigate("/signin", { replace: true });
          }}
        >
          Signin
        </Button>
      </div>
    </div>
  );
};

export default Hero;
