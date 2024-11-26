/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Edit, Trash2, Search, Download, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReqListTable = ({ onEdit, onDelete }) => {
    const navigate = useNavigate()
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const users = [
    {
      vendor: 'Vendor 1',
      poEntityType: 'Type 1',
      quotationNumber: '11111111',
      quotationDate: '2024-11-25',
      insuranceCopy: null,
      comparativeStatement: null,
      entity: 'Entity 1',
      city: 'City 1',
      site: 'Site 1',
      billTo: 'BillTo 1',
      advancePayment: 'false',
      currency: 'inr'
    }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user.quotationNumber));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (quotationNumber) => {
    setSelectedUsers(prev => 
      prev.includes(quotationNumber)
        ? prev.filter(id => id !== quotationNumber)
        : [...prev, quotationNumber]
    );
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-sm h-full">
  
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Requset List</h2>
        
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="relative flex-1 min-w-[300px] max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
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
               onClick={()=>navigate("/req-list-table/create-request")}  >
              <Plus className="h-4 w-4 mr-2" />
              Add Request
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
                    <th scope="col" className="sticky top-0 w-12 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === users.length}
                        onChange={handleSelectAll}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Vendor
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      PO Entity Type
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Quotation Number
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Insurance Copy
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Comparative Statement
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Entity
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      City
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Site
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Bill To
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Advance Payment
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Currency
                    </th>
                    <th scope="col" className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.quotationNumber} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.quotationNumber)}
                          onChange={() => handleSelectUser(user.quotationNumber)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.poEntityType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.quotationNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.insuranceCopy ? user.insuranceCopy : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.comparativeStatement ? user.comparativeStatement : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.entity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.site}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.billTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.advancePayment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => onEdit(user)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => onDelete(user.quotationNumber)}
                            className="text-red-600 hover:text-red-800"
                          >
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
          Showing 1 to {users.length} of {users.length} entries
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

export default ReqListTable;