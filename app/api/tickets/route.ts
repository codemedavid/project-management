import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      code,
      approval,
      status,
      project_manager_id,
      editor_id,
      note,
      url,
      project_id,
    } = body;

    const existingCode = await db.tikets.findUnique({
      where: {
        code,
      },
    });

    if (existingCode) {
      return NextResponse.json(
        {
          ticket: null,
          message: "Ticket with this code already exists",
        },
        { status: 400 }
      );
    }

    const newTicket = await db.tikets.create({
      data: {
        code,
        approval: approval ?? "pending",
        status: status ?? "pending",
        note: note ?? "",
        url: url ?? "",
        project: { connect: { id: project_id } },
        project_manager: { connect: { id: project_manager_id } },
        editor: { connect: { id: editor_id } },
      },
    });

    return NextResponse.json(
      {
        ticket: newTicket,
        message: "Ticket created successfuly",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while creating new ticket",
        error,
      },
      { status: 501 }
    );
  }
}
