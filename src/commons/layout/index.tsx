import { ReactNode } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>민지의 다이어리</span>
        </div>
      </header>
      
      <div className={styles.gap}></div>
      
      <div className={styles.banner}>
        <Image
          src="/images/banner.png"
          alt="banner"
          width={1168}
          height={240}
          className={styles.bannerImage}
          priority
        />
      </div>
      
      <div className={styles.gap}></div>
      
      <nav className={styles.navigation}>
        <div className={styles.navTabs}>
          <div className={`${styles.tab} ${styles.tabActive}`}>
            <span className={styles.tabText}>일기보관함</span>
          </div>
          <div className={styles.tab}>
            <span className={styles.tabText}>사진보관함</span>
          </div>
        </div>
      </nav>
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerTitle}>민지의 다이어리</div>
          <div className={styles.footerInfo}>대표 : {'{name}'}</div>
          <div className={styles.footerCopyright}>Copyright © 2024. {'{name}'} Co., Ltd.</div>
        </div>
      </footer>
    </div>
  );
}

