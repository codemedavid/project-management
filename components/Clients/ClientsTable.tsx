"use client";
import React from "react";
import { UpdateClientPipeline } from "@/lib/Client";
import { useRouter } from "next/navigation";
import { Pipeline } from "@prisma/client";
export default function ClientsTable({
  clients,
  id,
}: {
  clients: {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    website: string | null;
    status: string; // Changed from 'pipeline' to 'status'
    created_at: Date;
    updatedAt: Date;
    project_manager_id: number;
  }[];
  id: number;
}) {
  const router = useRouter();
  if (id === 0) {
    return <div>Loading...</div>;
  }

  const handleUpdatePipeline = async (id: number, pipeline: string) => {
    await UpdateClientPipeline(id, { status: pipeline as Pipeline });
    router.refresh();
  };

  console.log(clients, id);
  return (
    <div className='flex flex-col items-start w-full'>
      <table className='w-full'>
        <thead className='bg-gray-100'>
          <tr className='bg-gray-100'>
            <th className='text-left font-bold '>Name</th>
            <th className='text-left font-bold '>Email</th>
            <th className='text-left font-bold '>Status</th>
            <th className='text-left font-bold '>Website</th>
            <th className='text-left font-bold '>Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                <select
                  className='bg-transparent border-none cursor-pointer focus:outline-none'
                  value={client.status} // Changed from 'pipeline' to 'status'
                  onChange={(e) =>
                    handleUpdatePipeline(client.id, e.target.value)
                  }
                >
                  {client.status === "Lead" && (
                    <>
                      <option value='Lead'>Lead</option>
                      <option value='Cold'>Cold</option>
                      <option value='Hot'>Hot</option>
                      <option value='Warm'>Warm</option>
                      <option value='Closed'>Closed</option>
                    </>
                  )}
                  {client.status === "Cold" && (
                    <>
                      <option value='Cold'>Cold</option>
                      <option value='Lead'>Lead</option>
                      <option value='Hot'>Hot</option>
                      <option value='Warm'>Warm</option>
                      <option value='Closed'>Closed</option>
                    </>
                  )}
                  {client.status === "Hot" && (
                    <>
                      <option value='Hot'>Hot</option>
                      <option value='Cold'>Cold</option>
                      <option value='Lead'>Lead</option>
                      <option value='Warm'>Warm</option>
                      <option value='Closed'>Closed</option>
                    </>
                  )}
                  {client.status === "Warm" && (
                    <>
                      <option value='Warm'>Warm</option>
                      <option value='Cold'>Cold</option>
                      <option value='Lead'>Lead</option>
                      <option value='Hot'>Hot</option>
                      <option value='Closed'>Closed</option>
                    </>
                  )}
                  {client.status === "Closed" && (
                    <>
                      <option value='Closed'>Closed</option>
                      <option value='Cold'>Cold</option>
                      <option value='Lead'>Lead</option>
                      <option value='Hot'>Hot</option>
                      <option value='Warm'>Warm</option>
                    </>
                  )}
                </select>
              </td>
              <td>{client.website}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
