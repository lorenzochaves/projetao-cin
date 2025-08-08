import Link from "next/link"
import { ChevronLeft, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"

const products = [
  { name: "Tomate", price: "3,95", unit: "kg" },
  { name: "Batata Inglesa", price: "2,55", unit: "kg" },
  { name: "Morango", price: "13", unit: "bandeja" },
  { name: "Banana prata", price: "3,95", unit: "kg" },
  { name: "Ovo branco", price: "14", unit: "bandeja" },
  { name: "Ovo caipira", price: "16", unit: "bandeja" },
  { name: "Couve", price: "2,55", unit: "mão" },
  { name: "Coentro", price: "1,00", unit: "mão" },
]

export default function MarketerProductsListPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/Marketer/MarketerStall">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Meus produtos</h1>
        </div>
        
        <div className="space-y-4 mb-6">
          {products.map((product, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-lg">{product.name}</span>
              <div className="flex items-center">
                <span className="text-lg font-medium mr-3">
                  R$ {product.price} <span className="text-sm text-gray-500">/{product.unit}</span>
                </span>
                <Link href={`/Marketer/MarketerStall/edit-product?name=${encodeURIComponent(product.name)}`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <Link href="/Marketer/MarketerStall/add-product">
          <Button className="w-full h-12 bg-gray-800 hover:bg-gray-900">
            + Cadastrar produto
          </Button>
        </Link>
      </div>
      
      <MarketerBottomNavigation />
    </div>
  )
}
