import { db } from "../db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { JWTPayload, SignJWT, importJWK } from "jose";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { generate } from 'random-username-generator';

const randomName = generate();

interface token extends JWT {
  uid: string;
  jwtToken: string;
}

export interface session extends Session {
  user: {
    id: string;
    jwtToken: string;
    email: string;
    name: string;
  };
}
interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || "secret";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);

  return jwt;
};

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: ""},
        password: { label: "password", type: "password", placeholder: ""},
      },
      async authorize(credentials: any) {

        if (!credentials.email || !credentials.password) {
          console.log("inside 1")
          return null;
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const userDb = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
          select: {
            password: true,
            id: true,
            name: true,
            username: true,
            email: true,
          },
        });

        if (userDb) {
          // @ts-ignore
          if (await bcrypt.compare(credentials.password, userDb.password)) {
            const jwt = await generateJWT({
              id: userDb.id,
            });

            return {
              id: userDb.id,
              name: userDb.name,
              email: credentials.email,
              token: jwt,
              username: userDb.username,
            };
          } else {
            return null;
          }
        }
        try {
          // sign up
          if (credentials.username.length < 3) {
            return null
          }

          if (credentials.password.length < 3) {
            return null
          }

          const user = await db.user.create({
            data: {
              email: credentials.email,
              username: randomName,
              password: hashedPassword,
            },
          });

          const jwt = await generateJWT({
            id: user.id,
          });

          return {
            id: user.id,
            username: user.username,
            email: credentials.email,
            token: jwt,
            name: user.name,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("User", user);
      if (account && (account.provider === 'google' || account.provider === 'github' ) && user.email) {
        console.log("User", user);
        // Check if the user already exists in the database
        let userDb = await db.user.findFirst({
          where: {
            email: user.email,
          },
        });

        // If user does not exist, create a new user entry
        if (!userDb) {
          userDb = await db.user.create({
            data: {
              email: user.email,
              name: user.name,
              username: randomName,
            },
          });
        }
        user.id = userDb.id;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Ensures redirect always goes to the home page
      return baseUrl + '/dashboard';
    },
    session: async ({ session, token,user }) => {
      const newSession: session = session as session;
      if (newSession.user && token.uid) {
        newSession.user.id = token.uid as string;
        newSession.user.jwtToken = token.jwtToken as string;
      }
      // if (session?.user) {
      //   session.user.id = user.id;
      // }
      return newSession!;
    },
    jwt: async ({ token, user }): Promise<JWT> => {
      const newToken = token;

      if (user) {
        newToken.uid = user.id;
        newToken.jwtToken = (user as User).token;
      }
      return newToken;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;