import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className='relative h-40 w-full rounded-lg'>
      <Image
        src={"/static/banner.png"}
        alt='banner'
        fill
        className='object-cover h-full w-full rounded-lg'
      />
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 py-2'>
        <p className='text-white pt-2 text-sm'>Welcome Project Manager</p>
        <p className='text-white font-semibold text-lg w-2/4'>
          Add your clients and start creating projects
        </p>
        <div>
          <button className='bg-black text-white  px-2 py-1 mt-2 w-28 rounded-md font-semibold text-sm'>
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
}
