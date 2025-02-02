import { NextResponse } from "next/server";
import { Fellow } from "../../../../../models/fellow";
import { Cohort, Institution } from "../../../../../models/associations";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const fellow = await Fellow.findOne({
      include: [Cohort, Institution],
      where: { id: id },
    });

    return NextResponse.json(fellow);
  } catch (error) {
    return NextResponse.json(
      { message: "Request failed", status: false },
      { status: 400 }
    );
  }
}
