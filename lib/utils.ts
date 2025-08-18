import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User, Feirante, Product, Category, Order, MarketerOrder, UserAddress, PaymentMethod, Favorite, Review, Finance, Chat, ChatMessage } from './api/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Chaves para localStorage
const STORAGE_KEYS = {
  USERS: 'feira_users',
  FEIRANTES: 'feira_feirantes',
  PRODUCTS: 'feira_products',
  CATEGORIES: 'feira_categories',
  ORDERS: 'feira_orders',
  MARKETER_ORDERS: 'feira_marketer_orders',
  ADDRESSES: 'feira_addresses',
  PAYMENT_METHODS: 'feira_payment_methods',
  FAVORITES: 'feira_favorites',
  REVIEWS: 'feira_reviews',
  FINANCES: 'feira_finances',
  CURRENT_USER: 'feira_current_user',
  AUTH_TOKEN: 'feira_auth_token',
  CART: 'feira_cart',
  CHATS: 'feira_chats',
  CHAT_MESSAGES: 'feira_chat_messages'
} as const

// Dados mockados iniciais com senhas
const INITIAL_DATA = {
  users: [
    {
      id: "1",
      name: "Marcela",
      surname: "Ribeiro",
      email: "marcela.ribeiro@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 99999-9999",
      cpf: "123.456.789-00",
      type: "client" as const,
      createdAt: "2025-01-01T00:00:00Z",
      avatar: "https://media.gettyimages.com/id/1150572112/pt/foto/close-up-of-a-smiling-mid-adult-businesswoman.jpg?s=612x612&w=0&k=20&c=oqTUT0IMEoKR6iFZac8qLwaTlT925XMMPqsieFYANz8="
    },
    {
      id: "2",
      name: "Lucas",
      surname: "Santos",
      email: "lucas.cliente@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 97777-7777",
      cpf: "456.789.123-00",
      type: "client" as const,
      createdAt: "2024-12-15T00:00:00Z",
      avatar: "data:image/jpeg;base64,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"
    },
    {
      id: "3",
      name: "João",
      surname: "Silva",
      email: "joao.feira@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 98888-8888",
      cpf: "987.654.321-00",
      type: "marketer" as const,
      stallName: "João da Horta",
      createdAt: "2024-06-15T00:00:00Z",
      avatar: "https://media.gettyimages.com/id/1369521370/pt/foto/portrait-of-a-seller-at-a-street-market.jpg?s=612x612&w=0&k=20&c=69d5S9_4FICYD7PlYYxhpLhPU7gt-isY9mEE21theoM="
    },
    {
      id: "4",
      name: "Maria",
      surname: "Oliveira",
      email: "maria.frutas@email.com",
      password: "123456", // Senha para teste
      phone: "(81) 96666-6666",
      cpf: "555.333.111-00",
      type: "marketer" as const,
      stallName: "Maria das Frutas",
      createdAt: "2024-03-20T00:00:00Z",
      avatar: "https://media.gettyimages.com/id/1042149298/pt/foto/portrait-of-confident-owner-selling-bananas-at-farmers-market.jpg?s=612x612&w=0&k=20&c=deXkbc5jJaXAEUDRbPz1Xqj8k3ZaadVFQffEOMR1BQ0="
    },
    {
      id: "5",
      name: "Antônio",
      surname: "Silva",
      email: "antonio.tuberculos@email.com",
      password: "123456",
      phone: "(81) 93333-3333",
      cpf: "222.333.444-55",
      type: "marketer" as const,
      stallName: "Tubérculos do Antônio",
      createdAt: "2024-04-15T00:00:00Z",
      avatar: "https://media.gettyimages.com/id/2168879736/pt/foto/senior-man-working-and-contemplating-at-store.jpg?s=612x612&w=0&k=20&c=B3jQRgBYy9WbFKz-IWZs2GU2Q6M8jWCeNiLZSxgqVzI="
    }
  ],
  feirantes: [
    {
      id: "1",
      userId: "3",
      name: "João da Horta",
      rating: 4.8,
      reviewCount: 120,
      time: "15-20 min",
      avatar: "https://media.gettyimages.com/id/546469645/pt/foto/a-vendor-at-a-fruit-and-vegetable-market.jpg?s=612x612&w=0&k=20&c=cym8EYFBOCP5b4fvPz5EWmiT-3P5CZ38rhyGa7ADR3c=",
      description: "Especialista em verduras orgânicas há mais de 20 anos. Cultivo próprio sem agrotóxicos, direto da fazenda para sua mesa.",
      specialties: ["Verduras Orgânicas", "Temperos Frescos", "Folhas"],
      location: "Casa Amarela",
      isOpen: true,
      openingHours: "06:00-18:00",
      address: "Feira de Casa Amarela - Recife, PE"
    },
    {
      id: "2",
      userId: "4",
      name: "Maria das Frutas",
      rating: 4.9,
      reviewCount: 89,
      time: "10-15 min",
      avatar: "https://media.gettyimages.com/id/1498754138/pt/foto/portrait-of-a-senior-female-retail-clerk-holding-basket-with-orange-fruit-at-a-greengrocers.jpg?s=612x612&w=0&k=20&c=gI5RHh_gWw2F3sz5G_YFcMj13uw4htTnApf5OyFbNyg=",
      description: "Frutas selecionadas e sempre frescas. Trabalho com produtores locais para garantir a melhor qualidade.",
      specialties: ["Frutas Tropicais", "Frutas da Estação", "Sucos Naturais"],
      location: "Boa Viagem",
      isOpen: true,
      openingHours: "07:00-17:00",
      address: "Feira de Boa Viagem - Recife, PE"
    },
    {
      id: "3",
      userId: "7",
      name: "Seu Antônio dos Tubérculos",
      rating: 4.6,
      reviewCount: 67,
      time: "25-30 min",
      avatar: "https://media.istockphoto.com/id/535766951/pt/foto/verduras.jpg?s=612x612&w=0&k=20&c=o4jhAz6RbjZyoKocIK2BCjmt7DQTddxiEcHdfyzGKWM=",
      description: "Especialista em raízes, tubérculos e legumes frescos. Produtos selecionados direto da roça.",
      specialties: ["Tubérculos", "Raízes", "Legumes da Terra"],
      location: "Brasília Teimosa",
      isOpen: true,
      openingHours: "05:00-14:00",
      address: "Brasília Teimosa - Recife, PE"
    }
  ],
  products: [
    // FEIRANTE 1 - João da Horta (Especialista em verduras orgânicas)
    {
      id: "1",
      feiranteId: "1",
      name: "Alface Americana",
      price: 3.5,
      unit: "unidade",
      image: "https://organicosinbox.com.br/wp-content/uploads/2020/12/alface-americana-organica.jpg",
      category: "folhas",
      description: "Alface fresca e crocante, ideal para saladas",
      stock: 25,
      isAvailable: true
    },
    {
      id: "2",
      feiranteId: "1",
      name: "Couve Manteiga",
      price: 2.8,
      unit: "maço",
      image: "https://brotacompany.com.br/cdn/shop/products/20_84afae01-dcca-4867-ab44-5b9f03c7e388.png?v=1644945935&width=713",
      category: "folhas",
      description: "Couve orgânica, rica em nutrientes",
      stock: 30,
      isAvailable: true
    },
    {
      id: "3",
      feiranteId: "1",
      name: "Rúcula",
      price: 4.2,
      unit: "maço",
      image: "https://mercantilnovaera.vtexassets.com/arquivos/ids/196908-1600-auto?v=637834832428700000&width=1600&height=auto&aspect=true",
      category: "folhas",
      description: "Rúcula selvagem com sabor marcante",
      stock: 15,
      isAvailable: true
    },
    {
      id: "4",
      feiranteId: "1",
      name: "Espinafre",
      price: 3.8,
      unit: "maço",
      image: "https://superprix.vteximg.com.br/arquivos/ids/178913-600-600/Espinafre-Un-2020.png?v=636935241661470000",
      category: "folhas",
      description: "Espinafre tenro e nutritivo",
      stock: 20,
      isAvailable: true
    },
    {
      id: "5",
      feiranteId: "1",
      name: "Acelga",
      price: 3.2,
      unit: "maço",
      image: "https://ceagesp.gov.br/wp-content/uploads/2019/08/acelga-3-600x450.jpg",
      category: "folhas",
      description: "Acelga fresca com talos brancos",
      stock: 18,
      isAvailable: true
    },
    {
      id: "6",
      feiranteId: "1",
      name: "Agrião",
      price: 4.5,
      unit: "maço",
      image: "https://www.proativaalimentos.com.br/image/cachewebp/catalog/img_prod/agriao[1]-500x500.webp",
      category: "folhas",
      description: "Agrião picante e refrescante",
      stock: 12,
      isAvailable: true
    },
    {
      id: "7",
      feiranteId: "1",
      name: "Tomate Salada",
      price: 6.9,
      unit: "kg",
      image: "https://dcdn-us.mitiendanube.com/stores/001/194/977/products/tomate-verde1-ee945174b501929ba015897638174595-640-0.webp",
      category: "legumes",
      description: "Tomate maduro e saboroso",
      stock: 35,
      isAvailable: true,
      variations: [
        {id: "tomate-verde", name: "Mais verdes", description: "Ideais para fritar ou salada verde"},
        {id: "tomate-maduro", name: "Mais maduros", description: "Perfeitos para molhos e consumo imediato"},
        {id: "tomate-medio", name: "Ponto médio", description: "Equilibrio entre firmeza e sabor"}
      ]
    },
    {
      id: "8",
      feiranteId: "1",
      name: "Pepino Japonês",
      price: 4.8,
      unit: "kg",
      image: "https://aguabranca.com.br/wp-content/uploads/2024/06/pepino-japones-1.jpg",
      category: "legumes",
      description: "Pepino crocante e refrescante",
      stock: 28,
      isAvailable: true
    },
    {
      id: "9",
      feiranteId: "1",
      name: "Abobrinha",
      price: 5.2,
      unit: "kg",
      image: "https://cozinhatecnica.com/wp-content/uploads/2019/03/abobrinha-italiana.jpg",
      category: "legumes",
      description: "Abobrinha tenra e versátil",
      stock: 22,
      isAvailable: true
    },
    {
      id: "10",
      feiranteId: "1",
      name: "Berinjela",
      price: 6.5,
      unit: "kg",
      image: "https://superprix.vteximg.com.br/arquivos/ids/175186-600-600/Berinjela--1-unidade-aprox.-200g-.png?v=636294183544400000",
      category: "legumes",
      description: "Berinjela roxa brilhante",
      stock: 18,
      isAvailable: true
    },
    {
      id: "11",
      feiranteId: "1",
      name: "Pimentão Verde",
      price: 7.8,
      unit: "kg",
      image: "https://hiperideal.vtexassets.com/arquivos/ids/167657-800-450?v=636615816136570000&width=800&height=450&aspect=true",
      category: "legumes",
      description: "Pimentão verde doce",
      stock: 24,
      isAvailable: true,
      variations: [
        {id: "pimentao-pequeno", name: "Pequenos", description: "Ideais para temperos e saladas"},
        {id: "pimentao-medio", name: "Médios", description: "Perfeitos para refogados"},
        {id: "pimentao-grande", name: "Grandes", description: "Ótimos para rechear"}
      ]
    },
    {
      id: "12",
      feiranteId: "1",
      name: "Pimentão Vermelho",
      price: 8.9,
      unit: "kg",
      image: "https://scfoods.fbitsstatic.net/img/p/pimentao-vermelho-500g-70582/257077.jpg?w=800&h=800&v=no-change&qs=ignore",
      category: "legumes",
      description: "Pimentão vermelho adocicado",
      stock: 20,
      isAvailable: true
    },
    {
      id: "13",
      feiranteId: "1",
      name: "Manjericão",
      price: 2.5,
      unit: "maço",
      image: "data:image/jpeg;base64,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",
      category: "temperos",
      description: "Manjericão aromático fresco",
      stock: 15,
      isAvailable: true
    },
    {
      id: "14",
      feiranteId: "1",
      name: "Salsa",
      price: 2.0,
      unit: "maço",
      image: "https://www.mundodanutricao.com/wp-content/uploads/2019/05/Salsa_2-1140x733.png",
      category: "temperos",
      description: "Salsa lisa fresca",
      stock: 25,
      isAvailable: true
    },
    {
      id: "15",
      feiranteId: "1",
      name: "Cebolinha",
      price: 2.2,
      unit: "maço",
      image: "https://www.bbc.co.uk/staticarchive/72a59054e7ab37f47fffbb13a6ec7fa560dd7248.jpg",
      category: "temperos",
      description: "Cebolinha verde aromática",
      stock: 22,
      isAvailable: true
    },

    // FEIRANTE 2 - Maria das Frutas (Especialista em frutas tropicais)
    {
      id: "16",
      feiranteId: "2",
      name: "Banana Prata",
      price: 4.5,
      unit: "kg",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8ar9Hjk4qboYJsNUhDlRMZ_Zn3nueEi54w&s",
      category: "frutas",
      description: "Banana doce e nutritiva, rica em potássio",
      stock: 50,
      isAvailable: true,
      variations: [
        {id: "banana-verde", name: "Mais verdes", description: "Ideais para vitaminas e cozinhar"},
        {id: "banana-madura", name: "Mais maduras", description: "Perfeitas para consumo imediato"},
        {id: "banana-media", name: "Ponto médio", description: "Equilibrio entre firmeza e doçura"}
      ]
    },
    {
      id: "17",
      feiranteId: "2",
      name: "Maçã Gala",
      price: 8.9,
      unit: "kg",
      image: "https://ibassets.com.br/ib.item.image.big/b-890063e414314da3909f9931fce34055.jpeg",
      category: "frutas",
      description: "Maçã crocante e doce, perfeita para lanches",
      stock: 40,
      isAvailable: true
    },
    {
      id: "18",
      feiranteId: "2",
      name: "Laranja Lima",
      price: 3.2,
      unit: "kg",
      image: "https://tauste.com.br/media/catalog/product/cache/85088212981f4c4416a405773fd6849a/2/0/20136.jpg",
      category: "frutas",
      description: "Laranja doce e suculenta, ideal para sucos",
      stock: 60,
      isAvailable: true
    },
    {
      id: "19",
      feiranteId: "2",
      name: "Manga Rosa",
      price: 5.8,
      unit: "kg",
      image: "https://mercantilnovaera.vtexassets.com/arquivos/ids/184408/Manga-Rosa-Aproximadamente-500g.jpg?v=637642033315100000",
      category: "frutas",
      description: "Manga doce e perfumada da estação",
      stock: 25,
      isAvailable: true
    },
    {
      id: "20",
      feiranteId: "2",
      name: "Abacaxi Pérola",
      price: 4.5,
      unit: "unidade",
      image: "https://mercantilnovaera.vtexassets.com/arquivos/ids/181694-800-450?v=637611094526200000&width=800&height=450&aspect=true",
      category: "frutas",
      description: "Abacaxi doce e suculento",
      stock: 18,
      isAvailable: true
    },
    {
      id: "21",
      feiranteId: "2",
      name: "Mamão Papaya",
      price: 6.8,
      unit: "kg",
      image: "https://boa.vtexassets.com/arquivos/ids/583952/Mamao-Papaia-kg.jpg?v=638614859017270000",
      category: "frutas",
      description: "Mamão maduro e doce",
      stock: 22,
      isAvailable: true,
      variations: [
        {id: "mamao-verde", name: "Mais verde", description: "Ideal para doces e conservas"},
        {id: "mamao-maduro", name: "Bem maduro", description: "Perfeito para consumo imediato"},
        {id: "mamao-medio", name: "Ponto médio", description: "Equilibrio entre firmeza e doçura"}
      ]
    },
    {
      id: "22",
      feiranteId: "2",
      name: "Melancia",
      price: 2.8,
      unit: "kg",
      image: "https://scfoods.fbitsstatic.net/img/p/melancia-mini-unidade-70680/257182.jpg?w=800&h=800&v=no-change&qs=ignore",
      category: "frutas",
      description: "Melancia doce e refrescante",
      stock: 30,
      isAvailable: true
    },
    {
      id: "23",
      feiranteId: "2",
      name: "Melão Amarelo",
      price: 4.2,
      unit: "kg",
      image: "https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw8ab399c9/Produtos/21369-0000000002136-melao%20amarelo%20kg-flv-1.jpg",
      category: "frutas",
      description: "Melão doce e aromático",
      stock: 25,
      isAvailable: true
    },
    {
      id: "24",
      feiranteId: "2",
      name: "Uva Roxa",
      price: 12.9,
      unit: "kg",
      image: "https://coobrasil.com.br/storage/uploads/t2pUJAuxSq2tjQbJ20jToNbVl9BplF8D2UHl6RaM.jpg",
      category: "frutas",
      description: "Uva doce sem caroço",
      stock: 15,
      isAvailable: true
    },
    {
      id: "25",
      feiranteId: "2",
      name: "Pêra Williams",
      price: 11.5,
      unit: "kg",
      image: "https://meufestval.vtexassets.com/arquivos/ids/186133/2569PERA-WILLIANS-KG------------------------.jpg?v=637902303223700000",
      category: "frutas",
      description: "Pêra suculenta e perfumada",
      stock: 20,
      isAvailable: true
    },
    {
      id: "26",
      feiranteId: "2",
      name: "Morango",
      price: 8.9,
      unit: "bandeja",
      image: "https://www.proativaalimentos.com.br/image/cache/catalog/img_prod/oleo-essencia-morango-100ml-fruta-puro-essencia-massagem-D_NQ_NP_960102-MLB31202671230_062019-F[1]-1000x1000.jpg",
      category: "frutas",
      description: "Morango doce e perfumado",
      stock: 12,
      isAvailable: true
    },
    {
      id: "27",
      feiranteId: "2",
      name: "Limão Tahiti",
      price: 4.5,
      unit: "kg",
      image: "https://www.okumacitrus.com.br/storage/conteudo/normal/137913520062877eae37f8a.jpg",
      category: "frutas",
      description: "Limão suculento para temperos",
      stock: 35,
      isAvailable: true
    },
    {
      id: "28",
      feiranteId: "2",
      name: "Kiwi",
      price: 15.8,
      unit: "kg",
      image: "https://cdn.britannica.com/45/126445-050-4C0FA9F6/Kiwi-fruit.jpg",
      category: "frutas",
      description: "Kiwi doce rico em vitamina C",
      stock: 10,
      isAvailable: true
    },
    {
      id: "29",
      feiranteId: "2",
      name: "Goiaba Vermelha",
      price: 6.2,
      unit: "kg",
      image: "https://cdn.awsli.com.br/800x800/681/681419/produto/265405313/goiaba-vermelha---caixa-de-6kg-ppxox9xyu6.png",
      category: "frutas",
      description: "Goiaba doce e aromática",
      stock: 18,
      isAvailable: true
    },
    {
      id: "30",
      feiranteId: "2",
      name: "Coco Verde",
      price: 3.5,
      unit: "unidade",
      image: "https://shoppr.com.br/cdn/shop/products/35424D.png?v=1442866214",
      category: "frutas",
      description: "Coco verde gelado",
      stock: 25,
      isAvailable: true
    },

    // FEIRANTE 3 - Seu Antônio dos Tubérculos (Especialista em raízes e tubérculos)
    {
      id: "31",
      feiranteId: "3",
      name: "Batata Inglesa",
      price: 3.8,
      unit: "kg",
      image: "https://saude.abril.com.br/wp-content/uploads/2025/02/batata-inglesa-branca.jpg?crop=1&resize=1212,909",
      category: "tuberculos",
      description: "Batata inglesa para purê e frituras",
      stock: 50,
      isAvailable: true,
      variations: [
        {id: "batata-pequena", name: "Pequenas", description: "Ideais para cozinhar inteiras"},
        {id: "batata-media", name: "Médias", description: "Perfeitas para purê e fritas"},
        {id: "batata-grande", name: "Grandes", description: "Ótimas para assar no forno"}
      ]
    },
    {
      id: "32",
      feiranteId: "3",
      name: "Batata Doce",
      price: 4.5,
      unit: "kg",
      image: "https://scfoods.fbitsstatic.net/img/p/batata-doce-org-500g-71993/258642.jpg?w=800&h=800&v=no-change&qs=ignore",
      category: "tuberculos",
      description: "Batata doce roxa nutritiva",
      stock: 35,
      isAvailable: true
    },
    {
      id: "33",
      feiranteId: "3",
      name: "Cenoura",
      price: 4.2,
      unit: "kg",
      image: "https://media.istockphoto.com/id/166106089/pt/foto/cenoura-isolado.jpg?s=612x612&w=0&k=20&c=SS0deu9G7ca8xr46ABv51_VaB01gVYHry0IygHplaag=",
      category: "legumes",
      description: "Cenoura doce e crocante",
      stock: 40,
      isAvailable: true,
      variations: [
        {id: "cenoura-pequena", name: "Baby cenouras", description: "Pequenas e tenras, ideais para petiscos"},
        {id: "cenoura-media", name: "Médias", description: "Perfeitas para saladas e refogados"},
        {id: "cenoura-grande", name: "Grandes", description: "Ótimas para sopas e cozidos"}
      ]
    },
    {
      id: "34",
      feiranteId: "3",
      name: "Mandioca",
      price: 3.2,
      unit: "kg",
      image: "https://abam.com.br/wp-content/uploads/2022/07/Mandioca-1.jpeg",
      category: "tuberculos",
      description: "Mandioca fresca e macia",
      stock: 45,
      isAvailable: true
    },
    {
      id: "35",
      feiranteId: "3",
      name: "Inhame",
      price: 5.8,
      unit: "kg",
      image: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/06/21103649/inhame-1.jpg",
      category: "tuberculos",
      description: "Inhame nutritivo e cremoso",
      stock: 25,
      isAvailable: true
    },
    {
      id: "36",
      feiranteId: "3",
      name: "Cará",
      price: 6.5,
      unit: "kg",
      image: "https://s3.static.brasilescola.uol.com.br/be/2020/05/cara.jpg",
      category: "tuberculos",
      description: "Cará roxo tradicional",
      stock: 20,
      isAvailable: true
    },
    {
      id: "37",
      feiranteId: "3",
      name: "Beterraba",
      price: 4.8,
      unit: "kg",
      image: "https://supermercadobomdemais.com.br/wp-content/uploads/2020/05/Beterraba.jpg",
      category: "legumes",
      description: "Beterraba roxa doce",
      stock: 30,
      isAvailable: true
    },
    {
      id: "38",
      feiranteId: "3",
      name: "Rabanete",
      price: 5.2,
      unit: "maço",
      image: "https://carrefourbrfood.vtexassets.com/arquivos/ids/205267/7745117_1.jpg?v=637272456644600000",
      category: "legumes",
      description: "Rabanete picante",
      stock: 15,
      isAvailable: true
    },
    {
      id: "39",
      feiranteId: "3",
      name: "Nabo",
      price: 4.2,
      unit: "kg",
      image: "https://images.tcdn.com.br/img/img_prod/763396/nabo_229_1_20200320145231.jpg",
      category: "legumes",
      description: "Nabo branco suave",
      stock: 18,
      isAvailable: true
    },
    {
      id: "40",
      feiranteId: "3",
      name: "Cebola Roxa",
      price: 6.8,
      unit: "kg",
      image: "https://fortatacadista.vteximg.com.br/arquivos/ids/161321-800-800/CEBOLA-ROXA-KG---631728.jpg?v=637437445828000000",
      category: "legumes",
      description: "Cebola roxa doce",
      stock: 35,
      isAvailable: true,
      variations: [
        {id: "cebola-pequena", name: "Pequenas", description: "Ideais para temperos e conservas"},
        {id: "cebola-media", name: "Médias", description: "Perfeitas para refogados"},
        {id: "cebola-grande", name: "Grandes", description: "Ótimas para caramelizar e rechear"}
      ]
    },
    {
      id: "41",
      feiranteId: "3",
      name: "Cebola Branca",
      price: 5.5,
      unit: "kg",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4E7bk6Qss1JTZtaNL76i58C3cA0EZ21YdIQ&s",
      category: "legumes",
      description: "Cebola branca tradicional",
      stock: 40,
      isAvailable: true
    },
    {
      id: "42",
      feiranteId: "3",
      name: "Alho Roxo",
      price: 18.9,
      unit: "kg",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3FeNvyZSbc3_LSXjslqZvdRqUh8FMo_6mZQ&s",
      category: "temperos",
      description: "Alho roxo aromático",
      stock: 12,
      isAvailable: true
    },
    {
      id: "43",
      feiranteId: "3",
      name: "Gengibre",
      price: 12.5,
      unit: "kg",
      image: "https://tropicalestufas.com.br/wp-content/uploads/2022/03/gengibre-capa.jpg",
      category: "tuberculos",
      description: "Gengibre fresco picante",
      stock: 8,
      isAvailable: true
    },
    {
      id: "44",
      feiranteId: "3",
      name: "Maxixe",
      price: 6.8,
      unit: "kg",
      image: "https://mercantilnovaera.vtexassets.com/arquivos/ids/213901-800-450?v=638417940874900000&width=800&height=450&aspect=true",
      category: "legumes",
      description: "Maxixe do nordeste",
      stock: 22,
      isAvailable: true
    },
    {
      id: "45",
      feiranteId: "3",
      name: "Quiabo",
      price: 7.2,
      unit: "kg",
      image: "https://www.tsvsementes.com.br/upload/produtos_493_1047_1689010668.jpg",
      category: "legumes",
      description: "Quiabo tenro",
      stock: 25,
      isAvailable: true
    }
  ],
  categories: [
    { id: "1", name: "Frutas", icon: "🍎" },
    { id: "2", name: "Folhas", icon: "🥬" },
    { id: "3", name: "Legumes", icon: "🥕" },
    { id: "4", name: "Carnes", icon: "🥩" },
    { id: "5", name: "Grãos", icon: "🌾" },
    { id: "6", name: "Tubérculos", icon: "🥔" },
    { id: "7", name: "Peixes", icon: "🐟" },
    { id: "8", name: "Temperos", icon: "🌿" }
  ],
  orders: [
    {
      id: "1",
      clientId: "1",
      feiranteId: "1",
      feiranteName: "João da Horta",
      items: [
        {
          productId: "1",
          name: "Alface Americana",
          price: 3.5,
          quantity: 2
        },
        {
          productId: "2",
          name: "Couve Manteiga",
          price: 2.8,
          quantity: 1
        }
      ],
      total: 14.8,
      status: "entregue" as const,
      createdAt: "2025-08-16T10:30:00Z",
      deliveredAt: "2025-08-16T12:15:00Z",
      estimatedDelivery: "2025-08-16T12:00:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      }
    },
    {
      id: "2",
      clientId: "1",
      feiranteId: "2",
      feiranteName: "Maria das Frutas",
      items: [
        {
          productId: "16",
          name: "Banana Prata",
          price: 4.5,
          quantity: 2
        },
        {
          productId: "17",
          name: "Maçã Gala",
          price: 8.9,
          quantity: 1
        }
      ],
      total: 22.9,
      status: "preparando" as const,
      createdAt: "2025-08-17T08:45:00Z",
      estimatedDelivery: "2025-08-17T10:30:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      }
    },
    {
      id: "3",
      clientId: "1",
      feiranteId: "1",
      feiranteName: "João da Horta",
      items: [
        {
          productId: "7",
          name: "Tomate Salada",
          price: 6.9,
          quantity: 2
        },
        {
          productId: "8",
          name: "Pepino Japonês",
          price: 4.8,
          quantity: 1
        }
      ],
      total: 23.6,
      status: "entregue" as const,
      createdAt: "2025-08-14T16:10:00Z",
      deliveredAt: "2025-08-14T18:30:00Z",
      estimatedDelivery: "2025-08-14T18:00:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      }
    }
  ],
  marketerOrders: [
    {
      id: "mo-001",
      clientId: "1",
      clientName: "Marcela Ribeiro",
      items: [
        {
          productId: "1-1692358923456-abc123def",
          name: "Tomate Cereja",
          price: 8.50,
          quantity: 1,
          selectedWeight: 1.2,
          observation: "Bem maduros, por favor"
        },
        {
          productId: "1-1692358923457-def456ghi",
          name: "Alface Crespa",
          price: 3.20,
          quantity: 2,
          observation: "2 pés bem frescos"
        }
      ],
      total: 16.60,
      status: "pendente",
      createdAt: "2025-08-18T08:30:00Z",
      estimatedDelivery: "2025-08-18T18:00:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      },
      paymentMethod: "credit",
      observations: "Entregar na portaria"
    },
    {
      id: "mo-002",
      clientId: "2",
      clientName: "Lucas Santos",
      items: [
        {
          productId: "1-1692358923458-ghi789jkl",
          name: "Banana Prata",
          price: 6.80,
          quantity: 1,
          selectedWeight: 2.0,
          observation: "Bananas maduras"
        },
        {
          productId: "1-1692358923456-abc123def",
          name: "Tomate Cereja",
          price: 8.50,
          quantity: 1,
          selectedWeight: 0.8
        }
      ],
      total: 20.40,
      status: "preparando",
      createdAt: "2025-08-18T09:15:00Z",
      estimatedDelivery: "2025-08-18T19:00:00Z",
      deliveryAddress: {
        street: "Av. Conselheiro Aguiar, 789",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51021-030"
      },
      paymentMethod: "debit"
    },
    {
      id: "mo-003",
      clientId: "1",
      clientName: "Marcela Ribeiro",
      items: [
        {
          productId: "1-1692358923457-def456ghi",
          name: "Alface Crespa",
          price: 3.20,
          quantity: 3,
          observation: "3 pés para salada"
        }
      ],
      total: 9.60,
      status: "pronto",
      createdAt: "2025-08-18T07:45:00Z",
      estimatedDelivery: "2025-08-18T17:30:00Z",
      deliveryAddress: {
        street: "Rua das Flores, 123",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51020-120"
      },
      paymentMethod: "pix"
    },
    {
      id: "mo-004",
      clientId: "3",
      clientName: "Ana Silva",
      items: [
        {
          productId: "1-1692358923456-abc123def",
          name: "Tomate Cereja",
          price: 8.50,
          quantity: 1,
          selectedWeight: 1.5
        },
        {
          productId: "1-1692358923458-ghi789jkl",
          name: "Banana Prata",
          price: 6.80,
          quantity: 1,
          selectedWeight: 1.8
        },
        {
          productId: "1-1692358923457-def456ghi",
          name: "Alface Crespa",
          price: 3.20,
          quantity: 1
        }
      ],
      total: 28.79,
      status: "entregue",
      createdAt: "2025-08-17T16:20:00Z",
      estimatedDelivery: "2025-08-18T08:00:00Z",
      deliveryAddress: {
        street: "Rua do Hospício, 456",
        neighborhood: "Boa Vista",
        city: "Recife",
        state: "PE",
        zipCode: "50050-050"
      },
      paymentMethod: "credit"
    },
    {
      id: "mo-005",
      clientId: "2",
      clientName: "Lucas Santos",
      items: [
        {
          productId: "1-1692358923458-ghi789jkl",
          name: "Banana Prata",
          price: 6.80,
          quantity: 1,
          selectedWeight: 3.0,
          observation: "Banana para vitamina"
        }
      ],
      total: 20.40,
      status: "pendente",
      createdAt: "2025-08-18T10:00:00Z",
      estimatedDelivery: "2025-08-18T20:00:00Z",
      deliveryAddress: {
        street: "Av. Conselheiro Aguiar, 789",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        zipCode: "51021-030"
      },
      paymentMethod: "debit"
    }
  ],
  addresses: [
    {
      id: "1",
      userId: "1",
      label: "Casa",
      street: "Rua das Flores, 123",
      neighborhood: "Boa Viagem",
      city: "Recife",
      state: "PE",
      zipCode: "51020-120",
      isPrimary: true
    },
    {
      id: "2",
      userId: "1",
      label: "Trabalho",
      street: "Av. Boa Viagem, 456",
      neighborhood: "Boa Viagem",
      city: "Recife",
      state: "PE",
      zipCode: "51021-000",
      isPrimary: false
    },
    {
      id: "3",
      userId: "2",
      label: "Casa",
      street: "Av. Conselheiro Aguiar, 789",
      neighborhood: "Boa Viagem",
      city: "Recife",
      state: "PE",
      zipCode: "51021-030",
      isPrimary: true
    }
  ],
  paymentMethods: [
    {
      id: "1",
      userId: "1",
      type: "credit" as const,
      brand: "visa" as const,
      lastFourDigits: "1234",
      holderName: "Marcela Ribeiro",
      expiryMonth: "12",
      expiryYear: "2027",
      isDefault: true
    },
    {
      id: "2",
      userId: "1",
      type: "debit" as const,
      brand: "mastercard" as const,
      lastFourDigits: "5678",
      holderName: "Marcela Ribeiro",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false
    },
    {
      id: "3",
      userId: "2",
      type: "credit" as const,
      brand: "visa" as const,
      lastFourDigits: "9999",
      holderName: "Lucas Santos",
      expiryMonth: "06",
      expiryYear: "2028",
      isDefault: true
    }
  ],
  favorites: [
    {
      id: "1",
      userId: "1",
      feiranteId: "2",
      createdAt: "2025-08-01T10:00:00Z"
    },
    {
      id: "2",
      userId: "2",
      feiranteId: "1",
      createdAt: "2025-08-05T15:30:00Z"
    }
  ],
  reviews: [
    {
      id: "1",
      feiranteId: "1",
      orderId: "1",
      clientId: "1",
      clientName: "Marcela R.",
      rating: 5,
      comment: "Verduras sempre fresquinhas e orgânicas! Atendimento excelente do João.",
      createdAt: "2025-08-05T12:00:00Z"
    },
    {
      id: "2",
      feiranteId: "2",
      orderId: "2",
      clientId: "2",
      clientName: "Lucas S.",
      rating: 4,
      comment: "Frutas de ótima qualidade, muito saborosas. Recomendo!",
      createdAt: "2025-08-08T16:30:00Z"
    }
  ],
  finances: [
    {
      id: "1",
      marketerId: "3",
      month: "2025-08",
      totalRevenue: 1850.50,
      totalOrders: 67,
      averageOrderValue: 27.62,
      topProducts: [
        {
          productId: "1",
          name: "Alface Americana",
          quantity: 45,
          revenue: 157.50
        },
        {
          productId: "2", 
          name: "Couve Manteiga",
          quantity: 38,
          revenue: 106.40
        }
      ]
    },
    {
      id: "2",
      marketerId: "4",
      month: "2025-08",
      totalRevenue: 2340.80,
      totalOrders: 89,
      averageOrderValue: 26.30,
      topProducts: [
        {
          productId: "4",
          name: "Banana Prata",
          quantity: 85,
          revenue: 382.50
        },
        {
          productId: "5",
          name: "Maçã Gala",
          quantity: 32,
          revenue: 284.80
        }
      ]
    }
  ],
  chats: [] as Chat[],
  chatMessages: [] as ChatMessage[]
}

