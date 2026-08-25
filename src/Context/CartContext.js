"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "@/Context/UserContext";
import useAlert from "@/Hooks/useAlert";
import axios from "axios";
import { addProductsCartToLocalStorage } from "@/lib/utils/addProductsCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { showAlert } = useAlert();
    const { token } = useUser();

    const getCart = useCallback(async () => {
        if (!token) {
            const products = JSON.parse(localStorage.getItem("products") || "[]");
            setCart(products.map((product) => ({
                product,
                quantity: product.quantity,
                price: product.discount_price || product.price,
            })));
            return;
        }
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
                headers: { Authorization: token },
            });
            setCart(data.data || []);
            console.log("cart", data);
            localStorage.setItem("cart", JSON.stringify(data.data || []));
        } catch (err) {
            console.error("Error loading cart:", err);
            showAlert(err.response?.data?.message, 2300);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    const updateCart = async (product_id, quantity) => {
        if (!token) {
            const product = cart.find((item) => item.product.id === product_id)?.product;
            if (product) {
                await addProductsCartToLocalStorage(quantity, product);
                await getCart();
            }
            return;
        }
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart`, 
                { product_id, quantity },
                { headers: { Authorization: token } }
            );
            await getCart();
        } catch (err) {
            showAlert(err.response?.data?.message || "خطا در بروزرسانی سبد", "error", 2300);
        }
    };

    const deleteFromCart = async (product_id) => {
        if (!token) {
            const product = cart.find((item) => item.product.id === product_id)?.product;
            if (product) {
                await addProductsCartToLocalStorage(0, product);
                await getCart();
                showAlert("محصول از سبد خرید حذف شد", "success", 2300);
            }
            return;
        }
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${product_id}`, {
                headers: { Authorization: token }
            });
            await getCart();
            showAlert("محصول از سبد خرید حذف شد", "success", 2300);
        } catch (err) {
            showAlert(err.response?.data?.message || "خطا در حذف محصول", "error", 2300);
        }
    };

    useEffect(() => {
        getCart();
        window.addEventListener("cart-updated", getCart);
        return () => window.removeEventListener("cart-updated", getCart);
    }, [getCart]);

  return (
    <CartContext.Provider value={{ cart, getCart, updateCart, deleteFromCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
