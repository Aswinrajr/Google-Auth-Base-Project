import { PlusCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";

const Commercials = ({ formData, setFormData, onNext }) => {
  const [localFormData, setLocalFormData] = useState({
    entity: "",
    city: "",
    site: "",
    department: "",
    amount: "",
    currency: "USD",
    costCentre: "",
    paymentType: "",
    paymentTerms: [
      { percentageTerm: "", percentageAmount: "", paymentType: "" },
    ],
    billTo: "",
    shipTo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...localFormData,
      [name]: value,
    };

    setLocalFormData(updatedFormData);
    setFormData(updatedFormData);
  };

  const handlePaymentTermChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPaymentTerms = [...localFormData.paymentTerms];
    updatedPaymentTerms[index] = {
      ...updatedPaymentTerms[index],
      [name]: value,
    };

    const updatedFormData = {
      ...localFormData,
      paymentTerms: updatedPaymentTerms,
    };

    setLocalFormData(updatedFormData);
    setFormData(updatedFormData);
  };

  const handleAddMorePaymentTerm = () => {
    const updatedFormData = {
      ...localFormData,
      paymentTerms: [
        ...localFormData.paymentTerms,
        { percentageTerm: "", percentageAmount: "", paymentType: "" },
      ],
    };

    setLocalFormData(updatedFormData);
    setFormData(updatedFormData);
  };

  const handleNextStep = () => {
    // Validate form data before moving to next step
    onNext();
  };

  return (
    <div className="w-full mx-auto  shadow-2xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary p-6">
        <h2 className="text-3xl font-extrabold text-white text-center">
          Commercial Details
        </h2>
      </div>

      <div className="p-8 space-y-6">
        {/* First Row: Entity and City */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Entity
            </label>
            <select
              name="entity"
              value={localFormData.entity}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
            >
              <option value="">Select Entity</option>
              <option value="entity1">Entity 1</option>
              <option value="entity2">Entity 2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={localFormData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              placeholder="Enter City"
            />
          </div>
        </div>

        {/* Second Row: Site and Department */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Site
            </label>
            <input
              type="text"
              name="site"
              value={localFormData.site}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              placeholder="Enter Site"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={localFormData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              placeholder="Enter Department"
            />
          </div>
        </div>

        {/* Third Row: Amount, Cost Centre, and Payment Type */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative w-full">
              <input
                type="number"
                name="amount"
                value={localFormData.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-16 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter Amount"
              />
              <select
                name="currency"
                value={localFormData.currency}
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cost Centre
            </label>
            <input
              type="text"
              name="costCentre"
              value={localFormData.costCentre}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              placeholder="Enter Cost Centre"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Mode
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["Bank Transfer", "Credit Card"].map((type) => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentType"
                    value={type.toLowerCase().replace(" ", "")}
                    checked={
                      localFormData.paymentType ===
                      type.toLowerCase().replace(" ", "")
                    }
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-primary transition duration-300 focus:ring-2 focus:ring-primary"
                  />
                  <span className="ml-2 text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Terms Section */}
        <div className="space-y-4">
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Terms</h3>
  </div>

  {/* Payment Terms Table */}
  <div className="overflow-x-auto">
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100 border-b-2 border-gray-200">
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Percentage Term</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Percentage Amount</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment Type</th>
          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody>
        {localFormData.paymentTerms.map((term, index) => (
          <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
            {/* Percentage Term */}
            <td className="px-4 py-3">
              <input
                type="number"
                name="percentageTerm"
                value={term.percentageTerm}
                onChange={(e) => handlePaymentTermChange(e, index)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                placeholder="Enter Percentage Term"
                style={{
                  appearance: "none",
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                }}
              />
            </td>

            {/* Percentage Amount */}
            <td className="px-4 py-3">
              <input
                type="number"
                name="percentageAmount"
                value={term.percentageAmount}
                onChange={(e) => handlePaymentTermChange(e, index)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                placeholder="Enter Percentage Amount"
              />
            </td>

            {/* Payment Type */}
            <td className="px-4 py-3">
              <select
                name="paymentType"
                value={term.paymentType}
                onChange={(e) => handlePaymentTermChange(e, index)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              >
                <option value="">Select Payment Type</option>
                <option value="fullPayment">Full Payment</option>
                <option value="advancePayment">Advance Payment</option>
                <option value="deliveryPayment">Delivery Payment</option>
                <option value="partPayment">Part Payment</option>
              </select>
            </td>

            {/* Delete Button with Trash Icon */}
            <td className="px-4 py-3 text-right">
              <div className="flex justify-end space-x-2">
                {/* Delete Button with Trash Icon */}
                <button
                  type="button"
                  onClick={() => handleDeletePaymentTerm(index)}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Add New Payment Term Button (at the bottom) */}
  <div className="mt-4 flex justify-start">
    <button
      type="button"
      onClick={handleAddMorePaymentTerm}
      className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
    >
      <PlusCircle size={16} className="mr-2" />
      Add Payment Term
    </button>
  </div>
</div>



        {/* Fourth Row: Bill To and Ship To */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bill To
            </label>
            <textarea
              name="billTo"
              value={localFormData.billTo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              placeholder="Enter Bill To"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ship To
            </label>
            <textarea
              name="shipTo"
              value={localFormData.shipTo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
              placeholder="Enter Ship To"
              rows="4"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleNextStep}
            className="px-10 py-3 bg-gradient-to-r from-primary to-primary text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Commercials;
