import React from "react";
import Link from "next/link";
export default function SideBarCards({
  link,
  name,
  Icon,
  active,
}: {
  link: string;
  name: string;
  Icon: React.ElementType;
  active: boolean;
}) {
  return (
    <Link
      href={link}
      className={`hover:bg-yellow-200 ${
        active && "bg-yellow-300"
      } p-2 rounded-lg flex items-center gap-2`}
    >
      <div className='flex items-center gap-2 text-sm'>
        <Icon />
        <span>{name}</span>
      </div>
    </Link>
  );
}
