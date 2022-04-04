import styles from "@styles/components/Loader.module.scss";
import Img from "next/image";

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Img
        layout="fill"
        className={styles.loadingicon}
        src="/images/icon_loading.svg"
        alt="検索中"
      />
    </div>
  );
};
