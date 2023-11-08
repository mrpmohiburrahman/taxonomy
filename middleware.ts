import { authMiddleware } from "@clerk/nextjs";





export default authMiddleware({
  publicRoutes: ["/", "/login", "/register", "/dashboard"],
})

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
// }