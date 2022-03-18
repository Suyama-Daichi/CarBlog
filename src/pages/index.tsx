import { MicroCMSListResponse } from "microcms-js-sdk";
import type { NextPage } from "next";

import Link from "next/link";
import { client } from "../../libs/client";
import { Blog } from "../types/EndPoints";

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get<MicroCMSListResponse<Blog>>({
    endpoint: "blog",
  });

  return {
    props: {
      blog: data.contents,
    },
  };
};

type Props = {
  blog: Blog[];
};
const Home: NextPage<Props> = ({ blog }: Props) => {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
