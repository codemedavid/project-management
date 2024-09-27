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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const limit = searchParams.get("limit");

    if (!projectId && !limit) {
      const projects = await db.project.findMany();

      return NextResponse.json({ projects }, { status: 203 });
    }

    if (limit) {
      const projects = await db.project.findMany({
        take: parseInt(limit),
      });

      return NextResponse.json({ projects }, { status: 203 });
    }

    const project = await db.project.findUnique({
      where: {
        id: parseInt(projectId as string),
      },
      include: {
        project_manager: true,
        editor: true,
      },
    });

    return NextResponse.json({ project }, { status: 203 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while fetching project",
        error,
      },
      { status: 501 }
    );
  }
}
