"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { getEmotionData } from "@/commons/constants/enum";
import { useDiaryDetailBinding } from "./hooks/index.binding.hook";
import { useRetrospectBinding } from "./hooks/index.retrospect.binding.hook";
import { useRetrospectForm } from "./hooks/index.retrospect.form.hook";
import { useUpdateForm } from "./hooks/index.update.hook";
import { Controller } from "react-hook-form";
import { emotionList } from "@/commons/constants/enum";

interface DiariesDetailProps {
  id: string;
}

export default function DiariesDetail({ id }: DiariesDetailProps) {
  const { diary, formatDate, getEmotionIconPath } = useDiaryDetailBinding(id);
  const { retrospects, formatDate: formatRetrospectDate } =
    useRetrospectBinding(Number(id));
  const { control, handleSubmit, formState, onSubmit } = useRetrospectForm(
    Number(id)
  );
  const {
    isEditing,
    isSubmitting,
    control: updateControl,
    handleSubmit: handleUpdateFormSubmit,
    formState: updateFormState,
    startEdit,
    cancelEdit,
    submitUpdate,
  } = useUpdateForm(Number(id));

  const handleCopyContent = () => {
    if (diary) {
      navigator.clipboard.writeText(diary.content);
    }
  };

  const handleEdit = () => {
    if (diary) {
      startEdit(diary);
    }
  };

  const handleDelete = () => {
    console.log("삭제 버튼 클릭");
  };

  const handleAddRetrospect = handleSubmit(onSubmit);
  const handleUpdateSubmit = handleUpdateFormSubmit(submitUpdate);

  // 일기가 없는 경우 빈 컨테이너 반환
  if (!diary) {
    return <div data-testid="diary-detail" className={styles.container}></div>;
  }

  const emotionData = getEmotionData(diary.emotion);
  const emotionIconPath = getEmotionIconPath(diary.emotion);

  // 수정 모드일 때의 UI
  if (isEditing) {
    return (
      <div data-testid="diary-detail" className={styles.container}>
        {/* gap: 1168 * 64 */}
        <div className={styles.gap_top}></div>

        {/* 기분 선택 영역 */}
        <div className={styles.emotion_selection}>
          <div className={styles.emotion_selection_title}>
            오늘 기분은 어땟나요?
          </div>
          <div className={styles.emotion_radio_group}>
            {emotionList.map((emotion) => (
              <Controller
                key={emotion.type}
                name="emotion"
                control={updateControl}
                render={({ field }) => (
                  <label className={styles.emotion_radio_item}>
                    <input
                      type="radio"
                      {...field}
                      value={emotion.type}
                      checked={field.value === emotion.type}
                      className={styles.emotion_radio_input}
                    />
                    <span className={styles.emotion_radio_label}>
                      {emotion.label}
                    </span>
                  </label>
                )}
              />
            ))}
          </div>
        </div>

        {/* 제목 입력 */}
        <div className={styles.title_input_section}>
          <div className={styles.input_label}>제목</div>
          <Controller
            name="title"
            control={updateControl}
            render={({ field }) => (
              <Input
                {...field}
                variant="primary"
                theme="light"
                size="medium"
                placeholder="제목을 입력하세요"
                className={styles.title_input}
              />
            )}
          />
        </div>

        {/* 내용 입력 */}
        <div className={styles.content_input_section}>
          <div className={styles.input_label}>내용</div>
          <Controller
            name="content"
            control={updateControl}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="내용을 입력하세요"
                className={styles.content_textarea}
                rows={6}
              />
            )}
          />
        </div>

        {/* 버튼 영역 */}
        <div className={styles.update_button_section}>
          <Button
            variant="secondary"
            theme="light"
            size="medium"
            className={styles.cancel_button}
            onClick={cancelEdit}>
            취소
          </Button>
          <Button
            variant="primary"
            theme="light"
            size="medium"
            className={styles.submit_button}
            onClick={handleUpdateSubmit}
            disabled={!updateFormState.isValid || isSubmitting}>
            수정 하기
          </Button>
        </div>

        {/* 회고 영역 (수정 중일 때 비활성화) */}
        <div className={styles.retrospect_input}>
          <div className={styles.retrospectLabel}>회고</div>
          <div className={styles.retrospectInputSection}>
            <Input
              variant="primary"
              theme="light"
              size="medium"
              placeholder="수정중일땐 회고를 작성할 수 없어요."
              className={styles.retrospectInputField}
              data-testid="retrospect-input-field"
              disabled
            />
            <Button
              variant="primary"
              theme="light"
              size="medium"
              className={styles.retrospectInputButton}
              data-testid="retrospect-input-button"
              disabled>
              입력
            </Button>
          </div>
        </div>

        {/* gap: 1168 * 16 */}
        <div className={styles.gap_4}></div>

        {/* retrospect-list: 1168 * 72 */}
        <div className={styles.retrospect_list} data-testid="retrospect-list">
          {retrospects.length > 0 ? (
            retrospects.map((retrospect, index) => (
              <div key={retrospect.id}>
                <div
                  className={styles.retrospectItem}
                  data-testid="retrospect-item">
                  <span
                    className={styles.retrospectText}
                    data-testid="retrospect-text">
                    {retrospect.content}
                  </span>
                  <span
                    className={styles.retrospectDate}
                    data-testid="retrospect-date">
                    {formatRetrospectDate(retrospect.createdAt)}
                  </span>
                </div>
                {index < retrospects.length - 1 && (
                  <div className={styles.retrospectDivider}></div>
                )}
              </div>
            ))
          ) : (
            <div
              className={styles.retrospectItem}
              data-testid="retrospect-item">
              <span
                className={styles.retrospectText}
                data-testid="retrospect-text">
                아직 등록된 회고가 없습니다.
              </span>
            </div>
          )}
        </div>

        {/* gap: 1168 * 64 */}
        <div className={styles.gap_bottom}></div>
      </div>
    );
  }

  // 일반 모드일 때의 UI
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
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                variant="primary"
                theme="light"
                size="medium"
                placeholder="회고를 남겨보세요."
                className={styles.retrospectInputField}
                data-testid="retrospect-input-field"
              />
            )}
          />
          <Button
            variant="primary"
            theme="light"
            size="medium"
            className={styles.retrospectInputButton}
            onClick={handleAddRetrospect}
            disabled={!formState.isValid}
            data-testid="retrospect-input-button">
            입력
          </Button>
        </div>
      </div>

      {/* gap: 1168 * 16 */}
      <div className={styles.gap_4}></div>

      {/* retrospect-list: 1168 * 72 */}
      <div className={styles.retrospect_list} data-testid="retrospect-list">
        {retrospects.length > 0 ? (
          retrospects.map((retrospect, index) => (
            <div key={retrospect.id}>
              <div
                className={styles.retrospectItem}
                data-testid="retrospect-item">
                <span
                  className={styles.retrospectText}
                  data-testid="retrospect-text">
                  {retrospect.content}
                </span>
                <span
                  className={styles.retrospectDate}
                  data-testid="retrospect-date">
                  {formatRetrospectDate(retrospect.createdAt)}
                </span>
              </div>
              {index < retrospects.length - 1 && (
                <div className={styles.retrospectDivider}></div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.retrospectItem} data-testid="retrospect-item">
            <span
              className={styles.retrospectText}
              data-testid="retrospect-text">
              아직 등록된 회고가 없습니다.
            </span>
          </div>
        )}
      </div>

      {/* gap: 1168 * 64 */}
      <div className={styles.gap_bottom}></div>
    </div>
  );
}
