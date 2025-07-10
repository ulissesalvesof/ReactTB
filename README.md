# 🚀 Projeto React Simples

Um projeto React moderno demonstrando o uso de rotas, hooks, axios e mocks.

## 📋 Sobre o Projeto

Este é um projeto exemplo que demonstra uma aplicação React completa com:
- **React Hooks** (useState, useEffect)
- **React Router** para navegação
- **Axios** para requisições HTTP
- **MSW (Mock Service Worker)** para simulação de API
- **Interface responsiva** e moderna

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal
- **React Router DOM** - Navegação entre páginas
- **Axios** - Cliente HTTP para requisições
- **CSS3** - Estilização responsiva

### Desenvolvimento
- **MSW (Mock Service Worker)** - Simulação de API
- **React Scripts** - Configuração e build

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
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
