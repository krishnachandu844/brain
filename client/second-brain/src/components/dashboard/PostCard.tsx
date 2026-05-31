import { Trash } from "lucide-react";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import {
  FacebookEmbed,
  InstagramEmbed,
  TwitterEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import { useCallback, useEffect } from "react";
import { useContentStore } from "../../store/useContentStore";
import EmptyState from "./EmptyState";
import { Spinner } from "../ui/spinner";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { toast } from "react-toastify";

type Props = {};

const PostCard = (props: Props) => {
  const { filteredPosts, getPosts } = useContentStore();

  const getIcon = (option: string) => {
    switch (option) {
      case "YOUTUBE": {
        return <YoutubeIcon />;
      }
      case "INSTAGRAM": {
        return <InstagramIcon />;
      }
      case "TWITTER": {
        return <TwitterIcon />;
      }
      case "FACEBOOK": {
        return <FacebookIcon />;
      }
      case "LINKEDIN": {
        return <LinkedInIcon />;
      }
    }
  };

  const getUrl = (url: string, type: string) => {
    switch (type) {
      case "YOUTUBE": {
        return <YouTubeEmbed url={url} width={350} height={200} />;
      }
      case "INSTAGRAM": {
        const instaUrl = url.match(
          /https?:\/\/(www\.)?instagram\.com\/(p|reel)\/[^\s"]+/,
        )?.[0];

        if (!instaUrl) {
          return <div>Invalid Instagram URL</div>;
        }

        return <InstagramEmbed url={instaUrl} width={328} />;
      }
      case "TWITTER": {
        const tweetUrl = url.match(/https?:\/\/(twitter|x)\.com\/[^\s"]+/)?.[0];

        if (!tweetUrl) {
          return <div>Invalid Twitter URL</div>;
        }

        return <TwitterEmbed url={tweetUrl} width={325} />;
      }
      case "FACEBOOK": {
        const embedUrl = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true`;

        return (
          <div className=''>
            <iframe
              src={embedUrl}
              allowFullScreen
              width={300}
              height={450}
              style={{
                overflow: "auto",
              }}
            />
          </div>
        );
      }
      case "LINKEDIN": {
        const src = url.match(/src="([^"]+)"/)?.[1];
        return <iframe src={src} className='' width={350} height={350} />;
      }
    }
  };

  const deletePost = useCallback(async (id: string) => {
    console.log(id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/deletecontent/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const res = await response.json();
      if (response.ok) {
        toast.success(res.message);
        getPosts();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  if (!filteredPosts) {
    return (
      <div className='pt-36 flex items-center justify-center'>
        <Spinner className='size-10 text-primary' />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-y-4'>
      {filteredPosts.length == 0 ? (
        <div className='min-w-dvh'>
          <EmptyState />
        </div>
      ) : (
        filteredPosts.map((p) => (
          <div
            className='bg-card max-w-sm shadow-lg p-4 rounded-xl space-y-4 group'
            key={p.id}
          >
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {getIcon(p.type)}
                {p.type.toLowerCase()}
              </div>
              <Trash
                className='w-4 h-4 opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer'
                onClick={() => {
                  deletePost(p.id);
                }}
              />
            </div>
            <div>{getUrl(p.link, p.type)}</div>

            <div>
              <h1 className='text-xl font-semibold'>{p.title}</h1>
              <p className='text-sm pt-2 text-gray-500'>{p.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostCard;
