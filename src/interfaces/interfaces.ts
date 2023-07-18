export interface IProduct {
  id: number;
  precio: number;
  imagen: string;
  nombre: string;
  descripcion: string;
  categoria: string;
}

export interface IShowCart {
  setShowCarrito: React.Dispatch<React.SetStateAction<boolean>>;
}
