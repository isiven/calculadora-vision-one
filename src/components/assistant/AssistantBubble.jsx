import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export function AssistantBubble({ message, visible, exiting, isMobile, onClose }) {
  if (!visible || !message) return null

  return (
    <>
      <style>{`
        .assistant-bubble {
          position: absolute;
          right: 4px;
          bottom: 78px;
          width: min(260px, calc(100vw - 48px));
          min-height: 40px;
          padding: 10px 34px 10px 13px;
          box-sizing: border-box;
          border-radius: 13px;
          border: 1px solid rgba(226, 232, 240, 0.95);
          background: rgba(255, 255, 255, 0.97);
          color: #0f172a;
          font-size: 13px;
          line-height: 1.35;
          font-weight: 500;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14), 0 2px 8px rgba(15, 23, 42, 0.08);
          backdrop-filter: blur(12px);
          animation: assistant-bubble-in 180ms ease-out both;
          pointer-events: auto;
        }
        .assistant-bubble--exit {
          animation: assistant-bubble-out 180ms ease-in both;
        }
        .assistant-bubble::after {
          content: "";
          position: absolute;
          right: 25px;
          bottom: -6px;
          width: 12px;
          height: 12px;
          transform: rotate(45deg);
          border-top: 0;
          border-right: 1px solid rgba(226, 232, 240, 0.95);
          border-bottom: 1px solid rgba(226, 232, 240, 0.95);
          background: rgba(255, 255, 255, 0.97);
        }
        .assistant-bubble__message {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .assistant-bubble__close {
          position: absolute;
          top: 8px;
          right: 8px;
          display: inline-flex;
          width: 22px;
          height: 22px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: #94a3b8;
          cursor: pointer;
        }
        .assistant-bubble__close:hover {
          background: #f1f5f9;
          color: #334155;
        }
        .assistant-bubble--mobile {
          right: 0;
          bottom: 74px;
          width: min(246px, calc(100vw - 28px));
          font-size: 12px;
        }
        .assistant-bubble--mobile::after {
          right: 25px;
          bottom: -6px;
          border-top: 0;
          border-right: 1px solid rgba(226, 232, 240, 0.95);
          border-bottom: 1px solid rgba(226, 232, 240, 0.95);
        }
        @keyframes assistant-bubble-in {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes assistant-bubble-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(4px) scale(0.98); }
        }
        @media (prefers-reduced-motion: reduce) {
          .assistant-bubble,
          .assistant-bubble--exit {
            animation: none;
          }
        }
      `}</style>
      <div
        className={cn(
          "assistant-bubble",
          isMobile && "assistant-bubble--mobile",
          exiting && "assistant-bubble--exit"
        )}
        role="status"
        aria-live="polite"
      >
        <div className="assistant-bubble__message">{message}</div>
        <button
          type="button"
          className="assistant-bubble__close"
          onClick={onClose}
          aria-label="Ocultar mensaje del asistente"
          title="Ocultar mensaje"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}
