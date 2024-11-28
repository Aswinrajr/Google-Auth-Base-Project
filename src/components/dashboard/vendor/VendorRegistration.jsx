import { Calendar } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { RegVendorData } from '../../../api/service/adminServices';

const EmployeeReg = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    streetAddress1: '',
    streetAddress2: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to fetch city and state based on postal code
  const fetchCityState = async () => {
    if (!formData.postalCode) {
      alert('Please enter a valid postal code.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${formData.postalCode}`
      );

      if (response.data && response.data[0].Status === 'Success') {
        const { District, State } = response.data[0].PostOffice[0];
        setFormData(prevState => ({
          ...prevState,
          city: District,
          state: State
        }));
      } else {
        alert('Invalid postal code or data not found!');
      }
    } catch (error) {
      console.error('Error fetching city and state:', error);
      alert('Failed to fetch city and state. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      console.log(formData)

      const response = await RegVendorData(formData)
      console.log(response)
      
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        streetAddress1: '',
        streetAddress2: '',
        postalCode: '',
        city: '',
        state: '',
        country: '',
        additionalNotes: ''
      });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendor Registration</h2>

      {/* Personal Information Section */}
      <div className="p-4 border rounded-lg border-primary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h2 className="text-lg text-primary mb-2">Address</h2>
        <div className="p-4 border rounded-lg border-primary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="streetAddress1"
                placeholder="Street Address"
                value={formData.streetAddress1}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="text"
                name="streetAddress2"
                placeholder="Street Address 2"
                value={formData.streetAddress2}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
                onBlur={fetchCityState}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              {loading ? (
                <div className="w-full p-2 border rounded bg-gray-100 text-center">Loading...</div>
              ) : (
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              )}
            </div>
            <div>
              {loading ? (
                <div className="w-full p-2 border rounded bg-gray-100 text-center">Loading...</div>
              ) : (
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              )}
            </div>
            <div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <textarea
          name="additionalNotes"
          placeholder="Additional Notes"
          rows="4"
          value={formData.additionalNotes}
          onChange={handleInputChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button 
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default EmployeeReg;