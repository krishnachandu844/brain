import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Heading = () => {
  return (
    <div className='max-w-7xl space-y-5'>
      <h1 className={cn("text-xl sm:text-3xl  font-bold", font.className)}>
        Capture ideas. Save links. Remember everything.
        <br />
        Welcome to
        <span className='underline'> SecondBrain.</span>
      </h1>
      <h3 className='font-mono text-xs'>
        SecondBrain helps you save thoughts, Instagram posts, YouTube videos,
        Twitter links, <br /> All in one place.
      </h3>
      <Button className='font-mono'>
        Enter Secondbrain <ArrowRight />
      </Button>
    </div>
  );
};

export default Heading;
