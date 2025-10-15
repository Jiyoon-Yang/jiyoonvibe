"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { EmotionType, emotionList } from "@/commons/constants/enum";
import Image from "next/image";

export default function DiariesNew() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className={styles.wrapper}>
      {/* header: full * 24 */}
      <div className={styles.header}>
        <h1 className={styles.header__title}>일기 쓰기</h1>
      </div>

      {/* gap: full * 40 */}
      <div className={styles.gap_1}></div>

      {/* emotion-box: full * 64 */}
      <div className={styles.emotion_box}>
        <h2 className={styles.emotion_box__title}>오늘 기분은 어땠나요?</h2>
        <div className={styles.emotion_box__radios}>
          {emotionList.map((emotion) => (
            <label
              key={emotion.type}
              className={styles.emotion_box__radio_label}>
              <input
                type="radio"
                name="emotion"
                value={emotion.type}
                checked={selectedEmotion === emotion.type}
                onChange={() => setSelectedEmotion(emotion.type)}
                className={styles.emotion_box__radio_input}
              />
              <span
                className={`${styles.emotion_box__radio_custom} ${
                  selectedEmotion === emotion.type
                    ? styles.emotion_box__radio_custom__checked
                    : ""
                }`}>
                {selectedEmotion === emotion.type ? (
                  <Image
                    src="/icons/radio_fill_light_m.svg"
                    alt="selected"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/icons/radio_outline_light_m.svg"
                    alt="unselected"
                    width={24}
                    height={24}
                  />
                )}
              </span>
              <span className={styles.emotion_box__radio_text}>
                {emotion.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* gap: full * 40 */}
      <div className={styles.gap_2}></div>

      {/* input-title: full * 76 */}
      <div className={styles.input_title}>
        <Input
          variant="primary"
          theme="light"
          size="medium"
          label="제목"
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </div>

      {/* gap: full * 24 */}
      <div className={styles.gap_3}></div>

      {/* input-content: full * 156 */}
      <div className={styles.input_content}>
        <label className={styles.input_content__label}>내용</label>
        <textarea
          placeholder="내용을 입력해 주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.input_content__textarea}
        />
      </div>

      {/* gap: full * 40 */}
      <div className={styles.gap_4}></div>

      {/* footer: full * 48 */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          theme="light"
          size="medium"
          className={styles.footer__button_close}>
          닫기
        </Button>
        <Button
          variant="primary"
          theme="light"
          size="medium"
          disabled={!selectedEmotion || !title || !content}
          className={styles.footer__button_submit}>
          등록하기
        </Button>
      </div>
    </div>
  );
}