// Funções utilitárias para localStorage
export function initializeLocalStorage() {
  if (typeof window === 'undefined') return

  console.log('🔄 Inicializando localStorage...')

  // Verifica se já existem dados salvos - se sim, não sobrescreve
  const existingUsers = getFromStorage(STORAGE_KEYS.USERS)
  const existingProducts = getFromStorage(STORAGE_KEYS.PRODUCTS)
  
  if (existingUsers && existingProducts) {
    console.log('✅ Dados principais já existem no localStorage')
    return
  }

  console.log('🌱 Inicializando localStorage com dados iniciais...')

  // Apenas salva dados que não existem
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    if (key !== 'CURRENT_USER' && key !== 'AUTH_TOKEN' && key !== 'CART') {
      const existing = getFromStorage(storageKey)
      if (!existing) {
        // Mapear chaves corretamente para os dados iniciais
        const dataKeyMap: Record<string, keyof typeof INITIAL_DATA> = {
          'USERS': 'users',
          'FEIRANTES': 'feirantes',
          'PRODUCTS': 'products',
          'CATEGORIES': 'categories',
          'ORDERS': 'orders',
          'MARKETER_ORDERS': 'marketerOrders',
          'ADDRESSES': 'addresses',
          'PAYMENT_METHODS': 'paymentMethods',
          'FAVORITES': 'favorites',
          'REVIEWS': 'reviews',
          'FINANCES': 'finances',
          'CHATS': 'chats',
          'CHAT_MESSAGES': 'chatMessages'
        }
        
        const dataKey = dataKeyMap[key]
        if (dataKey && INITIAL_DATA[dataKey]) {
          localStorage.setItem(storageKey, JSON.stringify(INITIAL_DATA[dataKey]))
        }
      }
    }
  })

  console.log('✅ localStorage inicializado!')
}

