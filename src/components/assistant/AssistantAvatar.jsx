import { cn } from "@/lib/utils"

export function AssistantAvatar({ state = "idle", size = 66, mode = "client", isActive = false }) {
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
        .assistant-avatar__shadow {
          position: absolute;
          inset: auto 13% 2% 13%;
          height: 12%;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.2);
          filter: blur(6px);
          z-index: 0;
        }
        .assistant-avatar__pulse {
          position: absolute;
          width: 68%;
          height: 68%;
          border-radius: 18px;
          background: rgba(0, 47, 69, 0.16);
          opacity: 0;
          transform: rotate(45deg);
          z-index: 1;
        }
        .assistant-avatar--attention .assistant-avatar__pulse,
        .assistant-avatar--active .assistant-avatar__pulse {
          animation: assistant-pulse 2.1s ease-in-out infinite;
        }
        .assistant-avatar__svg {
          position: relative;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 14px 22px rgba(2, 6, 23, 0.24));
        }
        .assistant-avatar__diamond {
          fill: #002f45;
          stroke: rgba(255, 255, 255, 0.14);
          stroke-width: 1.4;
        }
        .assistant-avatar--internal .assistant-avatar__diamond {
          fill: #003750;
        }
        .assistant-avatar__highlight {
          fill: rgba(255, 255, 255, 0.12);
        }
        .assistant-avatar__eye,
        .assistant-avatar__mouth-smile,
        .assistant-avatar__mouth-neutral {
          fill: none;
          stroke: #ffffff;
          stroke-width: 4.4;
          stroke-linecap: round;
          stroke-linejoin: round;
          transform-box: fill-box;
          transform-origin: center;
        }
        .assistant-avatar__eye {
          transition: transform 150ms ease, opacity 150ms ease;
        }
        .assistant-avatar--blink .assistant-avatar__eye {
          animation: assistant-blink 180ms ease-out both;
        }
        .assistant-avatar--thinking .assistant-avatar__eye {
          transform: scaleY(0.45);
        }
        .assistant-avatar__mouth-smile {
          opacity: 1;
        }
        .assistant-avatar__mouth-open {
          fill: rgba(255, 255, 255, 0.14);
          stroke: #ffffff;
          stroke-width: 3.8;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .assistant-avatar__mouth-neutral {
          opacity: 0;
        }
        .assistant-avatar--talking .assistant-avatar__mouth-smile {
          animation: assistant-smile-talk 720ms ease-in-out infinite;
        }
        .assistant-avatar--talking .assistant-avatar__mouth-open {
          animation: assistant-open-talk 720ms ease-in-out infinite;
        }
        .assistant-avatar--thinking .assistant-avatar__mouth-smile,
        .assistant-avatar--thinking .assistant-avatar__mouth-open {
          opacity: 0;
        }
        .assistant-avatar--thinking .assistant-avatar__mouth-neutral {
          opacity: 1;
        }
        .assistant-avatar__thinking {
          opacity: 0;
        }
        .assistant-avatar--thinking .assistant-avatar__thinking {
          opacity: 1;
        }
        .assistant-avatar__thinking-dot {
          fill: #ffffff;
          opacity: 0.36;
          animation: assistant-thinking-dot 1s ease-in-out infinite;
        }
        .assistant-avatar__thinking-dot:nth-child(2) { animation-delay: 140ms; }
        .assistant-avatar__thinking-dot:nth-child(3) { animation-delay: 280ms; }
        .assistant-avatar__status {
          position: absolute;
          right: 8%;
          top: 9%;
          width: 13%;
          height: 13%;
          border-radius: 999px;
          background: #22c55e;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 10px rgba(34, 197, 94, 0.36);
          z-index: 3;
        }
        @keyframes assistant-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes assistant-blink {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.14); }
        }
        @keyframes assistant-smile-talk {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          45% { opacity: 0; transform: scaleY(0.78); }
        }
        @keyframes assistant-open-talk {
          0%, 100% { opacity: 0; transform: scale(0.78); }
          45% { opacity: 1; transform: scale(1); }
        }
        @keyframes assistant-pulse {
          0%, 100% { opacity: 0; transform: rotate(45deg) scale(0.95); }
          50% { opacity: 1; transform: rotate(45deg) scale(1.18); }
        }
        @keyframes assistant-thinking-dot {
          0%, 80%, 100% { opacity: 0.36; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .assistant-avatar,
          .assistant-avatar__pulse,
          .assistant-avatar--blink .assistant-avatar__eye,
          .assistant-avatar--talking .assistant-avatar__mouth-smile,
          .assistant-avatar--talking .assistant-avatar__mouth-open,
          .assistant-avatar__thinking-dot {
            animation: none;
          }
        }
      `}</style>
      <div
        className={cn(
          "assistant-avatar",
          `assistant-avatar--${state}`,
          isActive && "assistant-avatar--active",
          mode === "internal" && "assistant-avatar--internal"
        )}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <div className="assistant-avatar__shadow" />
        <div className="assistant-avatar__pulse" />
        <svg className="assistant-avatar__svg" viewBox="0 0 100 100" focusable="false">
          <rect
            className="assistant-avatar__diamond"
            x="18"
            y="18"
            width="64"
            height="64"
            rx="17"
            transform="rotate(45 50 50)"
          />
          <path
            className="assistant-avatar__highlight"
            d="M30 22c8-7 21-8 29-3-14 2-25 8-32 19-2-5-1-11 3-16Z"
          />
          <path className="assistant-avatar__eye assistant-avatar__eye--left" d="M33 42 Q38 46 43 42" />
          <path className="assistant-avatar__eye assistant-avatar__eye--right" d="M57 42 Q62 46 67 42" />
          <path className="assistant-avatar__mouth-smile" d="M38 57 Q50 67 62 57" />
          <ellipse className="assistant-avatar__mouth-open" cx="50" cy="60" rx="7.5" ry="6.5" />
          <path className="assistant-avatar__mouth-neutral" d="M43 60 H57" />
          <g className="assistant-avatar__thinking">
            <circle className="assistant-avatar__thinking-dot" cx="43" cy="68" r="2.2" />
            <circle className="assistant-avatar__thinking-dot" cx="50" cy="68" r="2.2" />
            <circle className="assistant-avatar__thinking-dot" cx="57" cy="68" r="2.2" />
          </g>
        </svg>
        <div className="assistant-avatar__status" />
      </div>
    </>
  )
}
