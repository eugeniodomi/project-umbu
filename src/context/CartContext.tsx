import { createContext, useState, useContext, useMemo, type ReactNode } from 'react';
import { type Produto } from '../domain/models/Produto';

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

interface CartContextData {
  items: CartItem[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (produtoId: string) => void;
  limparCarrinho: () => void;
  valorTotal: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.produto.id === produto.id);
      if (index >= 0) {
        const newItems = [...prevItems];
        newItems[index] = { ...newItems[index], quantidade: newItems[index].quantidade + 1 };
        return newItems;
      }
      return [...prevItems, { produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.produto.id !== produtoId));
  };

  const limparCarrinho = () => setItems([]);

  const valorTotal = useMemo(() => {
    return items.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
  }, [items]);

  return (
    <CartContext.Provider value={{ items, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, valorTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
