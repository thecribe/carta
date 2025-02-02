import { NextResponse } from "next/server";
import { User } from "../../../../models/user";
import { Op } from "sequelize";

export async function GET(request) {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { message: "Request failed", status: false },
      { status: 400 }
    );
  }
}
export async function POST(request) {
  const body = await request.json();

  try {
    const [user, created] = await User.findOrCreate({
      where: { [Op.or]: [{ username: body.username }, { email: body.email }] },
      defaults: { ...body },
    });
    return NextResponse.json({ user, created });
  } catch (error) {
    return NextResponse.json(
      { message: "Request failed", status: false },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  const searchParams = request.nextUrl.searchParams;
  const body = await request.json();
  const userId = searchParams.get("userId");

  try {
    const update = await User.update(
      { ...body },
      {
        where: {
          id: userId,
        },
      }
    );
    return NextResponse.json({ update });
  } catch (error) {
    return NextResponse.json(
      { message: "Request failed", status: false },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  try {
    const deleteResponse = await User.destroy({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({ deleteResponse });
  } catch (error) {
    return NextResponse.json(
      { message: "Request failed", status: false },
      { status: 400 }
    );
  }
}
