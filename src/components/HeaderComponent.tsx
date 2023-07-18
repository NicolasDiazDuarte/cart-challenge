import { useContext } from "react";
import { CartContext } from "../context/cart";
import { IShowCart } from "../interfaces/interfaces";

export const HeaderComponent = ({ setShowCarrito }: IShowCart) => {
  const { gemsLeft, cart } = useContext(CartContext);
  return (
    <div className="bg-stone-700 py-4 px-8 flex justify-between items-center sticky top-0 shadow-md z-10">
      <h1 className="text-white text-2xl font-bold">🧙‍♂️ Potion Shop</h1>
      <div className="flex gap-2 items-center">
        <img src="./gem.png" alt="gem" />
        <span>{gemsLeft} Gemas</span>
      </div>
      <button
        onClick={() => setShowCarrito(true)}
        className="text-white hover:underline"
      >{`Ver carrito(${cart.length})`}</button>
    </div>
  );
};
