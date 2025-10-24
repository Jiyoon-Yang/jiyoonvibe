"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { getEmotionData } from "@/commons/constants/enum";
import { useDiaryDetailBinding } from "./hooks/index.binding.hook";

interface DiariesDetailProps {
  id: string;
}

export default function DiariesDetail({ id }: DiariesDetailProps) {
  const [retrospectInput, setRetrospectInput] = useState("");
  const { diary, formatDate, getEmotionIconPath } = useDiaryDetailBinding(id);

  const handleCopyContent = () => {
    if (diary) {
      navigator.clipboard.writeText(diary.content);
    }
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

  // 일기가 없는 경우 빈 컨테이너 반환
  if (!diary) {
    return <div data-testid="diary-detail" className={styles.container}></div>;
  }

  const emotionData = getEmotionData(diary.emotion);
  const emotionIconPath = getEmotionIconPath(diary.emotion);

  return (
    <div data-testid="diary-detail" className={styles.container}>
      {/* gap: 1168 * 64 */}
      <div className={styles.gap_top}></div>

      {/* detail-title: 1168 * 84 */}
      <div className={styles.detail_title}>
        <div className={styles.titleSection}>
          <h1 data-testid="detail-title" className={styles.title}>
            {diary.title}
          </h1>
        </div>
        <div className={styles.emotionAndDateSection}>
          <div className={styles.emotionContainer}>
            <Image
              data-testid="emotion-icon"
              src={emotionIconPath}
              alt={emotionData.label}
              width={32}
              height={32}
              className={styles.emotionIcon}
            />
            <span
              data-testid="emotion-text"
              className={styles.emotionText}
              style={{ color: emotionData.color }}>
              {emotionData.label}
            </span>
          </div>
          <div className={styles.dateContainer}>
            <span data-testid="detail-date" className={styles.dateText}>
              {formatDate(diary.createdAt)}
            </span>
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
          <p data-testid="detail-content" className={styles.contentText}>
            {diary.content}
          </p>
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
        <div className={styles.retrospectItem}>
          <span className={styles.retrospectText}>
            오늘 하루도 수고했어요. 내일은 더 좋은 하루가 될 거예요.
          </span>
          <span className={styles.retrospectDate}>2024.01.15</span>
        </div>
        <div className={styles.retrospectDivider}></div>
        <div className={styles.retrospectItem}>
          <span className={styles.retrospectText}>
            이번 주는 정말 힘들었지만, 끝까지 포기하지 않아서 뿌듯해요.
          </span>
          <span className={styles.retrospectDate}>2024.01.14</span>
        </div>
      </div>

      {/* gap: 1168 * 64 */}
      <div className={styles.gap_bottom}></div>
    </div>
  );
}
