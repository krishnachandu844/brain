import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div
      className='hidden md:flex items-center space-x-2 w-full cursor-pointer'
      onClick={() => {
        window.location.href = "/";
      }}
    >
      <Image src={"/brainstorm.png"} width={30} height={30} alt='brain' />
      <p className={cn("font-bold", font.className)}>Second Brain</p>
    </div>
  );
};

export default Logo;