// Função para forçar reinicialização
export function forceInitializeData() {
  if (typeof window === 'undefined') return
  
  console.log('🔄 Forçando reinicialização dos dados...')
  
  // Limpar TODOS os dados existentes
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    localStorage.removeItem(storageKey)
  })
  
  // Reinicializar
  initializeLocalStorage()
  
  console.log('✅ Dados reinicializados com avatares reais!')
}

export function getFromStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return null
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error)
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Sistema de autenticação
export function getCurrentUser(): User | null {
  return getFromStorage<User>(STORAGE_KEYS.CURRENT_USER)
}

export function setCurrentUser(user: User | null): void {
  setToStorage(STORAGE_KEYS.CURRENT_USER, user)
}

export function getAuthToken(): string | null {
  return getFromStorage<string>(STORAGE_KEYS.AUTH_TOKEN)
}

export function setAuthToken(token: string | null): void {
  setToStorage(STORAGE_KEYS.AUTH_TOKEN, token)
}

export function isAuthenticated(): boolean {
  return !!(getCurrentUser() && getAuthToken())
}

export function getUserType(): 'client' | 'marketer' | 'delivery' | null {
  const user = getCurrentUser()
  return user ? user.type : null
}

export function logout(): void {
  removeFromStorage(STORAGE_KEYS.CURRENT_USER)
  removeFromStorage(STORAGE_KEYS.AUTH_TOKEN)
  removeFromStorage(STORAGE_KEYS.CART)
}

