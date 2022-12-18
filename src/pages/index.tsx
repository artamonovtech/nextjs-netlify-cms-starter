import fs from "fs"
import matter from "gray-matter"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import styles from "../styles/Home.module.css"

interface Page {
  title: string
  description: string
}

interface Post {
  title: string
  description: string
  date: Date
}

interface PostList {
  slug: string
  post: Post
}

interface Props {
  page: Page
  posts: Array<PostList>
}

const Home: NextPage<Props> = ({ page, posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.description}>{page.description}</p>
        <div className={styles.grid}>
          {posts.map(({ slug, post }) => (
            <div key={slug} className={styles.card}>
              <Link href={`/post/${slug}`}>
                <h2>{post.title}</h2>
                <span>{post.description}</span>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {
  const pageFile = fs.readFileSync("./content/pages/home.md", "utf-8")
  const { data: page } = matter(pageFile)

  const postFiles = fs.readdirSync("./content/posts")

  const posts = postFiles.map(fileName => {
    const slug = fileName.replace(".md", "")
    const readFile = fs.readFileSync(`./content/posts/${fileName}`, "utf-8")
    const { data: post } = matter(readFile)

    return { slug, post }
  })

  return {
    props: {
      page,
      posts
    }
  }
}

export default Home
