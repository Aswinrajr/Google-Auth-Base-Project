import React, { useState } from "react";
import { createNewVendor } from "../../../api/service/adminServices";

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    postOffice: "",
    phoneNumber: "",
    email: "",
    additionalInfo: "",
  });

  const [postOffices, setPostOffices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Fetch city, state, and post offices when postalCode is updated
    if (name === "postalCode" && value.length === 6) {
      fetchLocationDetails(value);
    }
  };

  // Fetch city, state, and post offices from postal code
  const fetchLocationDetails = async (postalCode) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${postalCode}`
      );
      const data = await response.json();

      if (data[0].Status === "Success") {
        const postOfficeList = data[0].PostOffice;
        setPostOffices(postOfficeList);

        // Automatically select the first post office for city and state
        const firstPostOffice = postOfficeList[0];
        setFormData((prevState) => ({
          ...prevState,
          city: firstPostOffice.District,
          state: firstPostOffice.State,
          postOffice: firstPostOffice.Name,
        }));
      } else {
        setError("Invalid Pincode");
        setPostOffices([]);
        setFormData((prevState) => ({
          ...prevState,
          city: "",
          state: "",
          postOffice: "",
        }));
      }
    } catch (error) {
      setError("Error fetching location details");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try{
        const vendorReg =await createNewVendor(formData)
        console.log(vendorReg)

    }catch(err){
        console.log("err in vendor reg",err)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded px-8 py-10">
        <h2 className="text-2xl font-bold mb-6">Vendor Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Address Line */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line
              </label>
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {loading && <p className="text-sm text-gray-500 mt-1">Fetching location...</p>}
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            {/* Post Office */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Office
              </label>
              <select
                name="postOffice"
                value={formData.postOffice}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Post Office
                </option>
                {postOffices.map((office) => (
                  <option key={office.Name} value={office.Name}>
                    {office.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white font-bold rounded-md hover:bg-primary transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorRegistration;
