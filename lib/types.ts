import { Pipeline } from "@prisma/client";

export type Client = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  status: Pipeline;
  website: string | null;
  created_at: Date;
  updatedAt: Date;
  project_manager_id: number;
};
