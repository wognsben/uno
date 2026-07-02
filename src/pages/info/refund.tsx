import React, { useRef } from "react";


const infoPageStyles = `
.uno-editorial-info {
  width: 100%;
  min-height: 100vh;
  padding: 150px 28px 132px;
  background: #ffffff;
  color: #111111;
  box-sizing: border-box;
}

.uno-editorial-info * {
  box-sizing: border-box;
}

.uno-editorial-shell {
  width: min(1220px, 100%);
  margin: 0 auto;
}

.uno-split {
  opacity: 0;
  will-change: transform;
}

.uno-split * {
  will-change: transform;
}

.uno-split-line {
  overflow: hidden;
  padding-bottom: 0.08em;
}

.uno-editorial-grid {
  position: relative;
  border-left: 1px solid rgba(17, 17, 17, 0.16);
  border-right: 1px solid rgba(17, 17, 17, 0.16);
  background:
    linear-gradient(to right, rgba(17, 17, 17, 0.075) 1px, transparent 1px) 0 0 / calc(100% / 8) 100%,
    #ffffff;
}

.uno-editorial-grid::before,
.uno-editorial-grid::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(17, 17, 17, 0.16);
  pointer-events: none;
}

.uno-editorial-grid::before {
  top: 0;
}

.uno-editorial-grid::after {
  bottom: 0;
}

.uno-editorial-hero {
  position: relative;
  min-height: 620px;
  padding: 34px 34px 42px;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  column-gap: 0;
  overflow: hidden;
}

.uno-editorial-kicker {
  grid-column: 1 / 4;
  margin: 0;
  font-family: var(--font-en);
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.26em;
  font-weight: 760;
  color: rgba(17, 17, 17, 0.45);
}

.uno-editorial-index {
  grid-column: 7 / 9;
  justify-self: end;
  margin: 0;
  font-family: var(--font-en);
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.22em;
  font-weight: 760;
  color: rgba(17, 17, 17, 0.42);
}

.uno-editorial-title {
  grid-column: 1 / 6;
  align-self: end;
  margin: 0 0 116px;
  font-size: clamp(66px, 8.1vw, 128px);
  line-height: 0.98;
  letter-spacing: -0.09em;
  font-weight: 680;
  color: #111111;
  word-break: keep-all;
}

.uno-editorial-title.is-refund {
  grid-column: 1 / 7;
}

.uno-editorial-lead {
  grid-column: 5 / 8;
  align-self: end;
  margin: 0 0 96px;
  font-size: 16px;
  line-height: 1.9;
  letter-spacing: -0.04em;
  color: rgba(17, 17, 17, 0.62);
  word-break: keep-all;
}

.uno-editorial-side-note {
  position: absolute;
  left: 34px;
  bottom: 42px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-en);
  font-size: 9px;
  line-height: 1;
  letter-spacing: 0.22em;
  font-weight: 760;
  color: rgba(17, 17, 17, 0.42);
}

.uno-editorial-orbit {
  position: absolute;
  right: 42px;
  top: 86px;
  width: 154px;
  height: 154px;
  border: 1px solid rgba(17, 17, 17, 0.11);
  border-radius: 999px;
  pointer-events: none;
}

.uno-editorial-orbit::before,
.uno-editorial-orbit::after {
  content: "";
  position: absolute;
  border-radius: 999px;
}

.uno-editorial-orbit::before {
  inset: 38px;
  border: 1px solid rgba(17, 17, 17, 0.09);
}

.uno-editorial-orbit::after {
  width: 18px;
  height: 18px;
  left: 50%;
  top: 50%;
  background: #111111;
  transform: translate(-50%, -50%);
}

.uno-editorial-docnav {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  min-height: 88px;
  border-top: 1px solid rgba(17, 17, 17, 0.16);
  border-bottom: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-docbutton {
  position: relative;
  grid-column: span 4;
  border: 0;
  border-right: 1px solid rgba(17, 17, 17, 0.16);
  background: transparent;
  cursor: pointer;
  padding: 0;
  color: #111111;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  transition: background 180ms ease;
}

.uno-editorial-docbutton:last-child {
  border-right: 0;
}

.uno-editorial-docbutton:hover {
  background: rgba(17, 17, 17, 0.025);
}

.uno-editorial-docbutton.is-active::after {
  content: "";
  position: absolute;
  left: 25%;
  right: 50%;
  bottom: -1px;
  height: 2px;
  background: #111111;
}

.uno-editorial-docnumber {
  grid-column: 1 / 2;
  justify-self: center;
  font-family: var(--font-en);
  font-size: 20px;
  line-height: 1;
  letter-spacing: -0.05em;
  font-weight: 520;
  color: rgba(17, 17, 17, 0.42);
}

.uno-editorial-doctext {
  grid-column: 2 / 4;
  text-align: left;
}

.uno-editorial-doclabel {
  display: block;
  margin-bottom: 8px;
  font-family: var(--font-en);
  font-size: 9px;
  line-height: 1;
  letter-spacing: 0.22em;
  font-weight: 760;
  color: rgba(17, 17, 17, 0.4);
}

.uno-editorial-doctitle {
  display: block;
  font-size: 15px;
  line-height: 1.1;
  letter-spacing: -0.045em;
  font-weight: 720;
  word-break: keep-all;
}

.uno-editorial-docarrow {
  grid-column: 4 / 5;
  justify-self: center;
  font-family: var(--font-en);
  font-size: 18px;
  color: rgba(17, 17, 17, 0.36);
}

.uno-editorial-body {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  border-bottom: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-aside {
  grid-column: 1 / 3;
  padding: 54px 34px;
  border-right: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-aside-inner {
  position: sticky;
  top: 136px;
}

.uno-editorial-aside-label {
  margin: 0;
  font-family: var(--font-en);
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.24em;
  font-weight: 760;
  color: rgba(17, 17, 17, 0.4);
}

.uno-editorial-aside h2 {
  margin: 28px 0 0;
  font-size: 32px;
  line-height: 1.08;
  letter-spacing: -0.075em;
  font-weight: 680;
  word-break: keep-all;
}

.uno-editorial-aside p {
  margin: 24px 0 0;
  font-size: 13px;
  line-height: 1.82;
  letter-spacing: -0.038em;
  color: rgba(17, 17, 17, 0.58);
  word-break: keep-all;
}

.uno-editorial-list {
  grid-column: 3 / 9;
  margin: 0;
  padding: 0;
  list-style: none;
}

.uno-editorial-row {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  min-height: 172px;
  border-bottom: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-row:last-child {
  border-bottom: 0;
}

.uno-editorial-row-number {
  grid-column: 1 / 2;
  padding: 36px 28px;
  font-family: var(--font-en);
  font-size: 28px;
  line-height: 1;
  letter-spacing: -0.07em;
  font-weight: 440;
  color: rgba(17, 17, 17, 0.55);
}

.uno-editorial-row-rule {
  grid-column: 2 / 3;
  align-self: stretch;
  border-left: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-row-copy {
  grid-column: 3 / 7;
  padding: 36px 42px 38px 0;
}

.uno-editorial-row-copy h3 {
  margin: 0;
  font-size: 21px;
  line-height: 1.24;
  letter-spacing: -0.06em;
  font-weight: 720;
  color: #111111;
  word-break: keep-all;
}

.uno-editorial-row-copy p {
  max-width: 580px;
  margin: 16px 0 0;
  font-size: 15px;
  line-height: 1.84;
  letter-spacing: -0.04em;
  color: rgba(17, 17, 17, 0.62);
  word-break: keep-all;
}

.uno-editorial-refund-row {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  min-height: 210px;
  border-bottom: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-refund-row:last-child {
  border-bottom: 0;
}

.uno-editorial-refund-index {
  grid-column: 1 / 2;
  padding: 42px 28px;
  font-family: var(--font-en);
  font-size: 24px;
  line-height: 1;
  letter-spacing: -0.06em;
  font-weight: 440;
  color: rgba(17, 17, 17, 0.52);
}

.uno-editorial-refund-period {
  grid-column: 2 / 3;
  padding: 42px 24px;
  border-left: 1px solid rgba(17, 17, 17, 0.16);
  font-size: 20px;
  line-height: 1.1;
  letter-spacing: -0.065em;
  font-weight: 680;
  word-break: keep-all;
}

.uno-editorial-refund-copy {
  grid-column: 3 / 7;
  padding: 42px 42px 44px 0;
}

.uno-editorial-refund-copy h3 {
  margin: 0;
  font-size: clamp(38px, 4.2vw, 64px);
  line-height: 0.96;
  letter-spacing: -0.085em;
  font-weight: 660;
  color: #111111;
  word-break: keep-all;
}

.uno-editorial-refund-copy p {
  max-width: 620px;
  margin: 20px 0 0;
  font-size: 15px;
  line-height: 1.84;
  letter-spacing: -0.04em;
  color: rgba(17, 17, 17, 0.62);
  word-break: keep-all;
}

.uno-editorial-special {
  grid-column: 3 / 9;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  border-top: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-special-head {
  grid-column: 1 / 3;
  padding: 46px 28px;
  border-right: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-special-head p {
  margin: 0;
  font-family: var(--font-en);
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.24em;
  font-weight: 760;
  color: rgba(17, 17, 17, 0.42);
}

.uno-editorial-special-head h3 {
  margin: 28px 0 0;
  font-size: 32px;
  line-height: 1.05;
  letter-spacing: -0.078em;
  font-weight: 680;
  word-break: keep-all;
}

.uno-editorial-special-list {
  grid-column: 3 / 7;
  margin: 0;
  padding: 0;
  list-style: none;
}

.uno-editorial-special-list li {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 22px;
  min-height: 92px;
  padding: 24px 42px 24px 0;
  border-bottom: 1px solid rgba(17, 17, 17, 0.16);
  font-size: 15px;
  line-height: 1.84;
  letter-spacing: -0.04em;
  color: rgba(17, 17, 17, 0.62);
  word-break: keep-all;
}

.uno-editorial-special-list li:last-child {
  border-bottom: 0;
}

.uno-editorial-special-list li::before {
  content: attr(data-index);
  font-family: var(--font-en);
  font-size: 14px;
  line-height: 1;
  letter-spacing: 0.12em;
  font-weight: 520;
  color: rgba(17, 17, 17, 0.46);
}

.uno-editorial-note {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  min-height: 132px;
  border-top: 1px solid rgba(17, 17, 17, 0.16);
}

.uno-editorial-note strong {
  grid-column: 1 / 3;
  padding: 36px 34px;
  border-right: 1px solid rgba(17, 17, 17, 0.16);
  font-family: var(--font-en);
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.24em;
  font-weight: 760;
}

.uno-editorial-note p {
  grid-column: 3 / 9;
  max-width: 720px;
  margin: 0;
  padding: 34px 42px;
  font-size: 14px;
  line-height: 1.82;
  letter-spacing: -0.038em;
  color: rgba(17, 17, 17, 0.62);
  word-break: keep-all;
}

@media (max-width: 1024px) {
  .uno-editorial-info {
    padding: 126px 20px 96px;
  }

  .uno-editorial-hero {
    min-height: 560px;
  }

  .uno-editorial-title {
    grid-column: 1 / 8;
  }

  .uno-editorial-lead {
    grid-column: 4 / 9;
  }

  .uno-editorial-body {
    grid-template-columns: 1fr;
  }

  .uno-editorial-aside,
  .uno-editorial-list,
  .uno-editorial-special {
    grid-column: 1 / -1;
  }

  .uno-editorial-aside {
    border-right: 0;
    border-bottom: 1px solid rgba(17, 17, 17, 0.16);
  }

  .uno-editorial-aside-inner {
    position: relative;
    top: auto;
  }
}

@media (max-width: 640px) {
  .uno-editorial-info {
    padding: 106px 14px 72px;
  }

  .uno-editorial-grid {
    background:
      linear-gradient(to right, rgba(17, 17, 17, 0.065) 1px, transparent 1px) 0 0 / calc(100% / 4) 100%,
      #ffffff;
  }

  .uno-editorial-hero {
    min-height: 480px;
    padding: 24px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .uno-editorial-kicker {
    grid-column: 1 / 3;
  }

  .uno-editorial-index {
    grid-column: 3 / 5;
  }

  .uno-editorial-title {
    grid-column: 1 / 5;
    margin-bottom: 126px;
    font-size: clamp(50px, 15vw, 76px);
    line-height: 1.02;
    letter-spacing: -0.078em;
  }

  .uno-editorial-lead {
    grid-column: 1 / 5;
    margin-bottom: 0;
    font-size: 14px;
  }

  .uno-editorial-orbit {
    display: none;
  }

  .uno-editorial-side-note {
    display: none;
  }

  .uno-editorial-docnav {
    grid-template-columns: 1fr;
  }

  .uno-editorial-docbutton {
    grid-column: 1 / -1;
    grid-template-columns: 52px minmax(0, 1fr) 36px;
    min-height: 78px;
    border-right: 0;
    border-bottom: 1px solid rgba(17, 17, 17, 0.16);
  }

  .uno-editorial-docbutton:last-child {
    border-bottom: 0;
  }

  .uno-editorial-docbutton.is-active::after {
    left: 52px;
    right: auto;
    width: 120px;
  }

  .uno-editorial-aside {
    padding: 34px 24px;
  }

  .uno-editorial-row,
  .uno-editorial-refund-row {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    min-height: auto;
  }

  .uno-editorial-row-number,
  .uno-editorial-refund-index {
    grid-column: 1 / 2;
    padding: 28px 24px 0;
  }

  .uno-editorial-row-rule {
    display: none;
  }

  .uno-editorial-row-copy,
  .uno-editorial-refund-copy {
    grid-column: 1 / 5;
    padding: 18px 24px 30px;
  }

  .uno-editorial-refund-period {
    grid-column: 2 / 5;
    padding: 28px 24px 0 0;
    border-left: 0;
  }

  .uno-editorial-special {
    grid-template-columns: 1fr;
  }

  .uno-editorial-special-head,
  .uno-editorial-special-list {
    grid-column: 1 / -1;
  }

  .uno-editorial-special-head {
    border-right: 0;
    border-bottom: 1px solid rgba(17, 17, 17, 0.16);
    padding: 34px 24px;
  }

  .uno-editorial-special-list li {
    grid-template-columns: 52px minmax(0, 1fr);
    padding: 22px 24px;
  }

  .uno-editorial-note {
    grid-template-columns: 1fr;
  }

  .uno-editorial-note strong,
  .uno-editorial-note p {
    grid-column: 1 / -1;
    border-right: 0;
  }

  .uno-editorial-note strong {
    padding: 28px 24px 0;
  }

  .uno-editorial-note p {
    padding: 20px 24px 30px;
  }
}
`;



