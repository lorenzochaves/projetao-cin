import { initializeLocalStorage } from './utils'

// Inicializa o localStorage com dados mockados quando a aplicação iniciar
export function initializeApp() {
  if (typeof window === 'undefined') return
  initializeLocalStorage()
}

// Função para resetar todos os dados (útil para desenvolvimento)
export function resetAllData() {
  if (typeof window === 'undefined') return

  const keys = [
    'feira_users',
    'feira_feirantes', 
    'feira_products',
    'feira_categories',
    'feira_orders',
    'feira_marketer_orders',
    'feira_addresses',
    'feira_payment_methods',
    'feira_favorites',
    'feira_reviews',
    'feira_finances',
    'feira_current_user',
    'feira_auth_token',
    'feira_cart'
  ]

  keys.forEach(key => localStorage.removeItem(key))
  
  // Reinicializa com dados mockados
  initializeLocalStorage()
}
