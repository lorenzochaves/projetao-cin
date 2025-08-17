"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useMarketer } from "@/hooks/api/useMarketer"
import { ChevronLeft, Search, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface MyStorePageProps {
  onScreenChange: (screen: string) => void
}

export default function MyStorePage({ onScreenChange }: MyStorePageProps) {
  const { products, toggleProductAvailability, deleteProduct } = useMarketer()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Filtrar produtos baseado na busca e categoria
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Agrupar produtos por categoria
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, typeof products>)

  // Obter categorias únicas
  const categories = Array.from(new Set(products.map(p => p.category)))

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Tem certeza que deseja excluir "${productName}"? Esta ação não pode ser desfeita.`)) {
      deleteProduct(productId)
      toast.success(`Produto "${productName}" excluído com sucesso`)
    }
  }

  const handleToggleAvailability = (productId: string, productName: string, isAvailable: boolean) => {
    toggleProductAvailability(productId)
    toast.success(`Produto "${productName}" ${isAvailable ? 'desativado' : 'ativado'} com sucesso`)
  }

  const getCategoryDisplayName = (category: string) => {
    const names: Record<string, string> = {
      "frutas": "Frutas",
      "verduras": "Verduras", 
      "legumes": "Legumes",
      "temperos": "Temperos",
      "raizes": "Raízes",
      "folhosos": "Folhosos",
      "outros": "Outros"
    }
    return names[category.toLowerCase()] || category
  }

  const getUnitDisplayName = (unitType: string | undefined) => {
    if (!unitType) return "unidade"
    const units: Record<string, string> = {
      "kg": "kg",
      "unidade": "unidade",
      "maco": "maço",
      "mao": "mão",
      "bandeja": "bandeja",
      "cabeca": "cabeça"
    }
    return units[unitType] || unitType
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center gap-4 p-4">
          <button 
            onClick={() => onScreenChange("home")}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Minha Feira</h1>
            <p className="text-sm text-gray-600">{products.length} produtos cadastrados</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="px-4 pb-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge
              variant={filterCategory === "all" ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setFilterCategory("all")}
            >
              Todas ({products.length})
            </Badge>
            {categories.map(category => {
              const count = products.filter(p => p.category === category).length
              return (
                <Badge
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setFilterCategory(category)}
                >
                  {getCategoryDisplayName(category)} ({count})
                </Badge>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Add Product Button */}
        <Link href="/Marketer/MarketerStall/add-product">
          <Card className="p-4 mb-6 border-2 border-dashed border-green-300 hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-center gap-3 text-green-600">
              <Plus className="w-6 h-6" />
              <span className="font-medium">Adicionar Novo Produto</span>
            </div>
          </Card>
        </Link>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              📦
            </div>
            <p className="text-gray-600 mb-2">
              {searchQuery ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {searchQuery ? "Tente ajustar sua busca" : "Comece adicionando seu primeiro produto"}
            </p>
            {!searchQuery && (
              <Link href="/Marketer/MarketerStall/add-product">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <div key={category}>
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                  {getCategoryDisplayName(category)} ({categoryProducts.length})
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {categoryProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      {/* Product Image */}
                      <div className="relative h-32 bg-gray-100">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-4xl')
                            target.parentElement!.innerHTML = '📦'
                          }}
                        />
                        
                        {/* Availability Toggle */}
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => handleToggleAvailability(product.id, product.name, product.isAvailable)}
                            className={`p-1.5 rounded-full shadow-md transition-colors ${
                              product.isAvailable 
                                ? 'bg-green-500 text-white hover:bg-green-600' 
                                : 'bg-gray-500 text-white hover:bg-gray-600'
                            }`}
                            title={product.isAvailable ? 'Produto ativo' : 'Produto inativo'}
                          >
                            {product.isAvailable ? (
                              <Eye className="w-3 h-3" />
                            ) : (
                              <EyeOff className="w-3 h-3" />
                            )}
                          </button>
                        </div>

                        {/* Stock Badge */}
                        <div className="absolute bottom-2 left-2">
                          <Badge 
                            variant={product.stock === 0 ? "destructive" : product.stock < 10 ? "secondary" : "default"}
                            className="text-xs"
                          >
                            {product.stock === 0 ? 'Esgotado' : `${product.stock} ${getUnitDisplayName(product.unitType)}`}
                          </Badge>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm text-gray-900 truncate">
                              {product.name}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">
                              {getCategoryDisplayName(product.category)}
                            </p>
                          </div>
                          <div className="ml-2">
                            <p className="font-bold text-green-600 text-sm">
                              R$ {product.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500 text-right">
                              /{getUnitDisplayName(product.unitType)}
                            </p>
                          </div>
                        </div>

                        {/* Variations */}
                        {product.variations && product.variations.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs text-gray-500 mb-1">Variações:</p>
                            <div className="flex flex-wrap gap-1">
                              {product.variations.slice(0, 2).map((variation) => (
                                <Badge key={variation.id} variant="outline" className="text-xs">
                                  {variation.name}
                                </Badge>
                              ))}
                              {product.variations.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.variations.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3">
                          <Link href={`/Marketer/MarketerStall/edit-product?id=${product.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full text-xs">
                              <Edit className="w-3 h-3 mr-1" />
                              Editar
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
