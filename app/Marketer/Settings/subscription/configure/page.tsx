"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"

export default function ConfigureSubscriptionPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/Marketer/Settings">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Configurar Assinatura</h1>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium mb-2">Plano</h2>
            <p className="text-gray-600">Mensalmente R$ 12,99</p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-2">Data de Renovação</h2>
            <p className="text-gray-600">30 de julho de 2025</p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4">Gerenciar</h2>
            <div className="space-y-2">
              <button className="text-blue-600">Atualizar</button>
              <br />
              <button className="text-blue-600">Cancelar</button>
            </div>
          </div>
          
          <div className="pt-16">
            <Link href="/Marketer/Settings">
              <div className="flex items-center justify-between py-4">
                <span className="text-lg">Voltar às Configurações</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <MarketerBottomNavigation />
    </div>
  )
}
