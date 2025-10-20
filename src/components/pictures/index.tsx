"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import styles from "./styles.module.css";

export default function Pictures() {
  const [selectedFilter, setSelectedFilter] = useState<string>("default");

  const filterOptions = [
    { value: "default", label: "기본" },
    { value: "recent", label: "최신순" },
    { value: "popular", label: "인기순" },
  ];

  const mockImages = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: "/images/dog-1.jpg",
    alt: `강아지 사진 ${i + 1}`,
  }));

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <div className={styles.container}>
      {/* gap: 1168 * 32 */}
      <div className={styles.gap_top}></div>

      {/* filter: 1168 * 48 */}
      <div className={styles.filter}>
        <Selectbox
          variant="primary"
          size="medium"
          theme="light"
          options={filterOptions}
          value={selectedFilter}
          onChange={handleFilterChange}
          className={styles.filter__selectbox}
        />
      </div>

      {/* gap: 1168 * 42 */}
      <div className={styles.gap_middle}></div>

      {/* main: 1168 * auto */}
      <div className={styles.main}>
        {mockImages.map((image) => (
          <div key={image.id} className={styles.imageItem}>
            <Image
              src={image.src}
              alt={image.alt}
              width={640}
              height={640}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
