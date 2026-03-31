"use client"

import { useState } from "react"
import { Bot, FileUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { askTutor } from "@/app/actions/gemini"

export function AiTutor() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hello! I'm your AI Tutor. Ask me anything about your courses or upload a document." },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isTyping) return
    
    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsTyping(true)

    try {
      const result = await askTutor(userMessage)
      if (result.success) {
        setMessages((prev) => [...prev, { role: "ai", content: result.response! }])
      } else {
        setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I'm having trouble thinking right now." }])
      }
    } catch (error) {
       setMessages((prev) => [...prev, { role: "ai", content: "An error occurred." }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Tutor
            </CardTitle>
            <CardDescription>Powered by Gemini 1.5 Flash</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <FileUp className="h-4 w-4 mr-2" />
            Upload PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted max-w-[80%] rounded-lg px-4 py-2 text-sm italic text-muted-foreground animate-pulse">
              Gemini is thinking...
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
