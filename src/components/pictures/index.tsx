"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import styles from "./styles.module.css";
import { usePicturesBinding } from "./hooks/index.binding.hook";

export default function Pictures() {
  const [selectedFilter, setSelectedFilter] = useState<string>("default");

  const filterOptions = [
    { value: "default", label: "기본" },
    { value: "recent", label: "최신순" },
    { value: "popular", label: "인기순" },
  ];

  const { images, isLoading, isError, sentinelRef } = usePicturesBinding();
  const items = useMemo(
    () =>
      images.map((src, i) => ({ id: i + 1, src, alt: `강아지 사진 ${i + 1}` })),
    [images]
  );

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
      <div className={styles.main} data-testid="pictures-list">
        {items.map((image, idx) => (
          <div key={`${image.id}-${idx}`} className={styles.imageItem}>
            <Image
              src={image.src}
              alt={image.alt}
              width={640}
              height={640}
              className={styles.image}
            />
          </div>
        ))}
        {isLoading && (
          <div className={styles.skeletonGrid} data-testid="skeletons">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeletonItem} />
            ))}
          </div>
        )}
        {isError && (
          <div data-testid="error">이미지를 불러오지 못했습니다.</div>
        )}
        <div
          ref={
            sentinelRef as unknown as
              | React.RefObject<HTMLDivElement>
              | undefined as any
          }
        />
      </div>
    </div>
  );
}
