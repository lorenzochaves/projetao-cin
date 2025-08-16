"use client"

import { useState } from "react"
import { ClientRoute } from "@/components/ProtectedRoute"
import HomepageComponent from "./HomepageComponent"
import { Screen, Feirante, CartItem } from "../types"

export default function ClientHomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedFeirante, setSelectedFeirante] = useState<Feirante | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  const handleScreenChange = (screen: Screen) => {
    console.log('🔄 Mudando para tela:', screen)
    setCurrentScreen(screen)
  }

  const handleSelectFeirante = (feirante: Feirante) => {
    console.log('👤 Feirante selecionado:', feirante)
    setSelectedFeirante(feirante)
  }

  // Por enquanto, vamos mostrar apenas a tela principal
  // e adicionar logs para debug
  if (currentScreen !== "home") {
    console.log('📱 Tela solicitada:', currentScreen)
    // Volta para home por enquanto
    setCurrentScreen("home")
  }

  return (
    <ClientRoute>
      <HomepageComponent
        cart={cart}
        onScreenChange={handleScreenChange}
        onSelectFeirante={handleSelectFeirante}
      />
    </ClientRoute>
  )
}
