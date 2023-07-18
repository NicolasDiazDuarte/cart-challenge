export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3001/productos");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function buyProducts(itemsId: number[]) {
  try {
    const response = await fetch("http://localhost:3001/compras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemsId }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud POST");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    throw error;
  }
}
