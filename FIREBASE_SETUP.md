# Firebase Configuration

Para configurar o Firebase no seu projeto, siga estes passos:

## 1. Configurar Firebase Console

1. Vá para https://console.firebase.google.com/
2. Crie um novo projeto ou selecione um existente
3. Ative os seguintes serviços:
   - **Authentication** (Autenticação)
   - **Firestore Database** (Banco de dados)

## 2. Configurar Authentication

1. No console Firebase, vá para **Authentication > Sign-in method**
2. Ative o provedor **Google**
3. Adicione os domínios autorizados (ex: localhost, seu-dominio.com)

## 3. Configurar Firestore Database

1. No console Firebase, vá para **Firestore Database**
2. Crie um banco de dados
3. Configure as regras de segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Produtos - somente leitura para todos, escrita para usuários autenticados
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Carrinhos - somente o próprio usuário pode acessar
    match /carts/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Pedidos - somente o próprio usuário pode acessar
    match /orders/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 4. Configurar variáveis de ambiente

1. Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_FIREBASE_API_KEY=sua_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu-projeto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
REACT_APP_FIREBASE_APP_ID=seu_app_id

# EmailJS (opcional - para envio de emails)
REACT_APP_EMAILJS_SERVICE_ID=seu_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=seu_template_id
REACT_APP_EMAILJS_USER_ID=seu_user_id
```

2. Atualize o arquivo `src/config/firebase.js` para usar as variáveis de ambiente:

```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```

## 5. Estrutura do banco de dados

O projeto criará automaticamente as seguintes coleções:

### Products (produtos)
```
{
  id: string,
  name: string,
  category: string,
  price: number,
  image: string,
  description: string,
  inStock: boolean,
  createdAt: string,
  updatedAt: string
}
```

### Carts (carrinhos)
```
{
  id: string,
  userId: string,
  items: [
    {
      id: string,
      name: string,
      price: number,
      quantity: number,
      image: string,
      category: string
    }
  ],
  createdAt: string,
  updatedAt: string
}
```

### Orders (pedidos)
```
{
  id: string,
  userId: string,
  customerInfo: {
    name: string,
    email: string,
    phone: string
  },
  items: array,
  total: number,
  status: string,
  createdAt: string,
  updatedAt: string
}
```

## 6. Funcionalidades implementadas

- ✅ Autenticação com Google
- ✅ CRUD de produtos (sincronizado com Firebase)
- ✅ Carrinho de compras persistente por usuário
- ✅ Pedidos salvos no Firebase
- ✅ Envio de email com dados do pedido (opcional)
- ✅ Interface responsiva
- ✅ Proteção de rotas administrativas

## 7. Como usar

1. Faça login com sua conta Google
2. Adicione produtos ao carrinho
3. Finalize o pedido preenchendo seus dados
4. O carrinho será sincronizado automaticamente entre dispositivos
5. Acesse `/admin` para gerenciar produtos (apenas usuários logados)

## Observações importantes

- O arquivo `.env` deve ser adicionado ao `.gitignore` para não expor suas credenciais
- As regras do Firestore garantem que cada usuário só acesse seus próprios dados
- Os produtos são públicos para leitura, mas apenas usuários autenticados podem modificar
- O envio de email é opcional e requer configuração adicional do EmailJS
