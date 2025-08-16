'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, getUserType, logout } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedTypes: ('client' | 'marketer' | 'delivery')[]
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedTypes, redirectTo = '/Login' }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isAuthenticated()) {
        router.push(redirectTo)
        return
      }

      const userType = getUserType()
      if (!userType || !allowedTypes.includes(userType)) {
        // Usuário não tem acesso a esta página
        setHasAccess(false)
      } else {
        setHasAccess(true)
      }
      setLoading(false)
    }
  }, [allowedTypes, redirectTo, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Acesso Negado
            </h1>
            <p className="text-gray-600">
              Você não tem permissão para acessar esta página.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button onClick={() => router.push('/')} className="w-full">
              Voltar ao Início
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Fazer Logout
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Componentes específicos para cada tipo de usuário
export function ClientRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedTypes={['client']} redirectTo="/Login">
      {children}
    </ProtectedRoute>
  )
}

export function MarketerRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedTypes={['marketer']} redirectTo="/Login">
      {children}
    </ProtectedRoute>
  )
}

export function DeliveryRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedTypes={['delivery']} redirectTo="/Login">
      {children}
    </ProtectedRoute>
  )
}
