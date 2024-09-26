import React from "react";
import SignOutBtn from "@/components/signOutBtn";
import SideBar from "@/components/sideBar/sideBar";
import Contents from "@/components/dashboard/Contents";
export default function Home() {
  return (
    <div className=' text-black font-light flex justify-between'>
      <SideBar />
      <Contents />
      <div className='w-[30%] border-l border-slate-300'></div>
      {/* {session?.user && <SignOutBtn />} */}
    </div>
  );
}
