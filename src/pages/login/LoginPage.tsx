import { useState } from "react";

/* ==========================================================
   LoginPage.tsx

   UNOTRAVEL Login Page

   사용 페이지
   - /login

   백엔드 연동
   ------------------------------------------
   email/password login  ← 기존 회원 로그인
   social login          ← Google / Kakao / Naver OAuth 연결 예정
   register              ← 회원가입 페이지 이동 예정
   find password          ← 비밀번호 찾기 페이지 이동 예정

   Header / Footer는 App.tsx 공통 컴포넌트 사용
========================================================== */

type SocialProvider = "google" | "kakao" | "naver";

const LOGIN_IMAGE_URL = "/assets/login-architecture.jpg";

function navigateTo(path: string) {
  if (typeof window === "undefined") return;

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("unotravel:navigate"));
}

const SOCIAL_PROVIDER_LABEL: Record<SocialProvider, string> = {
  google: "Google",
  kakao: "Kakao",
  naver: "Naver",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [socialNotice, setSocialNotice] = useState("");

  function handleSocialLogin(provider: SocialProvider) {
    /*
      Social Login Backend Hook
      ------------------------------------------
      실제 백엔드 연동 시 provider별 OAuth endpoint로 교체한다.

      예)
      - /auth/google
      - /auth/kakao
      - /auth/naver

      현재는 프론트 UI/동선 확인용 placeholder다.
    */
    console.log(`[UNOTRAVEL] social login requested: ${provider}`);
    setSocialNotice(`${SOCIAL_PROVIDER_LABEL[provider]} 로그인은 현재 준비 중입니다.`);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
      Email Login Backend Hook
      ------------------------------------------
      실제 백엔드 연동 시 이 위치에서 로그인 API를 호출한다.
      현재는 UI/동선 확인용 placeholder다.
    */
    console.log("[UNOTRAVEL] login requested", {
      email,
    });

    /*
      Temporary Front Auth
      ------------------------------------------
      실제 세션 로그인 연동 전까지 프론트 동선 확인용으로만 사용한다.
      localStorage가 아닌 sessionStorage를 사용해 브라우저 세션 종료 시 초기화된다.
    */
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("unotravel:auth", "true");
      window.dispatchEvent(new Event("unotravel:auth-change"));
    }

    navigateTo("/");
  }

  return (
    <main className="login-page-shell">
      <style>{STYLE}</style>

      <section className="login-page-inner" aria-label="우노트래블 로그인">
        <div className="login-content">
          <div className="login-kicker">CONTINUE YOUR JOURNEY</div>

          <h1 className="login-title">LOGIN</h1>
          <span className="login-title-rule" aria-hidden="true" />

          <p className="login-description">
            우노트래블 회원 전용 페이지입니다.
            <br />
            예약 내역과 문의 내역을 확인하세요.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>이메일 주소</span>
              <input
                type="email"
                value={email}
                placeholder="이메일을 입력하세요."
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="login-field">
              <span>비밀번호</span>
              <div className="login-password-wrap">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  placeholder="비밀번호를 입력하세요."
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className={`login-password-toggle ${isPasswordVisible ? "is-visible" : ""}`}
                  aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? "HIDE" : "VIEW"}
                </button>
              </div>
            </label>


            <button
              type="submit"
              className="login-submit"
            >
              <span>LOGIN</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="login-divider">
            <span />
            <strong>OR</strong>
            <span />
          </div>

          <div className="login-social-list" aria-label="SNS 로그인">
            <button type="button" onClick={() => handleSocialLogin("google")}>
              <span className="login-social-icon is-google">G</span>
              <span>Google로 로그인</span>
              <span aria-hidden="true">→</span>
            </button>

            <button type="button" onClick={() => handleSocialLogin("kakao")}>
              <span className="login-social-icon is-kakao">K</span>
              <span>Kakao로 로그인</span>
              <span aria-hidden="true">→</span>
            </button>

            <button type="button" onClick={() => handleSocialLogin("naver")}>
              <span className="login-social-icon is-naver">N</span>
              <span>Naver로 로그인</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {socialNotice && (
            <p className="login-social-notice" role="status" aria-live="polite">
              {socialNotice}
            </p>
          )}

          <nav className="login-link-row" aria-label="로그인 보조 링크">
            <button type="button" onClick={() => navigateTo("/find-password")}>
              비밀번호 찾기
            </button>
            <span aria-hidden="true" />
            <button type="button" onClick={() => navigateTo("/register")}>
              회원가입
            </button>
          </nav>
        </div>

        <aside className="login-visual" aria-label="우노트래블 로그인 비주얼">
          <div
            className="login-visual-image"
            style={{ backgroundImage: `url(${LOGIN_IMAGE_URL})` }}
          />
          <div className="login-visual-gradient" aria-hidden="true" />
          <p className="login-visual-copy">
            Every journey
            <br />
            begins with <span>UNO.</span>
          </p>
        </aside>
      </section>
    </main>
  );
}

