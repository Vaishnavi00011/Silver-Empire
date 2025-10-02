import React from "react";
import Sidebar from "../Components/Sidebar";
import DHeader from "../Components/DHeader";
import { FiPlus } from "react-icons/fi";

const AddProductDesign = () => {
  const categories = [
    "Ring",
    "Pendant",
    "Mangalsutra",
    "Earring",
    "Chain",
    "Bangle",
    "Necklace",
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <DHeader />

        <div className="flex  flex-1 p-6 ">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 grid gap-4">
            <h2 className="text-2xl font-bold text-gray-800  mb-4 border-b pb-2">
              ➕ Add New Product
            </h2>

            {/* Product Name & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Silver Ring"
                  className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-1">
                  Category
                </label>
                <select className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none">
                  <option value="">Select Category</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price & Main Image */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-1">
                  Main Image
                </label>
                <div className="border border-gray-300 rounded-md p-2 flex justify-between items-center cursor-pointer hover:border-indigo-400 transition">
                  <span className="text-sm text-gray-500">Add Main Image</span>
                  <FiPlus className="text-gray-500" />
                </div>
              </div>
            </div>

            {/* More Images */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add more images"
                className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition flex items-center gap-1">
                <FiPlus /> Add
              </button>
            </div>

            {/* Description */}
            <div>
              <label className="text-gray-700 text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                placeholder="Product details..."
                rows="3"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
              ></textarea>
            </div>

            {/* Add Product Button */}
            <div className="flex justify-end">
              <button className="px-5 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition">
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductDesign;
