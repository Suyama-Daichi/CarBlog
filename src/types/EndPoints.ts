import { MicroCMSDate } from "microcms-js-sdk";

export type Blog = {
  id: string;
  title: string;
  body: string;
  category: Category;
} & MicroCMSDate;

export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

export type Context = {
  params: { id: string };
  locales: undefined;
  locale: undefined;
  defaultLocale: undefined;
};