function navigateTo(path: string) {
  if (typeof window === "undefined") return;

  if (window.location.pathname === path) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("unotravel:navigate"));
}

function InfoDocumentNav({ active }: { active: "notice" | "refund" }) {
  const items = [
    {
      id: "notice",
      number: "01",
      label: "NOTICE",
      title: "예약 시 주의사항",
      path: "/info/notice",
    },
    {
      id: "refund",
      number: "02",
      label: "REFUND",
      title: "취소 및 환불규정",
      path: "/info/refund",
    },
  ] as const;

  return (
    <nav className="uno-editorial-docnav" aria-label="INFO 문서 이동">
      {items.map((item) => {
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            type="button"
            aria-current={isActive ? "page" : undefined}
            className={`uno-editorial-docbutton ${isActive ? "is-active" : ""}`}
            onClick={() => navigateTo(item.path)}
          >
            <span className="uno-editorial-docnumber">{item.number}</span>
            <span className="uno-editorial-doctext">
              <span className="uno-editorial-doclabel">{item.label}</span>
              <strong className="uno-editorial-doctitle">{item.title}</strong>
            </span>
            <span className="uno-editorial-docarrow" aria-hidden="true">→</span>
          </button>
        );
      })}
    </nav>
  );
}

function useEditorialAnimation(scopeRef: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    let context: { revert: () => void } | undefined;
    let cancelled = false;

    async function setupAnimation() {
      if (typeof window === "undefined" || !scopeRef.current) return;

      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);

      if (cancelled || !scopeRef.current) return;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      const run = () => {
        if (!scopeRef.current) return;

        context = gsap.context(() => {
          gsap.set(".uno-split", { opacity: 1 });

          const splitTargets = gsap.utils.toArray<HTMLElement>(".uno-split");

          splitTargets.forEach((target) => {
            const trigger =
              target.closest<HTMLElement>(
                ".uno-editorial-hero, .uno-editorial-row, .uno-editorial-refund-row, .uno-editorial-special, .uno-editorial-note, .uno-editorial-aside",
              ) ?? target;

            SplitText.create(target, {
              type: "words,lines",
              mask: "lines",
              linesClass: "uno-split-line",
              autoSplit: true,
              onSplit: (instance) => {
                return gsap.from(instance.lines, {
                  yPercent: 112,
                  opacity: 0.001,
                  duration: 0.82,
                  ease: "power3.out",
                  stagger: 0.052,
                  scrollTrigger: {
                    trigger,
                    start: "clamp(top 82%)",
                    end: "clamp(bottom 58%)",
                    toggleActions: "play none none reverse",
                  },
                });
              },
            });
          });

          gsap.from(".uno-editorial-docbutton", {
            y: 18,
            opacity: 0,
            duration: 0.62,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: ".uno-editorial-docnav",
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.from(".uno-editorial-row, .uno-editorial-refund-row, .uno-editorial-special, .uno-editorial-note", {
            y: 26,
            opacity: 0,
            duration: 0.68,
            ease: "power3.out",
            stagger: 0.045,
            scrollTrigger: {
              trigger: ".uno-editorial-body",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }, scopeRef);
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }
    }

    setupAnimation();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [scopeRef]);
}


const refundSteps = [
  {
    period: "30일 전",
    title: "전액 환불",
    body:
      "투어 개시일로부터 30일까지 통보 시 여행요금 또는 신청비 선결제 금액 전액 환불 기준이 적용됩니다.",
  },
  {
    period: "29~20일",
    title: "30% 배상",
    body:
      "투어 개시일 29일부터 20일 전까지 통보 시 부가서비스를 제외한 투어요금 또는 신청비 선결제 금액의 30% 배상 기준이 적용됩니다.",
  },
  {
    period: "19~2일",
    title: "50% 배상",
    body:
      "투어 개시일 19일부터 2일 전까지 통보 시 부가서비스를 제외한 투어요금 또는 신청비 선결제 금액의 50% 배상 기준이 적용됩니다.",
  },
  {
    period: "1일~당일",
    title: "100% 배상",
    body:
      "투어 개시일 1일 전부터 당일까지 통보 시 부가서비스를 제외한 투어요금 또는 신청비 선결제 금액의 100% 배상 기준이 적용됩니다.",
  },
];

const specialItems = [
  "사전 티켓 구매가 필요한 투어는 예약 확정과 동시에 티켓 구매가 진행되어 전액 환불이 불가할 수 있습니다.",
  "바티칸 반일오전투어, 바티칸 반일오후투어, 올인원투어 등은 특별약관이 적용될 수 있습니다.",
  "남부 1박 2일 투어 등 일부 상품은 상품 상세페이지의 별도 환불규정이 우선 적용될 수 있습니다.",
  "투어 당일 타 지역 이동 일정으로 발생하는 연착, 결항, 교통체증 등은 환불·변경·보상 대상이 아닙니다.",
  "인원 모객 미달로 취소되는 경우 투어요금 또는 선결제 금액 환불만 진행되며 별도 추가 배상은 없습니다.",
];

export default function RefundPage() {
  const scopeRef = useRef<HTMLElement | null>(null);
  useEditorialAnimation(scopeRef);

  return (
    <main ref={scopeRef} className="uno-editorial-info">
      <style>{infoPageStyles}</style>

      <div className="uno-editorial-shell">
        <div className="uno-editorial-grid">
          <section className="uno-editorial-hero">
            <p className="uno-editorial-kicker">UNOTRAVEL POLICY</p>
            <p className="uno-editorial-index">REFUND / 02</p>

            <h1 className="uno-editorial-title is-refund uno-split">
              취소 및
              <br />
              환불규정
            </h1>

            <p className="uno-editorial-lead uno-split">
              예약 취소 시점과 상품별 특별약관에 따라 환불 기준이 달라질 수 있습니다. 투어 신청 전 반드시 확인해 주세요.
            </p>

            <span className="uno-editorial-side-note">POLICY DOCUMENT</span>
            <span className="uno-editorial-orbit" aria-hidden="true" />
          </section>

          <InfoDocumentNav active="refund" />

          <section className="uno-editorial-body">
            <aside className="uno-editorial-aside">
              <div className="uno-editorial-aside-inner">
                <p className="uno-editorial-aside-label">CANCEL TIMELINE</p>
                <h2 className="uno-split">취소 시점별 기준</h2>
                <p className="uno-split">
                  환불 요청 접수 시점은 우노트래블 사이트 접수 시간을 기준으로 판단합니다.
                </p>
              </div>
            </aside>

            <div className="uno-editorial-list">
              {refundSteps.map((step, index) => (
                <article className="uno-editorial-refund-row" key={step.period}>
                  <span className="uno-editorial-refund-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong className="uno-editorial-refund-period">{step.period}</strong>
                  <div className="uno-editorial-refund-copy">
                    <h3 className="uno-split">{step.title}</h3>
                    <p className="uno-split">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <section className="uno-editorial-special">
              <div className="uno-editorial-special-head">
                <p>SPECIAL POLICY</p>
                <h3 className="uno-split">특별약관 및 유의사항</h3>
              </div>

              <ul className="uno-editorial-special-list">
                {specialItems.map((item, index) => (
                  <li key={item} data-index={String(index + 1).padStart(2, "0")}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </section>

          <div className="uno-editorial-note">
            <strong>NOTICE</strong>
            <p className="uno-split">
              위 내용은 기본 규정입니다. 상품 상세페이지에 별도 환불규정 또는 특별약관이 명시된 경우 해당 상품의 규정이 우선 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
