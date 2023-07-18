import { useState } from "react";
import { CarritoComponent } from "./components/CarritoComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { ListadoProductosComponent } from "./components/ListadoProductosComponent";

function App() {
  const [showCarrito, setShowCarrito] = useState(false);
  return (
    <div
      className="min-h-full bg-fixed"
      style={{ backgroundImage: "url(background.webp)" }}
    >
      <HeaderComponent setShowCarrito={setShowCarrito} />
      <div className="flex justify-center min-h-full">
        <div className="max-w-xl w-full py-4">
          {showCarrito ? (
            <CarritoComponent setShowCarrito={setShowCarrito} />
          ) : (
            <ListadoProductosComponent />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
