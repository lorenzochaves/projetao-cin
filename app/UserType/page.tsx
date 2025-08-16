"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export type UserType = "client" | "marketer" | "delivery"

export default function UserTypePage() {
  const router = useRouter()

  const handleUserTypeSelect = (type: UserType) => {
    // Redirecionar para página de login
    router.push('/Login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-400">
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center mb-12">
          <h1 className="text-white text-3xl font-bold mb-4">
            Bem-vindo à Feira!
          </h1>
          <p className="text-white text-lg font-medium leading-relaxed">
            Para entrar na sua conta,<br />
            selecione uma categoria abaixo:
          </p>
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          <Button
            onClick={() => handleUserTypeSelect("marketer")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full"
          >
            Sou feirante
          </Button>
          
          <Button
            onClick={() => handleUserTypeSelect("client")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full"
          >
            Sou cliente
          </Button>
          
          <Button
            onClick={() => handleUserTypeSelect("delivery")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full"
          >
            Sou entregador(a)
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white text-sm opacity-90">
            Todos os tipos de usuário fazem login na mesma página
          </p>
        </div>
      </div>
    </div>
  )
}
