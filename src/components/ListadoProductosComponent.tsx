import { useContext, useEffect, useState } from "react";
import { getProducts } from "../utils/fetchsToServer";
import { CartContext } from "../context/cart";
import { IProduct } from "../interfaces/interfaces";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ListadoProductosComponent = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then((result) => setProducts(result));
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className="font-extrabold text-[#a6db2a] text-2xl">
        List of potions
      </h1>
      <div className="flex flex-row flex-wrap relative rounded-lg">
        {products.map((product: IProduct) => (
          <div
            key={product.id}
            className="border-2 border-black h-72 w-1/3 bg-[#a6d0ad] p-2 rounded-b-md shadow-md flex flex-col justify-between group"
          >
            <img
              src={`${product.imagen}`}
              alt="potion"
              className="w-16 h-16 m-auto"
            />
            <div className="flex justify-between items-center mb-2">
              <p className="text-black text-sm font-bold">
                {product.categoria}
              </p>
              <div className="text-[#e9f3eb] bg-black rounded-full text-sm font-extrabold p-1">
                Gemas: {product.precio}
              </div>
            </div>
            <div className="flex flex-col h-24">
              <div className="flex flex-col">
                <p className="text-black text-md font-extrabold truncate text-center w-full whitespace-nowrap group-hover:text-lg">
                  {product.nombre}
                </p>
                <p className="text-[#000000] text-[0.75rem] font-semibold overflow-y-auto prompt mt-3">
                  {product.descripcion}
                </p>
              </div>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="flex justify-center mt-2 text-black text-xl rounded-full border-2 bg-gradient-to-t from-[#a8dadc] to-[#a6db2a] font-extrabold px-4 py-1 prompt group-hover:from-[#bbeeff] group-hover:to-[#afb7c5] group-hover:scale-105 group-hover:ring ring-black ring-opacity-50"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
