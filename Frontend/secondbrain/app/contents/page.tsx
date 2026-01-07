"use client";
import Appbar from "./_components/Appbar";
import { CreateNote } from "./_components/CreateNote";
import LinkCard from "./_components/Linkcards";
import { Navigation } from "./_components/Navigation";
import { useEffect } from "react";
import { useContentStore } from "@/store/useContent";

const Contents = () => {
  const filteredContents = useContentStore((state) => state.filteredContents);
  const fetchContent = useContentStore((state) => state.fetchContent);

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div className='flex flex-1 h-full bg-background'>
      <Navigation />
      <div className='flex flex-col w-full'>
        <Appbar />
        {filteredContents.length > 0 ? <LinkCard /> : <CreateNote />}
      </div>
    </div>
  );
};

export default Contents;
