"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatusBar } from "@/components/ui/status-bar"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-white">
      <StatusBar />
      
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Insira seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border-0 h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 border-0 h-12"
              />
            </div>
            
            <div className="text-center">
              <Link href="#" className="text-sm text-gray-600">
                Esqueceu sua senha?
              </Link>
            </div>
            
            <Button className="w-full h-12 bg-gray-800 hover:bg-gray-900">
              Login
            </Button>
            
            <div className="text-center">
              <Link href="/createUser" className="text-sm text-gray-600">
                Crie sua conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
