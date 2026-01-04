import { CreateNote } from "./_components/CreateNote";
import Feed from "./_components/Feed";
import { Navigation } from "./_components/Navigation";

const Contents = () => {
  return (
    <div className='flex flex-1 h-full'>
      <Navigation />
      <CreateNote />
      <Feed />
    </div>
  );
};

export default Contents;
