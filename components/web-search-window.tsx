"use client"

import { useState, useRef, useEffect } from "react"
import { X, Minus, Search, Globe, GripHorizontal } from "lucide-react"

interface Props {
  onClose: () => void
}

export function WebSearchWindow({ onClose }: Props) {
  const [position, setPosition] = useState({ x: 240, y: 80 })
  const [size, setSize] = useState({ width: 860, height: 620 })
  const [minimized, setMinimized] = useState(false)
  const [query, setQuery] = useState("")
  const [iframeUrl, setIframeUrl] = useState("https://www.google.com/webhp?igu=1")
  const [blocked, setBlocked] = useState(false)

  const dragging = useRef(false)
  const resizing = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeOrigin = useRef({ mx: 0, my: 0, w: 0, h: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        })
      }
      if (resizing.current) {
        setSize({
          width: Math.max(480, resizeOrigin.current.w + (e.clientX - resizeOrigin.current.mx)),
          height: Math.max(320, resizeOrigin.current.h + (e.clientY - resizeOrigin.current.my)),
        })
      }
    }
    const onUp = () => {
      dragging.current = false
      resizing.current = false
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [])

  const startDrag = (e: React.MouseEvent) => {
    dragging.current = true
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation()
    resizing.current = true
    resizeOrigin.current = { mx: e.clientX, my: e.clientY, w: size.width, h: size.height }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setBlocked(false)
    setIframeUrl(`https://www.google.com/search?q=${encodeURIComponent(query.trim())}&igu=1`)
  }

  return (
    <div
      className="fixed z-[9999] flex flex-col rounded-xl overflow-hidden border border-border shadow-2xl bg-background"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: minimized ? 48 : size.height,
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={startDrag}
        className="flex items-center gap-2 px-3 h-12 bg-muted/80 border-b border-border cursor-move select-none shrink-0 backdrop-blur-sm"
      >
        <GripHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
        <Globe className="h-4 w-4 text-muted-foreground shrink-0" />

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          onMouseDown={(e) => e.stopPropagation()}
          className="flex flex-1 items-center gap-2"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Google..."
            className="flex-1 text-sm bg-background border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Window controls */}
        <div onMouseDown={(e) => e.stopPropagation()} className="flex items-center gap-1 ml-1">
          <button
            onClick={() => setMinimized((v) => !v)}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            title={minimized ? "Restore" : "Minimise"}
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* iframe / blocked notice */}
      {!minimized && (
        <div className="relative flex-1 overflow-hidden">
          {blocked ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground text-sm px-6 text-center">
              <Globe className="h-10 w-10 opacity-40" />
              <p className="font-medium text-foreground">Google blocked the embed</p>
              <p>
                Google prevents direct iframe embedding. Try searching via the bar above — or{" "}
                <a
                  href={iframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-foreground"
                >
                  open in a new tab
                </a>
                .
              </p>
            </div>
          ) : (
            <iframe
              key={iframeUrl}
              src={iframeUrl}
              title="Google Search"
              className="w-full h-full border-none"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              onError={() => setBlocked(true)}
            />
          )}

          {/* Resize handle */}
          <div
            onMouseDown={startResize}
            className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize flex items-end justify-end p-0.5 text-muted-foreground hover:text-foreground"
          >
            <svg viewBox="0 0 10 10" className="w-3 h-3">
              <path fill="currentColor" d="M0 10L10 0V10H0z" opacity="0.4" />
              <path fill="currentColor" d="M4 10L10 4V10H4z" opacity="0.7" />
              <path fill="currentColor" d="M8 10L10 8V10H8z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
