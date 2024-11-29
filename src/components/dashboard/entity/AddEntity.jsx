import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Select from "react-select";
import { addEntityData } from "../../../api/service/adminServices";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddEntity() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch currencies from API
  const fetchCurrencies = async () => {
    try {
      const response = await axios.get("https://openexchangerates.org/api/currencies.json"); // Replace with actual endpoint
      const currencyOptions = Object.entries(response.data).map(([key, value]) => ({
        value: key,
        label: `${value} (${key})`,
      }));
      setCurrencies(currencyOptions);
    } catch (error) {
      console.error("Error fetching currencies:", error);
      toast.error("Failed to load currencies");
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const formik = useFormik({
    initialValues: {
      entityName: "",
      currency: "",
      addressLine: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      landmark: "",
      latitude: "",
      longitude: "",
    },
    onSubmit: async (values) => {
      console.log("Form Values:", values);
      const response = await addEntityData(values);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/entity-list-table");
        }, 1500);
      } else {
        toast.error(response.data.message);
      }
    },
  });

  const fetchCityState = async () => {
    const pincode = formik.values.pincode;

    if (!pincode) {
      alert("Please enter a valid postal code.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (response.data && response.data[0].Status === "Success") {
        const { District, State, Country } = response.data[0].PostOffice[0];
        formik.setFieldValue("city", District);
        formik.setFieldValue("state", State);
        formik.setFieldValue("country", Country);
      } else {
        alert("Invalid postal code or data not found!");
      }
    } catch (error) {
      console.error("Error fetching city and state:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (selectedOption) => {
    formik.setFieldValue("currency", selectedOption?.value || "");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl font-bold text-primary mb-6">Entity Form</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Entity Name</label>
            <input
              type="text"
              name="entityName"
              value={formik.values.entityName}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border rounded ${
                formik.errors.entityName ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Dynamic Searchable Currency Dropdown */}
          <div>
            <label className="block text-gray-700">Currency</label>
            <Select
              options={currencies}
              isLoading={loading}
              onChange={handleCurrencyChange}
              placeholder="Select a currency"
              className="mt-1"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700">Address Line</label>
            <textarea
              name="addressLine"
              value={formik.values.addressLine}
              onChange={formik.handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Area</label>
            <input
              type="text"
              name="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={fetchCityState}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              readOnly
              className="mt-1 w-full p-2 border border-gray-300 bg-gray-100 rounded"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={formik.handleReset}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Reset
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
}

export default AddEntity;