// Função de login
export function login(email: string, password: string): User | null {
  const users = getUsers()
  console.log('🔍 Tentativa de login:', { email, password })
  console.log('👥 Usuários disponíveis:', users)
  
  const user = users.find(u => u.email === email && u.password === password)
  
  if (user) {
    console.log('✅ Usuário encontrado:', user)
    const token = generateToken()
    setCurrentUser(user)
    setAuthToken(token)
    return user
  }
  
  console.log('❌ Usuário não encontrado ou senha incorreta')
  return null
}

// Função de debug temporária
export function debugStorage() {
  if (typeof window === 'undefined') return
  
  console.log('🔍 === DEBUG STORAGE ===')
  console.log('USERS:', getUsers())
  console.log('FEIRANTES:', getFeirantes())
  console.log('PRODUCTS:', getProducts())
  console.log('🔍 === FIM DEBUG ===')
}

// Funções específicas para cada entidade
export function getUsers(): User[] {
  return getFromStorage<User[]>(STORAGE_KEYS.USERS) || []
}

export function getFeirantes(): Feirante[] {
  return getFromStorage<Feirante[]>(STORAGE_KEYS.FEIRANTES) || []
}

export function getProducts(): Product[] {
  return getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS) || []
}

export function getCategories(): Category[] {
  return getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES) || []
}

