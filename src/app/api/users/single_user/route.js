import { Op } from "sequelize";
import { User } from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const username = searchParams.get("username");

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Request failed", status: false },
      { status: 400 }
    );
  }
}
