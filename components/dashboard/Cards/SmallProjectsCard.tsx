import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function SmallProjectsCard({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) {
  return (
    <div className='w-4/12 h-32 rounded-md shadow-md px-3 border border-yellow-300 '>
      <div className='w-full h-full flex flex-col justify-center items-start'>
        <p className='text-sm font-semibold'>{title}</p>
        <p className='text-xs w-full text-ellipsis whitespace-nowrap overflow-hidden'>
          {description}
        </p>
        <Link
          href={`/projects/${id}`}
          className='bg-black text-white px-2 py-1 mt-2 rounded-md text-xs font-semibold flex items-center'
        >
          View <FaArrowRight className='ml-1' />
        </Link>
      </div>
    </div>
  );
}
