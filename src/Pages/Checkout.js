import React, { useState } from "react";
import { FaArrowRight, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { SiGooglepay, SiPhonepe } from "react-icons/si";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Ring from "../assets/Images/Mask group (5).png";
import Nacklace from "../assets/Images/3pcs Luxury Black Teardrop Earrings & Necklace Set For Women, Gorgeous Jewelry Set For Banquet And Wedding 1.png";

const cartItems = [
  { id: 1, name: "Silver Ring", price: 1200, quantity: 1, image: Ring },
  { id: 2, name: "Silver Necklace", price: 2500, quantity: 1, image: Nacklace },
];

const CheckoutBlackWhite = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", altPhone: "", address1: "", address2: "",
    city: "", state: "", pincode: "", country: "India", billingSame: true,
    billingAddress1: "", billingAddress2: "", billingCity: "", billingState: "",
    billingPincode: "", deliveryOption: "Standard", giftMessage: "", specialInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    alert("Payment Successful! 🎉 Your order is confirmed.");
  };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-auto">
      <Header />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6">
        {/* Left Form Section */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Step 1: Shipping */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition hover:-translate-y-1 hover:shadow-xl duration-300">
            <h2 className="flex items-center text-xl font-semibold mb-6">
              <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 animate-pulse">1</span>
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[ 
                { name: "name", placeholder: "Full Name" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "phone", placeholder: "Phone Number", type: "tel" },
                { name: "altPhone", placeholder: "Alternate Phone (optional)", type: "tel" },
                { name: "address1", placeholder: "Address Line 1", colSpan: 2 },
                { name: "address2", placeholder: "Address Line 2 (optional)", colSpan: 2 },
                { name: "city", placeholder: "City" },
                { name: "state", placeholder: "State / Region" },
                { name: "pincode", placeholder: "Pincode" },
                { name: "country", placeholder: "Country" },
              ].map((field, idx) => (
                <input
                  key={idx}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={`p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ${field.colSpan ? "col-span-2" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Step 2: Billing */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition hover:-translate-y-1 hover:shadow-xl duration-300">
            <h2 className="flex items-center text-xl font-semibold mb-4">
              <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 animate-pulse">2</span>
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
                <input type="text" name="billingAddress1" placeholder="Billing Address Line 1" value={form.billingAddress1} onChange={handleChange} className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition duration-300 col-span-2" />
                <input type="text" name="billingAddress2" placeholder="Billing Address Line 2 (optional)" value={form.billingAddress2} onChange={handleChange} className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition duration-300 col-span-2" />
                <input type="text" name="billingCity" placeholder="City" value={form.billingCity} onChange={handleChange} className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition duration-300"/>
                <input type="text" name="billingState" placeholder="State / Region" value={form.billingState} onChange={handleChange} className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition duration-300"/>
                <input type="text" name="billingPincode" placeholder="Pincode" value={form.billingPincode} onChange={handleChange} className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition duration-300"/>
              </div>
            )}
          </div>

          {/* Step 3: Delivery & Notes */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition hover:-translate-y-1 hover:shadow-xl duration-300">
            <h2 className="flex items-center text-xl font-semibold mb-6">
              <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 animate-pulse">3</span>
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
              <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mr-4 animate-pulse">4</span>
              Order Summary
            </h2>
            <div className="flex flex-col gap-4 mb-6 max-h-[60vh] overflow-auto pr-2 relative">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500">Qty: {item.quantity} | ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white pointer-events-none"></div>
            </div>

            <hr className="my-4"/>
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>₹{totalAmount + (form.deliveryOption==="Express"?300:100)}</span>
            </div>

            <h2 className="text-xl font-semibold mb-3 text-gray-800">Payment Options</h2>
            <div className="flex flex-col gap-3 mb-4">
              {[
                { name: "Credit / Debit Card", icon: <FaCcVisa className="text-2xl"/> },
                { name: "UPI / Wallet", icon: <SiGooglepay className="text-2xl"/>, altIcon: <SiPhonepe className="text-2xl ml-2"/> },
                { name: "Netbanking", icon: <FaCcPaypal className="text-2xl"/> },
                { name: "Cash on Delivery", icon: <FaArrowRight className="text-lg"/> }
              ].map((option, idx) => (
                <button key={idx} className="p-3 border border-gray-400 rounded-xl hover:bg-black hover:text-white transition text-left flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {option.icon}
                    {option.altIcon && <>{option.altIcon}</>}
                    <span>{option.name}</span>
                  </div>
                  {!option.altIcon && <FaArrowRight/>}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handlePayment} className="mt-6 w-full py-3 rounded-xl text-lg text-white bg-black hover:bg-white hover:text-black border border-black transition duration-300">
            Confirm & Pay
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CheckoutBlackWhite;
