export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";

export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
type Event = {
  action: string;
  category: string;
  label: string;
  value: string;
};
export const event = ({ action, category, label, value }: Event) => {
  if (!GA_TRACKING_ID) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value: value,
  });
};
