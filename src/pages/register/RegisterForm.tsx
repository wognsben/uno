import { useMemo, useState } from "react";

/* ==========================================================
   RegisterForm.tsx

   UNOTRAVEL Register Form Page

   사용 페이지
   - /register/form

   백엔드 연동
   ------------------------------------------
   member register       ← 기존 그누보드 회원가입 처리 연결 예정
   register complete     ← 회원가입 완료 페이지 이동

   Header / Footer는 App.tsx 공통 컴포넌트 사용
========================================================== */

function navigateTo(path: string) {
  if (typeof window === "undefined") return;

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("unotravel:navigate"));
}

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [notice, setNotice] = useState("");

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      phone.trim().length > 0 &&
      password.trim().length > 0 &&
      password === passwordConfirm
    );
  }, [email, name, password, passwordConfirm, phone]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setNotice("필수 정보를 확인해 주세요. 비밀번호 확인 값도 일치해야 합니다.");
      return;
    }

    /*
      Register Backend Hook
      ------------------------------------------
      실제 백엔드 연동 시 이 위치에서 기존 그누보드 회원가입 처리 또는 신규 API를 호출한다.
      현재는 프론트 UI/동선 확인용 placeholder다.
    */
    console.log("[UNOTRAVEL] register requested", {
      name,
      email,
      phone,
    });

    setNotice("");
    navigateTo("/register/complete");
  }

  return (
    <main className="register-form-shell">
      <style>{STYLE}</style>

      <section className="register-form-inner" aria-label="우노트래블 회원가입 입력">
        <div className="register-form-content">
          <div className="register-form-kicker">REGISTER STEP 02</div>

          <h1 className="register-form-title">FORM</h1>
          <span className="register-form-title-rule" aria-hidden="true" />

          <p className="register-form-description">
            회원 정보를 입력해 주세요.
            <br />
            실제 저장은 백엔드 연동 후 처리합니다.
          </p>

          <form className="register-form" onSubmit={handleSubmit}>
            <label className="register-field">
              <span>이름</span>
              <input
                type="text"
                value={name}
                placeholder="이름을 입력하세요."
                autoComplete="name"
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="register-field">
              <span>이메일 주소</span>
              <input
                type="email"
                value={email}
                placeholder="이메일을 입력하세요."
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="register-field">
              <span>휴대폰 번호</span>
              <input
                type="tel"
                value={phone}
                placeholder="휴대폰 번호를 입력하세요."
                autoComplete="tel"
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>

            <label className="register-field">
              <span>비밀번호</span>
              <div className="register-password-wrap">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  placeholder="비밀번호를 입력하세요."
                  autoComplete="new-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className={`register-password-toggle ${isPasswordVisible ? "is-visible" : ""}`}
                  aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? "HIDE" : "VIEW"}
                </button>
              </div>
            </label>

            <label className="register-field">
              <span>비밀번호 확인</span>
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={passwordConfirm}
                placeholder="비밀번호를 다시 입력하세요."
                autoComplete="new-password"
                onChange={(event) => setPasswordConfirm(event.target.value)}
              />
            </label>

            {notice && (
              <p className="register-form-notice" role="status" aria-live="polite">
                {notice}
              </p>
            )}

            <div className="register-form-actions">
              <button type="button" className="register-form-back" onClick={() => navigateTo("/register/agreement")}>
                이전
              </button>
              <button type="submit" className="register-form-submit">
                <span>회원가입</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

const STYLE = `
  .register-form-shell {
    width: 100%;
    min-width: 1024px;
    min-height: calc(100vh - 110px);
    background: #ffffff;
    color: #151515;
    overflow-x: hidden;
  }

  .register-form-inner {
    width: 100%;
    min-height: 820px;
    padding: 138px 50px 56px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .register-form-content {
    width: min(100%, 680px);
  }

  .register-form-kicker {
    margin-bottom: 18px;
    font-family: var(--font-en);
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.22em;
    color: #f5b800;
  }

  .register-form-title {
    margin: 0;
    font-family: "Times New Roman", var(--font-en);
    font-size: 104px;
    font-weight: 400;
    line-height: 0.84;
    letter-spacing: -0.06em;
    color: #151515;
  }

  .register-form-title-rule {
    display: block;
    width: 34px;
    height: 2px;
    margin: 38px 0 28px;
    background: rgba(21, 21, 21, 0.72);
  }

  .register-form-description {
    margin: 0 0 42px;
    font-family: var(--font-ko);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.62;
    letter-spacing: -0.045em;
    color: rgba(21, 21, 21, 0.78);
    word-break: keep-all;
  }

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .register-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: var(--font-ko);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #151515;
  }

  .register-field input {
    width: 100%;
    height: 52px;
    border: 1px solid rgba(21, 21, 21, 0.18);
    background: #ffffff;
    padding: 0 16px;
    box-sizing: border-box;
    font-family: var(--font-ko);
    font-size: 14px;
    font-weight: 600;
    color: #151515;
    outline: none;
    transition: border-color 0.22s ease, box-shadow 0.22s ease;
  }

  .register-field input::placeholder {
    color: rgba(21, 21, 21, 0.34);
  }

  .register-field input:focus {
    border-color: rgba(21, 21, 21, 0.56);
    box-shadow: 0 0 0 3px rgba(252, 200, 0, 0.14);
  }

  .register-password-wrap {
    position: relative;
  }

  .register-password-toggle {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    font-family: var(--font-en);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.11em;
    color: rgba(21, 21, 21, 0.52);
    transition: color 0.18s ease, opacity 0.18s ease;
  }

  .register-password-toggle:hover {
    color: #151515;
  }

  .register-password-toggle.is-visible:hover {
    animation: registerPasswordVisiblePulse 1.4s ease-in-out infinite;
  }

  @keyframes registerPasswordVisiblePulse {
    0%, 100% {
      opacity: 1;
    }
    45% {
      opacity: 0.42;
    }
    60% {
      opacity: 1;
    }
  }

  .register-form-notice {
    margin: -2px 0 0;
    font-family: var(--font-ko);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #b88400;
  }

  .register-form-actions {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 10px;
    margin-top: 8px;
  }

  .register-form-back,
  .register-form-submit {
    height: 58px;
    cursor: pointer;
    box-sizing: border-box;
    font-family: var(--font-ko);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.035em;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  }

  .register-form-back {
    border: 1px solid rgba(21, 21, 21, 0.16);
    background: #ffffff;
    color: #151515;
  }

  .register-form-submit {
    border: none;
    background: #fcc800;
    color: #151515;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 0 28px;
  }

  .register-form-back:hover,
  .register-form-submit:hover {
    transform: translateY(-1px);
  }

  .register-form-submit:hover {
    box-shadow: 0 18px 42px rgba(252, 200, 0, 0.2);
  }

  @media (max-width: 1180px) {
    .register-form-title {
      font-size: 86px;
    }
  }
`;
