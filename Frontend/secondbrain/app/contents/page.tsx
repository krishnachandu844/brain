"use client";
import { useContentStore } from "@/store/useContent";
import Appbar from "./_components/Appbar";
import { CreateNote } from "./_components/CreateNote";
import LinkCard from "./_components/Linkcards";
import { Navigation } from "./_components/Navigation";

const Contents = () => {
  const contents = useContentStore((state) => state.contents);
  return (
    <div className='flex flex-1 h-full bg-background'>
      <Navigation />
      <div className='flex flex-col w-full'>
        <Appbar />
        {/* {contents.length > 0 ? <LinkCard /> : <CreateNote />} */}
        <LinkCard />
      </div>
    </div>
  );
};

export default Contents;
