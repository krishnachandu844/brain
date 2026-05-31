import { PLATFOMS } from "../lib/data";
import AddDialog from "../components/dashboard/AddDialog";
import PostCard from "../components/dashboard/PostCard";
import { useContentStore } from "../store/useContentStore";

type Props = {};

const Dashboard = (props: Props) => {
  const { filteredPosts, activeType, setActiveType, setFilteredPosts } =
    useContentStore();

  return (
    <div className='bg-muted'>
      <div className='min-h-dvh container mx-auto w-300 p-4 pt-8 flex gap-x-6'>
        {/* Source Card */}
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
                className={`${activeType == p.id && "bg-gray-100"} flex items-center mb-1 gap-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-xl`}
              >
                <p.icon></p.icon>
                <p>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex-1 space-y-6'>
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
          <div>
            {/* Showing Cards */}
            <PostCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
