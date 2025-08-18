"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { logout } from "@/lib/utils"

interface MarketerSettingsPageProps {
  onScreenChange?: (screen: string) => void
}

export default function MarketerSettingsPage({ onScreenChange }: MarketerSettingsPageProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleLogout = () => {
    logout()
    setShowLogoutDialog(false)
    // Redirect to login page
    window.location.href = '/Login'
  }

  const handleDeleteAccount = () => {
    console.log("User account deleted successfully")
    setShowDeleteDialog(false)
    // Here you would typically handle account deletion and redirect
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-4 py-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => onScreenChange?.("home")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Configurações</h1>
        </div>
        
        <div className="space-y-1">
          <button 
            onClick={() => {/* TODO: Implementar navegação interna */}}
            className="flex items-center justify-between py-4 border-b border-gray-100 w-full text-left"
          >
            <span className="text-lg">Minha Conta</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          
          <button 
            onClick={() => {/* TODO: Implementar navegação interna */}}
            className="flex items-center justify-between py-4 border-b border-gray-100 w-full text-left"
          >
            <span className="text-lg">Notificação</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          
          <button 
            onClick={() => {/* TODO: Implementar navegação interna */}}
            className="flex items-center justify-between py-4 border-b border-gray-100 w-full text-left"
          >
            <span className="text-lg">Adicionar Cartão</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          
          <button 
            onClick={() => setShowLogoutDialog(true)}
            className="flex items-center justify-between py-4 border-b border-gray-100 w-full text-left"
          >
            <span className="text-lg">Sair</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          
          <button 
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center justify-between py-4 w-full text-left"
          >
            <span className="text-lg">Excluir Conta</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
      
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
        title="Tem certeza que deseja excluir sua conta?"
      />
    </div>
  )
}
