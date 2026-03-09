"use client"

import { useChat } from "@ai-sdk/react"
import { useChatSidebar } from "@/lib/zustand/store"
import { DefaultChatTransport, isTextUIPart } from "ai"
import { Bot, Send, X, Loader2 } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ChatSidebar() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const { open, closeChat } = useChatSidebar()
  const [input, setInput] = useState("")
  const isLoading = status === "submitted" || status === "streaming"
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return
    setInput("")
    sendMessage({ text })
  }
  function HandleOpen() {
    // use useChatSidebar().openChat() from any component to open
  }
  function HandleClose() {
    closeChat()
  }

  return (
    <div className={cn("fixed right-0 top-0 flex h-screen w-80 flex-col border-l bg-background z-[9999]", !open && "hidden")}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary">
            <Bot className="size-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">Stamp AI</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => HandleClose()}
          title="Clear chat"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center text-muted-foreground">
            <Bot className="size-10 opacity-30" />
            <div>
              <p className="text-sm font-medium">Ask me anything!</p>
              <p className="text-xs mt-1">I&apos;m here to help with your studies.</p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          const text = message.parts.filter(isTextUIPart).map((p) => p.text).join("")
          if (!text) return null
          return (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-1",
                message.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                )}
              >
                {text}
              </div>
            </div>
          )
        })}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend() }}
          className="flex items-end gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            className="flex-1 resize-none rounded-xl border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring min-h-[38px] max-h-[120px]"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="size-9 shrink-0 rounded-xl"
          >
            <Send className="size-4" />
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
