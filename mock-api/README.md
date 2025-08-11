# Backend Mockado - Feira App

Este diretório contém um backend mockado usando JSON Server para simular as funcionalidades do aplicativo de feira.

## Estrutura de Dados

### Usuários
- **users**: Dados de usuários (clientes e feirantes)
- **feirantes**: Informações dos feirantes/marqueteiros
- **addresses**: Endereços dos usuários
- **paymentMethods**: Métodos de pagamento dos usuários
- **favorites**: Feirantes favoritos dos usuários

### Produtos e Categorias
- **products**: Produtos disponíveis
- **categories**: Categorias de produtos

### Pedidos
- **orders**: Pedidos dos clientes
- **marketerOrders**: Visualização dos pedidos para os feirantes

### Outros
- **reviews**: Avaliações dos feirantes
- **finances**: Dados financeiros dos feirantes

## Como usar

1. Instalar dependências:
```bash
pnpm install
```

2. Iniciar apenas a API:
```bash
pnpm run dev:api
```

3. Iniciar frontend + API:
```bash
pnpm run dev:all
```

4. Acessar a API:
- API Base: http://localhost:3001
- Interface do JSON Server: http://localhost:3001

## Endpoints Principais

### Usuários
- `GET /users` - Lista usuários
- `GET /users/:id` - Dados de um usuário
- `PATCH /users/:id` - Atualizar usuário

### Pedidos
- `GET /orders?clientId=:id` - Pedidos de um cliente
- `GET /marketerOrders?marketerId=:id` - Pedidos de um feirante

### Produtos
- `GET /products` - Todos os produtos
- `GET /products?feiranteId=:id` - Produtos de um feirante

### Favoritos
- `GET /favorites?userId=:id` - Favoritos de um usuário
- `POST /favorites` - Adicionar favorito
- `DELETE /favorites/:id` - Remover favorito

## Funcionalidades Implementadas

### Cliente
- ✅ Visualizar pedidos
- ✅ Editar dados da conta
- ✅ Gerenciar endereços
- ✅ Gerenciar métodos de pagamento
- ✅ Visualizar favoritos
- ✅ Buscar feirantes e produtos

### Feirante/Marketer
- ✅ Visualizar pedidos recebidos
- ✅ Atualizar status de pedidos
- ✅ Visualizar dados financeiros
- ✅ Gerenciar produtos
- ✅ Visualizar avaliações

## Mock Data

O arquivo `db.json` contém dados de exemplo incluindo:
- 1 cliente (Marcela Ribeiro)
- 1 feirante (João da Feira)
- 3 feirantes no total
- 4 produtos
- 3 pedidos
- 2 endereços
- 2 métodos de pagamento
- 3 favoritos

## Próximos Passos

Para expandir o backend mockado:

1. **Adicionar mais dados**: Incluir mais usuários, produtos e pedidos
2. **Validações**: Implementar validações nos endpoints
3. **Relacionamentos**: Melhorar os relacionamentos entre entidades
4. **Autenticação**: Simular sistema de autenticação
5. **Filtros avançados**: Implementar filtros por data, status, etc.
