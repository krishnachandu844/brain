import { PLATFOMS } from "../lib/data";
import { useMediaQuery } from "@uidotdev/usehooks";
import AddDialog from "../components/dashboard/AddDialog";
import PostCard from "../components/dashboard/PostCard";
import { useContentStore } from "../store/useContentStore";
import SideBar from "../components/shared/SideBar";
import { useMemo } from "react";

const Dashboard = () => {
  const { filteredPosts, posts, activeType, setActiveType, setFilteredPosts } =
    useContentStore();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const counts: any = useMemo(() => {
    const result = {
      INSTAGRAM: 0,
      TWITTER: 0,
      FACEBOOK: 0,
      LINKEDIN: 0,
      YOUTUBE: 0,
    };

    posts?.forEach((post) => {
      switch (post.type) {
        case "INSTAGRAM":
          result.INSTAGRAM++;
          break;
        case "TWITTER":
          result.TWITTER++;
          break;
        case "FACEBOOK":
          result.FACEBOOK++;
          break;
        case "LINKEDIN":
          result.LINKEDIN++;
          break;
        case "YOUTUBE":
          result.YOUTUBE++;
          break;
      }
    });

    return result;
  }, [posts]);

  return (
    <div className='bg-muted'>
      <div className='min-h-dvh container mx-auto md:w-300 md:py-8 md:flex gap-x-6'>
        {/* Source Card */}
        {!isSmallDevice ? (
          <div className='bg-card max-w-64 flex-1 rounded-2xl p-4 max-h-90 shadow-md sticky z-0 top-20'>
            <h1 className='text-base text-gray-500 py-4'>Sources</h1>
            <div>
              {PLATFOMS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveType(p.id);
                    setFilteredPosts(p.id);
                  }}
                  className={`${activeType == p.id && "bg-gray-100"} flex items-center justify-between mb-1 gap-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-xl`}
                >
                  <div className='flex items-center gap-x-2'>
                    <p.icon></p.icon>
                    <p>{p.label}</p>
                  </div>
                  <span className='pr-3 text-[#000080]'>
                    {p.type == "ALL" ? posts?.length : counts[p.type]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <SideBar />
        )}

        <div className='flex-1 space-y-6 p-4'>
          <div className='flex justify-between w-full'>
            <div>
              <h1 className='text-2xl font-semibold'>
                {activeType.charAt(0).toUpperCase() + activeType.slice(1)}{" "}
                Captures
              </h1>
              <p className='text-gray-500'>{filteredPosts?.length} posts</p>
            </div>
            {/* Dialog Button */}
            <AddDialog />
          </div>
          <div className=''>
            {/* Showing Cards */}
            <PostCard isSmallDevice={isSmallDevice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
