"use client";

import React, { useState, useEffect } from "react";
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
import { useDiarySearch } from "./hooks/index.search.hook";
import { useDiaryFilter, FilterType } from "./hooks/index.filter.hook";
import { useDiaryPagination } from "./hooks/index.pagination.hook";

export default function Diaries() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { openDiaryModal } = useDiaryModal();
  const { diaries, formatDate, getEmotionImage } = useDiaryBinding();
  const { handleCardClick } = useDiaryRouting();
  const { searchQuery, handleSearch } = useDiarySearch(diaries);
  const {
    selectedFilter,
    filterOptions,
    handleFilterChange,
    getFilteredDiaries,
  } = useDiaryFilter(diaries);

  const handleSearchSubmit = (value: string) => {
    handleSearch(value);
  };

  // 검색과 필터를 통합하여 표시할 일기 목록 생성
  const getFinalDisplayDiaries = () => {
    const filteredDiaries = getFilteredDiaries();
    return searchQuery.trim()
      ? filteredDiaries.filter((diary) =>
          diary.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
        )
      : filteredDiaries;
  };

  // 페이지네이션 적용
  const finalDisplayDiaries = getFinalDisplayDiaries();
  const { totalPages, paginatedDiaries } = useDiaryPagination(
    finalDisplayDiaries,
    currentPage
  );

  // 검색 또는 필터 변경 시 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter]);

  const handleNewDiary = () => {
    openDiaryModal();
  };

  const handleDeleteCard = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log("카드 삭제:", id);
  };

  const handlePageChangeWrapper = (page: number) => {
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
            options={filterOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            value={selectedFilter}
            onChange={(value: string) =>
              handleFilterChange(value as FilterType)
            }
            className={styles.search__selectbox}
            data-testid="filter-selectbox"
          />
          <Searchbar
            variant="primary"
            size="medium"
            theme="light"
            placeholder="검색어를 입력해 주세요."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearchSubmit}
            className={styles.search__searchbar}
            data-testid="search-input"
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
          {paginatedDiaries.map((diary) => {
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
                      width={40}
                      height={40}
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
          totalPages={totalPages}
          pageRangeDisplayed={5}
          onPageChange={handlePageChangeWrapper}
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
