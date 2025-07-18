import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Serviços para produtos
export const productService = {
  // Buscar todos os produtos
  async getProducts() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'products'), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  // Buscar produto por ID
  async getProductById(id) {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Produto não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  },

  // Adicionar produto
  async addProduct(productData) {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { id: docRef.id, ...productData };
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    }
  },

  // Atualizar produto
  async updateProduct(id, productData) {
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        ...productData,
        updatedAt: new Date().toISOString()
      });
      return { id, ...productData };
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  // Deletar produto
  async deleteProduct(id) {
    try {
      await deleteDoc(doc(db, 'products', id));
      return id;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  },

  // Listener em tempo real para produtos
  onProductsChange(callback) {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(products);
    });
  }
};

// Serviços para carrinho
export const cartService = {
  // Buscar carrinho do usuário
  async getCart(userId) {
    try {
      const q = query(
        collection(db, 'carts'), 
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { items: [] };
      }
      
      const cartDoc = querySnapshot.docs[0];
      return { id: cartDoc.id, ...cartDoc.data() };
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      throw error;
    }
  },

  // Salvar carrinho
  async saveCart(userId, cartItems) {
    try {
      const q = query(
        collection(db, 'carts'), 
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      
      const cartData = {
        userId,
        items: cartItems,
        updatedAt: new Date().toISOString()
      };

      if (querySnapshot.empty) {
        // Criar novo carrinho
        const docRef = await addDoc(collection(db, 'carts'), {
          ...cartData,
          createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...cartData };
      } else {
        // Atualizar carrinho existente
        const cartDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'carts', cartDoc.id), cartData);
        return { id: cartDoc.id, ...cartData };
      }
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
      throw error;
    }
  },

  // Limpar carrinho
  async clearCart(userId) {
    try {
      const q = query(
        collection(db, 'carts'), 
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const cartDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'carts', cartDoc.id), {
          items: [],
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    }
  }
};

// Serviços para pedidos
export const orderService = {
  // Criar pedido
  async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { id: docRef.id, ...orderData };
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  },

  // Buscar pedidos do usuário
  async getUserOrders(userId) {
    try {
      const q = query(
        collection(db, 'orders'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw error;
    }
  }
};