export function getOrders(): Order[] {
  return getFromStorage<Order[]>(STORAGE_KEYS.ORDERS) || []
}

export function getMarketerOrders(): MarketerOrder[] {
  return getFromStorage<MarketerOrder[]>(STORAGE_KEYS.MARKETER_ORDERS) || []
}

export function getAddresses(): UserAddress[] {
  return getFromStorage<UserAddress[]>(STORAGE_KEYS.ADDRESSES) || []
}

export function getPaymentMethods(): PaymentMethod[] {
  return getFromStorage<PaymentMethod[]>(STORAGE_KEYS.PAYMENT_METHODS) || []
}

export function getFavorites(): Favorite[] {
  return getFromStorage<Favorite[]>(STORAGE_KEYS.FAVORITES) || []
}

export function getReviews(): Review[] {
  return getFromStorage<Review[]>(STORAGE_KEYS.REVIEWS) || []
}

export function getFinances(): Finance[] {
  return getFromStorage<Finance[]>(STORAGE_KEYS.FINANCES) || []
}

// Funções de Chat
export function getChats(): Chat[] {
  return getFromStorage<Chat[]>(STORAGE_KEYS.CHATS) || []
}

export function getChatMessages(): ChatMessage[] {
  return getFromStorage<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES) || []
}

