import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RightTicketApproval() {
  return (
    <div className='pt-4'>
      <div className='flex justify-between items-center '>
        <div className='flex gap-2 '>
          <Image
            src={"/static/sirdre.jpg"}
            alt='ticket'
            height={40}
            width={40}
            className='rounded-full object-cover w-10 h-10'
          />
          <div className='flex flex-col'>
            <span className='font-semibold text-sm'>For Client Maxima</span>
            <span className='text-xs'>By: Sir Dre</span>
          </div>
        </div>

        <Link
          href={"/"}
          className='bg-yellow-500 text-xs p-1 m-0 h-6 rounded-md text-white'
        >
          Approve
        </Link>
      </div>
      <div className='px-2'>
        <div className='border-b border-slate-300 pb-4 '></div>
      </div>
    </div>
  );
}
