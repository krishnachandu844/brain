import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className='flex gap-2 cursor-pointer'
      onClick={() => {
        navigate("/", { replace: true });
      }}
    >
      <img src='./brainstorm.png' alt='brain' className='w-8 h-8' />
      <h1 className='text-xl font-bold'>Secondbrain</h1>
    </div>
  );
};

export default Logo;
