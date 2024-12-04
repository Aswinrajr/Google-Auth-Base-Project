import React, { useEffect, useState } from "react";
import { 
  useNavigate, 
  useParams 
} from "react-router-dom";
import { 
  fetchIndividualReq, 
 
} from "../../../api/service/adminServices";
import { 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { formatDateToDDMMYY } from "../../../utils/dateFormat";

const EditRequestForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [request, setRequest] = useState(null);
  const [formData, setFormData] = useState({
    commercials: {
      paymentMode: 'Bank Transfer',
      paymentTerms: [{ paymentTerm: '', paymentType: '', percentageTerm: '' }]
    },
    procurements: {},
    supplies: {
      services: []
    }
  });

  // Fetch request details on component mount
  useEffect(() => {
    const fetchReq = async () => {
      try {
        const response = await fetchIndividualReq(params.id);
        if (response.status === 200) {
          const fetchedData = response.data.data;
          setRequest(fetchedData);
          setFormData({
            commercials: {
              ...fetchedData.commercials,
              paymentMode: fetchedData.commercials?.paymentMode || 'Bank Transfer',
              paymentTerms: fetchedData.commercials?.paymentTerms?.length 
                ? fetchedData.commercials.paymentTerms 
                : [{ paymentTerm: '', paymentType: '', percentageTerm: '' }]
            },
            procurements: fetchedData.procurements || {},
            supplies: {
              ...fetchedData.supplies,
              services: fetchedData.supplies?.services || []
            }
          });
        }
      } catch (error) {
        console.error("Error fetching request:", error);
        toast.error("Failed to load request details");
      }
    };
    fetchReq();
  }, [params.id]);

  // Generic handler for nested form data
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle payment terms changes
  const handlePaymentTermChange = (index, field, value) => {
    const updatedPaymentTerms = [...(formData.commercials.paymentTerms || [])];
    updatedPaymentTerms[index] = {
      ...updatedPaymentTerms[index],
      [field]: value
    };

    setFormData(prev => ({
      ...prev,
      commercials: {
        ...prev.commercials,
        paymentTerms: updatedPaymentTerms
      }
    }));
  };

  // Handle services changes
  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...(formData.supplies.services || [])];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };

    setFormData(prev => ({
      ...prev,
      supplies: {
        ...prev.supplies,
        services: updatedServices
      }
    }));
  };

  // Add new payment term
  const addPaymentTerm = () => {
    setFormData(prev => ({
      ...prev,
      commercials: {
        ...prev.commercials,
        paymentTerms: [
          ...(prev.commercials.paymentTerms || []),
          { paymentTerm: '', paymentType: '', percentageTerm: '' }
        ]
      }
    }));
  };

  // Add new service
  const addService = () => {
    setFormData(prev => ({
      ...prev,
      supplies: {
        ...prev.supplies,
        services: [
          ...(prev.supplies.services || []),
          { productName: '', quantity: '', price: '' }
        ]
      }
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRequest(params.id, formData);
      if (response.status === 200) {
        toast.success("Request updated successfully");
        setTimeout(() => {
          navigate("/req-list-table");
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request");
    }
  };

  if (!request) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Edit Purchase Order
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Commercials Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Commercials Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Bill To", key: "billTo" },
              { label: "Ship To", key: "shipTo" },
              { label: "City", key: "city" },
              { label: "Cost Centre", key: "costCentre" },
              { label: "Currency", key: "currency" },
              { label: "Department", key: "department" },
              { label: "Entity", key: "entity" }
            ].map((field) => (
              <div key={field.key} className="flex flex-col">
                <label className="text-gray-600 mb-2">{field.label}</label>
                <input
                  type="text"
                  value={formData.commercials[field.key] || ''}
                  onChange={(e) => handleInputChange('commercials', field.key, e.target.value)}
                  className="border rounded-lg px-3 py-2"
                />
              </div>
            ))}
            
            {/* Payment Mode Section */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2">Payment Mode</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Bank Transfer"
                    checked={formData.commercials.paymentMode === "Bank Transfer"}
                    onChange={(e) => {
                      handleInputChange('commercials', 'paymentMode', e.target.value);
                      // Reset payment terms when changing mode
                      handleInputChange('commercials', 'paymentTerms', [
                        { paymentTerm: '', paymentType: '', percentageTerm: '' }
                      ]);
                    }}
                    className="mr-2"
                  />
                  Bank Transfer
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Credit Card"
                    checked={formData.commercials.paymentMode === "Credit Card"}
                    onChange={(e) => {
                      handleInputChange('commercials', 'paymentMode', e.target.value);
                      // Automatically set 100% immediate payment for Credit Card
                      handleInputChange('commercials', 'paymentTerms', [
                        { 
                          paymentTerm: 'Full Payment', 
                          paymentType: 'Immediate', 
                          percentageTerm: '100' 
                        }
                      ]);
                    }}
                    className="mr-2"
                  />
                  Credit Card
                </label>
              </div>
            </div>
          </div>

          {/* Conditional Payment Terms Section */}
          <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary">
            Payment Terms
          </h3>
          {formData.commercials.paymentMode === "Bank Transfer" && (
            <button 
              type="button"
              onClick={addPaymentTerm}
              className="bg-primary text-white px-3 py-1 rounded-lg"
            >
              Add Payment Term
            </button>
          )}
        </div>
        {formData.commercials.paymentTerms?.map((term, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <input
              placeholder="Payment Term"
              value={term.paymentTerm}
              onChange={(e) => handlePaymentTermChange(index, 'paymentTerm', e.target.value)}
              className="border rounded-lg px-3 py-2"
              disabled={formData.commercials.paymentMode === "Credit Card" && index !== 0}
            />
            <input
              placeholder="Payment Type"
              value={term.paymentType}
              onChange={(e) => handlePaymentTermChange(index, 'paymentType', e.target.value)}
              className="border rounded-lg px-3 py-2"
              disabled={formData.commercials.paymentMode === "Credit Card" && index !== 0}
            />
            <input
              placeholder="Percentage"
              type="number"
              value={term.percentageTerm}
              onChange={(e) => handlePaymentTermChange(index, 'percentageTerm', e.target.value)}
              className="border rounded-lg px-3 py-2"
              disabled={formData.commercials.paymentMode === "Credit Card" && index !== 0}
            />
          </div>
        ))}
      </div>
        </div>

        {/* Procurements Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Procurements Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Vendor", key: "vendor" },
              { label: "Quotation Number", key: "quotationNumber" },
              { label: "Quotation Date", key: "quotationDate", type: "date" },
              { label: "PO Expiry Date", key: "poExpiryDate", type: "date" },
              { label: "PO Validity From", key: "poValidityFrom", type: "date" },
              { label: "PO Validity To", key: "poValidityTo", type: "date" }
            ].map((field) => (
              <div key={field.key} className="flex flex-col">
                <label className="text-gray-600 mb-2">{field.label}</label>
                <input
                  type={field.type || "text"}
                  value={
                    field.type === "date" && formData.procurements[field.key]
                      ? formatDateToDDMMYY(formData.procurements[field.key])
                      : formData.procurements[field.key] || ''
                  }
                  onChange={(e) => handleInputChange('procurements', field.key, e.target.value)}
                  className="border rounded-lg px-3 py-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Supplies/Services Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary">
              Supplies Details
            </h2>
            <button 
              type="button"
              onClick={addService}
              className="bg-primary text-white px-3 py-1 rounded-lg"
            >
              Add Service
            </button>
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-gray-600 mb-2">Total Value</label>
            <input
              type="number"
              value={formData.supplies.totalValue || ''}
              onChange={(e) => handleInputChange('supplies', 'totalValue', e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          {formData.supplies.services?.map((service, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
              <input
                placeholder="Product Name"
                value={service.productName}
                onChange={(e) => handleServiceChange(index, 'productName', e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
              <input
                placeholder="Quantity"
                type="number"
                value={service.quantity}
                onChange={(e) => handleServiceChange(index, 'quantity', e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
              <input
                placeholder="Price"
                type="number"
                value={service.price}
                onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
          ))}

          <div className="mt-4">
            <label className="text-gray-600 mb-2">Remarks</label>
            <textarea
              value={formData.supplies.remarks || ''}
              onChange={(e) => handleInputChange('supplies', 'remarks', e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/req-list-table")}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            <XCircle className="mr-2 inline" /> Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 flex items-center"
          >
            <CheckCircle2 className="mr-2" /> Save Changes
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
};

export default EditRequestForm;