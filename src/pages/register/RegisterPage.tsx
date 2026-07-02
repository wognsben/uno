import { useState } from "react";

/* ==========================================================
   RegisterPage.tsx

   UNOTRAVEL Register Main Page

   사용 페이지
   - /register

   백엔드 연동
   ------------------------------------------
   register start       ← 기존 regis_agree.php 흐름 대응
   agreement            ← 약관 동의 페이지 이동
   login                ← 로그인 페이지 이동

   Header / Footer는 App.tsx 공통 컴포넌트 사용
========================================================== */

const REGISTER_IMAGE_URL = "/assets/login-architecture.jpg";

function navigateTo(path: string) {
  if (typeof window === "undefined") return;

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("unotravel:navigate"));
}

export default function RegisterPage() {
  const [notice, setNotice] = useState("");

  function handleStartRegister() {
    /*
      Register Start Hook
      ------------------------------------------
      실제 백엔드 연동 시 기존 regis_agree.php 또는 신규 약관 API와 연결한다.
      현재는 프론트 UI/동선 확인용으로 /register/agreement로 이동한다.
    */
    setNotice("회원가입 약관 확인 페이지로 이동합니다.");
    navigateTo("/register/agreement");
  }

  return (
    <main className="register-page-shell">
      <style>{STYLE}</style>

      <section className="register-page-inner" aria-label="우노트래블 회원가입 시작">
        <div className="register-content">
          <div className="register-kicker">BEGIN WITH UNO</div>

          <h1 className="register-title">REGISTER</h1>
          <span className="register-title-rule" aria-hidden="true" />

          <p className="register-description">
            우노트래블 회원가입을 시작합니다.
            <br />
            예약 내역과 문의 내역을 더 편하게 관리하세요.
          </p>

          <div className="register-step-card" aria-label="회원가입 진행 안내">
            <div className="register-step-index">01</div>
            <div>
              <strong>약관 확인</strong>
              <p>이용약관과 개인정보 수집 및 이용 안내를 확인합니다.</p>
            </div>
          </div>

          <div className="register-step-card" aria-label="회원정보 입력 안내">
            <div className="register-step-index">02</div>
            <div>
              <strong>회원정보 입력</strong>
              <p>이름, 이메일, 비밀번호 등 기본 정보를 입력합니다.</p>
            </div>
          </div>

          <button type="button" className="register-submit" onClick={handleStartRegister}>
            <span>다음</span>
            <span aria-hidden="true">→</span>
          </button>

          {notice && (
            <p className="register-notice" role="status" aria-live="polite">
              {notice}
            </p>
          )}

          <nav className="register-link-row" aria-label="회원가입 보조 링크">
            <span>이미 회원이신가요?</span>
            <button type="button" onClick={() => navigateTo("/login")}>
              로그인
            </button>
          </nav>
        </div>

        <aside className="register-visual" aria-label="우노트래블 회원가입 비주얼">
          <div
            className="register-visual-image"
            style={{ backgroundImage: `url(${REGISTER_IMAGE_URL})` }}
          />
          <div className="register-visual-gradient" aria-hidden="true" />
          <p className="register-visual-copy">
            Your travel archive
            <br />
            starts with <span>UNO.</span>
          </p>
        </aside>
      </section>
    </main>
  );
}

const STYLE = `
  .register-page-shell {
    width: 100%;
    min-width: 1024px;
    min-height: calc(100vh - 110px);
    background: #ffffff;
    color: #151515;
    overflow-x: hidden;
  }

  .register-page-inner {
    width: 100%;
    min-height: 820px;
    padding: 138px 50px 38px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(420px, 560px) minmax(520px, 1fr);
    gap: 96px;
    align-items: stretch;
  }

  .register-content {
    width: 100%;
    max-width: 560px;
    align-self: center;
    padding-left: 28px;
    box-sizing: border-box;
  }

  .register-kicker {
    margin-bottom: 18px;
    font-family: var(--font-en);
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.22em;
    color: #f5b800;
  }

  .register-title {
    margin: 0;
    font-family: "Times New Roman", var(--font-en);
    font-size: 104px;
    font-weight: 400;
    line-height: 0.84;
    letter-spacing: -0.06em;
    color: #151515;
  }

  .register-title-rule {
    display: block;
    width: 34px;
    height: 2px;
    margin: 38px 0 28px;
    background: rgba(21, 21, 21, 0.72);
  }

  .register-description {
    margin: 0 0 42px;
    font-family: var(--font-ko);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.62;
    letter-spacing: -0.045em;
    color: rgba(21, 21, 21, 0.78);
    word-break: keep-all;
  }

  .register-step-card {
    min-height: 86px;
    border: 1px solid rgba(21, 21, 21, 0.13);
    background: linear-gradient(90deg, rgba(252, 200, 0, 0.08), rgba(255, 255, 255, 1));
    display: grid;
    grid-template-columns: 52px 1fr;
    gap: 18px;
    align-items: center;
    padding: 18px 20px;
    box-sizing: border-box;
  }

  .register-step-card + .register-step-card {
    margin-top: 10px;
  }

  .register-step-index {
    font-family: var(--font-en);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: rgba(21, 21, 21, 0.46);
  }

  .register-step-card strong {
    display: block;
    font-family: var(--font-ko);
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.045em;
    color: #151515;
  }

  .register-step-card p {
    margin: 6px 0 0;
    font-family: var(--font-ko);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.45;
    letter-spacing: -0.04em;
    color: rgba(21, 21, 21, 0.56);
    word-break: keep-all;
  }

  .register-submit {
    width: 100%;
    height: 58px;
    margin-top: 28px;
    border: none;
    background: #fcc800;
    color: #151515;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 0 28px;
    box-sizing: border-box;
    font-family: var(--font-ko);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.035em;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }

  .register-submit:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 42px rgba(252, 200, 0, 0.2);
  }

  .register-notice {
    margin: 16px 0 0;
    font-family: var(--font-ko);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: rgba(21, 21, 21, 0.58);
  }

  .register-link-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 30px;
    font-family: var(--font-ko);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: rgba(21, 21, 21, 0.58);
  }

  .register-link-row button {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    font-family: var(--font-en);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #151515;
  }

  .register-visual {
    position: relative;
    min-height: 720px;
    overflow: hidden;
    background: #f3f1ed;
  }

  .register-visual-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: saturate(0.78) contrast(1.04);
    transform: scale(1.018);
    animation: registerVisualDrift 16s ease-in-out infinite alternate;
  }

  .register-visual-image::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(255,255,255,0) 45%, rgba(21,21,21,0.18) 100%),
      linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  }

  .register-visual-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 24% 18%, rgba(255,255,255,0.22), transparent 34%);
    pointer-events: none;
  }

  .register-visual-copy {
    position: absolute;
    left: 38px;
    bottom: 38px;
    margin: 0;
    font-family: "Times New Roman", var(--font-en);
    font-size: 27px;
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.045em;
    color: #ffffff;
    text-shadow: 0 14px 36px rgba(0, 0, 0, 0.18);
  }

  .register-visual-copy span {
    color: #fcc800;
  }

  @keyframes registerVisualDrift {
    from {
      transform: scale(1.018) translate3d(0, 0, 0);
    }
    to {
      transform: scale(1.045) translate3d(-8px, -6px, 0);
    }
  }

  @media (max-width: 1180px) {
    .register-page-inner {
      gap: 54px;
      grid-template-columns: minmax(420px, 520px) minmax(420px, 1fr);
    }

    .register-title {
      font-size: 86px;
    }
  }
`;
