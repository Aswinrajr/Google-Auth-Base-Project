import React, { useState, useRef } from "react";
import axios from "axios";

const Procurements = ({ formData, setFormData, onBack, onNext }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const uploadAreaRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post("/api/upload", formData);
      // Reset the selected files after successful upload
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary p-6">
        <h2 className="text-3xl font-extrabold text-white text-center">
          Procurement Details
        </h2>
      </div>

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Vendor Name */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose Vendor
              </label>
              <select
                name="vendor"
                value={formData.vendor}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              >
                <option value="">Select Vendor</option>
                <option value="vendor1">Vendor 1</option>
                <option value="vendor2">Vendor 2</option>
              </select>
            </div>
          </div>

          {/* Quotation Date, Quotation Number, Quotation Copy */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quotation Date
              </label>
              <input
                type="date"
                name="quotationDate"
                value={formData.quotationDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quotation Number
              </label>
              <input
                type="text"
                name="quotationNumber"
                value={formData.quotationNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                placeholder="Enter Quotation Number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quotation Copy
              </label>
              <input
                type="file"
                name="quotationCopy"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              />
            </div>
          </div>

          {/* PO Expiry Date and Expected Delivery Date */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PO Expiry Date
              </label>
              <input
                type="date"
                name="poExpiryDate"
                value={formData.poExpiryDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Delivery Date
              </label>
              <input
                type="date"
                name="expectedDeliveryDate"
                value={formData.expectedDeliveryDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              />
            </div>
          </div>

          {/* Final Quote and Competitive Quotes */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Final Quote
              </label>
              <div className="relative w-full">
              <input
                type="number"
                name="amount"
              
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-16 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter Amount"
              />
              <select
                name="currency"
              
                onChange={handleInputChange}
                className="absolute right-0 top-0 h-full px-4 py-3 bg-transparent border-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
              <div
                className={`border-2 border-dashed rounded-xl p-8 w-full max-w-2xl cursor-pointer transition-colors duration-300 ${
                  isDragOver
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 hover:border-primary"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                ref={uploadAreaRef}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  <span className="mt-4 text-gray-600 font-medium">
                    {isDragOver
                      ? "Drop files here"
                      : "Drag and drop files here or click to select"}
                  </span>
                  <input
                    type="file"
                    name="files"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    className="mt-4 px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary-600 transition-colors duration-300"
                    onClick={handleSubmit}
                  >
                    UPLOAD FILE(S)
                  </button>
                  <div className="mt-4">
                    <ul className="list-disc pl-5">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-10 py-3 bg-gradient-to-r from-primary to-primary text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Next 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Procurements;