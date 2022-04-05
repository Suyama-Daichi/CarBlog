export const config = {
  siteMeta: {
    title: "すーさんの旅行日記",
    description: "車と自転車と…",
  },
  baseUrl:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEURL
      : "http://localhost:3000",
  apiKey: process.env.API_KEY,
  serviceId: process.env.SERVICE_ID,
  headerLinks: [],
  defaultLimit: process.env.NEXT_PUBLIC_DEFAULT_LIMIT ?? "10",
  defaultMaxLimit: 50,
};
