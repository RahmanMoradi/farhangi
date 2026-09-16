"use client";

import "./blog.css";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import ArticleBox from "@/Components/Home/Article/ArticleBox";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/menu/Menu";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      setPosts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data?.message || error.message);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filteredPosts = useMemo(() => posts.filter((post) =>
    post.title.includes(search) || post.content.replace(/<[^>]*>/g, " ").includes(search)
  ), [posts, search]);

  return (
    <>
      <div className="body">
        <Navbar />
        <div className="blog-page" dir="rtl">
          <main className="blog-index">
        <header className="blog-hero"><h1>مقالات</h1></header>
        <div className="blog-controls">
          <label><Icon icon="line-md:search" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="مطلب مورد نظر خود را جستجو کنید" /></label>
          <button type="button">دسته‌بندی <Icon icon="mdi:chevron-down" /></button>
        </div>
        <section className="blog-grid">
          {filteredPosts.map((post) => <ArticleBox key={post.id} post={post} />)}
        </section>
            {!filteredPosts.length && <p className="blog-empty">مقاله‌ای موجود نیست.</p>}
          </main>
        </div>
      </div>
      <Menu select="blog" />
      <Footer />
    </> 
  );
}
