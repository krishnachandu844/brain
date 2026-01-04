import Image from "next/image";
import React from "react";

const Heros = () => {
  return (
    <div className=' max-w-5xl flex'>
      <div className='relative h-64 w-64'>
        <Image
          src={"/BigBrain.jpg"}
          fill
          alt='Brain'
          className='object-contain'
        />
      </div>
      <div className='relative h-64 w-64 hidden sm:block'>
        <Image
          src={"/Thinking.jpg"}
          fill
          alt='Brain'
          className='object-contain'
        />
      </div>
    </div>
  );
};

export default Heros;
