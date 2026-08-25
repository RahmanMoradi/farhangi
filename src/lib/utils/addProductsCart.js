import axios from "axios";

export const addProductsCart = async (token) => {
  let storedProducts = localStorage.getItem("products");
  let products = storedProducts ? JSON.parse(storedProducts) : [];

  if (products.length) {
    await products.forEach((e) => {
      let body = {
        product_id: e.id,
        quantity: e.quantity,
      };

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart`, body, {
        headers: {
          Authorization: token,
        },
      });
      // .then((res) => {})
      // .catch((err) => {});
    });
    localStorage.setItem("products", JSON.stringify([]));
  }
};

export const addProductsCartToLocalStorage = async (quantity, productInfo) => {
  let storedProducts = localStorage.getItem("products");
  let products = storedProducts ? JSON.parse(storedProducts) : [];

  const existingProductIndex = products.findIndex(
    (product) => product.id === productInfo.id
  );

  if (quantity > 0) {
    if (existingProductIndex !== -1) {
      products[existingProductIndex].quantity = quantity;
    } else {
      products.push({ ...productInfo, quantity });
    }
  } else {
    if (existingProductIndex !== -1) {
      products.splice(existingProductIndex, 1);
    }
  }

  localStorage.setItem("products", JSON.stringify(products));
  window.dispatchEvent(new Event("cart-updated"));
};
