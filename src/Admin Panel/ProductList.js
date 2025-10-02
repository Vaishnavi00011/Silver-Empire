import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import DHeader from "../Components/DHeader";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ProductList = () => {
  const productsData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ["Ring", "Pendant", "Earring"][i % 3],
    price: (i + 1) * 100,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const totalPages = Math.ceil(productsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex flex-col w-full">
        <DHeader />

        <div className="flex-1 p-2 ">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-2 h-full flex flex-col justify-between">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              📝 Product List
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                      Price (₹)
                    </th>
                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product, idx) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 py-2">{startIndex + idx + 1}</td>
                      <td className="px-3 py-2 text-gray-800 font-medium">{product.name}</td>
                      <td className="px-3 py-2 text-gray-500">{product.category}</td>
                      <td className="px-3 py-2 text-indigo-600 font-semibold">
                        ₹ {product.price}
                      </td>
                      <td className="px-3 py-2 flex justify-center gap-1">
                        <button className="flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-xs">
                          <FiEdit2 /> Edit
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-xs">
                          <FiTrash2 /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination left side */}
            <div className="flex justify-start mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
