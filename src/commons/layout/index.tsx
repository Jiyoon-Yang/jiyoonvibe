import { ReactNode } from 'react';
import styles from './styles.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        Header
      </header>
      
      <div className={styles.gap}></div>
      
      <div className={styles.banner}>
        Banner
      </div>
      
      <div className={styles.gap}></div>
      
      <nav className={styles.navigation}>
        Navigation
      </nav>
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  );
}