export function createOrGetChat(clientId: string, feiranteId: string, clientName: string, feiranteName: string): Chat {
  const chats = getChats()
  const existingChat = chats.find(c => c.clientId === clientId && c.feiranteId === feiranteId)
  
  if (existingChat) {
    return existingChat
  }
  
  const newChat: Chat = {
    id: Date.now().toString(),
    clientId,
    feiranteId,
    clientName,
    feiranteName,
    unreadCount: 0,
    createdAt: new Date().toISOString()
  }
  
  chats.push(newChat)
  setToStorage(STORAGE_KEYS.CHATS, chats)
  return newChat
}

export function sendMessage(chatId: string, senderId: string, senderName: string, senderType: 'client' | 'marketer', message: string): ChatMessage {
  const messages = getChatMessages()
  const chats = getChats()
  
  const newMessage: ChatMessage = {
    id: Date.now().toString(),
    chatId,
    senderId,
    senderName,
    senderType,
    message,
    timestamp: new Date().toISOString(),
    read: false
  }
  
  messages.push(newMessage)
  setToStorage(STORAGE_KEYS.CHAT_MESSAGES, messages)
  
  // Atualizar chat com última mensagem
  const chat = chats.find(c => c.id === chatId)
  if (chat) {
    chat.lastMessage = message
    chat.lastMessageTime = newMessage.timestamp
    if (senderType === 'client') {
      chat.unreadCount += 1
    }
    setToStorage(STORAGE_KEYS.CHATS, chats)
  }
  
  return newMessage
}

