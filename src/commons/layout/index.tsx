'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { useLinkRouting } from './hooks/index.link.routing.hook';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const {
    isDiariesActive,
    isPicturesActive,
    handleLogoClick,
    handleDiariesClick,
    handlePicturesClick,
  } = useLinkRouting();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div
          className={styles.logo}
          onClick={handleLogoClick}
          data-testid="layout-logo"
        >
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
      
      <nav className={styles.navigation} data-testid="layout-navigation">
        <div className={styles.navTabs}>
          <div
            className={`${styles.tab} ${isDiariesActive ? styles.tabActive : ''}`}
            onClick={handleDiariesClick}
            data-testid="nav-tab-diaries"
            data-active={isDiariesActive}
          >
            <span className={styles.tabText}>일기보관함</span>
          </div>
          <div
            className={`${styles.tab} ${isPicturesActive ? styles.tabActive : ''}`}
            onClick={handlePicturesClick}
            data-testid="nav-tab-pictures"
            data-active={isPicturesActive}
          >
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

