import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user) {
                    // Placeholder: return mock user for dev if DB is empty/not connected
                    // REMOVE THIS IN PRODUCTION
                    if (process.env.NODE_ENV === "development" && credentials.email === "admin@example.com" && credentials.password === "admin") {
                        return {
                            id: "admin-id",
                            email: "admin@example.com",
                            name: "Admin User",
                            role: "ADMIN",
                        }
                    }
                    return null
                }

                const isPasswordValid = await compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordValid) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                },
            }
        },
        async jwt({ token, user }) {
            if (user) {
                // token.id = user.id // logic needs adjustment for types. 
                // user object in authorize returns id, but types might need extension.
                // For now casting as any for quick prototype or just assignment.
                const u = user as any
                token.id = u.id
                token.role = u.role
            }
            return token
        },
    },
}
