import { NextResponse } from "next/server";

import { Cohort } from "../../../../models/cohort";
import { Fellow } from "../../../../models/fellow";

export async function GET(request) {
  try {
    const cohorts = await Cohort.findAll();
    return NextResponse.json({ cohorts });
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
    const [cohort, created] = await Cohort.findOrCreate({
      where: { cohort: body.cohort.toLowerCase() },
      defaults: { ...body },
    });
    return NextResponse.json({ cohort, created });
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
    const update = await Cohort.update(
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

  if (id === "f1494fec-5d20-454c-af45-af44a01216d0") {
    return NextResponse.json(
      { message: "Can't delete this cohort", status: false },
      { status: 400 }
    );
  } else {
    try {
      const update = await Fellow.update(
        { cohortId: "f1494fec-5d20-454c-af45-af44a01216d0" },
        {
          where: {
            cohortId: id,
          },
        }
      );
      console.log(update);
      if (update) {
        const deleteResponse = await Cohort.destroy({
          where: {
            id: id,
          },
        });

        return NextResponse.json({ deleteResponse });
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Request failed", status: false },
        { status: 400 }
      );
    }
  }
}
