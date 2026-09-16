import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function ArticleBox({ post }) {
  const image = post.content.match(/<img[^>]+src=["']([^"']+)/i)?.[1];
  const excerpt = post.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 140);
  const date = new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(new Date(post.created_at));

  return (
    <Link href={`/blog/${post.slug}`} className="blog-card" aria-label={post.title}>
      <img src={image || "/images/home/article/image.webp"} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{excerpt}</p>
      <footer>
        <span><Icon icon="uiw:date" />{date}</span>
        <span><Icon icon="iconamoon:eye-light" />۰</span>
      </footer>
    </Link>
  );
}

export default ArticleBox;
