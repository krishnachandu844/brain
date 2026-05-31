const Footer = () => {
  return (
    <div className='border-t h-16 flex items-center justify-between gap-x-4 px-16'>
      <div className='flex gap-x-2 items-center'>
        <img src='./brainstorm.png' alt='secondbrain' className='w-8 h-8' />
        <h1 className='font-bold'>Secondbrain</h1>
      </div>
      <div>
        <h1 className='font-sans text-sm'>
          © {new Date().getFullYear()} Secondbrain. All rights reserved.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
