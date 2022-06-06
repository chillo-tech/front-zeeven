import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {backend} from '../../../config'
import jwt_decode from "jwt-decode";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
       
        console.log('=============next auth===============');
        console.log({credentials, backend, backendProcess:process.env.API_URL });
        console.log('=============next auth===============');
        const res = await fetch(`${backend}/api/connexion`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const {token} = await res.json();
        const userInToken = jwt_decode(token);
        const user = {...userInToken, name: `${userInToken.firstName} ${userInToken.lastName}` ,token};
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl){
         return `${baseUrl}/`
      }

      return baseUrl
    },
    async jwt({token, user, account, profile, isNewUser}) {
      if (user?.token) {
        token.token = user.token;
        token.lastName = user.lastName;
        token.firstName = user.firstName;
      }
      return token;
    },

    async session(session, token) {
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.log('=========ERROR=============');
      console.error({code, metadata})
      console.log('=========ERROR===================');
    },
    warn(code) {
      console.log('=========WARN=============');
      console.log({code})
      console.log('=========WARN===================');
    },
    debug(code, metadata) {
      console.log('=========DEBUG=============');
      console.error({code, metadata})
      console.log('=========DEBUG===================');
    }
  }
})