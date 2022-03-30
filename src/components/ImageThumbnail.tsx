import Image from "next/image";
import styles from "@styles/components/PopularArticle.module.scss";

type Props = {
  url: string;
  media?: string;
};
export const ImageThumbnail = ({ url }: Props) => {
  return (
    <Image
      objectFit="cover"
      layout="responsive"
      width={512}
      height={288}
      src={url}
      className={`${styles.image} lazyload`}
      alt={"popularArticleImage"}
    />
  );
};
