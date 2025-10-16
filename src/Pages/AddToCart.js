import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Login from "../Components/Login"
const AddToCartPage = () => {
  const [items, setItems] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(storedCart);

    const token = localStorage.getItem("token");
    if (token === "undefined") localStorage.removeItem("token"); // remove invalid
  }, []);

  const handleQuantityChange = (id, value) => {
    if (value < 1) value = 1;
    const updatedItems = items.map(item => item.id === id ? { ...item, quantity: value } : item);
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleRemove = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const totalAmount = items.reduce((t, item) => t + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    const token = localStorage.getItem("token");
    console.log("Token found:", token);

    if (!token || token === "undefined") {
      setShowAuth(true);
    } else {
      navigate("/check-out");
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    navigate("/check-out");
  };

  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className={`text-center mb-12 tracking-wide font-serif drop-shadow-lg font-semibold ${items.length > 0 ? "text-2xl sm:text-3xl md:text-4xl text-gray-900" : "text-3xl sm:text-4xl md:text-5xl text-gray-900"}`}>
          {items.length > 0 ? "Your Shopping Cart" : "Your Cart is Empty!"}
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" className="w-24 sm:w-32 h-24 sm:h-32 opacity-60"/>
            <p className="text-gray-500 text-lg sm:text-xl md:text-2xl text-center">Looks like you haven't added any products yet.</p>
            <Link to="/collection">
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black border border-black transition duration-300 shadow-md hover:shadow-xl mt-4">Browse Products</button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 gap-3 sm:gap-6">
              {items.map(item => (
                <div key={item.id} className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white p-3 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <button onClick={() => handleRemove(item.id)} className="absolute top-2 right-2 lg:top-4 lg:right-3 text-red-500 text-xl sm:text-3xl hover:text-red-700 hover:scale-110 transition-transform duration-300"><FiTrash2/></button>
                  <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"/>
                  <div className="flex-1 sm:ml-4 mt-3 sm:mt-0 w-full sm:w-auto">
                    <h2 className="text-sm sm:text-xl md:text-2xl font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-gray-600 mt-1 text-xs sm:text-lg">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-700 text-xs sm:text-base">Qty:</span>
                      <input type="number" min="1" value={item.quantity} onChange={(e)=>handleQuantityChange(item.id, parseInt(e.target.value))} className="w-12 sm:w-20 p-1 sm:p-2 border border-gray-400 rounded-lg text-center text-xs sm:text-base"/>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-max">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between font-medium text-gray-800 text-sm sm:text-base">
                <span>Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-800 text-sm sm:text-base mt-1">
                <span>Shipping:</span>
                <span>₹100</span>
              </div>
              <hr className="my-4"/>
              <div className="flex justify-between font-bold text-lg sm:text-xl">
                <span>Total:</span>
                <span>₹{totalAmount + 100}</span>
              </div>
              <button onClick={handleCheckoutClick} className="mt-6 w-full py-3 rounded-xl text-white bg-black hover:bg-white hover:text-black border border-black transition duration-300 font-semibold">Checkout</button>
            </div>
          </div>
        )}
      </div>

      {showAuth && <Login setOpen={setShowAuth} onSuccess={handleAuthSuccess}/>}

      <Footer />
    </div>
  );
};

export default AddToCartPage;
