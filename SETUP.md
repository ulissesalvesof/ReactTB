# 🔧 Configuração do Firebase e EmailJS

## 📋 Pré-requisitos

Antes de usar o sistema, você precisa configurar:

1. **Firebase** - Para autenticação e banco de dados
2. **EmailJS** - Para envio de emails (opcional)

---

## 🔥 Configuração do Firebase

### 1. Criar projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar projeto"
3. Escolha um nome para o projeto
4. Configure o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Configurar Authentication

1. No painel do Firebase, vá em **Authentication**
2. Clique na aba **Sign-in method**
3. Ative o **Google** como provedor
4. Configure os domínios autorizados (adicione `localhost` para desenvolvimento)

### 3. Configurar Firestore Database

1. No painel do Firebase, vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Começar no modo de teste** (para desenvolvimento)
4. Selecione a localização do banco de dados

### 4. Configurar regras do Firestore

Substitua as regras padrão pelas seguintes:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Produtos - leitura pública, escrita apenas para usuários autenticados
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Carrinhos - apenas para o próprio usuário
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Pedidos - apenas para o próprio usuário
    match /orders/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Usuários - apenas para o próprio usuário
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Obter credenciais do Firebase

1. No painel do Firebase, vá em **Configurações do projeto** (ícone de engrenagem)
2. Na aba **Geral**, desça até **Seus aplicativos**
3. Clique em **Adicionar app** e escolha **Web**
4. Registre o app com um nome
5. Copie as credenciais que aparecerão

### 6. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

# EmailJS Configuration (opcional)
REACT_APP_EMAILJS_SERVICE_ID=your-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=your-template-id
REACT_APP_EMAILJS_USER_ID=your-user-id
```

---

## 📧 Configuração do EmailJS (Opcional)

### 1. Criar conta no EmailJS

1. Acesse [EmailJS](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Faça login no dashboard

### 2. Configurar serviço de email

1. Vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha um provedor (Gmail, Outlook, etc.)
4. Configure com suas credenciais
5. Anote o **Service ID**

### 3. Criar template de email

1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Use o seguinte template:

```html
Novo Pedido - {{order_date}}

Cliente: {{customer_name}}
Email: {{customer_email}}
Telefone: {{customer_phone}}

Usuário Logado: {{user_name}} ({{user_email}})

Itens do Pedido:
{{cart_items}}

Total: {{total_amount}}

---
Este pedido foi enviado automaticamente pelo sistema.
```

4. Anote o **Template ID**

### 4. Obter User ID

1. Vá em **Account**
2. Copie o **User ID**

---

## 🚀 Inicialização do Sistema

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Certifique-se de que o arquivo `.env` está configurado corretamente.

### 3. Iniciar o projeto

```bash
npm start
```

### 4. Primeiro uso

1. Acesse a aplicação
2. Faça login com Google na página `/login`
3. Vá para `/admin` para adicionar produtos
4. Teste o carrinho e finalização de pedidos

---

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- Login com Google
- Persistência de sessão
- Proteção de rotas

### ✅ CRUD de Produtos
- Criar, editar e deletar produtos
- Upload de imagens (URLs)
- Categorização

### ✅ Carrinho de Compras
- Adicionar/remover itens
- Sincronização com Firebase
- Persistência por usuário

### ✅ Sistema de Pedidos
- Finalização de compras
- Envio de email para admin
- Histórico de pedidos

### ✅ Interface Responsiva
- Design moderno
- Otimizado para mobile
- Experiência intuitiva

---

## 🔧 Solução de Problemas

### Erro de autenticação
- Verifique se o domínio está autorizado no Firebase
- Confirme as credenciais no `.env`

### Erro de permissão no Firestore
- Verifique as regras de segurança
- Certifique-se de que o usuário está autenticado

### Emails não enviados
- Verifique as credenciais do EmailJS
- Confirme se o template está correto

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique os logs do console do navegador
2. Confirme as configurações do Firebase
3. Teste com um usuário diferente
4. Verifique a conexão com a internet

---

**Desenvolvido com ❤️ usando React, Firebase e EmailJS**
