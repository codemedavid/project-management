"use server";
import { db } from "@/lib/db";
import { Pipeline } from "@prisma/client";
export async function AddClient(client: {
  name: string;
  email: string;
  phone: string;
  website: string;
  project_manager_id: number;
}) {
  const clients = await db.client.create({
    data: client,
  });
  return clients;
}

export async function UpdateClientPipeline(
  id: number,
  client: {
    status: Pipeline;
  }
) {
  const clients = await db.client.update({
    where: { id },
    data: {
      status: client.status,
    },
  });
  return clients;
}

export async function getClientsByProjectManager(id: number) {
  console.log(id);
  if (id !== undefined) {
    const myClients = await db.client.findMany({
      where: { project_manager_id: id },
    });
    return myClients;
  } else {
    return [];
  }
}
