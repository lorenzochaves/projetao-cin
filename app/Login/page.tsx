'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { login } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-6 pt-8">
          {/* Logo FEIROU! */}
          <div className="mb-4">
            <Image
              src="/feirou-amarelo.png"
              alt="FEIROU!"
              width={120}
              height={48}
              className="object-contain mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Entrar na sua conta
          </CardTitle>
          <CardDescription className="text-gray-600">
            Faça login para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium text-lg rounded-lg"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link href="/Login/CreateAccount" className="text-orange-500 hover:text-orange-600 font-medium">
                Criar conta
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/UserType" className="text-sm text-gray-500 hover:text-gray-700">
              ← Voltar para seleção de tipo
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
