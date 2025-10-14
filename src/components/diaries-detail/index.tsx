"use client";

import React from "react";
import styles from "./styles.module.css";

export default function DiariesDetail() {
  return (
    <div className={styles.container}>
      {/* gap: 1168 * 64 */}
      <div className={styles.gap_top}></div>

      {/* detail-title: 1168 * 84 */}
      <div className={styles.detail_title}>detail-title</div>

      {/* gap: 1168 * 24 */}
      <div className={styles.gap_1}></div>

      {/* detail-content: 1168 * 169 */}
      <div className={styles.detail_content}>detail-content</div>

      {/* gap: 1168 * 24 */}
      <div className={styles.gap_2}></div>

      {/* detail-footer: 1168 * 56 */}
      <div className={styles.detail_footer}>detail-footer</div>

      {/* gap: 1168 * 24 */}
      <div className={styles.gap_3}></div>

      {/* retrospect-input: 1168 * 85 */}
      <div className={styles.retrospect_input}>retrospect-input</div>

      {/* gap: 1168 * 16 */}
      <div className={styles.gap_4}></div>

      {/* retrospect-list: 1168 * 72 */}
      <div className={styles.retrospect_list}>retrospect-list</div>

      {/* gap: 1168 * 64 */}
      <div className={styles.gap_bottom}></div>
    </div>
  );
}
