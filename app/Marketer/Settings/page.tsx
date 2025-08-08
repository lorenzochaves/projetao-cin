"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

export default function SettingsPage() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleLogout = () => {
    console.log("User logged out successfully")
    setShowLogoutDialog(false)
    // Here you would typically redirect to login page
  }

  const handleDeleteAccount = () => {
    console.log("User account deleted successfully")
    setShowDeleteDialog(false)
    // Here you would typically handle account deletion and redirect
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/Marketer">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Configurações</h1>
        </div>
        
        <div className="space-y-1">
          <Link href="/Marketer/Settings/account">
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <span className="text-lg">Minha Conta</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          
          <Link href="/Marketer/Settings/notifications">
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <span className="text-lg">Notificação</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          
          <Link href="/Marketer/Settings/add-card">
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <span className="text-lg">Adicionar Cartão</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          
          <Link href="/Marketer/Settings/subscription/manage">
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <span className="text-lg">Assinatura</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          
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
      
      <MarketerBottomNavigation />
      
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
