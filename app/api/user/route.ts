import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { Role } from "@prisma/client";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password, team, role, name } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });
    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        username,
        email,
        role,
        team,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    console.log(newUserPassword);
    return NextResponse.json(
      {
        user: rest,
        message: "User created successfuly",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while creating new user",
        error,
      },
      { status: 501 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const roleRequest = searchParams.get("role")?.toUpperCase();
    const role = roleRequest as Role;
    if (!role) {
      const users = await db.user.findMany();
      return NextResponse.json({ users }, { status: 202 });
    }
    const users = await db.user.findMany({
      where: {
        role: role ?? "EDITOR",
      },
    });
    return NextResponse.json({ users }, { status: 202 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while fetching users",
        error,
      },
      { status: 501 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    const updatedUser = await db.user.update({
      where: { id: parseInt(id) },
      data: rest,
    });
    return NextResponse.json({ updatedUser }, { status: 202 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while updating user",
        error,
      },
      { status: 501 }
    );
  }
}
