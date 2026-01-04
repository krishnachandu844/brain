"use client";
import { useContentStore } from "@/store/useContent";

export default function Feed() {
  const contents = useContentStore((state) => state.contents);

  console.log(contents);
  return <div>Contents</div>;
}
