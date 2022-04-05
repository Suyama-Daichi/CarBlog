import { useState } from "react";
import Link from "next/link";
import styles from "@styles/components/Header.module.scss";
import Img from "next/image";

const iconSize = { width: 24, height: 24 };
export const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <Link href="/">
            <Img
              objectFit="contain"
              width={200}
              height={72}
              className={styles.logoImg}
              src="/images/siteLogo.png"
              alt="siteLogo"
            />
          </Link>
        </h1>
        <button className={styles.menuBtn} onClick={() => setOpen(!isOpen)}>
          <Img width={200} height={28} src="/images/icon_menu.svg" alt="menu" />
        </button>
        {isOpen && (
          <div className={styles.mask} onClick={() => setOpen(false)}></div>
        )}

        <div
          className={isOpen ? `${styles.menu} ${styles.isOpen}` : styles.menu}
        >
          <ul className={styles.lists}>
            <li className={styles.list}>
              {/* <a href="https://github.com/Suyama-Daichi">GitHub</a> */}
              <Img
                onClick={() =>
                  window.open("https://github.com/Suyama-Daichi", "_blank")
                }
                {...iconSize}
                src="/images/icon_github.svg"
                alt="twitter"
              />
            </li>

            {/* <li className={styles.list}>
              <a href="">menu2</a>
            </li>
            <li className={styles.list}>
              <a href="">menu3</a>
            </li> */}
          </ul>
        </div>
      </header>
      <div className={styles.empty}></div>
    </div>
  );
};
