import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userValidation } from "./utils/auth";
import { checkTokenValidity } from "./utils/tokens";

// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      //   credentials: {
      //     username: {},
      //     password: {},
      //   },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        // logic for user validation
        const response = await userValidation(username, password);

        if (!response.user) {
          throw new Error("Please check your credentials");
        }

        // return user object with their profile data
        return {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
        };
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.username = user.username;

        return token;
      }

      return token;
    },

    async session({ session, token }) {
      try {
        const responseToken = await checkTokenValidity(
          token.accessToken,
          token.refreshToken
        );

        if (responseToken.accessToken) {
          session.user.accessToken = responseToken.accessToken;
          session.user.id = token.id;
          session.user.username = token.username;

          return session;
        }

        session = { ...session, user: false, ...responseToken };
        return session;
      } catch (error) {
        throw new Error("Unable to verify token");
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
