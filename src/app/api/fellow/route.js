import { NextResponse } from "next/server";

import { Fellow } from "../../../../models/fellow";
import { Cohort, Institution } from "../../../../models/associations";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || null;
  const type = searchParams.get("type") || null;
  let fellows;
  try {
    if (type) {
      if (type === "institution") {
        fellows = await Fellow.findAll({
          include: [Cohort, Institution],
          where: { institutionId: query },
        });
      } else if (type === "cohort") {
        fellows = await Fellow.findAll({
          include: [Cohort, Institution],
          where: { cohortId: query },
        });
      }
    } else {
      fellows = await Fellow.findAll({
        include: [Cohort, Institution],
      });
    }
    return NextResponse.json({ fellows });
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
    const [fellow, created] = await Fellow.findOrCreate({
      where: { email: body.email.toLowerCase() },
      defaults: { ...body },
    });
    return NextResponse.json({ fellow, created });
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
    const update = await Fellow.update(
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
    const deleteResponse = await Fellow.destroy({
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
