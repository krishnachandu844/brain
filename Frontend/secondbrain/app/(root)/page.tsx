import Heading from "./_components/Heading";
import Heros from "./_components/Heros";
import Footer from "./_components/Footer";
export default function Home() {
  return (
    <div className='min-h-full flex flex-col'>
      <div className='text-center space-y-4 flex-1 flex flex-col items-center justify-center'>
        <Heading />
        <Heros />
      </div>
      <Footer />
    </div>
  );
}
