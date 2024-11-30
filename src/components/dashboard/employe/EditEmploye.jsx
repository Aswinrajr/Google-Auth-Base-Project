
import { useEffect, useState } from "react";
import axios from "axios";
import { generateEmployeeUniqueId } from "../../../api/service/adminServices";

const EditEmploye = () => {
  const [empid, setEmpId] = useState();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();

  const [role, setRole] = useState();
  const [entity, setEntity] = useState();
  const [reportingTo, setReportingTo] = useState();
  const [location, setLocation] = useState();
  // eslint-disable-next-line no-unused-vars
  const [workType, setWorkType] = useState();

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [isStartTimeInput, setIsStartTimeInput] = useState(false); // State to toggle start time input type
  const [isEndTimeInput, setIsEndTimeInput] = useState(false); // State to toggle end time input type
  const [startTime, setStartTime] = useState(""); // State to store start time
  const [endTime, setEndTime] = useState(""); // State to store end time
  const [isDateInput, setIsDateInput] = useState(false);

  useEffect(() => {
    const fetchEmpId = async () => {
      console.log("generating id");

      const response = await generateEmployeeUniqueId();
      console.log(response);
      if (response.status === 200) {
        setEmpId(response?.data?.empId);
      }
    };
    fetchEmpId();
  }, []);

  // Function to fetch city and state based on pincode
  const fetchCityState = async () => {
    if (!pincode) {
      alert("Please enter a valid pincode.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (response.data && response.data[0].Status === "Success") {
        const { District, State } = response.data[0].PostOffice[0];
        setCity(District);
        setState(State);
      } else {
        alert("Invalid pincode or data not found!");
      }
    } catch (error) {
      console.error("Error fetching city and state:", error);
      alert("Failed to fetch city and state. Please try again later.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Personal Information Section */}
      <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Employee</h2>
      </div>
      <div className="p-4 border rounded-lg border-primary">
          <div>
            <input
              value={empid}
              type="text"
              placeholder="Employee ID"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary mb-3"
            />
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Contact"
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
          <div>
            <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="relative">
            {isDateInput ? (
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onBlur={() => !dob && setIsDateInput(false)} // Revert to text if no date is selected
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <input
                type="text"
                value={dob}
                placeholder="Date of Birth"
                readOnly
                onFocus={() => setIsDateInput(true)} // Switch to date input on focus
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              />
            )}
          </div>
         <div className="relative">
            {isDateInput ? (
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onBlur={() => !dob && setIsDateInput(false)} // Revert to text if no date is selected
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <input
                type="text"
                value={dob}
                placeholder="Date of Joining"
                readOnly
                onFocus={() => setIsDateInput(true)} // Switch to date input on focus
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {/* Entity Section */}
      <div>
        <h2 className="text-lg text-primary mb-2">Entity</h2>
        <div className="p-4 border rounded-lg border-primary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Role"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Reporting To"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Entity</option>
                {/* Add entity options here */}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Work Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <div className="flex space-x-4">
                {/* Start Time Input */}
                {isStartTimeInput ? (
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    onBlur={() => !startTime && setIsStartTimeInput(false)} // Revert to text input if no time is selected
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Start Time"
                    readOnly
                    value={startTime}
                    onFocus={() => setIsStartTimeInput(true)} // Switch to time input on focus
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                )}

                <span className="text-gray-600 self-center">to</span>

                {/* End Time Input */}
                {isEndTimeInput ? (
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    onBlur={() => !endTime && setIsEndTimeInput(false)} // Revert to text input if no time is selected
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="End Time"
                    readOnly
                    value={endTime}
                    onFocus={() => setIsEndTimeInput(true)} // Switch to time input on focus
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Details Section */}
      <div>
        <h2 className="text-lg text-primary mb-2">Address Details</h2>
        <div className="p-4 border rounded-lg border-primary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                onBlur={fetchCityState}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="City"
                value={city}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="State"
                value={state}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address Line"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Area"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Landmark"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
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

export default EditEmploye;