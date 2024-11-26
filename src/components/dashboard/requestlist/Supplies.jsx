import React, { useState } from "react";
import { Trash2, PlusCircle, CheckCircle2 } from 'lucide-react';

const Supplies = ({ formData, setFormData, onBack, onSubmit }) => {
  // Dummy data for the Supplies table
  const dummyServices = [
    { productName: "Product A", quantity: "10", price: "1000" },
    { productName: "Product B", quantity: "5", price: "2000" },
    { productName: "Product C", quantity: "15", price: "500" },
  ];

  // Initialize the state with dummy data
  const [services, setServices] = useState(dummyServices);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([...services, { productName: "", quantity: "", price: "" }]);
  };

  const handleRemoveService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  // Calculate total value
  const totalValue = services.reduce((acc, service) => 
    acc + (parseFloat(service.quantity || 0) * parseFloat(service.price || 0)), 0);

  return (
    <div className="mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary p-6">
        <h2 className="text-3xl font-extrabold text-white text-center">Supplies Management</h2>
      </div>
      
      <div className="p-8 space-y-6">
        {/* Supplies Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      name="productName"
                      value={service.productName}
                      onChange={(e) => handleServiceChange(e, index)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                      placeholder="Product Name"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      name="quantity"
                      value={service.quantity}
                      onChange={(e) => handleServiceChange(e, index)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                      placeholder="Quantity"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      name="price"
                      value={service.price}
                      onChange={(e) => handleServiceChange(e, index)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                      placeholder="Price"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td colSpan="2" className="px-4 py-3 text-right font-bold text-gray-700">
                  Total Value:
                </td>
                <td colSpan="2" className="px-4 py-3 font-bold text-primary">
                  ${totalValue.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Add New Service Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddService}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition duration-300 shadow-md hover:shadow-lg"
          >
            <PlusCircle className="w-5 h-5" />
            Add Service
          </button>
        </div>

        {/* Remarks */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={(e) =>
              setFormData({ ...formData, remarks: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
            placeholder="Enter additional remarks or notes here..."
          />
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary transition duration-300 ease-in-out"
          >
            Back
          </button>
          <button
           
            className="bg-primary text-white px-6 py-2 rounded-md 
              hover:bg-primary transition-colors flex items-center"
          >
            <CheckCircle2 className="mr-2" /> Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Supplies;