import fs from "fs"
import matter from "gray-matter"
import md from "markdown-it"
import { ParsedUrlQuery } from "querystring"
import type { NextPage, GetStaticPaths, GetStaticProps } from "next"

import styles from "../../styles/Home.module.css"

interface Post {
  title: string
  description: string
  date: Date
}

interface Props {
  post: Post
  content: string
}

interface ContextParams extends ParsedUrlQuery {
  slug: string
}

const Post: NextPage<Props> = ({ post, content }) => {
  return (
    <div className={styles.container}>
      <main>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("./content/posts")
  const paths = files.map(fileName => ({
    params: {
      slug: fileName.replace(".md", "")
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as ContextParams
  const fileName = fs.readFileSync(`./content/posts/${slug}.md`, "utf-8")
  const { data: post, content } = matter(fileName)

  return {
    props: {
      post,
      content
    }
  }
}

export default Post
