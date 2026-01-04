import Image from "next/image";
import CreateContentButton from "./CreateContentButton";

export function CreateNote() {
  return (
    <div className='w-full font-mono text-center flex flex-col items-center pt-11'>
      <Image src={"/CreateNote1.jpg"} width={500} height={200} alt='create' />
      <div className='space-y-6'>
        <h1 className='text-xl font-bold '>
          Welcome To Krishna Chandu's SecondBrain
        </h1>
        <CreateContentButton />
      </div>
    </div>
  );
}
