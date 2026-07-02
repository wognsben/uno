import { useEffect } from "react";

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

   Header / Footer는 App.tsx 공통 컴포넌트 사용
========================================================== */

function navigateTo(path: string) {
  if (typeof window === "undefined") return;

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("unotravel:navigate"));
}

export default function RegisterComplete() {
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

    const redirectTimer = window.setTimeout(() => {
      navigateTo("/");
    }, 2000);

    return () => {
      window.clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <main className="register-complete-shell">
      <style>{STYLE}</style>

      <section className="register-complete-inner" aria-label="우노트래블 회원가입 완료">
        <div className="register-complete-content">
          <div className="register-complete-kicker">REGISTER COMPLETE</div>

          <h1 className="register-complete-title">WELCOME</h1>
          <span className="register-complete-title-rule" aria-hidden="true" />

          <p className="register-complete-description">
            회원가입이 완료되었습니다.
            <br />
            이제 우노트래블의 예약과 문의 서비스를 이용할 수 있습니다.
          </p>

          <div className="register-complete-card">
            <div className="register-complete-mark" aria-hidden="true">✓</div>
            <div>
              <strong>가입 완료</strong>
              <p>자동 로그인 처리 중입니다. 잠시 후 메인페이지로 이동합니다.</p>
            </div>
          </div>

          <p className="register-complete-redirect">
            잠시 후 메인페이지로 이동합니다.
          </p>

          <div className="register-complete-actions">
            <button type="button" className="register-complete-home" onClick={() => navigateTo("/")}>
              <span>메인으로 이동하기</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

const STYLE = `
  .register-complete-shell {
    width: 100%;
    min-width: 1024px;
    min-height: calc(100vh - 110px);
    background: #ffffff;
    color: #151515;
    overflow-x: hidden;
  }

  .register-complete-inner {
    width: 100%;
    min-height: 820px;
    padding: 138px 50px 56px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .register-complete-content {
    width: min(100%, 760px);
  }

  .register-complete-kicker {
    margin-bottom: 18px;
    font-family: var(--font-en);
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.22em;
    color: #f5b800;
  }

  .register-complete-title {
    margin: 0;
    font-family: "Times New Roman", var(--font-en);
    font-size: 104px;
    font-weight: 400;
    line-height: 0.84;
    letter-spacing: -0.06em;
    color: #151515;
  }

  .register-complete-title-rule {
    display: block;
    width: 34px;
    height: 2px;
    margin: 38px 0 28px;
    background: rgba(21, 21, 21, 0.72);
  }

  .register-complete-description {
    margin: 0 0 42px;
    font-family: var(--font-ko);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.62;
    letter-spacing: -0.045em;
    color: rgba(21, 21, 21, 0.78);
    word-break: keep-all;
  }

  .register-complete-card {
    min-height: 108px;
    border: 1px solid rgba(21, 21, 21, 0.13);
    background: linear-gradient(90deg, rgba(252, 200, 0, 0.1), rgba(255, 255, 255, 1));
    display: grid;
    grid-template-columns: 54px 1fr;
    gap: 20px;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;
  }

  .register-complete-mark {
    width: 42px;
    height: 42px;
    border: 1px solid rgba(21, 21, 21, 0.24);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-en);
    font-size: 17px;
    font-weight: 800;
    color: #151515;
  }

  .register-complete-card strong {
    display: block;
    font-family: var(--font-ko);
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.045em;
    color: #151515;
  }

  .register-complete-card p {
    margin: 7px 0 0;
    font-family: var(--font-ko);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.45;
    letter-spacing: -0.04em;
    color: rgba(21, 21, 21, 0.56);
    word-break: keep-all;
  }

  .register-complete-redirect {
    margin: 22px 0 0;
    font-family: var(--font-ko);
    font-size: 13px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: -0.04em;
    color: rgba(21, 21, 21, 0.52);
  }

  .register-complete-actions {
    display: grid;
    grid-template-columns: minmax(220px, 360px);
    gap: 10px;
    margin-top: 22px;
  }

  .register-complete-home {
    height: 58px;
    cursor: pointer;
    box-sizing: border-box;
    font-family: var(--font-ko);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.035em;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  }

  .register-complete-home {
    border: none;
    background: #fcc800;
    color: #151515;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 0 28px;
  }

  .register-complete-home:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 42px rgba(252, 200, 0, 0.2);
  }

  @media (max-width: 1180px) {
    .register-complete-title {
      font-size: 86px;
    }
  }
`;
