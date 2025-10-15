"use client";

import React from "react";
import styles from "./styles.module.css";

export default function DiariesNew() {
  return (
    <div className={styles.wrapper}>
      {/* header: full * 24 */}
      <div className={styles.header}>Header</div>

      {/* gap: full * 40 */}
      <div className={styles.gap_1}></div>

      {/* emotion-box: full * 64 */}
      <div className={styles.emotion_box}>Emotion Box</div>

      {/* gap: full * 40 */}
      <div className={styles.gap_2}></div>

      {/* input-title: full * 76 */}
      <div className={styles.input_title}>Input Title</div>

      {/* gap: full * 24 */}
      <div className={styles.gap_3}></div>

      {/* input-content: full * 156 */}
      <div className={styles.input_content}>Input Content</div>

      {/* gap: full * 40 */}
      <div className={styles.gap_4}></div>

      {/* footer: full * 48 */}
      <div className={styles.footer}>Footer</div>
    </div>
  );
}
