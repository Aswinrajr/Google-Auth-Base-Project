import { useFormik } from 'formik';


function EditEntity() {
  const formik = useFormik({
    initialValues: {
      entityName: '',
      category: '',
      addressLine: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      landmark: '',
      latitude: '',
      longitude: '',
    },
   
    onSubmit: (values) => {
      console.log('Form Values:', values);

    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl font-bold text-green-600 mb-6">Edit Entity</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Entity Names</label>
            <input
              type="text"
              name="entityName"
              value={formik.values.entityName}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.entityName && formik.touched.entityName
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.entityName && formik.errors.entityName && (
              <p className="text-red-500 text-sm">{formik.errors.entityName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.category && formik.touched.category
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            >
              <option value="">Select</option>
              <option value="Retail">Retail</option>
              <option value="IT">IT</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700">Address Line</label>
            <input
              type="text"
              name="addressLine"
              value={formik.values.addressLine}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.addressLine && formik.touched.addressLine
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.addressLine && formik.errors.addressLine && (
              <p className="text-red-500 text-sm">{formik.errors.addressLine}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Area</label>
            <input
              type="text"
              name="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.area && formik.touched.area
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.area && formik.errors.area && (
              <p className="text-red-500 text-sm">{formik.errors.area}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.city && formik.touched.city
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-sm">{formik.errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.state && formik.touched.state
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-red-500 text-sm">{formik.errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.pincode && formik.touched.pincode
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.pincode && formik.errors.pincode && (
              <p className="text-red-500 text-sm">{formik.errors.pincode}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.country && formik.touched.country
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-sm">{formik.errors.country}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formik.values.landmark}
              onChange={formik.handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formik.values.latitude}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.latitude && formik.touched.latitude
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.latitude && formik.errors.latitude && (
              <p className="text-red-500 text-sm">{formik.errors.latitude}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formik.values.longitude}
              onChange={formik.handleChange}
              className={`mt-1 w-full p-2 border ${
                formik.errors.longitude && formik.touched.longitude
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded`}
            />
            {formik.touched.longitude && formik.errors.longitude && (
              <p className="text-red-500 text-sm">{formik.errors.longitude}</p>
            )}
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
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEntity;