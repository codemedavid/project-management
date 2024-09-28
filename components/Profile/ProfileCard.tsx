import React from "react";

import Image from "next/image";
import { FaEnvelope, FaTelegram, FaUser } from "react-icons/fa";
import Link from "next/link";
export default async function ProfileCard({
  session,
}: {
  session: { user: { name: string; username: string; email: string } };
}) {
  console.log("profile", session);
  return (
    <div className='flex flex-col gap-2 w-full pt-4'>
      <div className='flex gap-2 w-full  items-center justify-center'>
        <div className='w-28 h-28 bg-yellow-500 rounded-full flex items-center justify-center'>
          <Image
            src={"/static/sirjim.jpg"}
            alt='profile'
            width={100}
            height={100}
            className='rounded-full'
          />
        </div>
      </div>
      <div className='flex flex-col items-center '>
        <span className='font-semibold'>{session?.user.name}</span>
        <span className='text-xs font-light'>@{session?.user.username}</span>
        <div className='flex gap-4 mt-6'>
          <Link href={"/profile"}>
            <FaUser size={20} className='text-yellow-500' />
          </Link>
          <Link href={`mailto:${session?.user.email}`}>
            <FaEnvelope size={20} />
          </Link>
          <Link href={"/profile"}>
            <FaTelegram color='#24A1DE' size={20} />
          </Link>
        </div>
        {/* <span className=''>{session?.user.email}</span> */}
      </div>
    </div>
  );
}
