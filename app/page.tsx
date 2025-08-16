"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getUserType } from "@/lib/utils"
import ClientHomePage from "@/app/Client/Homepage/ClientHomePage"
import UserTypePage from "@/app/UserType/page"
import MarketerHomePage from "./Marketer/page"

export default function RootPage() {
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState<'client' | 'marketer' | 'delivery' | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (isAuthenticated()) {
      const type = getUserType()
      setUserType(type)
      
      // Redirecionar para a página apropriada
      switch (type) {
        case 'client':
          router.push('/Client')
          break
        case 'marketer':
          router.push('/Marketer')
          break
        case 'delivery':
          router.push('/Delivery')
          break
      }
    } else {
      setUserType(null)
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Se não estiver autenticado, mostrar página de seleção de tipo
  if (!userType) {
    return <UserTypePage />
  }

  // Se estiver autenticado, mostrar página apropriada
  switch (userType) {
    case 'marketer':
      return <MarketerHomePage />
    case 'delivery':
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Área do entregador em breve</p>
        </div>
      )
    case 'client':
    default:
      return <ClientHomePage />
  }
}
