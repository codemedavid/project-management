import React from "react";
import SideBar from "@/components/sideBar/sideBar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import ClientsTable from "@/components/Clients/ClientsTable";
import AddClientBtn from "@/components/Buttons/AddClientBtn";
import { Suspense } from "react";
export default async function Home() {
  const session = await getServerSession(options);
  const id = parseInt(session?.user.id ?? "0");

  const clients = await db.client.findMany({
    where: {
      project_manager_id: id,
    },
  });

  console.log("clients data", clients);
  return (
    <div className=' text-black font-light flex justify-between  gap-'>
      <div className='w-3/12'>
        <SideBar link='Clients' />
      </div>
      <div className='w-9/12 flex flex-col pt-10 gap-4 px-4'>
        <div className='flex justify-end w-full '>
          <AddClientBtn id={id} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientsTable clients={clients} id={id} />
        </Suspense>
      </div>
    </div>
  );
}
