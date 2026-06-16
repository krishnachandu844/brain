import { Trash } from "lucide-react";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { InstagramEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed";
import { useCallback, useEffect, useState } from "react";
import { useContentStore } from "../../store/useContentStore";
import EmptyState from "./EmptyState";
import { Spinner } from "../ui/spinner";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { toast } from "react-toastify";

interface Props {
  isSmallDevice: boolean;
}

const PostCard = (props: Props) => {
  const { filteredPosts, getPosts } = useContentStore();
  const [loading, setLoading] = useState(false);

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
      case "YOUTUBE":
        return (
          <div className='w-full max-w-md'>
            <YouTubeEmbed url={url} width='100%' height={300} />
          </div>
        );

      case "INSTAGRAM": {
        const instaUrl = url.match(
          /https?:\/\/(www\.)?instagram\.com\/(p|reel)\/[^\s"]+/,
        )?.[0];

        if (!instaUrl) return <div>Invalid Instagram URL</div>;

        return (
          <div className='h-[350px] overflow-y-auto'>
            <InstagramEmbed
              url={instaUrl}
              width={props.isSmallDevice ? 460 : 350}
            />
          </div>
        );
      }

      case "TWITTER": {
        const tweetUrl = url.match(/https?:\/\/(twitter|x)\.com\/[^\s"]+/)?.[0];

        if (!tweetUrl) return <div>Invalid Twitter URL</div>;

        return (
          <div className='w-full max-w-md'>
            <XEmbed
              url={tweetUrl}
              width={props.isSmallDevice ? 460 : 350}
              height={350}
            />
          </div>
        );
      }

      case "FACEBOOK": {
        const embedUrl = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
          url,
        )}&show_text=true`;

        return (
          <iframe
            src={embedUrl}
            className='w-full max-w-md rounded-md'
            height={props.isSmallDevice ? 460 : 350}
            allowFullScreen
          />
        );
      }

      case "LINKEDIN": {
        const src = url.match(/src="([^"]+)"/)?.[1];

        if (!src) return <div>Invalid LinkedIn embed</div>;

        return <iframe src={src} className='w-full max-w-md' height={350} />;
      }

      default:
        return <div>Unsupported platform</div>;
    }
  };

  const deletePost = useCallback(async (id: string) => {
    try {
      setLoading(true);
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
        setLoading(false);
        toast.success(res.message);
        getPosts();
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  if (!filteredPosts || loading) {
    return (
      <div className='pt-36 flex items-center justify-center'>
        <Spinner className='size-10 text-primary' />
      </div>
    );
  }

  if (filteredPosts.length == 0) {
    return (
      <div className='w-full'>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-center '>
      {filteredPosts.map((p) => (
        <div
          className='bg-card max-w-lg shadow-lg p-4 rounded-xl space-y-4 group w-full'
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
      ))}
    </div>
  );
};

export default PostCard;
