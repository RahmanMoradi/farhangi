"use client";

import "../blog.css";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/menu/Menu";

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`);
      setPost(response.data.data);
    } catch (error) {
      console.error("Error fetching post:", error.response?.data?.message || error.message);
    }
  }, [slug]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (!post) return null;

  const image = post.content.match(/<img[^>]+src=["']([^"']+)/i)?.[1] || "/images/home/article/image.webp";
  const content = post.content.replace(/<figure[\s\S]*?<\/figure>/i, "");
  const date = new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(new Date(post.created_at));

  return (
    <>
      <div className="body">
        <Navbar />
        <div className="blog-page" dir="rtl">
          <main className="blog-show">
        <article>
          <img className="blog-show-image" src={image} alt={post.title} />
          <div className="blog-meta"><span><Icon icon="uiw:date" />{date}</span><span>۰<Icon icon="iconamoon:eye-light" /></span></div>
          <h1>{post.title}</h1>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: content }} />
          <footer className="blog-show-footer">
            <span><Icon icon="mdi:instagram" /><Icon icon="mdi:facebook" /><Icon icon="mdi:linkedin" /></span>
            <Link href="/blog">بازگشت به مقالات</Link>
          </footer>
            </article>
          </main>
        </div>
      </div>
      <Menu select="blog" />
      <Footer />
    </>
  );
}
