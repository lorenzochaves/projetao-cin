import Link from "next/link"
import { ChevronLeft, Star, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
export default function MarketerStallPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Minha banca</h1>
        </div>
        
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h2 className="text-2xl font-bold">Feirante 1</h2>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
              <span className="font-medium">4,8</span>
              <div className="w-5 h-5 bg-gray-200 rounded-full ml-2 flex items-center justify-center">
                <span className="text-xs text-gray-600">?</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Meus produtos</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Tomate</span>
              <span className="text-lg font-medium">R$ 3,95 <span className="text-sm text-gray-500">/kg</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">Batata Inglesa</span>
              <span className="text-lg font-medium">R$ 2,55 <span className="text-sm text-gray-500">/kg</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">Morango</span>
              <span className="text-lg font-medium">R$ 6,37 <span className="text-sm text-gray-500">/kg</span></span>
            </div>
          </div>
          
          <Link href="/Marketer/MarketerStall/products" className="text-gray-600 underline">
            Exibir lista completa
          </Link>
          
          <Link href="/Marketer/MarketerStall/add-product">
            <Button className="w-full mt-4 h-12 bg-gray-800 hover:bg-gray-900">
              + Cadastrar produto
            </Button>
          </Link>
        </div>
        
        {/* Reviews Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Avaliações</h3>
          
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">Pedido nºxxx</span>
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">17/07/25 às 14:30</span>
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">Pedido nºxxx</span>
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">11/07/25 às 13:25</span>
            </div>
          </div>
          
          <Link href="/Marketer/MarketerStall/reviews" className="text-gray-600 underline">
            Exibir todas
          </Link>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  )
}
