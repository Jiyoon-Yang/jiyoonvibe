"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

export const AuthSignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* header: 480 * auto */}
        <div className={styles.header}>
          <h1 className={styles.header__title}>회원가입</h1>
          <p className={styles.header__subtitle}>
            새로운 계정을 만들어 서비스를 이용해보세요
          </p>
        </div>

        {/* gap: 480 * 40 */}
        <div className={styles.gap_1}></div>

        {/* form: 480 * auto */}
        <form className={styles.form}>
          {/* input-email: full * auto */}
          <div className={styles.input_field}>
            <Input
              variant="primary"
              size="large"
              theme="light"
              label="이메일"
              type="email"
              placeholder="example@email.com"
              required
              fullWidth
            />
          </div>

          {/* gap: full * 24 */}
          <div className={styles.gap_2}></div>

          {/* input-password: full * auto */}
          <div className={styles.input_field}>
            <Input
              variant="primary"
              size="large"
              theme="light"
              label="비밀번호"
              type="password"
              placeholder="8자 이상 입력해주세요"
              required
              fullWidth
            />
          </div>

          {/* gap: full * 24 */}
          <div className={styles.gap_3}></div>

          {/* input-password-confirm: full * auto */}
          <div className={styles.input_field}>
            <Input
              variant="primary"
              size="large"
              theme="light"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              required
              fullWidth
            />
          </div>

          {/* gap: full * 24 */}
          <div className={styles.gap_4}></div>

          {/* input-name: full * auto */}
          <div className={styles.input_field}>
            <Input
              variant="primary"
              size="large"
              theme="light"
              label="이름"
              type="text"
              placeholder="이름을 입력해주세요"
              required
              fullWidth
            />
          </div>

          {/* gap: full * 32 */}
          <div className={styles.gap_5}></div>

          {/* submit-button: full * auto */}
          <div className={styles.submit_button}>
            <Button
              variant="primary"
              size="large"
              theme="light"
              fullWidth
              type="submit">
              회원가입
            </Button>
          </div>
        </form>

        {/* gap: 480 * 32 */}
        <div className={styles.gap_6}></div>

        {/* footer: 480 * auto */}
        <div className={styles.footer}>
          <p className={styles.footer__text}>
            이미 계정이 있으신가요?{" "}
            <Link href="/auth/login" className={styles.footer__link}>
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSignUp;
