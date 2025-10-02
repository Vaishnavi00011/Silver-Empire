import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaRupeeSign } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Ring from "../assets/Images/Mask group (5).png";

const BuyNowPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", altPhone: "", address1: "", address2: "",
    city: "", state: "", pincode: "", country: "India", billingSame: true,
    billingAddress1: "", billingAddress2: "", billingCity: "", billingState: "",
    billingPincode: "", deliveryOption: "Standard", giftMessage: "", specialInstructions: "",
  });

  const product = { id: 1, name: "Silver Ring", price: 1200, image: Ring, quantity: 1 };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const totalAmount = product.price * product.quantity + (form.deliveryOption==="Express"?300:100);

  const handlePayment = () => {
    alert(`Payment Successful! 🎉 Your order for ${product.name} is confirmed.`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 p-6">
        {/* Left Form */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Shipping Details */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition hover:-translate-y-1 hover:shadow-xl duration-300">
            <h2 className="flex items-center text-xl font-semibold mb-6">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4 animate-pulse">1</span>
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name","email","phone","altPhone","address1","address2","city","state","pincode","country"].map((field, idx)=>(
                <input
                  key={idx}
                  type={field==="email"?"email":field==="phone"?"tel":"text"}
                  name={field}
                  placeholder={field==="address1"?"Address Line 1":field==="address2"?"Address Line 2 (optional)":field.charAt(0).toUpperCase()+field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  className={`p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition ${field.includes("address")?"col-span-2":""}`}
                />
              ))}
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition hover:-translate-y-1 hover:shadow-xl duration-300">
            <h2 className="flex items-center text-xl font-semibold mb-4">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4 animate-pulse">2</span>
              Billing Address
            </h2>
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="billingSame" checked={form.billingSame} onChange={handleChange} className="w-4 h-4 accent-black"/>
                Same as Shipping Address
              </label>
            </div>
            {!form.billingSame && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["billingAddress1","billingAddress2","billingCity","billingState","billingPincode"].map((field, idx)=>(
                  <input
                    key={idx}
                    type="text"
                    name={field}
                    placeholder={field==="billingAddress1"?"Billing Address Line 1":field==="billingAddress2"?"Billing Address Line 2 (optional)":field==="billingCity"?"City":field==="billingState"?"State/Region":"Pincode"}
                    value={form[field]}
                    onChange={handleChange}
                    className={`p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition ${field.includes("Address")?"col-span-2":""}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Delivery & Notes */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition hover:-translate-y-1 hover:shadow-xl duration-300">
            <h2 className="flex items-center text-xl font-semibold mb-6">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4 animate-pulse">3</span>
              Delivery & Notes
            </h2>
            <div className="mb-4 flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="deliveryOption" value="Standard" checked={form.deliveryOption==="Standard"} onChange={handleChange} className="w-4 h-4 accent-black"/>
                Standard Delivery (₹100)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="deliveryOption" value="Express" checked={form.deliveryOption==="Express"} onChange={handleChange} className="w-4 h-4 accent-black"/>
                Express Delivery (₹300)
              </label>
            </div>
            <textarea name="giftMessage" placeholder="Gift Message (optional)" value={form.giftMessage} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition duration-300 mb-4"/>
            <textarea name="specialInstructions" placeholder="Special Instructions (optional)" value={form.specialInstructions} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition duration-300"/>
          </div>
        </div>

        {/* Right Order Summary & Payment */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-max transform transition hover:-translate-y-1 hover:shadow-xl duration-300">
          <div>
            <h2 className="flex items-center text-xl font-semibold mb-6">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4 animate-pulse">4</span>
              Order Summary
            </h2>

            <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl mb-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg"/>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-500">Qty: {product.quantity} | ₹{product.price * product.quantity}</p>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>

            <h2 className="text-lg font-semibold mb-3 text-gray-800">Payment Options</h2>
            <div className="flex flex-col gap-3 mb-4">
              {[
                {name:"Visa", icon:<FaCcVisa className="text-blue-600"/>},
                {name:"Mastercard", icon:<FaCcMastercard className="text-red-600"/>},
                {name:"PayPal", icon:<FaCcPaypal className="text-blue-400"/>},
                {name:"Cash", icon:<FaRupeeSign className="text-green-600"/>},
              ].map((option, idx)=>(
                <button key={idx} className="p-3 border border-gray-400 rounded-xl hover:bg-black hover:text-white transition flex items-center justify-between">
                  {option.name} {option.icon}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handlePayment} className="mt-6 w-full py-3 rounded-xl text-lg text-white bg-black hover:bg-white hover:text-black border border-black transition duration-300">
            Confirm & Pay
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyNowPage;
