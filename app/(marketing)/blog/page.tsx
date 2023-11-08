import Image from "next/image"
import Link from "next/link"
import { Post, allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { getListPage, getSinglePage } from "@/lib/contentParser"
import { getTaxonomy } from "@/lib/taxonomyParser"
import { formatDate } from "@/lib/utils"
import { sortByDate } from "@/lib/utils/sortFunctions"

const summary_length = 100
export const metadata = {
  title: "Blog",
}
const blog_folder = "posts"
export default async function BlogPage() {
  const posts = allPosts
    .filter((post: Post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const homepage = await getListPage("content_2/_index.md")
  const { frontmatter } = homepage
  const { banner, featured_posts, recent_posts, promotion } = frontmatter
  const posts_2 = getSinglePage(`content_2/${blog_folder}`)
  const categories = getTaxonomy(`content_2/${blog_folder}`, "categories")
  console.log(
    `🚀 ~ file: page.tsx:26 ~ BlogPage ~ posts_2:`,
    JSON.stringify(posts_2)
  )
  console.log(`🚀 ~ file: page.tsx:24 ~ BlogPage ~ banner:`, banner)

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts_2.filter((post) =>
      post.frontmatter.categories.includes(category)
    )
    return {
      name: category,
      posts: filteredPosts.length,
    }
  })

  const sortPostByDate = sortByDate(posts_2)
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  )
  const showPosts = 6

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      {/* <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl tracking-tight font-heading lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A blog built using Contentlayer. Posts are written in MDX.
          </p>
        </div>
      </div>
      <hr className="my-8" /> */}
      {/* {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="relative flex flex-col space-y-2 group"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="transition-colors border rounded-md bg-muted"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )} */}

      {posts_2?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts_2.map((post, index) => (
            <article
              key={index}
              className="group relative flex flex-col space-y-2"
            >
              {post.frontmatter.image && (
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">
                {post.frontmatter.title}
              </h2>
              {post.content && (
                <p className="text-muted-foreground">
                  {post.content.slice(0, Number(summary_length))}
                </p>
              )}
              <Link href={"/blog/post-slug"} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
              {post.frontmatter.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.frontmatter.date)}
                </p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
