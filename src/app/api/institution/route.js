import { NextResponse } from "next/server";
import { Op } from "sequelize";
import { Institution } from "../../../../models/institution";

export async function GET(request) {
  try {
    const institutions = await Institution.findAll();
    return NextResponse.json({ institutions });
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
    const [institution, created] = await Institution.findOrCreate({
      where: { name: body.name.toLowerCase() },
      defaults: { ...body },
    });
    return NextResponse.json({ institution, created });
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
  const id = searchParams.get("id");

  try {
    const update = await Institution.update(
      { ...body },
      {
        where: {
          id: id,
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
  const id = searchParams.get("id");

  try {
    const deleteResponse = await Institution.destroy({
      where: {
        id: id,
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
