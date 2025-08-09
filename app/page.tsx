"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Se o usuário está logado, direciona para a página apropriada
        if (user.type === "cliente") {
          router.push("/cliente")
        } else if (user.type === "feirante") {
          router.push("/feirante")
        } else if (user.type === "entregador") {
          router.push("/entregador")
        }
      } else {
        // Se não está logado, vai para a página de login
        router.push("/login")
      }
    }
  }, [user, isLoading, router])

  // Mostrar loading enquanto verifica autenticação
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  )
}
