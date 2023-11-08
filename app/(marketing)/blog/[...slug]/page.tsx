import { notFound } from "next/navigation"
import { allAuthors, allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { env } from "@/env.mjs"
import { getSinglePage } from "@/lib/contentParser"
import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

const blog_folder = "posts"
async function getPostFromParams(params) {
  const slug = params?.slug?.join("/")
  console.log(`🚀 ~ file: page.tsx:25 ~ getPostFromParams ~ slug:`, slug)
  const allPosts = getSinglePage(`content_2/${blog_folder}`)
  const post = allPosts.find((post) => {
    return post.slug === slug
  })
  console.log(`🚀 ~ file: page.tsx:28 ~ getPostFromParams ~ post:`, post)
  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

// export async function generateStaticParams(): Promise<
//   PostPageProps["params"][]
// > {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }))
// }

export default async function PostPage({ params }: PostPageProps) {
  console.log(`🚀 ~ file: page.tsx:92 ~ PostPage ~ params:`, params)
  return <div>hello</div>
  // const post = await getPostFromParams(params)

  // if (!post) {
  //   notFound()
  // }

  // // const authors = post.authors.map((author) =>
  // //   allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  // // )

  // return (
  //   <article className="container relative max-w-3xl py-6 lg:py-10">
  //     <Link
  //       href="/blog"
  //       className={cn(
  //         buttonVariants({ variant: "ghost" }),
  //         "absolute left-[-200px] top-14 hidden xl:inline-flex"
  //       )}
  //     >
  //       <Icons.chevronLeft className="w-4 h-4 mr-2" />
  //       See all posts
  //     </Link>
  //     <div>
  //       {post.frontmatter.date && (
  //         <time
  //           dateTime={post.frontmatter.date}
  //           className="block text-sm text-muted-foreground"
  //         >
  //           Published on {formatDate(post.frontmatter.date)}
  //         </time>
  //       )}
  //       <h1 className="inline-block mt-2 text-4xl leading-tight font-heading lg:text-5xl">
  //         {post.frontmatter.title}
  //       </h1>
  //       {/* {authors?.length ? (
  //         <div className="flex mt-4 space-x-4">
  //           {authors.map((author) =>
  //             author ? (
  //               <Link
  //                 key={author._id}
  //                 href={`https://twitter.com/${author.twitter}`}
  //                 className="flex items-center space-x-2 text-sm"
  //               >
  //                 <Image
  //                   src={author.avatar}
  //                   alt={author.title}
  //                   width={42}
  //                   height={42}
  //                   className="bg-white rounded-full"
  //                 />
  //                 <div className="flex-1 leading-tight text-left">
  //                   <p className="font-medium">{author.title}</p>
  //                   <p className="text-[12px] text-muted-foreground">
  //                     @{author.twitter}
  //                   </p>
  //                 </div>
  //               </Link>
  //             ) : null
  //           )}
  //         </div>
  //       ) : null} */}
  //     </div>
  //     {post.frontmatter.image && (
  //       <Image
  //         src={post.frontmatter.image}
  //         alt={post.frontmatter.title}
  //         width={720}
  //         height={405}
  //         className="my-8 transition-colors border rounded-md bg-muted"
  //         priority
  //       />
  //     )}
  //     {/* <Mdx code={post.body.code} /> */}
  //     <hr className="mt-12" />
  //     <div className="flex justify-center py-6 lg:py-10">
  //       <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
  //         <Icons.chevronLeft className="w-4 h-4 mr-2" />
  //         See all posts
  //       </Link>
  //     </div>
  //   </article>
  // )
}
