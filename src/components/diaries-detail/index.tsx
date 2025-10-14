"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { EmotionType, getEmotionData } from "@/commons/constants/enum";

// Mock 데이터
const mockDiaryData = {
  title: "이것은 타이틀 입니다.",
  emotion: EmotionType.Happy,
  date: "2024. 07. 12",
  content:
    "내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다",
  retrospects: [
    {
      id: 1,
      text: "3년이 지나고 다시 보니 이때가 그립다.",
      date: "2024. 09. 24",
    },
    {
      id: 2,
      text: "3년이 지나고 다시 보니 이때가 그립다.",
      date: "2024. 09. 24",
    },
  ],
};

export default function DiariesDetail() {
  const [retrospectInput, setRetrospectInput] = useState("");

  const emotionData = getEmotionData(mockDiaryData.emotion);
  // 감정 아이콘 경로: enum의 iconS를 /images 경로로 변환
  const emotionIconPath = emotionData.iconS
    .replace("/icons/", "/images/")
    .replace(".svg", ".png");

  const handleCopyContent = () => {
    navigator.clipboard.writeText(mockDiaryData.content);
  };

  const handleEdit = () => {
    console.log("수정 버튼 클릭");
  };

  const handleDelete = () => {
    console.log("삭제 버튼 클릭");
  };

  const handleAddRetrospect = () => {
    if (retrospectInput.trim()) {
      console.log("회고 추가:", retrospectInput);
      setRetrospectInput("");
    }
  };

  return (
    <div className={styles.container}>
      {/* gap: 1168 * 64 */}
      <div className={styles.gap_top}></div>

      {/* detail-title: 1168 * 84 */}
      <div className={styles.detail_title}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{mockDiaryData.title}</h1>
        </div>
        <div className={styles.emotionAndDateSection}>
          <div className={styles.emotionContainer}>
            <Image
              src={emotionIconPath}
              alt={emotionData.label}
              width={32}
              height={32}
              className={styles.emotionIcon}
            />
            <span
              className={styles.emotionText}
              style={{ color: emotionData.color }}>
              {emotionData.label}
            </span>
          </div>
          <div className={styles.dateContainer}>
            <span className={styles.dateText}>{mockDiaryData.date}</span>
            <span className={styles.dateLabel}>작성</span>
          </div>
        </div>
      </div>

      {/* gap: 1168 * 24 */}
      <div className={styles.gap_1}></div>

      {/* detail-content: 1168 * 169 */}
      <div className={styles.detail_content}>
        <div className={styles.contentSection}>
          <div className={styles.contentLabel}>내용</div>
          <p className={styles.contentText}>{mockDiaryData.content}</p>
        </div>
        <div className={styles.copySection}>
          <button className={styles.copyButton} onClick={handleCopyContent}>
            <Image
              src="/icons/copy_outline_light_m.svg"
              alt="복사"
              width={24}
              height={24}
            />
            <span className={styles.copyText}>내용 복사</span>
          </button>
        </div>
      </div>

      {/* gap: 1168 * 24 */}
      <div className={styles.gap_2}></div>

      {/* detail-footer: 1168 * 56 */}
      <div className={styles.detail_footer}>
        <Button
          variant="secondary"
          theme="light"
          size="medium"
          className={styles.footerButton}
          onClick={handleEdit}>
          수정
        </Button>
        <Button
          variant="secondary"
          theme="light"
          size="medium"
          className={styles.footerButton}
          onClick={handleDelete}>
          삭제
        </Button>
      </div>

      {/* gap: 1168 * 24 */}
      <div className={styles.gap_3}></div>

      {/* retrospect-input: 1168 * 85 */}
      <div className={styles.retrospect_input}>
        <div className={styles.retrospectLabel}>회고</div>
        <div className={styles.retrospectInputSection}>
          <Input
            variant="primary"
            theme="light"
            size="medium"
            placeholder="회고를 남겨보세요."
            value={retrospectInput}
            onChange={(e) => setRetrospectInput(e.target.value)}
            className={styles.retrospectInputField}
          />
          <Button
            variant="primary"
            theme="light"
            size="medium"
            className={styles.retrospectInputButton}
            onClick={handleAddRetrospect}>
            입력
          </Button>
        </div>
      </div>

      {/* gap: 1168 * 16 */}
      <div className={styles.gap_4}></div>

      {/* retrospect-list: 1168 * 72 */}
      <div className={styles.retrospect_list}>
        {mockDiaryData.retrospects.map((retrospect, index) => (
          <React.Fragment key={retrospect.id}>
            {index > 0 && <div className={styles.retrospectDivider}></div>}
            <div className={styles.retrospectItem}>
              <span className={styles.retrospectText}>{retrospect.text}</span>
              <span className={styles.retrospectDate}>[{retrospect.date}]</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* gap: 1168 * 64 */}
      <div className={styles.gap_bottom}></div>
    </div>
  );
}
