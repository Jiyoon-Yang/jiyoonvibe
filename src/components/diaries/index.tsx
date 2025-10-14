"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

export default function Diaries() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");

  const filterOptions = [
    { value: "all", label: "전체" },
    { value: "happy", label: "행복" },
    { value: "sad", label: "슬픔" },
    { value: "angry", label: "화남" },
    { value: "surprise", label: "놀람" },
    { value: "etc", label: "기타" },
  ];

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  const handleSearch = (value: string) => {
    console.log("검색:", value);
  };

  const handleNewDiary = () => {
    console.log("일기쓰기 클릭");
  };

  return (
    <div className={styles.container}>
      {/* gap: 1168 * 32 */}
      <div className={styles.gap_top}></div>

      {/* search: 1168 * 48 */}
      <div className={styles.search}>
        <div className={styles.search__left}>
          <Selectbox
            variant="primary"
            size="medium"
            theme="light"
            options={filterOptions}
            value={selectedFilter}
            onChange={handleFilterChange}
            className={styles.search__selectbox}
          />
          <Searchbar
            variant="primary"
            size="medium"
            theme="light"
            placeholder="검색어를 입력해 주세요."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            className={styles.search__searchbar}
          />
        </div>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          onClick={handleNewDiary}
          iconLeft={
            <Image
              src="/icons/plus_outline_light_m.svg"
              alt=""
              width={24}
              height={24}
            />
          }
          className={styles.search__button}>
          일기쓰기
        </Button>
      </div>

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
