"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import styles from "./styles.module.css";
import { usePicturesBinding } from "./hooks/index.binding.hook";
import { useFilter, FilterType } from "./hooks/index.filter.hook";

export default function Pictures() {
  const { selectedFilter, filterOptions, imageSize, handleFilterChange } =
    useFilter();
  const { images, isLoading, isError, sentinelRef } = usePicturesBinding();

  const items = useMemo(
    () =>
      images.map((src, i) => ({ id: i + 1, src, alt: `강아지 사진 ${i + 1}` })),
    [images]
  );

  return (
    <div className={styles.container}>
      {/* gap: 100% * 32 */}
      <div className={styles.gap_top}></div>

      {/* filter: 100% * 48 */}
      <div className={styles.filter}>
        <Selectbox
          variant="primary"
          size="medium"
          theme="light"
          options={filterOptions}
          value={selectedFilter}
          onChange={(value) => handleFilterChange(value as FilterType)}
          className={styles.filter__selectbox}
          data-testid="filter-selectbox"
        />
      </div>

      {/* gap: 100% * 42 */}
      <div className={styles.gap_middle}></div>

      {/* main: 100% * auto */}
      <div className={styles.main} data-testid="pictures-list">
        {items.map((image, idx) => (
          <div
            key={`${image.id}-${idx}`}
            className={styles.imageItem}
            data-testid="image-container"
            data-filter={selectedFilter}>
            <Image
              src={image.src}
              alt={image.alt}
              width={imageSize.width}
              height={imageSize.height}
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
          ref={(node) => {
            if (node) sentinelRef(node);
          }}
        />
      </div>
    </div>
  );
}
