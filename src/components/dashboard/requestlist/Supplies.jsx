import { useState } from "react";
import { Trash2, PlusCircle, CheckCircle2 } from "lucide-react";

const Supplies = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
  handleSubmited,
  onNext,
}) => {
  const initialService = { productName: "", productDescription: "", quantity: "", price: "", tax: "" };
  const [services, setServices] = useState(formData.services || [initialService]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([...services, { ...initialService }]);
  };

  const handleRemoveService = (index) => {
    if (services.length > 1) {
      const updatedServices = services.filter((_, i) => i !== index);
      setServices(updatedServices);
    }
  };

  // Calculate row total (quantity * price * (1 + tax))
  const calculateRowTotal = (service) => {
    const quantity = parseFloat(service.quantity || 0);
    const price = parseFloat(service.price || 0);
    const tax = parseFloat(service.tax || 0);

    return quantity * price * (1 + tax / 100); // Tax is percentage
  };

  // Calculate total value (sum of all row totals)
  const totalValue = services.reduce((acc, service) => acc + calculateRowTotal(service), 0);

  // Handle form submission
  const handleSubmit = () => {
    const submissionData = {
      ...formData,
      services,
      totalValue,
    };

    // Update the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...submissionData,
    }));

    // Log the submission data
    console.log("Submission Data:", submissionData);

    // Set submitted state to true to show submission details
    setIsSubmitted(true);

    // Call onSubmit if provided
    if (onSubmit) {
      onSubmit(submissionData);
    }

    onNext();
  };

  return (
    <div className="mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary p-6">
        <h2 className="text-3xl font-extrabold text-white text-center">
          Product/Services
        </h2>
      </div>

      <div className="p-8 space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tax (%)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Row Total
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
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
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Product Name"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <textarea
                      name="productDescription"
                      value={service.productDescription}
                      onChange={(e) => handleServiceChange(e, index)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-y"
                      placeholder="Description"
                      rows={3}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      name="quantity"
                      value={service.quantity}
                      onChange={(e) => handleServiceChange(e, index)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      name="tax"
                      value={service.tax}
                      onChange={(e) => handleServiceChange(e, index)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Tax (%)"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      value={calculateRowTotal(service).toFixed(2)}
                      readOnly
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      placeholder="Row Total"
                    />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className={`text-red-500 hover:text-red-700 transition duration-300 ${
                        services.length === 1 ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      disabled={services.length === 1}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td colSpan="5" className="px-4 py-3 font-bold text-gray-700">
                  Total Amount:
                </td>
                <td className="px-4 py-3 font-bold text-blue-600">
                  {totalValue.toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

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

        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary transition duration-300 ease-in-out"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary transition-colors flex items-center"
          >
            <CheckCircle2 className="mr-2" /> Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Supplies;
