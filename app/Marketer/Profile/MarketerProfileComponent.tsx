"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  ChevronRight, 
  Store, 
  User, 
  CreditCard, 
  BarChart3, 
  Package,
  Settings,
  HelpCircle,
  LogOut,
  TrendingUp
} from "lucide-react"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { MarketerSupportModal } from "@/components/ui/marketer-support-modal"
import { MarketerSettingsModal } from "@/components/ui/marketer-settings-modal"
import { MarketerAccountModal } from "@/components/ui/marketer-account-modal"
import { getCurrentUser, getUsers } from "@/lib/utils"

interface MarketerProfileComponentProps {
  onScreenChange?: (screen: string) => void
}

export default function MarketerProfileComponent({ onScreenChange }: MarketerProfileComponentProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Carregar dados reais do usuário logado
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.type === 'marketer') {
      console.log('🔍 Usuário feirante logado:', currentUser)
      setUser(currentUser)
    } else {
      // Fallback para dados mock se não houver usuário logado
      console.log('⚠️ Nenhum usuário feirante logado, usando dados mock')
      setUser({
        id: "3",
        name: "João Silva",
        stallName: "João da Horta",
        email: "joao.feira@email.com",
        phone: "(81) 98888-8888",
        avatar: "https://media.gettyimages.com/id/1369521370/pt/foto/portrait-of-a-seller-at-a-street-market.jpg?s=612x612&w=0&k=20&c=69d5S9_4FICYD7PlYYxhpLhPU7gt-isY9mEE21theoM="
      })
    }
  }, [])

  const handleLogout = () => {
    console.log("Vendor logged out successfully")
    setShowLogoutDialog(false)
    // Redirect to login
  }

  const handleDeleteAccount = () => {
    console.log("Vendor account deleted successfully")
    setShowDeleteDialog(false)
    // Handle account deletion
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="p-4 pt-12">
        <div className="text-center mb-8">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl bg-orange-100 text-orange-700">
              {user.name?.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-orange-600 font-medium">{user.stallName || "João da Horta"}</p>
          <p className="text-gray-600">Vendedor desde {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Junho 2024'}</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onScreenChange?.("my-store")}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Store className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Minha Feira</p>
                <p className="text-sm text-gray-600">Produtos e estoque</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => onScreenChange?.("orders")}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Pedidos</p>
                <p className="text-sm text-gray-600">Gerir pedidos recebidos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => onScreenChange?.("finance")}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Finanças</p>
                <p className="text-sm text-gray-600">Vendas e recebimentos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowAccountModal(true)}
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Informações da Conta</p>
                <p className="text-sm text-gray-600">Dados pessoais e contato</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Relatórios</p>
                <p className="text-sm text-gray-600">Análises e estatísticas</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="mt-8 pt-4 border-t space-y-4">
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors rounded-lg"
          >
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-orange-600" />
            </div>
            <p className="font-medium text-orange-700">Configurações</p>
          </button>
          <button 
            onClick={() => setShowSupportModal(true)}
            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors rounded-lg"
          >
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-orange-600">Suporte</p>
          </button>
          <button 
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center gap-3 p-2 hover:bg-red-50 transition-colors rounded-lg border-t pt-4 mt-4"
          >
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-red-600 font-medium">Sair da conta</p>
          </button>
        </div>
      </div>

      {/* Modals */}
      <MarketerSupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />

      <MarketerSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      <MarketerAccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
      
      <ConfirmationDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Tem certeza que deseja sair da sua conta?"
      />
      
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
      />
    </div>
  )
}
