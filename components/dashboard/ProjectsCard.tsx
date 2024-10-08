import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
export default function ProjectsCard({
  dark,
  title,
  description,
  id,
}: {
  dark: boolean;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md w-80  ${
        dark
          ? "bg-yellow-400 text-white hover:bg-yellow-500"
          : "bg-gray-100 text-black hover:bg-gray-200"
      } ${id == "1" && "text-white bg-yellow-400  hover:bg-yellow-500 "}`}
    >
      <div className='flex justify-between items-center'>
        {/* Tags */}
        <div className='flex gap-2 '>
          <span className='bg-gray-50 text-black rounded-full px-2 py-1 text-sm'>
            CashCow
          </span>
          <span className='bg-gray-50 text-black rounded-full px-2 py-1 text-sm'>
            Reels
          </span>
        </div>

        {/* Collaborators */}
        <div className='flex gap-2'>
          <Image
            src={"/static/sirjim.jpg"}
            width={20}
            height={20}
            alt=''
            className='rounded-full -ml-4'
          />
          <Image
            src={"/static/sirdre.jpg"}
            width={20}
            height={20}
            alt=''
            className='rounded-full -ml-4'
          />
          <Image
            src={"/static/sirandy.jpg"}
            width={20}
            height={20}
            alt=''
            className='rounded-full -ml-4'
          />
        </div>
      </div>

      {/* Description */}
      <Link href={`/projects/${id}`} className='mt-4'>
        <h2
          className={` text-lg font-semibold ${
            dark ? "text-white" : "text-black"
          }
          ${id == "1" && "text-white"}
          `}
        >
          {title}
        </h2>
        <p
          className={` text-xs font-light overflow-hidden whitespace-nowrap text-ellipsis ${
            dark ? "text-white" : "text-black"
          }
          ${id == "1" && "text-white"}
          `}
        >
          {description}
        </p>

        <div
          className={`flex justify-between items-center mt-4 ${
            dark ? "text-white" : "text-black"
          }
          ${id == "1" && "text-white"}
          `}
        >
          <span className='text-lg font-light flex items-center gap-2'>
            Details <FaArrowRight className='w-4 h-4' />
          </span>
        </div>
      </Link>
    </div>
  );
}
