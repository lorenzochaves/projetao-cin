"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  type: "cliente" | "feirante" | "entregador"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType: User["type"]) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem("feira_delivery_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("feira_delivery_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: User["type"]): Promise<boolean> => {
    try {
      // Aqui você implementaria a chamada real para sua API de autenticação
      // Por enquanto, vou simular um login bem-sucedido
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0], // Usar parte do email como nome
        email,
        type: userType
      }

      setUser(mockUser)
      localStorage.setItem("feira_delivery_user", JSON.stringify(mockUser))
      
      return true
    } catch (error) {
      console.error("Erro no login:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("feira_delivery_user")
    router.push("/login")
  }

  return {
    user,
    login,
    logout,
    isLoading
  }
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
