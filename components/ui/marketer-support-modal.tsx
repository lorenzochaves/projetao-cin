"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Send, Phone, Mail, MessageCircle, Book, HelpCircle, ChevronRight, Package, Store, BarChart3, CreditCard } from "lucide-react"

interface MarketerSupportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MarketerSupportModal({ isOpen, onClose }: MarketerSupportModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const supportCategories = [
    {
      id: "produtos",
      title: "Produtos e Estoque",
      icon: <Package className="w-5 h-5" />,
      description: "Cadastro de produtos, preços, gestão de estoque"
    },
    {
      id: "pedidos",
      title: "Gestão de Pedidos",
      icon: <MessageCircle className="w-5 h-5" />,
      description: "Problemas com pedidos recebidos, status, entregas"
    },
    {
      id: "pagamentos",
      title: "Pagamentos e Financeiro",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Recebimentos, taxas, extrato financeiro"
    },
    {
      id: "loja",
      title: "Perfil da Loja",
      icon: <Store className="w-5 h-5" />,
      description: "Informações da loja, horários, configurações"
    }
  ]

  const faqItems = [
    {
      question: "Como adicionar novos produtos?",
      answer: "Acesse 'Minha Feira' > 'Adicionar Produto'. Preencha todas as informações e adicione fotos atrativas para aumentar as vendas."
    },
    {
      question: "Quando recebo o pagamento?",
      answer: "Os pagamentos são transferidos em até 2 dias úteis após a confirmação da entrega pelo cliente."
    },
    {
      question: "Como gerenciar meu estoque?",
      answer: "Em 'Minha Feira' você pode visualizar e editar a quantidade de cada produto. O sistema atualiza automaticamente conforme as vendas."
    },
    {
      question: "O que fazer quando recebo um pedido?",
      answer: "Acesse 'Pedidos', confirme a disponibilidade, prepare o pedido e atualize o status para 'Pronto' para notificar o cliente."
    },
    {
      question: "Como alterar preços dos produtos?",
      answer: "Vá em 'Minha Feira' > selecione o produto > 'Editar'. Você pode ajustar preços a qualquer momento."
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
      <DialogContent className="max-w-sm w-[85%] h-[80vh] flex flex-col p-0 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-6 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-4 py-4 border-b bg-white">
          <DialogTitle className="text-lg font-semibold">Central de Ajuda - Vendedor</DialogTitle>
          <p className="text-sm text-gray-600">Como podemos te ajudar?</p>
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
                    <span className="text-gray-700">(81) 3333-4444</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">vendedor@feirapp.com</span>
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