const STYLE = `
  .login-page-shell {
    width: 100%;
    min-width: 1024px;
    min-height: calc(100vh - 110px);
    background: #ffffff;
    color: #151515;
    overflow-x: hidden;
  }

  .login-page-inner {
    width: 100%;
    min-height: 820px;
    padding: 138px 50px 38px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(420px, 560px) minmax(520px, 1fr);
    gap: 96px;
    align-items: stretch;
    background:
      radial-gradient(circle at 8% 16%, rgba(252, 200, 0, 0.055), transparent 28%),
      linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
  }

  .login-content {
    width: 100%;
    max-width: 560px;
    align-self: center;
    padding: 34px 0 34px 28px;
    box-sizing: border-box;
  }

  .login-kicker {
    width: fit-content;
    margin-bottom: 20px;
    border: 1px solid rgba(21, 21, 21, 0.1);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    padding: 9px 12px 8px;
    font-family: var(--font-en);
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.18em;
    color: #b58c00;
  }

  .login-title {
    margin: 0;
    font-family: "Times New Roman", var(--font-en);
    font-size: 112px;
    font-weight: 400;
    line-height: 0.82;
    letter-spacing: -0.06em;
    color: #111111;
  }

  .login-title-rule {
    display: block;
    width: 52px;
    height: 1px;
    margin: 40px 0 28px;
    background: linear-gradient(90deg, #151515, rgba(21, 21, 21, 0.12));
  }

  .login-description {
    margin: 0 0 46px;
    font-family: var(--font-ko);
    font-size: 17px;
    font-weight: 600;
    line-height: 1.68;
    letter-spacing: -0.045em;
    color: rgba(21, 21, 21, 0.72);
    word-break: keep-all;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .login-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: var(--font-ko);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #151515;
  }

  .login-field input {
    width: 100%;
    height: 54px;
    border: 1px solid rgba(21, 21, 21, 0.14);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.86);
    padding: 0 18px;
    box-sizing: border-box;
    font-family: var(--font-ko);
    font-size: 14px;
    font-weight: 600;
    color: #151515;
    outline: none;
    transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
  }

  .login-field input::placeholder {
    color: rgba(21, 21, 21, 0.34);
  }

  .login-field input:focus {
    border-color: rgba(21, 21, 21, 0.44);
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(252, 200, 0, 0.13);
  }

  .login-password-wrap {
    position: relative;
  }

  .login-password-toggle {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    font-family: var(--font-en);
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.14em;
    color: rgba(21, 21, 21, 0.48);
    transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  }

  .login-password-toggle:hover {
    color: #151515;
    opacity: 1;
    transform: translateY(-50%) translateX(1px);
  }

  .login-password-toggle.is-visible:hover {
    animation: loginPasswordVisiblePulse 1.35s ease-in-out infinite;
  }

  @keyframes loginPasswordVisiblePulse {
    0%, 100% {
      opacity: 1;
      letter-spacing: 0.14em;
    }
    42% {
      opacity: 0.42;
      letter-spacing: 0.19em;
    }
    64% {
      opacity: 1;
      letter-spacing: 0.14em;
    }
  }

  .login-submit {
    width: 100%;
    height: 58px;
    margin-top: 4px;
    border: none;
    border-radius: 18px;
    background: #fcc800;
    color: #151515;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 0 28px;
    box-sizing: border-box;
    font-family: var(--font-en);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.22s ease, background 0.22s ease;
  }

  .login-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 18px 42px rgba(252, 200, 0, 0.22);
  }

  .login-submit:disabled {
    cursor: not-allowed;
    opacity: 0.52;
  }

  .login-divider {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 22px;
    margin: 30px 0 24px;
    font-family: var(--font-en);
    font-size: 12px;
    font-weight: 700;
    color: rgba(21, 21, 21, 0.7);
  }

  .login-divider span {
    height: 1px;
    background: rgba(21, 21, 21, 0.14);
  }

  .login-social-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .login-social-list button {
    width: 100%;
    height: 52px;
    border: 1px solid rgba(21, 21, 21, 0.13);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.78);
    cursor: pointer;
    display: grid;
    grid-template-columns: 42px 1fr auto;
    align-items: center;
    padding: 0 18px;
    box-sizing: border-box;
    font-family: var(--font-ko);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #151515;
    transition: background 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
  }

  .login-social-list button:hover {
    background: rgba(21, 21, 21, 0.025);
    border-color: rgba(21, 21, 21, 0.26);
    transform: translateY(-1px);
  }

  .login-social-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    font-size: 15px;
    font-weight: 800;
  }

  .login-social-icon.is-google {
    color: #4285f4;
    background: #ffffff;
  }

  .login-social-icon.is-kakao {
    color: #151515;
    background: #fee500;
  }

  .login-social-icon.is-naver {
    color: #ffffff;
    background: #03c75a;
  }

  .login-social-notice {
    margin: 14px 0 0;
    border: 1px solid rgba(21, 21, 21, 0.1);
    border-radius: 14px;
    background: rgba(252, 200, 0, 0.08);
    padding: 13px 15px;
    box-sizing: border-box;
    font-family: var(--font-ko);
    font-size: 13px;
    font-weight: 700;
    line-height: 1.45;
    letter-spacing: -0.04em;
    color: rgba(21, 21, 21, 0.72);
    animation: loginSocialNoticeIn 0.22s ease both;
  }

  @keyframes loginSocialNoticeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login-link-row {
    display: flex;
    align-items: center;
    gap: 28px;
    margin: 34px 0 28px;
  }

  .login-link-row button {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    font-family: var(--font-ko);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #151515;
  }

  .login-link-row span {
    width: 1px;
    height: 18px;
    background: rgba(21, 21, 21, 0.28);
  }






  .login-visual {
    position: relative;
    min-height: 720px;
    overflow: hidden;
    border-radius: 34px;
    background: #f3f1ed;
    isolation: isolate;
  }

  .login-visual-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: saturate(0.78) contrast(1.04);
    transform: scale(1.018);
    animation: loginVisualDrift 16s ease-in-out infinite alternate;
  }

  .login-visual-image::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(255,255,255,0) 44%, rgba(12,12,12,0.24) 100%),
      linear-gradient(90deg, rgba(255,255,255,0.16), rgba(255,255,255,0));
  }

  .login-visual-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 24% 18%, rgba(255,255,255,0.22), transparent 34%);
    pointer-events: none;
  }

  .login-visual-copy {
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

  .login-visual-copy span {
    color: #fcc800;
  }

  @keyframes loginVisualDrift {
    from {
      transform: scale(1.018) translate3d(0, 0, 0);
    }
    to {
      transform: scale(1.045) translate3d(-8px, -6px, 0);
    }
  }

  @media (max-width: 1180px) {
    .login-page-inner {
      gap: 54px;
      grid-template-columns: minmax(420px, 520px) minmax(420px, 1fr);
    }

    .login-title {
      font-size: 96px;
    }
  }
`;
