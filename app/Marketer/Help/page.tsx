"use client"

import { useState } from "react"
import { ChevronLeft, Phone, MessageCircle, Book, User, Package, DollarSign, Settings, Heart, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface HelpPageProps {
  onScreenChange?: (screen: string) => void
}

export default function HelpPage({ onScreenChange }: HelpPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const helpSections = [
    {
      id: "products",
      title: "novo produto",
      icon: Package,
      content: [
        "1. Vá na aba 'Minha Feira' no menu de baixo",
        "2. Toque no botão verde 'Adicionar Novo Produto'",
        "3. Escreva o nome do produto (ex: Tomate)",
        "4. Escolha a categoria (Frutas, Verduras, etc.)",
        "5. Coloque o preço por quilo ou unidade",
        "6. Diga quantos você tem para vender",
        "7. Toque em 'Adicionar Produto'"
      ]
    },
    {
      id: "orders",
      title: "meus pedidos",
      icon: DollarSign,
      content: [
        "1. Toque na aba 'Pedidos' no menu de baixo",
        "2. Você verá todos os pedidos dos clientes",
        "3. Pedidos novos aparecem em 'Pendentes'",
        "4. Toque no pedido para ver os detalhes",
        "5. Mude o status conforme você prepara",
        "6. Marque 'Pronto' quando terminar"
      ]
    },
    {
      id: "prices",
      title: "alterar preços",
      icon: Settings,
      content: [
        "1. Vá em 'Minha Feira' no menu",
        "2. Encontre o produto que quer mudar",
        "3. Toque no botão 'Editar'",
        "4. Mude o preço para o novo valor",
        "5. Toque em 'Salvar'",
        "6. O preço novo já aparece para os clientes"
      ]
    },
    {
      id: "app",
      title: "usar app",
      icon: User,
      content: [
        "• Menu de baixo: 5 abas principais",
        "• Início: vê resumo das vendas",
        "• Pedidos: clientes que compraram",
        "• Minha Feira: seus produtos",
        "• Finanças: quanto ganhou",
        "• Perfil: suas configurações"
      ]
    }
  ]

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Buscar problema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 text-base bg-white rounded-xl border-gray-200"
          />
          <Button 
            size="sm"
            className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4"
          >
            Buscar
          </Button>
        </div>

        {/* Popular Questions */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Perguntas Populares</h2>
          
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Como cadastrar produtos?</h3>
                <p className="text-orange-100 text-sm">Aprenda a adicionar seus produtos na feira</p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => toggleSection("products")}
                  className="bg-white text-orange-600 hover:bg-gray-100 rounded-lg mt-3"
                >
                  Ver guia →
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white rounded-xl">
                <CardContent className="p-4">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Meus pedidos?</h4>
                  <p className="text-gray-600 text-xs">Acompanhe suas vendas</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl">
                <CardContent className="p-4">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Alterar preços?</h4>
                  <p className="text-gray-600 text-xs">Mude valores dos produtos</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Problem Categories */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Categoria do Problema</h2>
          
          <div className="grid grid-cols-4 gap-4">
            {filteredSections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className="bg-orange-500 rounded-xl p-3 text-left hover:bg-orange-600 transition-colors text-white"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl mx-auto mb-2 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium leading-tight uppercase block text-center px-1">
                    {section.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Expanded content */}
        {expandedSection && (
          <Card className="border border-orange-200 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const section = helpSections.find(s => s.id === expandedSection)
                  if (!section) return null
                  const Icon = section.icon
                  return (
                    <>
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <h3 className="font-bold text-gray-900">
                        {section.title}
                      </h3>
                    </>
                  )
                })()}
              </div>
              <div className="space-y-2">
                {helpSections.find(s => s.id === expandedSection)?.content.map((step, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                    {step}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Support */}
        <Card className="bg-orange-500 text-white rounded-xl">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-white" />
            <h3 className="font-bold text-lg mb-2">Precisa de ajuda?</h3>
            <p className="text-orange-100 mb-4 text-sm">Fale com nossa equipe</p>
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 rounded-lg font-medium w-full"
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
