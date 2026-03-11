import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { GlowingButton } from "@/components/ui/glowing-button"
import { currentUser } from "@clerk/nextjs/server";
import MeshyCards from "@/components/mvpblocks/meshy-cards";

export default async function Home() {
  const user = await currentUser();
  console.log(user);
  return (
      <div className="bg-linear-to-b from-[#FFE88E] via-[#FFE373] to-[#FFE88D] text-black overflow-hidden">
        <nav className="flex flex-row items-center font-nanum justify-between px-5 py-6 border-b-2 border-black">
          <div className="flex flex-row items-center gap-2.5">
            <Image src='Logo.svg' alt="stamp logo" width={50} height={50} />
            <h1 className="text-black text-2xl font-nanum">Stamp</h1>
          </div>
          <div className="hidden md:flex flex-row items-center gap-10">
            <Link href='#about'>About</Link>
            <Link href='#demo'>Demo</Link>
          </div>
          <div className="flex flex-row gap-2">
            <Link href={user ? '/dashboard':'/sign-up'}>
              <GlowingButton className="bg-[#001AFF] p-5 cursor-pointer text-white hover:text-white border-none" glowColor="#22d3ee">{user ? 'Dashboard' : 'Start Now'}</GlowingButton>
            </Link>
            {/* <Link href='/waitlist'>
              <GlowingButton className="bg-[#001AFF] p-5 cursor-pointer text-white hover:text-white border-none" glowColor="#22d3ee">Waitlist</GlowingButton>
            </Link> */}
            {/* <StarOnGithub /> */}
          </div>
          
          {/* <Button className="bg-[#001AFF] p-5 cursor-pointer">Start Now!</Button> */}
        </nav>
        {/* Hero section */}
        <section className="py-12 mb-25 relative">
          <div className="flex flex-col items-center justify-center font-nanum text-center gap-8 md:gap-16 px-4">
            <h1 className="text-5xl sm:text-7xl md:text-9xl text-center max-w-[1039px]">
              Your all-in-one study assistant
            </h1>
            <p className="text-base sm:text-xl md:text-2xl max-w-[627px]">Introducing Stamp. Your all-one-study assistant made to assist in all your learning.Whether its jotting down notes, making mind maps or doing research on the web you can do it all inside stamp!</p>
          </div>
          
          <Link href={'https://github.com/abinnovator/stamp-web'}><Button className="bg-[#001AFF] p-5 rotate-[-30deg] absolute top-[550px] right-60 text-white hidden md:flex items-center justify-center cursor-pointer">Open Source</Button></Link>
          
        </section>
        {/* About us */}
        <div className="flex flex-col gap-4 items-center justify-center px-4" id="about">
          <h1 className="text-3xl md:text-5xl font-bold">Our Features</h1>
          <div className="">
            <MeshyCards />
          </div>
        </div>
        
        
      </div>

    // Landing page
    
  );
}
