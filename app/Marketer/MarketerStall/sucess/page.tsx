"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Marketer/MarketerStall/products')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
        <Check className="h-8 w-8 text-white stroke-[3]" />
      </div>
      
      <p className="text-xl font-medium text-center">
        Produto cadastrado<br />
        com sucesso!
      </p>
    </div>
  )
}
