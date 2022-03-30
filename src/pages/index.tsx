import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import {
  BreadCrumb,
  Categories,
  Meta,
  Pager,
  PopularArticle,
  Search,
} from "@/src/components";
import { IBlog, ICategory, IPopularArticles } from "@/src/types";
import { getContents } from "@/src/framework/blog";
import Image from "next/image";
import styles from "@/src/styles/components/PopularArticle.module.scss";

type IndexProps = {
  currentPage: number;
  blogs: IBlog[];
  categories: ICategory[];
  popularArticles: IPopularArticles;
  pager: [];
};

const Index: NextPage<IndexProps> = (props) => {
  return (
    <div className="divider">
      <div className="container">
        <BreadCrumb />
        {props.blogs.length === 0 && <>記事がありません</>}
        <ul>
          {props.blogs.map((blog) => {
            return (
              <li key={blog.id} className="list">
                <Link href="/[blogId]" as={`/${blog.id}`}>
                  <a className="link">
                    <>
                      {blog.ogimage && (
                        <picture>
                          <Image
                            objectFit="cover"
                            width={384}
                            height={216}
                            src={`${blog.ogimage.url}?w=670`}
                            className={`${styles.image} lazyload`}
                            alt={"popularArticleImage"}
                          />
                        </picture>
                      )}
                      <dl className="content">
                        <dt className="title">{blog.title}</dt>
                        <dd>
                          <Meta
                            createdAt={blog.createdAt}
                            author={blog.writer}
                            category={blog.category}
                            tags={blog.tag}
                          />
                        </dd>
                      </dl>
                    </>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        {props.blogs.length > 0 && (
          <ul className="pager">
            <Pager pager={props.pager} currentPage={props.currentPage} />
          </ul>
        )}
      </div>
      <aside className="aside">
        <Search />
        <Categories categories={props.categories} />
        <PopularArticle blogs={props.popularArticles.articles} />
      </aside>
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const page: any = context.params || "1";
  const { blogs, pager, categories, popularArticles } = await getContents(page);

  return {
    props: {
      currentPage: parseInt(page),
      blogs,
      categories,
      popularArticles,
      pager,
    },
  };
}

export default Index;
