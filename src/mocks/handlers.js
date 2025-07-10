import { http, HttpResponse } from 'msw';

// Mock data - Suplementos
const products = [
  {
    id: 1,
    name: 'Whey Protein Concentrado 900g',
    category: 'Proteínas',
    price: 89.99,
    image: 'https://via.placeholder.com/300x200?text=Whey+Protein',
    description: 'Whey Protein Concentrado de alta qualidade com 80% de proteína por porção. Ideal para ganho de massa muscular e recuperação pós-treino.',
    specifications: {
      'Proteína por porção': '24g',
      'Carboidratos': '3g',
      'Gorduras': '2g',
      'Sabores': 'Chocolate, Baunilha, Morango'
    }
  },
  {
    id: 2,
    name: 'Creatina Monohidratada 300g',
    category: 'Performance',
    price: 45.99,
    image: 'https://via.placeholder.com/300x200?text=Creatina',
    description: 'Creatina monohidratada pura para aumento da força, potência e volume muscular. Produto importado de alta qualidade.',
    specifications: {
      'Porções': '60 doses de 5g',
      'Pureza': '99,9%',
      'Tipo': 'Monohidratada',
      'Origem': 'Alemanha'
    }
  },
  {
    id: 3,
    name: 'BCAA 2:1:1 - 120 Cápsulas',
    category: 'Aminoácidos',
    price: 59.99,
    image: 'https://via.placeholder.com/300x200?text=BCAA',
    description: 'Aminoácidos de cadeia ramificada na proporção ideal 2:1:1. Previne o catabolismo e acelera a recuperação muscular.',
    specifications: {
      'Leucina': '500mg',
      'Isoleucina': '250mg',
      'Valina': '250mg',
      'Cápsulas': '120 unidades'
    }
  },
  {
    id: 4,
    name: 'Multivitamínico Premium',
    category: 'Vitaminas',
    price: 39.99,
    image: 'https://via.placeholder.com/300x200?text=Multivitaminico',
    description: 'Complexo vitamínico completo com 25 vitaminas e minerais essenciais para saúde e bem-estar geral.',
    specifications: {
      'Vitaminas': '13 tipos',
      'Minerais': '12 tipos',
      'Cápsulas': '60 unidades',
      'Doses': '2 meses'
    }
  },
  {
    id: 5,
    name: 'Termogênico Black Fire',
    category: 'Emagrecimento',
    price: 79.99,
    image: 'https://via.placeholder.com/300x200?text=Termogenico',
    description: 'Termogênico potente com cafeína, guaraná e pimenta. Acelera o metabolismo e auxilia na queima de gordura.',
    specifications: {
      'Cafeína': '200mg por dose',
      'Guaraná': '150mg',
      'Capsaicina': '50mg',
      'Cápsulas': '60 unidades'
    }
  },
  {
    id: 6,
    name: 'Hipercalórico Mass Gainer 3kg',
    category: 'Hipercalóricos',
    price: 129.99,
    image: 'https://via.placeholder.com/300x200?text=Mass+Gainer',
    description: 'Hipercalórico com alto valor energético para ganho de peso e massa muscular. Rico em proteínas e carboidratos.',
    specifications: {
      'Calorias por porção': '600kcal',
      'Proteína': '30g',
      'Carboidratos': '85g',
      'Sabores': 'Chocolate, Baunilha'
    }
  }
];

const categories = [
  { id: 1, name: 'Proteínas', slug: 'proteinas' },
  { id: 2, name: 'Performance', slug: 'performance' },
  { id: 3, name: 'Aminoácidos', slug: 'aminoacidos' },
  { id: 4, name: 'Vitaminas', slug: 'vitaminas' },
  { id: 5, name: 'Emagrecimento', slug: 'emagrecimento' },
  { id: 6, name: 'Hipercalóricos', slug: 'hipercaloricos' }
];

const companyInfo = {
  name: 'MAN Nutrition',
  description: 'Há mais de 10 anos no mercado, a MAN Nutrition é referência em suplementos esportivos e nutrição. Oferecemos produtos de alta qualidade para atletas e pessoas que buscam uma vida mais saudável.',
  mission: 'Fornecer suplementos de máxima qualidade para potencializar seus resultados e transformar vidas através da nutrição esportiva.',
  vision: 'Ser a marca de suplementos mais confiável e inovadora do Brasil, sempre priorizando a saúde e satisfação dos nossos clientes.',
  values: [
    'Qualidade e pureza dos produtos',
    'Transparência nas informações',
    'Inovação constante',
    'Atendimento especializado',
    'Compromisso com resultados'
  ],
  contact: {
    email: 'contato@mannutrition.com.br',
    phone: '(85) 3354-5573',
    address: 'Rua Frei Teodoro, 1132 - Canindé - CE'
  }
};

const contactInfo = {
  address: 'Rua Frei Teodoro, 1132 - Canindé\nCanindé, CE - CEP: 62700-000',
  phone: '(85) 3354-5573',
  email: 'contato@mannutrition.com.br',
  hours: [
    'Segunda a Quinta: 7h às 18h',
    'Sexta: 7h às 17h',
    'Sábado: 8h às 12h',
    'Domingo: Fechado'
  ]
};

const stats = {
  totalProducts: 850,
  totalCategories: 12,
  totalUsers: 25643,
  totalOrders: 45847
};

export const handlers = [
  // Produtos
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    
    let filteredProducts = [...products];
    
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (search) {
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return HttpResponse.json(filteredProducts);
  }),

  http.get('/api/products/featured', () => {
    const featuredProducts = products.slice(0, 4);
    return HttpResponse.json(featuredProducts);
  }),

  http.get('/api/products/:id', ({ params }) => {
    const product = products.find(p => p.id === parseInt(params.id));
    if (product) {
      return HttpResponse.json(product);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Categorias
  http.get('/api/categories', () => {
    return HttpResponse.json(categories);
  }),

  // Informações da empresa
  http.get('/api/company/info', () => {
    return HttpResponse.json(companyInfo);
  }),

  // Informações de contato
  http.get('/api/contact/info', () => {
    return HttpResponse.json(contactInfo);
  }),

  // Enviar mensagem de contato
  http.post('/api/contact', async ({ request }) => {
    const data = await request.json();
    console.log('Mensagem de contato recebida:', data);
    return HttpResponse.json({ message: 'Mensagem enviada com sucesso!' });
  }),

  // Estatísticas
  http.get('/api/stats', () => {
    return HttpResponse.json(stats);
  }),
];
