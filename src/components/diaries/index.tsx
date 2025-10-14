import React from 'react';
import styles from './styles.module.css';

export default function Diaries() {
  return (
    <div className={styles.container}>
      {/* gap: 1168 * 32 */}
      <div className={styles.gap_top}></div>
      
      {/* search: 1168 * 48 */}
      <div className={styles.search}>Search Area</div>
      
      {/* gap: 1168 * 42 */}
      <div className={styles.gap_middle_1}></div>
      
      {/* main: 1168 * 936 */}
      <div className={styles.main}>Main Content Area</div>
      
      {/* gap: 1168 * 40 */}
      <div className={styles.gap_middle_2}></div>
      
      {/* pagination: 1168 * 32 */}
      <div className={styles.pagination}>Pagination Area</div>
      
      {/* gap: 1168 * 40 */}
      <div className={styles.gap_bottom}></div>
    </div>
  );
}

