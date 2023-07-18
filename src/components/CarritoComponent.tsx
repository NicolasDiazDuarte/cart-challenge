import { useContext } from "react";
import { IProduct, IShowCart } from "../interfaces/interfaces";
import { CartContext } from "../context/cart";
import { buyProducts } from "../utils/fetchsToServer";
import { ToastContainer, toast } from "react-toastify";

export const CarritoComponent = ({ setShowCarrito }: IShowCart) => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleBuy = () => {
    if (cart.length > 0) {
      let productIds: number[] = [];
      cart.forEach((product) => productIds.push(product.id));
      buyProducts(productIds).then((response) => {
        if (response) toast.success("Compra realizada!");
        clearCart();
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      <button
        className="rounded-lg bg-[#a6d0ad] text-black p-3"
        onClick={() => setShowCarrito(false)}
      >
        Volver
      </button>
      <h1 className="text-2xl mt-10">Cart</h1>
      <div className="w-full flex flex-col mt-4 h-72">
        {cart.length > 0 ? (
          cart.map((product: IProduct) => (
            <div className="rounded-lg w-full h-12 bg-[#a6d0ad] mt-2 flex justify-between items-center">
              <img
                src={`${product.imagen}`}
                alt="potion"
                className="w-10 h-10"
              />
              <div className="font-bold text-md">{product.nombre}</div>
              <button
                className="text-gray-500 mr-4"
                onClick={() => removeFromCart(product.id)}
              >
                X
              </button>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-4xl mt-4">
            El carrito se encuentra vacío...
          </div>
        )}
      </div>
      <button
        className="rounded-lg w-full mt-4 bg-[#a6db2a] text-black p-3 text-3xl font-bold mb-auto"
        onClick={() => handleBuy()}
      >
        Comprar
      </button>
    </div>
  );
};
