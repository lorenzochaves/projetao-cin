"use client"

import { Button } from "@/components/ui/button"
import { StatusBar } from "@/components/ui/status-bar"

export type UserType = "client" | "marketer" | "courier"

interface Props {
  onSelectUserType: (type: UserType) => void
}

export default function UserTypePage({ onSelectUserType }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-400">
      <StatusBar />
      
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center mb-12">
          <p className="text-white text-lg font-medium leading-relaxed">
            Para entrar na sua conta,<br />
            selecione uma categoria abaixo:
          </p>
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          <Button
            onClick={() => onSelectUserType("marketer")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full"
          >
            Sou feirante
          </Button>
          
          <Button
            onClick={() => onSelectUserType("client")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full"
          >
            Sou cliente
          </Button>
          
          <Button
            onClick={() => onSelectUserType("courier")}
            className="w-full h-14 bg-white text-gray-800 hover:bg-gray-100 text-lg font-medium rounded-full"
          >
            Sou entregador(a)
          </Button>
        </div>
      </div>
    </div>
  )
}
