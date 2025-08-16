'use client'

import { useEffect } from 'react'
import { initializeApp } from '../lib/init'

export function ClientInitializer() {
  useEffect(() => {
    // Aguarda um pouco para garantir que o localStorage esteja disponível
    const timer = setTimeout(() => {
      console.log('🚀 ClientInitializer executando...')
      initializeApp()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
