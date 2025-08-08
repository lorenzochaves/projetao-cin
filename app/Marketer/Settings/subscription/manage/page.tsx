"use client"

import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"

export default function ManageSubscriptionPage() {
  const handleSubscribe = () => {
    console.log("User subscribed successfully")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/Marketer/Settings">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Assinatura</h1>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium mb-2">Assinatura</h2>
            <p className="text-xl font-bold mb-2">R$ 12,99 por mês</p>
            <p className="text-gray-600 text-sm">
              Oferecemos benefícios exclusivos para o seu empreendimento.
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4">Benefícios</h2>
            <p className="text-gray-600 text-sm">
              Seu mercado ganhará destaque na nossa página de recomendações e você conseguirá mais clientes.
            </p>
          </div>
          
          <div className="pt-8">
            <Button 
              onClick={handleSubscribe}
              className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-lg"
            >
              Assinar
            </Button>
          </div>
        </div>
      </div>
      
      <MarketerBottomNavigation />
    </div>
  )
}
