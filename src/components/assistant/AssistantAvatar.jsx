import { cn } from "@/lib/utils"

export function AssistantAvatar({ state = "idle", size = 68, mode = "client", isActive = false }) {
  const isInternal = mode === "internal"

  return (
    <>
      <style>{`
        .assistant-avatar {
          position: relative;
          display: grid;
          place-items: center;
          isolation: isolate;
          animation: assistant-float 5.8s ease-in-out infinite;
        }
        .assistant-avatar--active {
          animation-duration: 4.8s;
        }
        .assistant-avatar__shadow {
          position: absolute;
          inset: auto 12% 1% 12%;
          height: 12%;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.18);
          filter: blur(5px);
          z-index: 0;
        }
        .assistant-avatar__body {
          position: absolute;
          left: 22%;
          right: 22%;
          bottom: 6%;
          height: 34%;
          border-radius: 999px 999px 16px 16px;
          background: linear-gradient(180deg, #1d4ed8 0%, #0f2f6f 100%);
          border: 1px solid rgba(255, 255, 255, 0.32);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
          z-index: 1;
        }
        .assistant-avatar--internal .assistant-avatar__body {
          background: linear-gradient(180deg, #2454d6 0%, #092455 100%);
        }
        .assistant-avatar__head {
          position: relative;
          width: 76%;
          height: 76%;
          margin-top: -8%;
          border-radius: 28px 28px 24px 24px;
          background:
            radial-gradient(circle at 32% 24%, rgba(255,255,255,0.95) 0 8%, transparent 9%),
            linear-gradient(145deg, #ffffff 0%, #eaf2ff 48%, #c9dcff 100%);
          border: 1px solid rgba(37, 99, 235, 0.22);
          box-shadow:
            0 16px 28px rgba(15, 23, 42, 0.22),
            inset 0 -8px 18px rgba(37, 99, 235, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.92);
          z-index: 2;
        }
        .assistant-avatar--attention .assistant-avatar__head {
          animation: assistant-pulse 1.8s ease-in-out infinite;
        }
        .assistant-avatar__ear {
          position: absolute;
          top: 40%;
          width: 12%;
          height: 22%;
          border-radius: 999px;
          background: #dbeafe;
          border: 1px solid rgba(37, 99, 235, 0.18);
          z-index: 1;
        }
        .assistant-avatar__ear--left { left: 7%; }
        .assistant-avatar__ear--right { right: 7%; }
        .assistant-avatar__face {
          position: absolute;
          inset: 23% 18% 18%;
          border-radius: 20px;
          background: rgba(248, 250, 252, 0.72);
          box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.16);
        }
        .assistant-avatar__eye {
          position: absolute;
          top: 30%;
          width: 16%;
          height: 16%;
          border-radius: 999px;
          background: #0f172a;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
          transform-origin: center;
          transition: height 120ms ease, top 120ms ease, border-radius 120ms ease, transform 160ms ease;
        }
        .assistant-avatar__eye--left { left: 24%; }
        .assistant-avatar__eye--right { right: 24%; }
        .assistant-avatar--blink .assistant-avatar__eye {
          animation: assistant-blink 180ms ease-out both;
        }
        .assistant-avatar--thinking .assistant-avatar__eye--left {
          transform: translateY(1px) scaleX(0.88);
        }
        .assistant-avatar--thinking .assistant-avatar__eye--right {
          transform: translateY(-1px) scaleX(0.88);
        }
        .assistant-avatar__mouth {
          position: absolute;
          left: 39%;
          bottom: 24%;
          width: 22%;
          height: 7%;
          border-radius: 999px;
          background: #1e3a8a;
          transform-origin: center;
          transition: height 140ms ease, border-radius 140ms ease, transform 140ms ease;
        }
        .assistant-avatar--talking .assistant-avatar__mouth {
          animation: assistant-talk 720ms ease-in-out infinite;
        }
        .assistant-avatar--thinking .assistant-avatar__mouth {
          width: 18%;
          left: 41%;
          height: 5%;
          transform: translateY(-1px);
          background: #334155;
        }
        .assistant-avatar__thinking {
          position: absolute;
          left: 31%;
          right: 31%;
          bottom: 18%;
          display: none;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        .assistant-avatar--thinking .assistant-avatar__thinking {
          display: flex;
        }
        .assistant-avatar__thinking span {
          width: 3px;
          height: 3px;
          border-radius: 999px;
          background: #1e3a8a;
          animation: assistant-thinking-dot 1s ease-in-out infinite;
        }
        .assistant-avatar__thinking span:nth-child(2) { animation-delay: 140ms; }
        .assistant-avatar__thinking span:nth-child(3) { animation-delay: 280ms; }
        .assistant-avatar__status {
          position: absolute;
          right: 11%;
          top: 18%;
          width: 13%;
          height: 13%;
          border-radius: 999px;
          background: #22c55e;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 10px rgba(34, 197, 94, 0.35);
          z-index: 3;
        }
        .assistant-avatar--attention .assistant-avatar__status {
          animation: assistant-pulse 1.8s ease-in-out infinite;
          background: #38bdf8;
        }
        @keyframes assistant-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes assistant-blink {
          0%, 100% { top: 30%; height: 16%; border-radius: 999px; }
          50% { top: 37%; height: 6%; border-radius: 999px; }
        }
        @keyframes assistant-talk {
          0%, 100% { height: 7%; border-radius: 999px; transform: translateY(0); }
          34% { height: 12%; border-radius: 40% 40% 46% 46%; transform: translateY(4%); }
          68% { height: 18%; border-radius: 42% 42% 50% 50%; transform: translateY(9%); }
        }
        @keyframes assistant-pulse {
          0%, 100% { box-shadow: 0 16px 28px rgba(15, 23, 42, 0.22), 0 0 0 rgba(37, 99, 235, 0); }
          50% { box-shadow: 0 16px 28px rgba(15, 23, 42, 0.2), 0 0 0 8px rgba(37, 99, 235, 0.1); }
        }
        @keyframes assistant-thinking-dot {
          0%, 80%, 100% { opacity: 0.35; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .assistant-avatar,
          .assistant-avatar--active,
          .assistant-avatar--attention .assistant-avatar__head,
          .assistant-avatar--attention .assistant-avatar__status,
          .assistant-avatar--blink .assistant-avatar__eye,
          .assistant-avatar--talking .assistant-avatar__mouth,
          .assistant-avatar__thinking span {
            animation: none;
          }
        }
      `}</style>
      <div
        className={cn(
          "assistant-avatar",
          `assistant-avatar--${state}`,
          isActive && "assistant-avatar--active",
          isInternal && "assistant-avatar--internal"
        )}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <div className="assistant-avatar__shadow" />
        <div className="assistant-avatar__body" />
        <div className="assistant-avatar__ear assistant-avatar__ear--left" />
        <div className="assistant-avatar__ear assistant-avatar__ear--right" />
        <div className="assistant-avatar__head">
          <div className="assistant-avatar__face">
            <div className="assistant-avatar__eye assistant-avatar__eye--left" />
            <div className="assistant-avatar__eye assistant-avatar__eye--right" />
            <div className="assistant-avatar__mouth" />
            <div className="assistant-avatar__thinking">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
        <div className="assistant-avatar__status" />
      </div>
    </>
  )
}
