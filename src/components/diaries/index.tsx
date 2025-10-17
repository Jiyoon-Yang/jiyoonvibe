"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import { emotions } from "@/commons/constants/enum";
import styles from "./styles.module.css";
import { useDiaryModal } from "./hooks/index.link.modal.hook";
import { useDiaryBinding } from "./hooks/index.binding.hook";
import { useDiaryRouting } from "./hooks/index.link.routing.hook";

export default function Diaries() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { openDiaryModal } = useDiaryModal();
  const { diaries, formatDate, getEmotionImage } = useDiaryBinding();
  const { handleCardClick } = useDiaryRouting();

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
    openDiaryModal();
  };

  const handleDeleteCard = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log("카드 삭제:", id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("페이지 변경:", page);
  };

  return (
    <div className={styles.container} data-testid="diaries-list">
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
          data-testid="write-diary-button"
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
      <div className={styles.main}>
        <div className={styles.cardGrid}>
          {diaries.map((diary) => {
            const emotionData = emotions[diary.emotion];
            const emotionImage = getEmotionImage(diary.emotion);
            const formattedDate = formatDate(diary.createdAt);
            return (
              <div
                key={diary.id}
                className={styles.diaryCard}
                data-testid="diary-card"
                onClick={() => handleCardClick(diary.id)}>
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={emotionImage}
                    alt={diary.title}
                    fill
                    className={styles.cardImage}
                  />
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDeleteCard(e, diary.id)}
                    aria-label="삭제">
                    <Image
                      src="/icons/close_outline_light_m.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span
                      className={styles.emotionLabel}
                      data-testid="emotion-label"
                      style={{ color: emotionData.color }}>
                      {emotionData.label}
                    </span>
                    <span className={styles.date} data-testid="card-date">
                      {formattedDate}
                    </span>
                  </div>
                  <div className={styles.cardTitle} data-testid="card-title">
                    {diary.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* gap: 1168 * 40 */}
      <div className={styles.gap_middle_2}></div>

      {/* pagination: 1168 * 32 */}
      <div className={styles.pagination}>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={currentPage}
          totalPages={5}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          previousIcon={
            <Image
              src="/icons/leftenable_outline_light_m.svg"
              alt=""
              width={24}
              height={24}
            />
          }
          nextIcon={
            <Image
              src="/icons/rightenable_outline_light_m.svg"
              alt=""
              width={24}
              height={24}
            />
          }
        />
      </div>

      {/* gap: 1168 * 40 */}
      <div className={styles.gap_bottom}></div>
    </div>
  );
}
