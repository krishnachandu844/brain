import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <div className=' w-full p-4 z-50 flex items-center md:justify-between'>
      <div className='hidden md:flex items-center space-x-2 w-full'>
        <Image src={"/brainstorm.png"} width={30} height={30} alt='brain' />
        <p className='font-sans font-bold'>SecondBrain</p>
      </div>
      <div className='flex justify-between w-full md:ml-auto md:justify-end'>
        <Button variant={"ghost"}>Privacy Policy</Button>
        <Button variant={"ghost"}>Terms and conditions</Button>
      </div>
    </div>
  );
};

export default Footer;
