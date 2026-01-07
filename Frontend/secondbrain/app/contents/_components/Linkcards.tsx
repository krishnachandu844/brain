"use client";

import { useContentStore } from "@/store/useContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tweet } from "react-tweet";
import { Youtube, Twitter, Facebook, Instagram, LinkIcon } from "lucide-react";

import CreateContentButton from "./CreateContentButton";
import {
  FacebookEmbed,
  InstagramEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";

export default function LinkCard() {
  const filteredContents = useContentStore((state) => state.filteredContents);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Youtube":
        return <Youtube className='w-6 h-6 text-red-500' />;
      case "Twitter":
        return <Twitter className='w-6 h-6 text-blue-500' />;
      case "Facebook":
        return <Facebook className='w-6 h-6 text-blue-600' />;
      case "Instagram":
        return <Instagram className='w-6 h-6 text-pink-500' />;
      default:
        return <LinkIcon className='w-6 h-6' />;
    }
  };

  const renderEmbed = (card: { type: string; link: string }) => {
    const { type, link } = card;

    switch (type) {
      case "Youtube": {
        const videoId = link.includes("youtu.be")
          ? link.split("youtu.be/")[1]
          : link.split("v=")[1]?.split("&")[0];

        return (
          // <iframe
          //   className='w-full h-56 rounded-md'
          //   src={`https://www.youtube.com/embed/${videoId}`}
          //   title='YouTube video'
          //   allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          //   allowFullScreen
          // />
          <YouTubeEmbed url={link} width={440} height={250} />
        );
      }

      case "Instagram":
        return <InstagramEmbed url={link} />;

      case "Facebook":
        return <FacebookEmbed url={link} />;

      case "Twitter":
        const match = link.match(/status\/(\d+)/);
        const tweetId = match ? match[1] : null;
        if (!tweetId) {
          return <p className='text-sm text-red-500'>Invalid Twitter link</p>;
        }

        return <Tweet id={tweetId} />;
    }
  };

  return (
    <div className='h-full p-8'>
      <div className='space-y-4'>
        <CreateContentButton />
        <hr />
      </div>
      <div
        className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 p-4 h-[calc(90vh-120px)] 
                overflow-y-auto'
      >
        {filteredContents.map((card, index) => (
          <Card
            key={index}
            className='flex flex-col transition-all duration-200 hover:shadow-lg h-full'
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between gap-3'>
                <div className='flex items-center gap-3'>
                  {getPlatformIcon(card.type)}
                  <div>
                    <CardTitle className='text-lg'>{card.title}</CardTitle>
                    <CardDescription className='text-xs'>
                      Share your content
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className='max-h-96 overflow-y-auto'>
              {renderEmbed(card)}
            </CardContent>
            <CardFooter>
              <h1 className='text-xl mt-4 font-sans'>{card.description}</h1>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
