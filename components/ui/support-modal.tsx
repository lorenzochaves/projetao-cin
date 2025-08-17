"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Send, Phone, Mail, MessageCircle, Book, HelpCircle, ChevronRight } from "lucide-react"

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const supportCategories = [
    {
      id: "pedidos",
      title: "Problemas com Pedidos",
      icon: <MessageCircle className="w-5 h-5" />,
      description: "Atrasos, cancelamentos, problemas na entrega"
    },
    {
      id: "pagamento",
      title: "Pagamento e Cobrança",
      icon: <HelpCircle className="w-5 h-5" />,
      description: "Dúvidas sobre formas de pagamento, estornos"
    },
    {
      id: "conta",
      title: "Minha Conta",
      icon: <Book className="w-5 h-5" />,
      description: "Dados pessoais, endereços, configurações"
    },
    {
      id: "vendedores",
      title: "Vendedores e Produtos",
      icon: <MessageCircle className="w-5 h-5" />,
      description: "Qualidade dos produtos, atendimento dos vendedores"
    }
  ]

  const faqItems = [
    {
      question: "Como cancelar um pedido?",
      answer: "Você pode cancelar pedidos que ainda não foram aceitos pelo vendedor. Vá em 'Meus Pedidos' > 'Detalhes' > 'Cancelar Pedido'."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "O prazo varia de acordo com o vendedor e sua localização. Geralmente é de 1-3 horas para produtos da feira."
    },
    {
      question: "Como alterar meu endereço?",
      answer: "Acesse 'Perfil' > 'Endereços' > 'Editar' ou adicione um novo endereço durante o checkout."
    },
    {
      question: "Posso pagar na entrega?",
      answer: "Sim! Oferecemos pagamento em dinheiro, cartão na entrega ou Pix antecipado."
    },
    {
      question: "Como avaliar um pedido?",
      answer: "Após receber seu pedido, você pode avaliá-lo em 'Meus Pedidos' > 'Histórico' > 'Avaliar'."
    }
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return
    // Aqui você implementaria o envio da mensagem
    setMessage("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] h-[80vh] flex flex-col p-0 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <DialogHeader className="px-4 py-4 border-b bg-white rounded-t-2xl">
          <div>
            <DialogTitle className="text-lg font-semibold">Central de Ajuda</DialogTitle>
            <p className="text-sm text-gray-600">Como podemos te ajudar?</p>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 px-3 py-4 overflow-y-auto bg-gray-50">
          {!selectedCategory ? (
            <div className="space-y-4">
              {/* Contato rápido */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3">Contato Direto</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">(81) 99999-9999</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">ajuda@feirapp.com</span>
                  </div>
                </div>
              </div>

              {/* Categorias de suporte */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Categorias</h3>
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full bg-white rounded-lg p-4 shadow-sm text-left hover:bg-orange-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-orange-500">{category.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-900">{category.title}</h4>
                          <p className="text-xs text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>

              {/* FAQ */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Perguntas Frequentes</h3>
                <div className="space-y-2">
                  {faqItems.map((item, index) => (
                    <details key={index} className="bg-white rounded-lg shadow-sm">
                      <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                        {item.question}
                      </summary>
                      <div className="px-4 pb-4 text-sm text-gray-600">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="text-orange-500 p-0"
              >
                ← Voltar
              </Button>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">
                  {supportCategories.find(c => c.id === selectedCategory)?.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Descreva seu problema em detalhes para que possamos te ajudar melhor.
                </p>
                
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descreva seu problema aqui..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:border-orange-300 focus:ring-orange-200 transition-colors"
                  maxLength={500}
                />
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {message.length}/500 caracteres
                  </span>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
