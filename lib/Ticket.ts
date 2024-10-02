"use server";

import { db } from "@/lib/db";

export async function createTicket(
  projectManagerId: number,
  projectId: number,
  editorId: number,
  code: string,
  note: string,
  url: string
) {
  const response = await db.tikets.create({
    data: {
      project_manager_id: projectManagerId,
      project_id: projectId,
      editor_id: editorId,
      code,
      note,
      url,
    },
  });

  return response;
}
