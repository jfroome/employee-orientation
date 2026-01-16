import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { NinoxOnboardingGet } from "../../../data/repository";
import { Id, LastName, SocialSecurity, Email, FirstName, HasFinalized } from "../../../constants";

export default NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                // Mock test user
                if (credentials.email.toLowerCase() === "test@example.com") {
                    if (credentials.password === "USE6789") {
                        return {
                            user: {
                                [Id]: "test-id",
                                [FirstName]: "Test",
                                [Email]: "test@example.com"
                            }
                        };
                    } else {
                        return null;
                    }
                }

                const result = await NinoxOnboardingGet(credentials.email.toLocaleLowerCase());
                if (result.id !== null && result.id !== undefined) {
                    if (ValidateCredentials(credentials.password, result.data)) {
                        return {
                            user: {
                                [Id]: result.id,
                                [FirstName]: result.data[FirstName],
                                [Email]: result.data[Email]
                            }
                        }
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            }
        })
    ],
    session: {
        jwt: true,
        maxAge: 60 * 60,
      },
      jwt: {
        signingKey: process.env.NEXTAUTH_SECRET,
      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.user = user;
          }
          return token;
        },
        async session({ session, token }) {
          session.user = { user: token.user };
          return session;
        },
      },
});

const ValidateCredentials = (password, data) => {
    // logic to validate the password goes here.
    return true;
}