"use client"

import { useState, useEffect } from "react"
import { ClientRoute } from "@/components/ProtectedRoute"
import HomepageComponent from "./HomepageComponent"
import { Screen, Feirante, Product } from "../types"
import { useCart } from "@/hooks/api/useCart"

// Importar os componentes das diferentes telas
import FeiranteComponent from "../Feirantes/FeiranteComponent"
import CartComponent from "../Cart/CartComponent"
import ClientProfileComponent from "../Profile/ClientProfileComponent"
import GlobalSearchComponent from "../Search/GlobalSearchComponent"
import ProductsComponent from "../Products/ProductsComponent"

// Importar componentes de checkout
import DeliveryComponent from "../Checkout/delivery/DeliveryComponent"
import ScheduleComponent from "../Checkout/schedule/ScheduleComponent"
import PaymentComponent from "../Checkout/payment/PaymentComponent"
import SuccessComponent from "../Checkout/success/SuccessComponent"

// Importar componentes do perfil
import OrdersComponent from "../Profile/orders/OrdersComponent"
import AccountComponent from "../Profile/account/AccountComponent" 
import AddressesComponent from "../Profile/addresses/AddressesComponent"
import FavoritesComponent from "../Profile/favorites/FavoritesComponent"
import ProfilePaymentComponent from "../Profile/payment/PaymentComponent"

// Importar componentes de feirantes
import FeiranteProfileComponent from "../Feirantes/profile/FeiranteProfileComponent"
import FeiranteSearchComponent from "../Feirantes/search/FeiranteSearchComponent"

