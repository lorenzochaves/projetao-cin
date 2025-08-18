"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export type UserType = "client" | "marketer" | "delivery"

export default function UserTypePage() {
  const router = useRouter()

  const handleUserTypeSelect = (type: UserType) => {
    // Redirecionar para página de login
    router.push('/Login')
  }

  return (
    <div className="min-h-screen relative" style={{backgroundColor: '#0327a0'}}>
      {/* Grafismo laranja no canto inferior - vazando da tela */}
      <div className="absolute -bottom-16 -right-16 overflow-hidden">
        <Image
          src="/grafismo-laranja.png"
          alt="Grafismo decorativo"
          width={200}
          height={200}
          className="object-contain transform rotate-12"
        />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
        {/* Logo FEIROU! */}
        <div className="mb-12">
          <Image
            src="/feirou-amarelo.png"
            alt="FEIROU!"
            width={280}
            height={120}
            className="object-contain"
          />
        </div>
        
        <div className="text-center mb-12">
          <p className="text-white text-lg font-medium leading-relaxed">
            Para entrar na sua conta,<br />
            selecione uma categoria abaixo:
          </p>
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          <Button
            onClick={() => handleUserTypeSelect("marketer")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full shadow-lg"
          >
            Sou feirante
          </Button>
          
          <Button
            onClick={() => handleUserTypeSelect("client")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full shadow-lg"
          >
            Sou cliente
          </Button>
          
          <Button
            onClick={() => handleUserTypeSelect("delivery")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full shadow-lg"
          >
            Sou entregador(a)
          </Button>
        </div>
      </div>
    </div>
  )
}
