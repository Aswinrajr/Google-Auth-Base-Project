import { Calendar } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const EmployeeReg = () => {
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  // Function to fetch city and state based on pincode
  const fetchCityState = async () => {
    if (!pincode) {
      alert('Please enter a valid pincode.');
      return;
    }

    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}` // Replace with your API if needed
      );

      if (response.data && response.data[0].Status === 'Success') {
        const { District, State } = response.data[0].PostOffice[0];
        setCity(District);
        setState(State);
      } else {
        alert('Invalid pincode or data not found!');
      }
    } catch (error) {
      console.error('Error fetching city and state:', error);
      alert('Failed to fetch city and state. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Personal Information Section */}
      <div className="p-4 border rounded-lg border-green-200">
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Employee ID"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Contact"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="date"
              placeholder="Date of Birth"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Calendar className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Entity Section */}
      <div>
        <h2 className="text-lg text-green-600 mb-2">Entity</h2>
        <div className="p-4 border rounded-lg border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Role"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Reporting To"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Entity</option>
                {/* Add entity options here */}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Work Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Shift Timings</label>
              <div className="flex space-x-4">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span className="text-gray-600 self-center">to</span>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Details Section */}
      <div>
        <h2 className="text-lg text-green-600 mb-2">Address Details</h2>
        <div className="p-4 border rounded-lg border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                onBlur={fetchCityState}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
                placeholder="Address Line"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Area"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Landmark"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default EmployeeReg;
