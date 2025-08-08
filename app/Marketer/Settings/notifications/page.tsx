"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { MarketerBottomNavigation } from "@/components/ui/bottom-navigation"

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    notificacoes: true,
    promocoes: true,
    email: true,
    whatsapp: true,
    sms: true
  })

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 pb-24">
        <div className="flex items-center mb-6">
          <Link href="/Marketer/Settings">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Notificações</h1>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-lg">Notificações</span>
            <Switch
              checked={settings.notificacoes}
              onCheckedChange={() => handleToggle('notificacoes')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg">Promoções</span>
            <Switch
              checked={settings.promocoes}
              onCheckedChange={() => handleToggle('promocoes')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg">E-mail</span>
            <Switch
              checked={settings.email}
              onCheckedChange={() => handleToggle('email')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg">WhatsApp</span>
            <Switch
              checked={settings.whatsapp}
              onCheckedChange={() => handleToggle('whatsapp')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg">SMS</span>
            <Switch
              checked={settings.sms}
              onCheckedChange={() => handleToggle('sms')}
            />
          </div>
        </div>
      </div>
      
      <MarketerBottomNavigation />
    </div>
  )
}
