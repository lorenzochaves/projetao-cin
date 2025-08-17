"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send } from "lucide-react"
import { Screen } from "../types"
import { 
  createOrGetChat, 
  sendMessage, 
  getChatMessages_ByChat, 
  markMessagesAsRead,
  getCurrentUser 
} from "@/lib/utils"
import { Chat, ChatMessage } from "@/lib/api/types"

interface ChatPageProps {
  feiranteId: string
  feiranteName: string
  onScreenChange: (screen: Screen) => void
}

export default function ChatPage({ 
  feiranteId, 
  feiranteName, 
  onScreenChange 
}: ChatPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chat, setChat] = useState<Chat | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser] = useState(() => getCurrentUser())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!currentUser?.id || !feiranteId) return

    // Criar ou obter chat existente
    const chatData = createOrGetChat(
      currentUser.id,
      feiranteId,
      `${currentUser.name} ${currentUser.surname}`,
      feiranteName
    )
    setChat(chatData)

    // Carregar mensagens
    const chatMessages = getChatMessages_ByChat(chatData.id)
    setMessages(chatMessages)

    // Marcar mensagens como lidas
    markMessagesAsRead(chatData.id, currentUser.id)

    setLoading(false)
  }, []) // Executar apenas uma vez

  useEffect(() => {
    // Auto scroll para a última mensagem
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chat || !currentUser) return

    const message = sendMessage(
      chat.id,
      currentUser.id,
      `${currentUser.name} ${currentUser.surname}`,
      'client',
      newMessage.trim()
    )

    setMessages(prev => [...prev, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando chat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 pt-12">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onScreenChange("feirante")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{feiranteName}</h1>
            <p className="text-sm text-gray-600">Online agora</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              💬
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Comece uma conversa!
            </h3>
            <p className="text-gray-500 text-sm">
              Envie uma mensagem para {feiranteName} e tire suas dúvidas sobre os produtos.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderType === 'client' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.senderType === 'client'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderType === 'client' 
                      ? 'text-orange-100' 
                      : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            maxLength={500}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {newMessage.length > 400 && (
          <p className="text-xs text-gray-500 mt-1">
            {500 - newMessage.length} caracteres restantes
          </p>
        )}
      </div>
    </div>
  )
}
