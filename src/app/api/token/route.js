import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const bearer = searchParams.get("bearer");

  const token = JSON.parse(bearer);

  //check accesstoken for expiration

  try {
    const decodeAccessToken = jwt.verify(
      token.accessToken,
      process.env.JWT_TOKEN_KEY
    );

    const accessTokenExpires = decodeAccessToken?.exp * 1000; //convert to time

    if (Date.now() < accessTokenExpires) {
      return NextResponse.json(
        { accessToken: token.accessToken },
        { status: 200 }
      );
    }
  } catch (error) {
    try {
      const decodeRefreshToken = jwt.verify(
        token.refreshToken,
        process.env.JWT_TOKEN_KEY
      );

      const refreshTokenExpires = decodeRefreshToken?.exp * 1000; //convert to time

      if (Date.now() < refreshTokenExpires) {
        const newAccessToken = jwt.sign(
          { userId: decodeRefreshToken.userId },
          process.env.JWT_TOKEN_KEY,
          {
            expiresIn: "60000",
          }
        );
        return NextResponse.json(
          { accessToken: newAccessToken },
          { status: 200 }
        );
      }
    } catch {
      return NextResponse.json(
        { message: "Refresh token expired" },
        { status: 500 }
      );
    }
  }
}
