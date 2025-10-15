"use client";

import { ReactNode } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useLinkRouting } from "./hooks/index.link.routing.hook";
import { useAreaVisibility } from "./hooks/index.area.hook";

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

  const { showHeader, showLogo, showBanner, showNavigation, showFooter } =
    useAreaVisibility();

  return (
    <div className={styles.container}>
      {showHeader && (
        <header className={styles.header}>
          {showLogo && (
            <div
              className={styles.logo}
              onClick={handleLogoClick}
              data-testid="layout-logo">
              <span className={styles.logoText}>민지의 다이어리</span>
            </div>
          )}
        </header>
      )}

      {showHeader && <div className={styles.gap}></div>}

      {showBanner && (
        <div className={styles.banner} data-testid="layout-banner">
          <Image
            src="/images/banner.png"
            alt="banner"
            width={1168}
            height={240}
            className={styles.bannerImage}
            priority
          />
        </div>
      )}

      {showBanner && <div className={styles.gap}></div>}

      {showNavigation && (
        <nav className={styles.navigation} data-testid="layout-navigation">
          <div className={styles.navTabs}>
            <div
              className={`${styles.tab} ${
                isDiariesActive ? styles.tabActive : ""
              }`}
              onClick={handleDiariesClick}
              data-testid="nav-tab-diaries"
              data-active={isDiariesActive}>
              <span className={styles.tabText}>일기보관함</span>
            </div>
            <div
              className={`${styles.tab} ${
                isPicturesActive ? styles.tabActive : ""
              }`}
              onClick={handlePicturesClick}
              data-testid="nav-tab-pictures"
              data-active={isPicturesActive}>
              <span className={styles.tabText}>사진보관함</span>
            </div>
          </div>
        </nav>
      )}

      <main className={styles.main}>{children}</main>

      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerTitle}>민지의 다이어리</div>
            <div className={styles.footerInfo}>대표 : {"{name}"}</div>
            <div className={styles.footerCopyright}>
              Copyright © 2024. {"{name}"} Co., Ltd.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
