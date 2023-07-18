import { ReactNode, createContext, useState } from "react";
import { toast } from "react-toastify";

interface IProduct {
  id: number;
  precio: number;
  imagen: string;
  nombre: string;
  descripcion: string;
  categoria: string;
}

interface ICartContextProps {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  gemsLeft: number;
}

type Props = {
  children: ReactNode;
};

export const CartContext = createContext<ICartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  gemsLeft: 3,
});

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [gemsLeft, setGemsLeft] = useState<number>(3);

  const addToCart = (product: IProduct) => {
    const productInCartIndex = cart.findIndex(
      (item: IProduct) => item.id === product.id
    );

    const sameCategorie = cart.findIndex(
      (item: IProduct) => item.categoria === product.categoria
    );

    if (
      productInCartIndex === -1 &&
      sameCategorie === -1 &&
      gemsLeft - product.precio >= 0
    ) {
      const newCart: IProduct[] = [...cart, product];
      setGemsLeft(gemsLeft - product.precio);
      setCart(newCart);
      toast.success("Pocion agregada al carrito");
    } else {
      if (productInCartIndex !== -1)
        return toast.warn("La pocion ya se encuentra en el carrito");
      if (sameCategorie !== -1)
        return toast.warn(
          "Ya se encuentra una pocion de la misma categoria en el carrito"
        );
      if (gemsLeft - product.precio <= 0)
        toast.warn("No tienes suficientes gemas");
    }
  };

  const removeFromCart = (productId: number) => {
    const productToRemove = cart.find(
      (item: IProduct) => item.id === productId
    );

    if (productToRemove) {
      const updatedCart: IProduct[] = cart.filter(
        (item: IProduct) => item.id !== productId
      );

      setCart(updatedCart);
      setGemsLeft(gemsLeft + productToRemove.precio);
    }
  };
  const clearCart = () => {
    setCart([]);
    setGemsLeft(3);
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, gemsLeft, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
