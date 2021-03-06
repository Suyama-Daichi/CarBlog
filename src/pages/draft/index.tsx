import { NextPage } from "next";
import {
  BreadCrumb,
  Categories,
  ImageThumbnail,
  Latest,
  Loader,
  Meta,
  PopularArticle,
  Post,
  Search,
  Share,
  Toc,
} from "@components";
import { IBlog, ICategory, IPopularArticles, ITag } from "@types";
import { useDraft } from "@hooks";
import styles from "@styles/Detail.module.scss";
import { getContents } from "@src/framework";

type DraftProps = {
  blogs: IBlog[];
  categories: ICategory[];
  popularArticles: IPopularArticles;
  tags: ITag[];
};

const Draft: NextPage<DraftProps> = (props) => {
  const { data, isLoading } = useDraft();

  if (isLoading || !data) {
    return <Loader />;
  }
  return (
    <div className={styles.divider}>
      <article className={styles.article}>
        {data.blog.ogimage && (
          <div className={styles.ogimageWrap}>
            <picture>
              <source
                media="(min-width: 1160px)"
                type="image/webp"
                srcSet={`${data.blog.ogimage.url}?w=820&fm=webp, ${data.blog.ogimage.url}?w=1640&fm=webp 2x`}
              />
              <source
                media="(min-width: 820px)"
                type="image/webp"
                srcSet={`${data.blog.ogimage.url}?w=740&fm=webp, ${data.blog.ogimage.url}?w=1480&fm=webp 2x`}
              />
              <source
                media="(min-width: 768px)"
                type="image/webp"
                srcSet={`${data.blog.ogimage.url}?w=728&fm=webp, ${data.blog.ogimage.url}?w=1456&fm=webp 2x`}
              />
              <source
                media="(min-width: 768px)"
                type="image/webp"
                srcSet={`${data.blog.ogimage.url}?w=375&fm=webp, ${data.blog.ogimage.url}?w=750&fm=webp 2x`}
              />
              <ImageThumbnail url={`${data.blog.ogimage.url}?w=560&q=100`} />
            </picture>
          </div>
        )}
        <BreadCrumb category={data.blog.category} />
        <div className={styles.main}>
          <Share id={data.blog.id} title={data.blog.title} />
          <div className={styles.container}>
            <h1 className={styles.title}>{data.blog.title}</h1>
            <Meta
              author={data.blog.writer}
              category={data.blog.category}
              createdAt={data.blog.createdAt}
              tags={data.blog.tag}
            />
            {data.blog.toc_visible && <Toc toc={data.toc} />}
            <Post body={data.body} />
          </div>
        </div>
      </article>
      <aside className="aside">
        <Search />
        <Categories categories={props.categories} />
        {/* <Tags tags={props.tags} /> */}
        <PopularArticle blogs={props.popularArticles.articles} />
        <Latest blogs={props.blogs} />
      </aside>
    </div>
  );
};

export async function getStaticProps() {
  const { blogs, categories, popularArticles } = await getContents();
  return {
    props: {
      blogs,
      categories,
      popularArticles,
    },
  };
}
export default Draft;
