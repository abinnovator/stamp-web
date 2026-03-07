import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // Landing page
    <div className="bg-linear-to-b from-[#FFE88E] via-[#FFE373] to-[#FFE88D] h-screen">
      <nav className="flex flex-row items-center font-nanum justify-between px-5 py-6 border-b-2 border-black">
        <div className="flex flex-row items-center gap-2.5">
          <Image src='Logo.svg' alt="stamp logo" width={50} height={50} />
          <h1 className="text-black text-2xl font-nanum">Stamp</h1>
        </div>
        <div className="flex flex-row items-center gap-10">
          <Link href='/about'>About</Link>
          <Link href='/features'>Features</Link>
        </div>
        <Button className="bg-[#001AFF] p-5">Download Alpha</Button>
      </nav>
      {/* Hero section */}
      <section className="py-12 ">
        <div className="flex flex-col items-center justify-center font-nanum text-center gap-16">
          <h1 className="max-w text-9xl text-center max-w-[1039px]">
            Your all-in-one study assistant
          </h1>
          <p className="text-2xl max-w-[627px]">Introducing Stamp. Your all-one-study assistant made to assist in all your learning.Whether its jotting down notes, making mind maps or doing research on the web you can do it all inside stamp!</p>
        </div>
        
        <Button className="bg-[#001AFF] p-5 rotate-[-30deg] absolute top-[550px] right-60">Open Source</Button>
        
      </section>
      
    </div>
  );
}
