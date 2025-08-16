# Feira App - Sistema de Feira com Persistência Local

Este é um aplicativo de feira que permite aos usuários comprar produtos frescos diretamente dos feirantes. O sistema agora utiliza **localStorage** para persistência de dados e **autenticação baseada em tokens**, eliminando a necessidade de um servidor backend.

## 🚀 Funcionalidades

### Para Clientes
- ✅ Visualizar produtos por categoria
- ✅ Buscar produtos e feirantes
- ✅ Adicionar produtos ao carrinho
- ✅ Gerenciar endereços de entrega
- ✅ Gerenciar métodos de pagamento
- ✅ Fazer pedidos
- ✅ Visualizar histórico de pedidos
- ✅ Adicionar feirantes aos favoritos
- ✅ Avaliar feirantes após pedidos

### Para Feirantes/Marketers
- ✅ Visualizar pedidos recebidos
- ✅ Atualizar status de pedidos
- ✅ Gerenciar produtos
- ✅ Visualizar dados financeiros
- ✅ Ver avaliações dos clientes

### Para Entregadores
- ✅ Visualizar pedidos disponíveis
- ✅ Atualizar status de entrega
- ✅ Gerenciar disponibilidade
- ✅ Acompanhar rotas

## 🔐 Sistema de Autenticação

### Usuários de Teste
O sistema vem com usuários pré-configurados para teste:

#### Clientes
- **Email:** marcela.ribeiro@email.com | **Senha:** 123456
- **Email:** lucas.cliente@email.com | **Senha:** 123456

#### Feirantes
- **Email:** joao.feira@email.com | **Senha:** 123456
- **Email:** maria.frutas@email.com | **Senha:** 123456

#### Entregadores
- **Email:** antonio.carnes@email.com | **Senha:** 123456

### Proteção de Rotas
- **ClientRoute**: Apenas clientes podem acessar
- **MarketerRoute**: Apenas feirantes podem acessar
- **DeliveryRoute**: Apenas entregadores podem acessar
- Redirecionamento automático para login se não autenticado

## 🏗️ Arquitetura

### Persistência de Dados
- **localStorage**: Todos os dados são armazenados localmente no navegador
- **Dados Mockados**: Sistema vem com dados de exemplo pré-carregados
- **Persistência**: Dados persistem entre sessões e recarregamentos de página
- **Tokens de Autenticação**: Sistema de sessão com tokens únicos

### Estrutura de Dados
- **Usuários**: Clientes, feirantes e entregadores com senhas
- **Produtos**: Catálogo de produtos com preços e estoque
- **Pedidos**: Sistema completo de pedidos com status
- **Carrinho**: Gerenciamento de itens no carrinho
- **Endereços**: Múltiplos endereços de entrega
- **Pagamentos**: Métodos de pagamento salvos
- **Favoritos**: Feirantes favoritos dos usuários

## 🛠️ Tecnologias

- **Frontend**: Next.js 15 + React 18
- **Estilização**: Tailwind CSS
- **Componentes**: Radix UI
- **Persistência**: localStorage
- **Autenticação**: Sistema de tokens com localStorage
- **Tipagem**: TypeScript

## 📁 Estrutura do Projeto

```
projetao-cin/
├── app/                    # Páginas da aplicação
│   ├── Client/            # Área do cliente (protegida)
│   ├── Marketer/          # Área do feirante (protegida)
│   ├── Delivery/          # Área do entregador (protegida)
│   ├── Login/             # Página de login
│   └── UserType/          # Seleção de tipo de usuário
├── components/            # Componentes reutilizáveis
│   └── ProtectedRoute.tsx # Proteção de rotas
├── hooks/                # Hooks customizados
├── lib/                  # Utilitários e serviços
│   ├── api/             # Serviços de API (localStorage)
│   ├── init.ts          # Inicialização do sistema
│   └── utils.ts         # Funções utilitárias e autenticação
└── public/              # Arquivos estáticos
```

## 🚀 Como Usar

### Instalação
```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev
```

### Acesso
- **URL**: http://localhost:3000
- **Fluxo**: Selecionar tipo → Login → Acesso à área específica

## 🔧 Serviços Principais

### `cartService`
- Gerenciamento do carrinho de compras
- Persistência automática no localStorage
- Agrupamento por feirante

### `orderService`
- Criação e gerenciamento de pedidos
- Sincronização entre pedidos de cliente e feirante
- Atualização de status

### `userService`
- Gerenciamento de perfis de usuário
- Endereços e métodos de pagamento
- Sistema de favoritos

### `productService`
- Catálogo de produtos
- Busca e filtros
- Gerenciamento de estoque

### Sistema de Autenticação
- **login()**: Autenticação com email e senha
- **isAuthenticated()**: Verificação de autenticação
- **getUserType()**: Obtenção do tipo de usuário
- **logout()**: Encerramento de sessão
- **Proteção de rotas**: Acesso controlado por tipo de usuário

## 📊 Dados Iniciais

O sistema vem com dados de exemplo incluindo:
- **2 Clientes**: Marcela e Lucas
- **2 Feirantes**: João da Horta e Maria das Frutas
- **2 Entregadores**: Antonio e Carlos
- **8 Produtos**: Verduras, frutas e legumes
- **6 Categorias**: Frutas, Folhas, Legumes, Carnes, Grãos, Tubérculos

## 🔄 Fluxo de Dados

1. **Inicialização**: Sistema carrega dados mockados no localStorage
2. **Autenticação**: Usuário faz login e recebe token único
3. **Persistência**: Dados são salvos automaticamente no localStorage
4. **Proteção**: Rotas são protegidas baseadas no tipo de usuário
5. **Sincronização**: Mudanças são refletidas imediatamente na interface

## 🎯 Vantagens do Sistema

- **Sem Dependências Externas**: Funciona offline
- **Performance**: Resposta instantânea
- **Simplicidade**: Não precisa de servidor
- **Segurança**: Sistema de autenticação com tokens
- **Controle de Acesso**: Rotas protegidas por tipo de usuário
- **Desenvolvimento**: Ideal para prototipagem
- **Testes**: Dados consistentes entre sessões

## 🚧 Limitações

- **Armazenamento**: Limitado ao tamanho do localStorage (~5-10MB)
- **Sincronização**: Dados não são compartilhados entre dispositivos
- **Segurança**: Dados são armazenados localmente sem criptografia
- **Escalabilidade**: Não adequado para produção com muitos usuários

## 🔮 Próximos Passos

Para evoluir o sistema:
1. **Backend Real**: Implementar API REST ou GraphQL
2. **Banco de Dados**: PostgreSQL, MongoDB ou similar
3. **Autenticação**: JWT, OAuth ou similar
4. **Pagamentos**: Integração com gateways reais
5. **Notificações**: Push notifications e emails
6. **Analytics**: Métricas de uso e vendas

## 📝 Licença

Este projeto é para fins educacionais e de desenvolvimento.
