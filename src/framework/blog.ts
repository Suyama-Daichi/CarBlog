import { config } from "site.config";
import {
  IBlog,
  ICategory,
  IPopularArticles,
  ITag,
  MicroCmsResponse,
  Queries,
} from "@types";
import { client } from "@src/framework";
import { range } from "@src/utils/util";

const limit = parseInt(config.defaultLimit);

export const getContents = async (
  currentPage: number = 1,
  articleFilter?: string
): Promise<{
  blogs: IBlog[];
  categories: ICategory[];
  popularArticles: IPopularArticles;
  pager: number[];
}> => {
  const [{ blogs, pager }, categories, popularArticles, tags] =
    await Promise.all([
      getBlogsByFilter(limit, currentPage, articleFilter),
      getCategories(),
      getPopularArticles(),
      getTags(),
    ]);
  return {
    blogs: blogs.contents,
    categories: categories.contents,
    popularArticles,
    pager,
    // tags: tags.contents,
  };
};

export const getAllBlogs = async (): Promise<MicroCmsResponse<IBlog>> => {
  const res = await client.get<MicroCmsResponse<IBlog>>({
    endpoint: "blog",
    queries: { limit: config.defaultMaxLimit },
  });
  return res;
};

export const getBlogs = async (
  limit: number
): Promise<MicroCmsResponse<IBlog>> => {
  const res = await client.get<MicroCmsResponse<IBlog>>({
    endpoint: "blog",
    queries: { limit: limit },
  });

  return res;
};

export const getBlogsByFilter = async (
  limit: number,
  currentPage: number,
  articleFilter?: string
): Promise<{ blogs: MicroCmsResponse<IBlog>; pager: number[] }> => {
  const queries: Queries = {
    limit: limit,
    filters: articleFilter,
    offset: (currentPage - 1) * limit,
  };
  const blogs = await client.get<MicroCmsResponse<IBlog>>({
    endpoint: "blog",
    queries: queries,
  });
  const pager = [...range(0, blogs.totalCount / 10)];
  return { blogs, pager };
};

export const getBlogById = async (blogId: string): Promise<IBlog> => {
  const res = await client.get<IBlog>({
    endpoint: "blog",
    contentId: blogId,
    queries: { depth: 2 },
  });
  return res;
};

export const getCategories = async (): Promise<MicroCmsResponse<ICategory>> => {
  const res = await client.get<MicroCmsResponse<ICategory>>({
    endpoint: "categories",
  });
  return res;
};

export const getPopularArticles = async (): Promise<IPopularArticles> => {
  const res = await client.get<IPopularArticles>({
    endpoint: "popular-articles",
  });
  return res;
};

export const getTags = async () => {
  // console.log('called7');
  // const res = await client.get<MicroCmsResponse<ITag>>({
  //   endpoint: 'tags',
  //   queries: { limit: 1000 },
  // });
  // return res;
};
