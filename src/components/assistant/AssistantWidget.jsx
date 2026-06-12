import { useEffect, useMemo, useRef, useState } from "react"

import { AssistantAvatar } from "./AssistantAvatar"
import { AssistantBubble } from "./AssistantBubble"

const GENERAL_MESSAGES = [
  "Puedo ayudarte a importar una cotización.",
  "Puedo revisar el margen de este negocio.",
  "También analizo consumo y propuestas.",
  "Puedo ayudarte a explicar los créditos.",
  "¿Quieres que revise esta cotización contigo?",
]

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getDelay(min, max) {
  return Math.round(min + Math.random() * (max - min))
}

export function AssistantWidget({
  onOpen,
  mode = "client",
  isMobile = false,
  hasProducts = false,
  hasZeroPrices = false,
  margin = null,
}) {
  const [avatarState, setAvatarState] = useState("idle")
  const [bubbleIndex, setBubbleIndex] = useState(0)
  const [bubblePhase, setBubblePhase] = useState("hidden")
  const [motionReduced, setMotionReduced] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const timersRef = useRef([])
  const bubbleVisible = bubblePhase !== "hidden"

  const messages = useMemo(() => {
    const contextualMessages = []
    const hasMarginValue = margin !== null && margin !== undefined && margin !== ""
    const numericMargin = Number(margin)

    if (!hasProducts) {
      contextualMessages.push("Agrega un producto o importa una cotización para empezar.")
    }
    if (hasZeroPrices) {
      contextualMessages.push("Recuerda configurar precio al cliente y costo proveedor.")
    }
    if (hasProducts) {
      contextualMessages.push("Puedo ayudarte a revisar si la cotización está completa.")
    }
    if (hasMarginValue && Number.isFinite(numericMargin) && numericMargin <= 0) {
      contextualMessages.push("El margen está en cero. Puedo ayudarte a revisarlo.")
    }

    return [...contextualMessages, ...GENERAL_MESSAGES]
  }, [hasProducts, hasZeroPrices, margin])

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
  }

  const setTimer = (callback, delay) => {
    const timer = window.setTimeout(callback, delay)
    timersRef.current.push(timer)
    return timer
  }

  const hideBubble = ({ userInitiated = false } = {}) => {
    clearTimers()
    if (bubblePhase === "hidden") {
      if (userInitiated) {
        scheduleNextBubble(28000)
      }
      return
    }

    setBubblePhase(motionReduced ? "hidden" : "exiting")
    setAvatarState("idle")

    setTimer(() => {
      setBubblePhase("hidden")
      setBubbleIndex((index) => (index + 1) % messages.length)
      scheduleNextBubble(userInitiated ? getDelay(26000, 35000) : getDelay(22000, 32000))
    }, motionReduced ? 0 : 180)
  }

  const showBubble = () => {
    clearTimers()
    const hasMarginValue = margin !== null && margin !== undefined && margin !== ""
    const hasLowMargin = hasMarginValue && Number.isFinite(Number(margin)) && Number(margin) <= 0
    setAvatarState(hasZeroPrices || hasLowMargin ? "attention" : "talking")
    setBubblePhase("visible")

    setTimer(() => {
      setAvatarState("talking")
    }, motionReduced ? 0 : 420)

    setTimer(() => {
      hideBubble()
    }, getDelay(5200, 6800))
  }

  const scheduleNextBubble = (delay = getDelay(24000, 34000)) => {
    if (motionReduced) return
    setTimer(showBubble, delay)
  }

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setMotionReduced(media.matches)
    updateMotionPreference()
    media.addEventListener?.("change", updateMotionPreference)

    return () => media.removeEventListener?.("change", updateMotionPreference)
  }, [])

  useEffect(() => {
    clearTimers()
    setBubblePhase("hidden")
    setAvatarState("idle")

    if (motionReduced) return undefined

    setTimer(showBubble, getDelay(2200, 3800))
    return clearTimers
  }, [messages, motionReduced])

  useEffect(() => {
    if (motionReduced || bubbleVisible) return undefined

    let blinkTimer
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        setAvatarState("blink")
        window.setTimeout(() => setAvatarState("idle"), getDelay(150, 220))
        scheduleBlink()
      }, getDelay(4200, 7000))
    }

    scheduleBlink()
    return () => window.clearTimeout(blinkTimer)
  }, [bubbleVisible, motionReduced])

  const openAssistant = () => {
    clearTimers()
    setBubblePhase("hidden")
    setAvatarState("thinking")

    window.setTimeout(() => {
      onOpen?.()
    }, motionReduced ? 0 : 120)
  }

  return (
    <>
      <style>{`
        .assistant-widget {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .assistant-widget__button {
          width: 72px;
          height: 72px;
          padding: 0;
          border: 0;
          border-radius: 24px;
          background:
            radial-gradient(circle at 32% 20%, rgba(255,255,255,0.42), transparent 30%),
            linear-gradient(145deg, #eef5ff 0%, #dbeafe 48%, #bfdbfe 100%);
          box-shadow:
            0 18px 38px rgba(15, 23, 42, 0.22),
            0 3px 10px rgba(15, 23, 42, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.85);
          cursor: pointer;
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .assistant-widget__button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 22px 44px rgba(15, 23, 42, 0.25),
            0 4px 12px rgba(15, 23, 42, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.88);
        }
        .assistant-widget__button:active {
          transform: translateY(0) scale(0.98);
        }
        .assistant-widget__button:focus-visible {
          outline: 3px solid rgba(37, 99, 235, 0.34);
          outline-offset: 4px;
        }
        @media (max-width: 640px) {
          .assistant-widget__button {
            width: 64px;
            height: 64px;
            border-radius: 22px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .assistant-widget__button,
          .assistant-widget__button:hover {
            transition: none;
            transform: none;
          }
        }
      `}</style>
      <div
        className="assistant-widget"
        style={{
          position: "fixed",
          right: isMobile ? 14 : 24,
          bottom: isMobile ? 14 : 24,
          zIndex: 100,
        }}
      >
        <AssistantBubble
          message={messages[bubbleIndex] || GENERAL_MESSAGES[0]}
          visible={bubbleVisible}
          exiting={bubblePhase === "exiting"}
          isMobile={isMobile}
          onClose={() => hideBubble({ userInitiated: true })}
        />

        <button
          type="button"
          className="assistant-widget__button"
          onClick={openAssistant}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          aria-label="Abrir asistente Vision One"
          title="Abrir asistente Vision One"
        >
          <AssistantAvatar
            state={avatarState}
            mode={mode}
            size={isMobile ? 60 : 66}
            isActive={isHovering || bubbleVisible}
          />
        </button>
      </div>
    </>
  )
}
