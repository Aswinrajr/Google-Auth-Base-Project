import { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { RegVendorData } from "../../../api/service/adminServices";

// Validation schema using Yup
const validationSchema = Yup.object({
  vendorId: Yup.string().required("Vendor ID is required"),
  firstName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  gstNumber: Yup.string().required("GST Number is required"),
  streetAddress1: Yup.string().required("Address is required"),
  // postalCode: Yup.string().required("Postal Code is required"),
  // city: Yup.string().required("City is required"),
  // state: Yup.string().required("State is required"),
  // country: Yup.string().required("Country is required"),
});

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    vendorId: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    gstNumber: "",
    streetAddress1: "",
    streetAddress2: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    additionalNotes: "",
  });

  // Function to fetch city and state based on postal code
  // const fetchCityState = async () => {
  //   if (!formData.postalCode) {
  //     alert("Please enter a valid postal code.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `https://api.postalpincode.in/pincode/${formData.postalCode}`
  //     );

  //     if (response.data && response.data[0].Status === "Success") {
  //       const { District, State } = response.data[0].PostOffice[0];
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         city: District,
  //         state: State,
  //       }));
  //     } else {
  //       alert("Invalid postal code or data not found!");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching city and state:", error);
  //     alert("Failed to fetch city and state. Please try again later.");
  //   }
  // };

  // Formik setup
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await RegVendorData(values);
        console.log(response);

        setFormData({
          vendorId: "",
          firstName: "",
          phoneNumber: "",
          email: "",
          gstNumber: "",
          streetAddress1: "",
          streetAddress2: "",
          postalCode: "",
          city: "",
          state: "",
          country: "",
          additionalNotes: "",
        });
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-6xl bg-white mx-auto p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Vendor Registration
      </h2>

      <div className="p-4 border rounded-lg border-primary">
        <label htmlFor="vendorId">
          Vendor ID <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="vendorId"
          placeholder="Vendor ID"
          value={formik.values.vendorId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {formik.touched.vendorId && formik.errors.vendorId && (
          <span className="text-red-500 text-sm">{formik.errors.vendorId}</span>
        )}
      </div>

      <div className="p-4 border rounded-lg border-primary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Full Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <span className="text-red-500 text-sm">
                {formik.errors.firstName}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {formik.errors.phoneNumber}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-sm">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="gstNumber">
              GST Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              value={formik.values.gstNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.touched.gstNumber && formik.errors.gstNumber && (
              <span className="text-red-500 text-sm">
                {formik.errors.gstNumber}
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg text-primary mb-2">Address</h2>
        <div className="p-4 border w-full rounded-lg border-primary">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label htmlFor="streetAddress1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                type="text"
                name="streetAddress1"
                placeholder="Address"
                value={formik.values.streetAddress1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formik.touched.streetAddress1 &&
                formik.errors.streetAddress1 && (
                  <span className="text-red-500 text-sm">
                    {formik.errors.streetAddress1}
                  </span>
                )}
            </div>
            {/* <div>
              <label htmlFor="postalCode">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={fetchCityState}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formik.touched.postalCode && formik.errors.postalCode && (
                <span className="text-red-500 text-sm">{formik.errors.postalCode}</span>
              )}
            </div> */}
            {/* <div>
              <label htmlFor="city">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formik.values.city}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div> */}
            {/* <div>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formik.values.state}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div> */}
            {/* <div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formik.touched.country && formik.errors.country && (
                <span className="text-red-500 text-sm">{formik.errors.country}</span>
              )}
            </div> */}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-4  text-end">
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Register Vendor
        </button>
      </div>
    </form>
  );
};

export default VendorRegistration;
