import { Calendar } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const EditVendor = () => {
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch city and state based on postal code
  const fetchCityState = async () => {
    if (!pincode) {
      alert('Please enter a valid postal code.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}` // Replace with your API if needed
      );

      if (response.data && response.data[0].Status === 'Success') {
        const { District, State } = response.data[0].PostOffice[0];
        setCity(District);
        setState(State);
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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendor Registration</h2>

      {/* Personal Information Section */}
      <div className="p-4 border rounded-lg border-primary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
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
                placeholder="Street Address"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Street Address 2"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Postal Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
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
                  placeholder="City"
                  value={city}
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
                  placeholder="State"
                  value={state}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Country"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <textarea
          placeholder="Additional Notes"
          rows="4"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default EditVendor;