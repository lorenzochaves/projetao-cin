"use client"

import { useState } from "react"
import { Screen, Feirante, Product, CartItem } from "../types"

// Components
import HomePage from "./HomepageComponent"
import FeirantePage from "../Feirantes/FeiranteComponent"
import FeiranteProfilePage from "../Feirantes/profile/FeiranteProfileComponent"
import FeiranteSearchPage from "../Feirantes/search/FeiranteSearchComponent"
import GlobalSearchPage from "../Search/GlobalSearchComponent"
import ProductPage from "../Products/ProductsComponent"
import CartPage from "../Cart/CartComponent"
import DeliveryPage from "../Checkout/delivery/DeliveryComponent"
import SchedulePage from "../Checkout/schedule/ScheduleComponent"
import PaymentPage from "../Checkout/payment/PaymentComponent"
import SuccessPage from "../Checkout/success/SuccessComponent"
import ProfilePage from "../Profile/ClientProfileComponent"

export default function ClientHomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedFeirante, setSelectedFeirante] = useState<Feirante | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showObservationModal, setShowObservationModal] = useState(false)
  const [currentObservation, setCurrentObservation] = useState("")
  const [searchHistory, setSearchHistory] = useState([
    "Couve-folha",
    "Seu Nino",
    "Morango",
    "Alface",
    "Batata inglesa grande",
  ])
  const [showSearchHistory, setShowSearchHistory] = useState(false)

  // Cart functions
  const addToCart = (product: Product, feirante: string, observation?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.feirante === feirante)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.feirante === feirante
            ? { ...item, quantity: item.quantity + 1, observation: observation || item.observation }
            : item,
        )
      }
      return [...prev, { ...product, quantity: 1, feirante, observation }]
    })
  }

  const updateQuantity = (id: string, feirante: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.feirante === feirante
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id: string, feirante: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.feirante === feirante)))
  }

  const clearCart = () => {
    setCart([])
  }

  const handleAddToCart = (product: Product, feirante: string) => {
    setSelectedProduct(product)
    setCurrentObservation("")
    setShowObservationModal(true)
  }

  const confirmAddToCart = () => {
    if (selectedProduct && selectedFeirante) {
      addToCart(selectedProduct, selectedFeirante.name, currentObservation)
      setShowObservationModal(false)
      setCurrentScreen("feirante")
    }
  }

  // Search functions
  const addToSearchHistory = (term: string) => {
    if (term && !searchHistory.includes(term)) {
      setSearchHistory((prev) => [term, ...prev.slice(0, 4)])
    }
  }

  const removeFromSearchHistory = (term: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== term))
  }

  // Screen routing
  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const handleSelectFeirante = (feirante: Feirante) => {
    setSelectedFeirante(feirante)
  }

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
  }

  // Render current screen
  if (currentScreen === "home") {
    return (
      <HomePage
        cart={cart}
        onScreenChange={handleScreenChange}
        onSelectFeirante={handleSelectFeirante}
      />
    )
  }

  if (currentScreen === "feirante" && selectedFeirante) {
    return (
      <FeirantePage
        selectedFeirante={selectedFeirante}
        cart={cart}
        searchQuery={searchQuery}
        onScreenChange={handleScreenChange}
        onSelectProduct={handleSelectProduct}
        onSearchChange={setSearchQuery}
      />
    )
  }

  if (currentScreen === "feirante-profile" && selectedFeirante) {
    return (
      <FeiranteProfilePage
        selectedFeirante={selectedFeirante}
        cart={cart}
        onScreenChange={handleScreenChange}
      />
    )
  }

  if (currentScreen === "feirante-search" && selectedFeirante) {
    return (
      <FeiranteSearchPage
        selectedFeirante={selectedFeirante}
        cart={cart}
        searchQuery={searchQuery}
        showSearchHistory={showSearchHistory}
        onScreenChange={handleScreenChange}
        onSelectProduct={handleSelectProduct}
        onSearchChange={setSearchQuery}
        onShowSearchHistoryChange={setShowSearchHistory}
      />
    )
  }

  if (currentScreen === "global-search") {
    return (
      <GlobalSearchPage
        cart={cart}
        searchQuery={searchQuery}
        showSearchHistory={showSearchHistory}
        searchHistory={searchHistory}
        onScreenChange={handleScreenChange}
        onSelectFeirante={handleSelectFeirante}
        onSearchChange={setSearchQuery}
        onShowSearchHistoryChange={setShowSearchHistory}
        onRemoveFromSearchHistory={removeFromSearchHistory}
      />
    )
  }

  if (currentScreen === "product" && selectedProduct) {
    return (
      <ProductPage
        selectedProduct={selectedProduct}
        selectedFeirante={selectedFeirante}
        cart={cart}
        showObservationModal={showObservationModal}
        currentObservation={currentObservation}
        onScreenChange={handleScreenChange}
        onAddToCart={handleAddToCart}
        onObservationModalChange={setShowObservationModal}
        onObservationChange={setCurrentObservation}
        onConfirmAddToCart={confirmAddToCart}
      />
    )
  }

  if (currentScreen === "cart") {
    return (
      <CartPage
        cart={cart}
        onScreenChange={handleScreenChange}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
      />
    )
  }

  if (currentScreen === "delivery") {
    return (
      <DeliveryPage
        cart={cart}
        onScreenChange={handleScreenChange}
      />
    )
  }

  if (currentScreen === "schedule") {
    return (
      <SchedulePage
        cart={cart}
        onScreenChange={handleScreenChange}
      />
    )
  }

  if (currentScreen === "payment") {
    return (
      <PaymentPage
        cart={cart}
        onScreenChange={handleScreenChange}
      />
    )
  }

  if (currentScreen === "success") {
    return (
      <SuccessPage
        cart={cart}
        onScreenChange={handleScreenChange}
      />
    )
  }

  if (currentScreen === "profile") {
    return (
      <ProfilePage
        cart={cart}
        onScreenChange={handleScreenChange}
      />
    )
  }

  return null
}
