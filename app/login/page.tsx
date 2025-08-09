"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  ShoppingBasket, 
  Store, 
  Truck, 
  User,
  ChevronRight,
  Mail,
  Eye,
  EyeOff
} from "lucide-react"

type UserType = "cliente" | "feirante" | "entregador" | null

interface User {
  id: string
  name: string
  email: string
  type: "cliente" | "feirante" | "entregador"
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const router = useRouter()

  const login = async (email: string, password: string, userType: User["type"]): Promise<boolean> => {
    try {
      // Simular login bem-sucedido
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0], // Usar parte do email como nome
        email,
        type: userType
      }

      localStorage.setItem("feira_delivery_user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Erro no login:", error)
      return false
    }
  }

  const userTypes = [
    {
      type: "cliente" as const,
      title: "Cliente",
      description: "Comprar na feira",
      icon: ShoppingBasket,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200"
    },
    {
      type: "feirante" as const,
      title: "Feirante",
      description: "Vender produtos",
      icon: Store,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    {
      type: "entregador" as const,
      title: "Entregador",
      description: "Fazer entregas",
      icon: Truck,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200"
    }
  ]

  const handleLogin = async () => {
    if (!email || !password || !selectedUserType) return
    
    setIsLoading(true)
    setError("")
    
    try {
      const success = await login(email, password, selectedUserType)
      
      if (success) {
        // Redirecionamento baseado no tipo de usuário
        if (selectedUserType === "cliente") {
          router.push("/cliente")
        } else if (selectedUserType === "feirante") {
          router.push("/feirante")
        } else if (selectedUserType === "entregador") {
          router.push("/entregador")
        }
      } else {
        setError("Email ou senha incorretos")
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = email && password && selectedUserType

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Logo/Header */}
        <div className="text-center mb-12 pt-8">
          <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <ShoppingBasket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feira Delivery</h1>
          <p className="text-gray-600">Sua feira fresh, na sua casa</p>
        </div>

        {/* Seleção do tipo de usuário */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Como você quer acessar?
          </h2>
          <div className="space-y-3">
            {userTypes.map((userType) => {
              const Icon = userType.icon
              const isSelected = selectedUserType === userType.type
              
              return (
                <Card
                  key={userType.type}
                  className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                    isSelected 
                      ? `${userType.borderColor} ${userType.bgColor}` 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedUserType(userType.type)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${userType.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isSelected ? userType.textColor : "text-gray-900"}`}>
                        {userType.title}
                      </h3>
                      <p className={`text-sm ${isSelected ? userType.textColor : "text-gray-600"}`}>
                        {userType.description}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      isSelected 
                        ? `${userType.color} border-transparent` 
                        : "border-gray-300"
                    } flex items-center justify-center`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Formulário de login */}
        <div className="space-y-4 mb-8">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Botão de login */}
        <Button
          onClick={handleLogin}
          disabled={!isFormValid || isLoading}
          className={`w-full h-12 rounded-xl font-semibold text-lg transition-all duration-200 ${
            isFormValid
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Entrando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Entrar
              <ChevronRight className="w-5 h-5" />
            </div>
          )}
        </Button>

        {/* Links adicionais */}
        <div className="text-center mt-6 space-y-4">
          <button className="text-green-600 hover:text-green-700 font-medium">
            Esqueci minha senha
          </button>
          
          <div className="flex items-center gap-2 text-gray-600">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm">ou</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          <p className="text-gray-600">
            Não tem conta?{" "}
            <button className="text-green-600 hover:text-green-700 font-medium">
              Cadastre-se
            </button>
          </p>
        </div>

        {/* Informações sobre os tipos de usuário */}
        {selectedUserType && (
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                {selectedUserType === "cliente" && "Acesso do Cliente"}
                {selectedUserType === "feirante" && "Acesso do Feirante"}
                {selectedUserType === "entregador" && "Acesso do Entregador"}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedUserType === "cliente" && "Navegue pelos feirantes, monte sua feira e receba em casa"}
                {selectedUserType === "feirante" && "Gerencie seus produtos, pedidos e vendas"}
                {selectedUserType === "entregador" && "Visualize entregas disponíveis e gerencie suas rotas"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