export default function ClientHomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedFeirante, setSelectedFeirante] = useState<Feirante | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart()
  
  // Estados para busca
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchHistory, setShowSearchHistory] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  
  // Estados para produtos
  const [showObservationModal, setShowObservationModal] = useState(false)
  const [currentObservation, setCurrentObservation] = useState("")

  // Carregar dados do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {      
      const savedSearchHistory = localStorage.getItem('feira_search_history')
      if (savedSearchHistory) {
        try {
          setSearchHistory(JSON.parse(savedSearchHistory))
        } catch (error) {
          console.error('Erro ao carregar histórico de busca:', error)
        }
      }
    }
  }, [])

  // Forçar re-render quando o carrinho mudar (mas não duplicar o localStorage)
  useEffect(() => {
    // Apenas para triggering re-render dos componentes filhos
  }, [cart])

  const handleScreenChange = (screen: Screen) => {
    console.log('🔄 Mudando para tela:', screen)
    setCurrentScreen(screen)
  }

  const handleSelectFeirante = (feirante: Feirante) => {
    console.log('👤 Feirante selecionado:', feirante)
    setSelectedFeirante(feirante)
    setCurrentScreen("feirante")
  }

  const handleSelectProduct = (product: Product) => {
    console.log('📦 Produto selecionado:', product)
    setSelectedProduct(product)
    setCurrentScreen("product")
  }

  // Função para adicionar produto ao carrinho (compatível com ProductsComponent)
  const handleAddToCartFromProducts = (product: Product, feiranteName: string) => {
    if (selectedFeirante) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        feiranteId: selectedFeirante.id,
        feiranteName: selectedFeirante.name,
        image: product.image
      }, 1)
    }
    setCurrentObservation("")
    if (showObservationModal) {
      setShowObservationModal(false)
    }
  }

  // Função para adicionar produto ao carrinho (atualizada para usar useCart)
  const handleAddToCart = (product: Product, feirante: Feirante) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      feiranteId: feirante.id,
      feiranteName: feirante.name,
      image: product.image
    }, 1)
    setCurrentObservation("")
    if (showObservationModal) {
      setShowObservationModal(false)
    }
  }

  // Função para atualizar quantidade (compatível com CartComponent)
  const handleUpdateQuantity = (productId: string, feiranteName: string, change: number) => {
    const cartItem = cart.items.find(item => item.productId === productId && item.feiranteName === feiranteName)
    if (cartItem) {
      const newQuantity = Math.max(0, cartItem.quantity + change)
      updateQuantity(productId, newQuantity)
    }
  }

  // Função para remover do carrinho (compatível com CartComponent)
  const handleRemoveFromCart = (productId: string, feiranteName: string) => {
    removeFromCart(productId)
  }

  // Função para limpar carrinho
  const handleClearCart = () => {
    clearCart()
  }

  // Função auxiliar para converter cart para o formato esperado pelos componentes
  const convertCartForComponents = () => {
    return cart.items.map(item => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      unit: item.unit,
      image: item.image,
      category: 'geral',
      quantity: item.quantity,
      feirante: item.feiranteName,
      observation: item.observation
    }))
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    
    // Adicionar ao histórico quando o usuário buscar
    if (query && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory.slice(0, 4)]
      setSearchHistory(newHistory)
      if (typeof window !== 'undefined') {
        localStorage.setItem('feira_search_history', JSON.stringify(newHistory))
      }
    }
  }

  const handleRemoveFromSearchHistory = (term: string) => {
    const newHistory = searchHistory.filter(item => item !== term)
    setSearchHistory(newHistory)
    if (typeof window !== 'undefined') {
      localStorage.setItem('feira_search_history', JSON.stringify(newHistory))
    }
  }

  // Renderizar a tela baseada no estado atual
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomepageComponent
            cart={cart.items.map(item => ({
              id: item.productId,
              name: item.name,
              price: item.price,
              unit: item.unit,
              image: item.image,
              category: 'geral',
              quantity: item.quantity,
              feirante: item.feiranteName,
              observation: item.observation
            }))}
            onScreenChange={handleScreenChange}
            onSelectFeirante={handleSelectFeirante}
            currentScreen={currentScreen}
          />
        )
      
      case "feirante":
        return selectedFeirante ? (
          <FeiranteComponent
            selectedFeirante={selectedFeirante}
            cart={convertCartForComponents()}
            searchQuery={searchQuery}
            onScreenChange={handleScreenChange}
            onSelectProduct={handleSelectProduct}
            onSearchChange={handleSearchChange}
          />
        ) : (
          <HomepageComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
            onSelectFeirante={handleSelectFeirante}
          />
        )
      
      case "cart":
        return (
          <CartComponent
            cart={cart.items.map(item => ({
              id: item.productId,
              name: item.name,
              price: item.price,
              unit: item.unit,
              image: item.image,
              category: 'geral',
              quantity: item.quantity,
              feirante: item.feiranteName,
              observation: item.observation
            }))}
            onScreenChange={handleScreenChange}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        )
      
      case "profile":
        return (
          <ClientProfileComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )
      
      case "global-search":
        return (
          <GlobalSearchComponent
            searchQuery={searchQuery}
            showSearchHistory={showSearchHistory}
            searchHistory={searchHistory}
            onScreenChange={handleScreenChange}
            onSelectFeirante={handleSelectFeirante}
            onSearchChange={handleSearchChange}
            onShowSearchHistoryChange={setShowSearchHistory}
            onRemoveFromSearchHistory={handleRemoveFromSearchHistory}
          />
        )

      case "product":
        return selectedProduct && selectedFeirante ? (
          <ProductsComponent
            selectedProduct={selectedProduct}
            selectedFeirante={selectedFeirante}
            cart={convertCartForComponents()}
            showObservationModal={showObservationModal}
            currentObservation={currentObservation}
            onScreenChange={handleScreenChange}
            onAddToCart={handleAddToCartFromProducts}
            onObservationModalChange={setShowObservationModal}
            onObservationChange={setCurrentObservation}
            onConfirmAddToCart={() => {
              if (selectedProduct && selectedFeirante) {
                handleAddToCart(selectedProduct, selectedFeirante)
              }
            }}
          />
        ) : (
          <HomepageComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
            onSelectFeirante={handleSelectFeirante}
          />
        )

      case "delivery":
        return (
          <DeliveryComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "schedule":
        return (
          <ScheduleComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "payment":
        return (
          <PaymentComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "success":
        // Limpar carrinho quando chegar na tela de sucesso
        if (cart.items.length > 0) {
          clearCart()
        }
        return (
          <SuccessComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "orders":
        return (
          <OrdersComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "account":
        return (
          <AccountComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "addresses":
        return (
          <AddressesComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "favorites":
        return (
          <FavoritesComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "profilePayment":
        return (
          <ProfilePaymentComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        )

      case "feirante-profile":
        return selectedFeirante ? (
          <FeiranteProfileComponent
            selectedFeirante={selectedFeirante}
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
          />
        ) : (
          <HomepageComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
            onSelectFeirante={handleSelectFeirante}
          />
        )

      case "feirante-search":
        return selectedFeirante ? (
          <FeiranteSearchComponent
            selectedFeirante={selectedFeirante}
            cart={convertCartForComponents()}
            searchQuery={searchQuery}
            showSearchHistory={showSearchHistory}
            onScreenChange={handleScreenChange}
            onSelectProduct={handleSelectProduct}
            onSearchChange={handleSearchChange}
            onShowSearchHistoryChange={setShowSearchHistory}
          />
        ) : (
          <HomepageComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
            onSelectFeirante={handleSelectFeirante}
          />
        )
      
      default:
        console.log('📱 Tela não implementada ainda:', currentScreen)
        return (
          <HomepageComponent
            cart={convertCartForComponents()}
            onScreenChange={handleScreenChange}
            onSelectFeirante={handleSelectFeirante}
          />
        )
    }
  }

  return (
    <ClientRoute>
      {renderCurrentScreen()}
    </ClientRoute>
  )
}
