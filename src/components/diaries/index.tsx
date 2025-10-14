"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import { EmotionType, emotions } from "@/commons/constants/enum";
import styles from "./styles.module.css";

// Mock 데이터 타입 정의
interface DiaryCard {
  id: number;
  emotion: EmotionType;
  date: string;
  title: string;
  image: string;
}

// Mock 데이터
const mockDiaries: DiaryCard[] = [
  {
    id: 1,
    emotion: EmotionType.Sad,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    image: "/images/emotion-sad-m.png",
  },
  {
    id: 2,
    emotion: EmotionType.Surprise,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-surprise-m.png",
  },
  {
    id: 3,
    emotion: EmotionType.Angry,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-angry-m.png",
  },
  {
    id: 4,
    emotion: EmotionType.Happy,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-happy-m.png",
  },
  {
    id: 5,
    emotion: EmotionType.Etc,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    image: "/images/emotion-etc-m.png",
  },
  {
    id: 6,
    emotion: EmotionType.Surprise,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-surprise-m.png",
  },
  {
    id: 7,
    emotion: EmotionType.Angry,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-angry-m.png",
  },
  {
    id: 8,
    emotion: EmotionType.Happy,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-happy-m.png",
  },
  {
    id: 9,
    emotion: EmotionType.Sad,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    image: "/images/emotion-sad-m.png",
  },
  {
    id: 10,
    emotion: EmotionType.Surprise,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-surprise-m.png",
  },
  {
    id: 11,
    emotion: EmotionType.Angry,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-angry-m.png",
  },
  {
    id: 12,
    emotion: EmotionType.Happy,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-happy-m.png",
  },
];

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

  const handleDeleteCard = (id: number) => {
    console.log("카드 삭제:", id);
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
      <div className={styles.main}>
        <div className={styles.cardGrid}>
          {mockDiaries.map((diary) => {
            const emotionData = emotions[diary.emotion];
            return (
              <div key={diary.id} className={styles.diaryCard}>
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={diary.image}
                    alt={diary.title}
                    fill
                    className={styles.cardImage}
                  />
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteCard(diary.id)}
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
                      style={{ color: emotionData.color }}>
                      {emotionData.label}
                    </span>
                    <span className={styles.date}>{diary.date}</span>
                  </div>
                  <div className={styles.cardTitle}>{diary.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* gap: 1168 * 40 */}
      <div className={styles.gap_middle_2}></div>

      {/* pagination: 1168 * 32 */}
      <div className={styles.pagination}>Pagination Area</div>

      {/* gap: 1168 * 40 */}
      <div className={styles.gap_bottom}></div>
    </div>
  );
}
