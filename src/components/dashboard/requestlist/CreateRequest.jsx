import { useState, useEffect } from 'react';
import { UploadIcon } from 'lucide-react';
import { submitRequest } from '../../../api/service/adminServices';
import { toast } from 'react-toastify';

const CreateRequest = () => {
  const userId = localStorage.getItem("userId");
  
  // eslint-disable-next-line no-unused-vars
  const [advancePayment, setAdvancePayment] = useState(false);
  const [formData, setFormData] = useState({
    vendor: '',
    poEntityType: '',
    quotationNumber: '',
    quotationDate: '',
    insuranceCopy: '',
    comparativeStatement: '',
    entity: '',
    city: '',
    site: '',
    billTo: '',
    advancePayment: false,
    currency: ''
  });

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // Simulate fetching vendors from an API
    const dummyVendors = [
      { name: 'Vendor 1', entity: 'Entity 1', city: 'City 1', site: 'Site 1', billTo: 'BillTo 1' },
      { name: 'Vendor 2', entity: 'Entity 2', city: 'City 2', site: 'Site 2', billTo: 'BillTo 2' },
      { name: 'Vendor 3', entity: 'Entity 3', city: 'City 3', site: 'Site 3', billTo: 'BillTo 3' }
    ];

    setVendors(dummyVendors);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVendorChange = (e) => {
    const selectedVendor = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      vendor: selectedVendor
    }));

    // Find the selected vendor from the vendors list
    const vendor = vendors.find(v => v.name === selectedVendor);
    if (vendor) {
      setFormData(prevState => ({
        ...prevState,
        entity: vendor.entity || '',
        city: vendor.city || '',
        site: vendor.site || '',
        billTo: vendor.billTo || ''
      }));
    }
  };

  const handleAdvancePaymentChange = (value) => {
    setAdvancePayment(value);
    setFormData(prevState => ({
      ...prevState,
      advancePayment: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('vendor', formData.vendor);
    data.append('poEntityType', formData.poEntityType);
    data.append('quotationNumber', formData.quotationNumber);
    data.append('quotationDate', formData.quotationDate);
    data.append('entity', formData.entity);
    data.append('city', formData.city);
    data.append('site', formData.site);
    data.append('billTo', formData.billTo);
    data.append('advancePayment', formData.advancePayment);
    data.append('currency', formData.currency);
    
    if (formData.insuranceCopy) {
      data.append('insuranceCopy', formData.insuranceCopy);
    }
    if (formData.comparativeStatement) {
      data.append('comparativeStatement', formData.comparativeStatement);
    }
  
    try {
      const response = await submitRequest(userId, data);
      console.log('Request submitted:', response.data);
     if(response.status===200){
        toast.success(response?.data?.message)
        setTimeout(() => {
          naviga
            
        }, 1500);
     }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit}  encType='multipart/form-data' >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vendor Selection */}
          <div className="relative">
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              name="vendor"
              value={formData.vendor}
              onChange={handleVendorChange}
            >
              <option value="">Choose Vendor</option>
              {vendors.map((vendor, index) => (
                <option key={index} value={vendor.name}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>

          {/* PO Entity Type */}
          <div className="relative">
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              name="poEntityType"
              value={formData.poEntityType}
              onChange={handleInputChange}
            >
              <option value="">Choose PO Entity Type</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
            </select>
          </div>

          {/* Quotation Number */}
          <div>
            <input
              type="text"
              placeholder="Enter Quotation Number"
              name="quotationNumber"
              value={formData.quotationNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Quotation Date */}
          <div>
            <input
              type="date"
              name="quotationDate"
              value={formData.quotationDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Upload Insurance Copy */}
          <div className="relative">
            <div className="flex items-center w-full p-2 border rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
              <input
                type="file"
                placeholder="Upload Insurance Copy"
                name="insuranceCopy"
                onChange={handleInputChange}
                className="flex-1 outline-none"
              />
              <UploadIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Upload Comparative Statement */}
          <div className="relative">
            <div className="flex items-center w-full p-2 border rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
              <input
                type="file"
                placeholder="Upload Comparative Statement"
                name="comparativeStatement"
                onChange={handleInputChange}
                className="flex-1 outline-none"
              />
              <UploadIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Entity */}
          <div className="relative">
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              name="entity"
              value={formData.entity}
              onChange={handleInputChange}
            >
              <option value="">Choose Entity</option>
              <option value="Entity 1">Entity 1</option>
              <option value="Entity 2">Entity 2</option>
              <option value="Entity 3">Entity 3</option>
            </select>
          </div>

          {/* City */}
          <div className="relative">
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            >
              <option value="">Choose City</option>
              <option value="City 1">City 1</option>
              <option value="City 2">City 2</option>
              <option value="City 3">City 3</option>
            </select>
          </div>

          {/* Site */}
          <div className="relative">
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              name="site"
              value={formData.site}
              onChange={handleInputChange}
            >
              <option value="">Choose Site</option>
              <option value="Site 1">Site 1</option>
              <option value="Site 2">Site 2</option>
              <option value="Site 3">Site 3</option>
            </select>
          </div>

          {/* Bill To */}
          <div className="relative">
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              name="billTo"
              value={formData.billTo}
              onChange={handleInputChange}
            >
              <option value="">Choose Bill To</option>
              <option value="BillTo 1">BillTo 1</option>
              <option value="BillTo 2">BillTo 2</option>
              <option value="BillTo 3">BillTo 3</option>
            </select>
          </div>

          {/* Advance Payment Radio */}
          <div className="flex items-center space-x-4">
            <label className="text-sm">Advance Payment</label>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="yes"
                name="advancePayment"
                value="Yes"
                onChange={() => handleAdvancePaymentChange(true)}
                checked={formData.advancePayment === true}
              />
              <label htmlFor="yes" className="text-sm">Yes</label>
              <input
                type="radio"
                id="no"
                name="advancePayment"
                value="No"
                onChange={() => handleAdvancePaymentChange(false)}
                checked={formData.advancePayment === false}
              />
              <label htmlFor="no" className="text-sm">No</label>
            </div>
          </div>

          {/* Currency */}
          <div>
            <input
              type="text"
              placeholder="Enter Currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-md"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
