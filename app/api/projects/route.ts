import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, project_manager_id, editor_id } = body;

    if (!title || !project_manager_id || !editor_id) {
      return NextResponse.json(
        {
          project: null,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const newProject = await db.project.create({
      data: {
        title,
        description,
        project_manager_id,
        editor_id,
      },
    });

    return NextResponse.json(
      {
        project: newProject,
        message: "Project created successfuly",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while creating new project",
        error,
      },
      { status: 501 }
    );
  }
}
