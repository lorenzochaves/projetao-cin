"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Product, Screen, CartItem, Feirante } from "../types"
import { ClientBottomNavigation } from "../components/BottomNav"
import { useProducts } from "@/hooks/api/useProducts"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import ProductVariationModal from "@/components/ui/product-variation-modal"

interface ProductPageProps {
  selectedProduct: Product
  selectedFeirante: Feirante | null
  cart: CartItem[]
  showObservationModal: boolean
  currentObservation: string
  onScreenChange: (screen: Screen) => void
  onAddToCart: (product: Product, feirante: string) => void
  onObservationModalChange: (show: boolean) => void
  onObservationChange: (observation: string) => void
  onConfirmAddToCart: () => void
  onProductSelect?: (product: Product) => void
  onFeiranteSelect?: (feirante: Feirante) => void
  previousScreen?: Screen
}

export default function ProductsComponent({ 
  selectedProduct, 
  selectedFeirante,
  cart, 
  onScreenChange, 
  onAddToCart,
  onProductSelect,
  onFeiranteSelect,
  previousScreen = "home"
}: ProductPageProps) {
  const { products } = useProducts()
  const [showVariationModal, setShowVariationModal] = useState(false)
  
  // Get suggested products from the same feirante or same category
  const relatedProducts = products
    .filter(p => 
      p.id !== selectedProduct.id && 
      (p.feiranteId === selectedProduct.feiranteId || p.category === selectedProduct.category)
    )
    .slice(0, 4)

  const handleRelatedProductClick = (product: Product) => {
    // Atualizar o produto selecionado se a função estiver disponível
    if (onProductSelect) {
      onProductSelect(product)
    }
    
    // Se o produto é de outro feirante, precisamos atualizar o feirante também
    if (onFeiranteSelect && product.feiranteId && product.feiranteId !== selectedProduct.feiranteId) {
      // Buscar o feirante do produto pelos dados disponíveis
      // Por enquanto, vamos criar um feirante temporário baseado no produto
      const newFeirante: Feirante = {
        id: product.feiranteId,
        name: "Feirante",
        rating: 4.5,
        time: "10 min",
        avatar: "/placeholder-user.jpg",
        description: "",
        specialties: [product.category],
        location: "Feira local",
        isOpen: true
      }
      onFeiranteSelect(newFeirante)
    }
    
    // Navegar para os detalhes do produto relacionado
    onScreenChange("product")
  }

  const handleAddToCartClick = () => {
    setShowVariationModal(true)
  }

  const handleConfirmAddToCart = (variation: string, quantity: number, observation: string) => {
    if (!selectedFeirante) return
    
    // Aqui você pode implementar a lógica de adicionar ao carrinho com variação
    // Por agora, vamos usar a função existente
    onAddToCart(selectedProduct, selectedFeirante.name)
    setShowVariationModal(false)
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header com botão de voltar */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40">
        <div className="flex items-center gap-4 p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onScreenChange(previousScreen)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">Detalhes do Produto</h2>
          </div>
        </div>
      </div>

      {/* Product */}
      <div className="px-4 pt-4">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 overflow-hidden">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-6xl')
                target.parentElement!.innerHTML = '📦'
              }}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
        <p className="text-xl font-bold mb-1">
          R$ {selectedProduct.price.toFixed(2)} /{selectedProduct.unit}
        </p>
        
        {/* Stock info */}
        {selectedProduct.stock !== undefined && (
          <div className="mb-2">
            {selectedProduct.stock === 0 ? (
              <span className="text-red-600 text-sm">Produto esgotado</span>
            ) : selectedProduct.stock < 10 ? (
              <span className="text-orange-600 text-sm">
                Últimas {selectedProduct.stock} unidades
              </span>
            ) : (
              <span className="text-green-600 text-sm">Em estoque</span>
            )}
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-6">
          {selectedProduct.description ||
            "Produto fresco e de qualidade, direto do feirante para sua mesa."}
        </p>

        <Button
          className="w-full mb-8 bg-gray-200 text-black hover:bg-gray-300 rounded-xl py-3 disabled:opacity-50"
          onClick={handleAddToCartClick}
          disabled={selectedProduct.isAvailable === false || selectedProduct.stock === 0}
        >
          {selectedProduct.isAvailable === false || selectedProduct.stock === 0 
            ? 'Produto indisponível' 
            : 'Adicionar à feira'
          }
        </Button>

        {/* Peça também */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Peça também</h2>
            <div className="grid grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="p-2 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleRelatedProductClick(product)}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-1 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-lg')
                          target.parentElement!.innerHTML = '📦'
                        }}
                      />
                    </div>
                    <p className="text-xs font-medium">R$ {product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-600 truncate">{product.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Variações */}
      <ProductVariationModal
        isOpen={showVariationModal}
        onClose={() => setShowVariationModal(false)}
        product={selectedProduct}
        onConfirm={handleConfirmAddToCart}
      />

      <ClientBottomNavigation onScreenChange={onScreenChange} />
    </div>
  )
}
