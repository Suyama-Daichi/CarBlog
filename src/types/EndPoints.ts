export type Blog = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: Date;
  title: string;
  body: string;
};

export type MicroCMSResponse<T> = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: T[];
};

export type Context = {
  params: { id: string };
  locales: undefined;
  locale: undefined;
  defaultLocale: undefined;
};
