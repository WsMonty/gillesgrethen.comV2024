import { useState } from "react";
import { useEffect } from "react";
import { getBlogPosts } from "../../contentful";
import "./Blog.scss";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MOBILE_BREAKPOINT } from "../../globals/constants";
import dayjs from "dayjs";

interface BlogPost {
  title: string;
  date: string;
  article: { json: Document };
  author: string;
}

function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogPosts().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => {
        return (
          <p
            style={{
              marginBottom: "1em",
              fontSize: isMobile ? "1.5rem" : "1.4rem",
            }}
          >
            {children}
          </p>
        );
      },
    },
  };

  return (
    <div className="blog">
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog, index) => (
          <div key={index} className="blogPost">
            <h2>{blog.title}</h2>
            <div className="blogPostInfo">
              {<p>{blog.date && dayjs(blog.date).format("DD.MM.YYYY")}</p>}
              <p>{blog.author}</p>
            </div>
            {documentToReactComponents(blog.article.json, options)}
          </div>
        ))}
    </div>
  );
}

export default Blog;
