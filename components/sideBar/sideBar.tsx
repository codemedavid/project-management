import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

export default async function SideBar() {
  const session = await getServerSession(options);
  console.log("session", session);
  return (
    <div className='h-[100vh] p-5 pt-8 w-1/5 bg-slate-100 rounded-r-md shadow-md flex flex-col gap-4'>
      <div className='flex gap-2'>
        <div className='w-12 h-12 rounded-2xl bg-green-500'></div>
        <div className='flex flex-col'>
          <span className='font-semibold'>{session?.user.role}</span>
          <span className='text-sm font-light'>{session?.user.email}</span>
        </div>
      </div>
      <div className='bg-white w-full h-10 flex items-center justify-center rounded-2xl p-2 overflow-hidden'>
        <Image src={"/static/search.svg"} width={20} height={20} alt='' />
        <input
          type='text'
          className='w-full focus:outline-none font-light text-sm'
          placeholder='Search anything...'
        />
      </div>
    </div>
  );
}
