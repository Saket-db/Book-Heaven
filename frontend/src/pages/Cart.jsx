import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
      setCart(res.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (Cart.length > 0) {
      const total = Cart.reduce((sum, item) => sum + item.price, 0);
      setTotal(total);
    }
  }, [Cart]);

  const deleteItem = async (id) => {
    try {
      const response = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${id}`, {}, { headers });
      alert(response.data.message);
      fetchCart(); // Refresh cart
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const PlaceOrder = async () => {
    if (Cart.length === 0) {
      alert("Your cart is empty! Add some books before placing an order.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:1000/api/v1/place-order", { order: Cart }, { headers });
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black px-12 py-8">
      {!Cart.length && <Loader />}
      
      {Cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h1 className="text-5xl font-semibold text-gray-400">Empty Cart</h1>
          <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
        </div>
      )}

      {Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-bold text-white mb-8">Your Cart 📚</h1>
          {Cart.map((item, i) => (
            <div
              key={i}
              className="w-full my-4 p-4 bg-gray-800 rounded-xl flex flex-col md:flex-row justify-between items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img src={item.url} alt={item.title} className="h-[20vh] md:h-[10vh] object-cover rounded-lg" />
              <div className="w-full md:w-auto text-white">
                <h1 className="text-2xl font-semibold">{item.title}</h1>
                <p className="text-gray-300 mt-2 hidden lg:block">{item.desc.slice(0, 100)}...</p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-3xl font-semibold text-green-300">₹ {item.price}</h2>
                <button
                  className="bg-red-500 text-white rounded p-2 ms-12 transition hover:bg-red-600"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {Cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-3xl text-white font-semibold">Total Amount</h1>
            <div className="mt-3 flex items-center justify-between text-xl text-white">
              <h2>{Cart.length} books</h2> 
              <h2>₹ {Total}</h2>
            </div>
            <div className="w-full mt-4">
              <button
                className="w-full bg-green-500 text-white rounded px-4 py-3 font-semibold transition hover:bg-green-600"
                onClick={PlaceOrder}
              >
                📦 Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
