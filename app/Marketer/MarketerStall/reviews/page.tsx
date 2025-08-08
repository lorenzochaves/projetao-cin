import Link from "next/link"
import { ChevronLeft, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/ui/bottom-navigation"

const reviews = [
  { client: "Cliente 1", rating: 5, time: "há 2 dias", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { client: "Cliente 2", rating: 4, time: "há 4 dias", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { client: "Cliente 3", rating: 5, time: "há 5 dias", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { client: "Cliente 4", rating: 5, time: "há 1 semana", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/Marketer/MarketerStall">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Avaliações</h1>
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
        
        {/* Reviews Section */}
        <div>
          <h3 className="text-lg font-bold mb-6">Avaliações (4)</h3>
          
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.client}</span>
                  <span className="text-sm text-gray-500">{review.time}</span>
                </div>
                
                <div className="flex mb-3">
                  {[1,2,3,4,5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= review.rating ? 'fill-current text-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  )
}
