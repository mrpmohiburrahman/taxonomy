import { redirect } from "next/navigation"


import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  return <div>DashboardPage</div>
  // const user = await currentUser()

  // if (!user) {
  //   redirect("/login")
  // }
  // // const posts = []
  // const posts = await db.post.findMany({
  //   where: {
  //     authorId: user.id,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     published: true,
  //     createdAt: true,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  // })
  // return (
  //   <DashboardShell>
  //     <DashboardHeader heading="Posts" text="Create and manage posts.">
  //       <PostCreateButton />
  //     </DashboardHeader>
  //     <div>
  //       {posts?.length ? (
  //         <div className="border divide-y rounded-md divide-border">
  //           {posts.map((post) => (
  //             <PostItem key={post.id} post={post} />
  //           ))}
  //         </div>
  //       ) : (
  //         <EmptyPlaceholder>
  //           <EmptyPlaceholder.Icon name="post" />
  //           <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
  //           <EmptyPlaceholder.Description>
  //             You don&apos;t have any posts yet. Start creating content.
  //           </EmptyPlaceholder.Description>
  //           <PostCreateButton variant="outline" />
  //         </EmptyPlaceholder>
  //       )}
  //     </div>
  //   </DashboardShell>
  // )
}
