import { PLATFOMS } from "../../lib/data";
import { useContentStore } from "../../store/useContentStore";

const SideBar = () => {
  const { setActiveType, setFilteredPosts, activeType } = useContentStore();

  return (
    <div className='p-2'>
      <h1 className='font-semibold  text-black text-2xl  py-4'>Sources</h1>
      <div className='flex flex-wrap gap-2'>
        {PLATFOMS.map((p) => (
          <div
            className={`${activeType == p.id && "bg-white"} flex items-center gap-x-1 cursor-pointer hover:bg-white p-2 rounded-md`}
            key={p.id}
            onClick={() => {
              setActiveType(p.id);
              setFilteredPosts(p.id);
            }}
          >
            <p.icon></p.icon>
            <p>{p.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
