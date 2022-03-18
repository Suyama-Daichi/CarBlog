import { client } from "../../../libs/client";
import { Blog, Context } from "../../types/EndPoints";
import React from "react";
import { MicroCMSListResponse } from "microcms-js-sdk";

type Props = {
  blog: Blog;
};
export default function BlogId({ blog }: Props) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data: MicroCMSListResponse<Blog> = await client.get({
    endpoint: "blog",
  });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: Context) => {
  const id = context.params.id;
  const data = await client.get<Blog>({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
