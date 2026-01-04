import Navbar from "../_components/Navbar";

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='h-full'>
      <Navbar />
      {children}
    </main>
  );
}
