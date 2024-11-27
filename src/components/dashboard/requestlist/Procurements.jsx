import { useState, useRef } from "react";

const Procurements = ({ formData, setFormData, onBack, onNext }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [isDragOver, setIsDragOver] = useState(false);
  const [vendors, setVendors] = useState([
    { id: 1, name: "Vendor 1" },
    { id: 2, name: "Vendor 2" },
    { id: 3, name: "Vendor 3" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: "", email: "" });
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
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);
    
    // Add files to formData
    setFormData((prevState) => ({
      ...prevState,
      competitiveQuotations: updatedFiles,
    }));
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
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);
    
    // Add files to formData
    setFormData((prevState) => ({
      ...prevState,
      competitiveQuotations: updatedFiles,
    }));
  };

  const handleNewVendor = () => {
    setShowModal(true);
  };

  const handleAddVendor = () => {
    if (newVendor.name && newVendor.email) {
      setVendors([
        ...vendors,
        { id: vendors.length + 1, name: newVendor.name },
      ]);
      setShowModal(false);
      setNewVendor({ name: "", email: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleSubmit = () => {
    console.log("formData", formData)
    console.log("Selectedfile", selectedFiles)
    onNext()
  }

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
                onChange={(e) => {
                  if (e.target.value === "newVendor") {
                    handleNewVendor();
                  } else {
                    handleInputChange(e);
                  }
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              >
                <option value="">Select Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.name}>
                    {vendor.name}
                  </option>
                ))}
                <option value="newVendor">+ New Vendor</option>
              </select>
            </div>
          </div>

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
                Final Quotation
              </label>
              <input
                type="file"
                name="quotationCopy"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              />
            </div>
          </div>

          {/* PO Expiry Date, Expected Delivery Date, Final Quote */}
          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Left Column: Stacked Fields */}
            <div className="space-y-6">
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

            {/* Right Column: Drag and Drop */}
            <div className="flex-1 ">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Attach Competitive Quotations
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-4 w-full h-40 cursor-pointer transition-colors duration-300 ${
                  isDragOver
                    ? "border-primary bg-primary"
                    : "border-primary hover:border-primary"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                ref={uploadAreaRef}
              >
                <div className="flex items-center justify-center h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-18 0h18M7.5 12l4.5 4.5L16.5 12"
                    />
                  </svg>
                  <p className="ml-2 text-lg text-primary mt-3">
                    Drag and drop files here
                  </p>
                </div>
              </div>
              
              {/* Display selected files */}
              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Selected Files:</p>
                  <ul className="list-disc pl-5">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={onBack}
              className="px-6 w-40 h-10 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 w-40 h-10 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark"
            >
              Next
            </button>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
              <div className="bg-primary text-white p-6 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-center">
                  Add New Vendor
                </h3>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter vendor name"
                    value={newVendor.name}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter vendor email"
                    value={newVendor.email}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, email: e.target.value })
                    }
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddVendor}
                    className="w-full px-6 py-3 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition duration-300"
                  >
                    Add Vendor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Procurements;