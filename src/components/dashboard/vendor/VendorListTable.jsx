
import { Search, Download, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorListTable = () => {
    const navigate = useNavigate()
  const personalData = [
    {
      firstName: 'ASWINRAJ',
      lastName: 'R',
      streetAddress: 'MEETHALE KUTTILATT(HO) KURUNTHODI',
      addressLine: '',
      city: 'Kozhikode',
      state: 'Kerala',
      postalCode: '673105',
      postOffice: 'Mandarathur',
      phoneNumber: '07559889322',
      email: 'aswinrajr07@gmail.com',
      additionalInfo: 'haii'
    }
  ];

  return (
    <div className="p-8 bg-white rounded-lg shadow-sm h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
        
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="relative flex-1 min-w-[300px] max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
            onClick={()=>navigate("/vendor-registration")}
            
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary">
                  <tr>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      First Name
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Last Name
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Street Address
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      City
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      State
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Postal Code
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Post Office
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Phone
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {personalData.map((person, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.streetAddress || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.postalCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.postOffice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <button className="text-primary hover:text-primary/80">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 px-2">
        <div className="flex items-center text-sm text-gray-500">
          Showing 1 to {personalData.length} of {personalData.length} entries
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorListTable;