"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Send } from "lucide-react"
import { 
  createOrGetChat, 
  sendMessage, 
  getChatMessages_ByChat, 
  markMessagesAsRead,
  getCurrentUser 
} from "@/lib/utils"
import { Chat, ChatMessage } from "@/lib/api/types"

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  feiranteId: string
  feiranteName: string
}

export function ChatModal({ 
  isOpen, 
  onClose, 
  feiranteId, 
  feiranteName 
}: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chat, setChat] = useState<Chat | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser] = useState(() => getCurrentUser())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !currentUser?.id || !feiranteId) return

    setLoading(true)
    
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
  }, [isOpen, currentUser?.id, feiranteId, feiranteName])

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] h-[75vh] flex flex-col p-0 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <DialogHeader className="px-4 py-4 border-b bg-white rounded-t-2xl">
          <div>
            <DialogTitle className="text-lg font-semibold">{feiranteName}</DialogTitle>
            <p className="text-sm text-gray-600">Online agora</p>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div className="flex-1 px-3 py-4 overflow-y-auto bg-gray-50">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando chat...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                💬
              </div>
              <h3 className="text-base font-medium text-gray-600 mb-2">
                Comece uma conversa!
              </h3>
              <p className="text-gray-500 text-sm px-2">
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
                        : 'bg-white text-gray-900 border'
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
        <div className="bg-white border-t px-3 py-3 rounded-b-2xl">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 rounded-lg text-sm"
              maxLength={500}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-3"
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
      </DialogContent>
    </Dialog>
  )
}
