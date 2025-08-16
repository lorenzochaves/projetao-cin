'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { login, debugStorage, getUsers, forceInitializeData } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Debug inicial
    const users = getUsers()
    setDebugInfo(`Usuários carregados: ${users.length}`)
    console.log('🔍 Usuários disponíveis:', users)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = login(email, password)
      
      if (user) {
        // Redirecionar baseado no tipo de usuário
        switch (user.type) {
          case 'client':
            router.push('/Client')
            break
          case 'marketer':
            router.push('/Marketer')
            break
          case 'delivery':
            router.push('/Delivery')
            break
          default:
            router.push('/')
        }
      } else {
        setError('Email ou senha incorretos')
      }
    } catch (err) {
      setError('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleDebug = () => {
    debugStorage()
    const users = getUsers()
    setDebugInfo(`Debug executado. Usuários: ${users.length}`)
  }

  const handleForceInit = () => {
    forceInitializeData()
    const users = getUsers()
    setDebugInfo(`Dados reinicializados! Usuários: ${users.length}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Entrar na Feira
          </CardTitle>
          <CardDescription>
            Faça login para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {debugInfo && (
              <Alert>
                <AlertDescription>{debugInfo}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <Button onClick={handleDebug} variant="outline" className="w-full">
              Debug Storage
            </Button>
            <Button onClick={handleForceInit} variant="outline" className="w-full">
              Reinicializar Dados
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Usuários de teste:
            </p>
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <p><strong>Clientes:</strong> marcela.ribeiro@email.com / lucas.cliente@email.com</p>
              <p><strong>Feirantes:</strong> joao.feira@email.com / maria.frutas@email.com</p>
              <p><strong>Entregador:</strong> antonio.carnes@email.com</p>
              <p><strong>Senha para todos:</strong> 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