export function getChatMessages_ByChat(chatId: string): ChatMessage[] {
  const messages = getChatMessages()
  return messages.filter(m => m.chatId === chatId).sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )
}

export function markMessagesAsRead(chatId: string, userId: string) {
  const messages = getChatMessages()
  const chats = getChats()
  
  messages.forEach(message => {
    if (message.chatId === chatId && message.senderId !== userId) {
      message.read = true
    }
  })
  
  setToStorage(STORAGE_KEYS.CHAT_MESSAGES, messages)
  
  // Reset unread count
  const chat = chats.find(c => c.id === chatId)
  if (chat) {
    chat.unreadCount = 0
    setToStorage(STORAGE_KEYS.CHATS, chats)
  }
}

// Funções de Favoritos
export function addToFavorites(userId: string, feiranteId: string): boolean {
  const favorites = getFavorites()
  const exists = favorites.find(f => f.userId === userId && f.feiranteId === feiranteId)
  
  if (exists) return false
  
  const newFavorite: Favorite = {
    id: Date.now().toString(),
    userId,
    feiranteId,
    createdAt: new Date().toISOString()
  }
  
  favorites.push(newFavorite)
  setToStorage(STORAGE_KEYS.FAVORITES, favorites)
  return true
}

export function removeFromFavorites(userId: string, feiranteId: string): boolean {
  const favorites = getFavorites()
  const index = favorites.findIndex(f => f.userId === userId && f.feiranteId === feiranteId)
  
  if (index === -1) return false
  
  favorites.splice(index, 1)
  setToStorage(STORAGE_KEYS.FAVORITES, favorites)
  return true
}

export function isFavorite(userId: string, feiranteId: string): boolean {
  const favorites = getFavorites()
  return favorites.some(f => f.userId === userId && f.feiranteId === feiranteId)
}

// Funções de Pedidos
export function saveOrder(order: Order): Order {
  const orders = getOrders()
  orders.push(order)
  setToStorage(STORAGE_KEYS.ORDERS, orders)
  return order
}

export function getUserOrders(userId: string): Order[] {
  const orders = getOrders()
  return orders.filter(order => order.clientId === userId)
}

export function updateOrderStatus(orderId: string, status: Order['status']): boolean {
  const orders = getOrders()
  const order = orders.find(o => o.id === orderId)
  
  if (!order) return false
  
  order.status = status
  if (status === 'entregue') {
    order.deliveredAt = new Date().toISOString()
  }
  
  setToStorage(STORAGE_KEYS.ORDERS, orders)
  return true
}

export { STORAGE_KEYS, INITIAL_DATA }
