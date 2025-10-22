"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

export const AuthLogin = () => {
  return (
    <div className={styles.container} data-testid="login-page">
      <div className={styles.card}>
        {/* header: 480 * auto */}
        <div className={styles.header}>
          <h1 className={styles.header__title}>로그인</h1>
          <p className={styles.header__subtitle}>
            계정에 로그인하여 서비스를 이용해보세요
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
              placeholder="비밀번호를 입력해주세요"
              required
              fullWidth
            />
          </div>

          {/* gap: full * 32 */}
          <div className={styles.gap_3}></div>

          {/* submit-button: full * auto */}
          <div className={styles.submit_button}>
            <Button
              variant="primary"
              size="large"
              theme="light"
              fullWidth
              type="submit">
              로그인
            </Button>
          </div>
        </form>

        {/* gap: 480 * 32 */}
        <div className={styles.gap_4}></div>

        {/* footer: 480 * auto */}
        <div className={styles.footer}>
          <p className={styles.footer__text}>
            계정이 없으신가요?{" "}
            <Link href="/auth/signup" className={styles.footer__link}>
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
