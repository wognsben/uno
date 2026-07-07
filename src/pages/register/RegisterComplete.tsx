import { useEffect, useState } from "react";
import loadingMark from "./Register_tools/3 Body Loading.mp4";

/* ==========================================================
   RegisterComplete.tsx

   UNOTRAVEL Register Complete Page

   사용 페이지
   - /register/complete

   백엔드 연동
   ------------------------------------------
   register complete     ← 회원가입 완료 안내
   auto login            ← 회원가입 완료 후 세션 생성 예정
   redirect              ← 완료 안내 후 메인페이지 자동 이동

   Header / Footer는 App.tsx에서 /register 계열 진입 시 숨김 처리 권장
========================================================== */

function navigateTo(path: string) {
  if (typeof window === "undefined") return;

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("unotravel:navigate"));
}

export default function RegisterComplete() {
  const [countdown, setCountdown] = useState(3);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    /*
      Register Complete Temporary Auth Hook
      ------------------------------------------
      실제 백엔드 연동 시 회원가입 API 성공 응답에서 Session을 생성한다.
      현재는 Header 로그인 상태 전환 확인용 placeholder다.
    */
    sessionStorage.setItem(
      "unotravel_auth",
      JSON.stringify({
        isLoggedIn: true,
        name: "회원",
        source: "register",
      })
    );

    window.dispatchEvent(new Event("unotravel:auth-change"));

const countdownTimer1 = window.setTimeout(() => {
  setCountdown(2);
}, 1000);

const countdownTimer2 = window.setTimeout(() => {
  setCountdown(1);
}, 2000);

const fadeTimer = window.setTimeout(() => {
  setIsLeaving(true);
}, 2800);

const redirectTimer = window.setTimeout(() => {
  navigateTo("/");
}, 3000);

return () => {
  window.clearTimeout(countdownTimer1);
  window.clearTimeout(countdownTimer2);
  window.clearTimeout(fadeTimer);
  window.clearTimeout(redirectTimer);
};
  }, []);

  return (
    <main className={`register-complete-shell ${isLeaving ? "is-leaving" : ""}`}>
      <style>{STYLE}</style>

      <section className="register-complete-inner" aria-label="우노트래블 회원가입 완료">
        <div className="register-complete-content">
          <video
            className="register-complete-mark"
            src={loadingMark}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />

          <h1 className="register-complete-title">계정이 생성되었습니다.</h1>

          <p className="register-complete-description">곧 메인페이지로 이동합니다.</p>

          <div className="register-complete-count" aria-label={`${countdown}초 후 메인페이지로 이동`}>
            <span key={countdown}>{countdown}</span>
          </div>

          <button type="button" className="register-complete-home" onClick={() => navigateTo("/")}>
            <span>메인으로 이동</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}

const STYLE = `
  .register-complete-shell {
    width: 100%;
    min-width: 1024px;
    min-height: 100vh;
    background: #ffffff;
    color: #111111;
    overflow: hidden;
    transition: opacity 0.2s ease;
  }

  .register-complete-shell.is-leaving {
    opacity: 0;
  }

  .register-complete-inner {
    width: 100%;
    min-height: 100vh;
    padding: 14px;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    background: #ffffff;
  }

  .register-complete-content {
    width: min(100%, 720px);
    min-height: calc(100vh - 28px);
    display: grid;
    grid-template-rows: 1fr auto auto auto auto 1fr;
    justify-items: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    padding: 80px 40px;
  }

  .register-complete-mark {
  grid-row: 2;
  width: 72px;
  height: 72px;
  display: block;
  object-fit: contain;
  transform-origin: center;
  animation: completeMarkIn 0.48s ease both;
}

  .register-complete-title {
    grid-row: 3;
    margin: 42px 0 0;
    font-family: var(--font-ko);
    font-size: clamp(42px, 4.4vw, 68px);
    line-height: 1.08;
    letter-spacing: -0.075em;
    font-weight: 620;
    color: #111111;
    word-break: keep-all;
    animation: completeTextIn 0.42s ease 0.08s both;
  }

  .register-complete-description {
    grid-row: 4;
    margin: 24px 0 0;
    font-family: var(--font-ko);
    font-size: 14px;
    line-height: 1.7;
    letter-spacing: -0.04em;
    font-weight: 500;
    color: rgba(17, 17, 17, 0.56);
    word-break: keep-all;
    animation: completeTextIn 0.42s ease 0.18s both;
  }

  .register-complete-count {
    grid-row: 5;
    width: 44px;
    height: 44px;
    margin: 42px 0 0;
    display: grid;
    place-items: center;
    border-top: 1px solid rgba(17, 17, 17, 0.22);
    border-bottom: 1px solid rgba(17, 17, 17, 0.22);
    overflow: hidden;
    animation: completeTextIn 0.42s ease 0.26s both;
  }

  .register-complete-count span {
    display: block;
    font-family: var(--font-en);
    font-size: 16px;
    line-height: 1;
    letter-spacing: 0.08em;
    font-weight: 660;
    color: #111111;
    animation: completeCountIn 0.28s ease both;
  }

  .register-complete-home {
    grid-row: 6;
    align-self: start;
    margin-top: 42px;
    border: 0;
    background: transparent;
    color: rgba(17, 17, 17, 0.6);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0;
    font-family: var(--font-ko);
    font-size: 13px;
    line-height: 1;
    font-weight: 620;
    letter-spacing: -0.035em;
    transition: color 0.2s ease, transform 0.2s ease;
    animation: completeTextIn 0.42s ease 0.34s both;
  }

  .register-complete-home:hover {
    color: #111111;
    transform: translateY(-1px);
  }

  .register-complete-home span:last-child {
    font-family: var(--font-en);
    font-size: 14px;
    line-height: 1;
  }

  @keyframes completeMarkIn {
    from {
      opacity: 0;
      transform: scale(0.3);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes completeTextIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes completeCountIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1180px) {
    .register-complete-title {
      font-size: 52px;
    }
  }
`;
