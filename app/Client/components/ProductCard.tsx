"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Product, Feirante, ProductVariation } from "../types"
import AddToCartModal from "./AddToCartModal"

interface ProductCardProps {
  product: Product
  feirante: Feirante
  onAddToCart: (product: Product, quantity: number, selectedVariation?: ProductVariation, selectedWeight?: number, observation?: string) => void
  onClick?: () => void
}

const getUnitDisplayName = (unitType?: string) => {
  if (!unitType) return ''
  
  switch (unitType) {
    case 'kg': return 'kg'
    case 'unit': return 'unidade'
    case 'bunch': return 'maço'
    case 'tray': return 'bandeja'
    case 'mao': return 'mão'
    case 'bandeja': return 'bandeja'
    default: return unitType
  }
}

export default function ProductCard({ 
  product, 
  feirante, 
  onAddToCart, 
  onClick 
}: ProductCardProps) {
  const [showModal, setShowModal] = useState(false)

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const handleAddToCart = (product: Product, quantity: number, selectedVariation?: ProductVariation, selectedWeight?: number, observation?: string) => {
    onAddToCart(product, quantity, selectedVariation, selectedWeight, observation)
    setShowModal(false)
  }

  return (
    <>
      <Card 
        className="p-3 bg-white cursor-pointer hover:shadow-md transition-all duration-200 relative"
        onClick={onClick}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 overflow-hidden flex items-center justify-center">
            <span className="text-2xl">{product.image}</span>
          </div>
          
          <p className="font-medium text-sm mb-1 truncate">{product.name}</p>
          
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-sm font-bold text-orange-600">
              R$ {product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">
              /{getUnitDisplayName(product.unitType) || product.unit}
            </span>
          </div>

          {/* Show variations indicator */}
          {product.variations && product.variations.length > 0 && (
            <div className="text-xs text-blue-600 mb-1">
              {product.variations.length} opções
            </div>
          )}

          {/* Show weight options for kg products */}
          {product.unitType === 'kg' && product.minWeight && (
            <div className="text-xs text-green-600 mb-1">
              {product.minWeight}g - {product.maxWeight}g
            </div>
          )}

          {/* Stock info */}
          {product.stock !== undefined && (
            <div className="mb-2">
              {product.stock === 0 ? (
                <span className="text-red-600 text-xs">Esgotado</span>
              ) : product.stock < 10 ? (
                <span className="text-orange-600 text-xs">
                  Últimas {product.stock}
                </span>
              ) : (
                <span className="text-green-600 text-xs">Disponível</span>
              )}
            </div>
          )}
        </div>

        {/* Add to cart button */}
        <Button
          size="sm"
          className="absolute top-2 right-2 w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md"
          onClick={handleAddClick}
          disabled={product.isAvailable === false || product.stock === 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </Card>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={showModal}
        product={product}
        onClose={() => setShowModal(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}
