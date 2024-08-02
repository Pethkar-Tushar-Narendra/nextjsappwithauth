import { checkPassword } from "../../../Components/Functions";
import connectMongoDB from "../../../libs/mongodb";
import Users from "../../../models/users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    newUser: "/auth/register",
    signIn: "/login",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      async authorize(credentials, req) {
        try {
          await connectMongoDB();
          const userFromDataBase = await Users.findOne({
            userName: credentials?.userName,
          });
          if (
            await checkPassword(
              credentials?.password || "",
              userFromDataBase.password
            )
          ) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: userFromDataBase?._id,
              name: userFromDataBase?.userName,
              email: userFromDataBase?.email,
              watchlist: userFromDataBase?.watchlist,
              favourites: userFromDataBase?.favourites,
            };
          } else {
            return null;
          }
        } catch (error) {}
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // callbacks: {
  //   async jwt({ token, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
