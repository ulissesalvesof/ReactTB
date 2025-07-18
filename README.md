# � MAN Store - E-commerce Completo

Um sistema de e-commerce completo com autenticação, CRUD de produtos, carrinho de compras e integração com Firebase.

## 🎯 Funcionalidades

### 🔐 Autenticação
- Login com Google
- Persistência de sessão
- Proteção de rotas administrativas

### 📦 Gestão de Produtos
- **CRUD completo** de produtos
- Upload de imagens via URL
- Categorização de produtos
- Interface administrativa

### 🛍️ Carrinho de Compras
- Adicionar/remover produtos
- Controle de quantidade
- Sincronização com Firebase
- Persistência por usuário

### 📧 Sistema de Pedidos
- Finalização de compras
- Envio automático de email para admin
- Histórico de pedidos
- Integração com EmailJS

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal
- **React Router DOM** - Navegação entre páginas
- **React Hook Form** - Gerenciamento de formulários
- **React Icons** - Ícones modernos
- **CSS3** - Estilização responsiva

### Backend & Database
- **Firebase** - Autenticação e banco de dados
- **Firestore** - Banco de dados NoSQL
- **Firebase Auth** - Autenticação com Google

### Serviços Externos
- **EmailJS** - Envio de emails
- **Google Auth** - Login social

## 🚀 Configuração e Instalação

### 1. Pré-requisitos
- Node.js (versão 14 ou superior)
- Conta no Firebase
- Conta no EmailJS (opcional)

### 2. Instalação
```bash
# Clonar o repositório
git clone https://github.com/ulissesalvesof/ReactTB.git
cd ReactTB

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env
```

### 3. Configuração
1. Configure o Firebase seguindo o guia em [SETUP.md](SETUP.md)
2. Configure o EmailJS (opcional)
3. Atualize as variáveis de ambiente no arquivo `.env`

### 4. Executar o projeto
```bash
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.js       # Barra de navegação
│   ├── Login.js        # Componente de login
│   ├── ShoppingCart.js # Carrinho de compras
│   └── ProductManager.js # Gestão de produtos
├── context/            # Contextos React
│   ├── AuthContext.js  # Contexto de autenticação
│   └── AppContext.js   # Contexto global da aplicação
├── pages/              # Páginas da aplicação
│   ├── Home/           # Página inicial
│   ├── Products.js     # Lista de produtos
│   ├── About.js        # Sobre a empresa
│   └── Contact.js      # Contato
├── services/           # Serviços externos
│   └── firebaseService.js # Integração com Firebase
├── config/             # Configurações
│   └── firebase.js     # Configuração do Firebase
└── App.js             # Componente principal
```
│   ├── Navbar.js       # Barra de navegação
│   └── SimpleFooter.js # Rodapé
├── pages/              # Páginas da aplicação
│   ├── Home/           # Página inicial
│   ├── Products.js     # Lista de produtos
│   ├── ProductDetail.js # Detalhes do produto
│   ├── About.js        # Sobre a empresa
│   └── Contact.js      # Página de contato
├── mocks/              # Configuração dos mocks
│   ├── handlers.js     # Manipuladores de requisições
│   └── browser.js      # Configuração do MSW
├── App.js              # Componente principal
└── index.js            # Ponto de entrada
```

## 🚀 Como Executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute em modo de desenvolvimento:**
   ```bash
   npm start
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

## 📱 Páginas Disponíveis

- **Home (/)** - Página inicial com produtos em destaque
- **Produtos (/products)** - Lista de produtos com filtros
- **Detalhes (/products/:id)** - Detalhes de um produto específico
- **Sobre (/about)** - Informações sobre a empresa
- **Contato (/contact)** - Formulário de contato

## 🔧 Funcionalidades

### ✅ Implementadas

- [x] Navegação entre páginas com React Router
- [x] Listagem de produtos com filtros
- [x] Busca de produtos
- [x] Detalhes de produtos
- [x] Formulário de contato
- [x] Design responsivo
- [x] Mocks de API com MSW
- [x] Estados de carregamento
- [x] Tratamento de erros

### 🎯 Demonstração de Conceitos

- **useState**: Gerenciamento de estado local
- **useEffect**: Efeitos colaterais e requisições
- **useParams**: Parâmetros de rota
- **useSearchParams**: Query parameters
- **useNavigate**: Navegação programática
- **Axios**: Requisições HTTP
- **MSW**: Simulação de API

## 📊 API Mock

O projeto utiliza MSW para simular uma API REST com os seguintes endpoints:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products` | Lista produtos (com filtros) |
| GET | `/api/products/featured` | Produtos em destaque |
| GET | `/api/products/:id` | Detalhes de um produto |
| GET | `/api/categories` | Lista categorias |
| GET | `/api/company/info` | Informações da empresa |
| GET | `/api/contact/info` | Informações de contato |
| POST | `/api/contact` | Enviar mensagem |
| GET | `/api/stats` | Estatísticas gerais |

## 🎨 Design

O projeto utiliza um design moderno e responsivo com:
- Paleta de cores harmoniosa
- Tipografia legível
- Componentes com hover effects
- Layout flexível para diferentes telas
- Animações suaves

## 📝 Scripts Disponíveis

- `npm start` - Executa em modo desenvolvimento
- `npm build` - Cria build de produção
- `npm test` - Executa testes
- `npm eject` - Ejeta configurações (irreversível)

## 🤝 Contribuição

Este é um projeto educacional. Sinta-se à vontade para:
- Fazer fork do projeto
- Criar features adicionais
- Melhorar o código existente
- Adicionar novos componentes

---

**Desenvolvido com ❤️ utilizando React**
