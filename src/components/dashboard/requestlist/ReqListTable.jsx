/* eslint-disable react/prop-types */
import { useState } from "react";
import { Edit, Trash2, Search, Download, Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReqListTable = ({ onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      sno: 1,
      entity: "Entity 1",
      site: "Site 1",
      vendor: "Vendor 1",
      amount: "10000 INR",
      requestor: "Requestor 1",
      department: "Department 1",
      costCentre: "CC001",
      finalQuote: "Final Quote 1",
      status: "Pending",
    },
    {
      sno: 2,
      entity: "Entity 2",
      site: "Site 2",
      vendor: "Vendor 2",
      amount: "20000 INR",
      requestor: "Requestor 2",
      department: "Department 2",
      costCentre: "CC002",
      finalQuote: "Final Quote 2",
      status: "Approved",
    },
    {
      sno: 3,
      entity: "Entity 3",
      site: "Site 3",
      vendor: "Vendor 3",
      amount: "15000 INR",
      requestor: "Requestor 3",
      department: "Department 3",
      costCentre: "CC003",
      finalQuote: "Final Quote 3",
      status: "Rejected",
    },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user.sno));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (sno) => {
    setSelectedUsers((prev) =>
      prev.includes(sno) ? prev.filter((id) => id !== sno) : [...prev, sno]
    );
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-sm h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Request List</h2>

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
            <button
              className="inline-flex items-center px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
              onClick={() => navigate("/req-list-table/create-request")}
            >
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
                    <th
                      scope="col"
                      className="sticky top-0 w-12 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === users.length}
                        onChange={handleSelectAll}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Sno
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Entity
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Site
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Vendor
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Requestor
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Cost Centre
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Final Quote
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-center text-white uppercase tracking-wider"
                    >
                      View More
                    </th>

                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.sno} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.sno)}
                          onChange={() => handleSelectUser(user.sno)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {user.sno}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.entity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.site}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.vendor}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.requestor}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.costCentre}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.finalQuote}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.status}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => alert("View Logs clicked")}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View Logs
                          </button>
                          <button
                            onClick={() => alert("View Details clicked")}
                            className="text-green-600 hover:text-green-800"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => onEdit(user)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => onDelete(user)}
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
    </div>
  );
};

export default ReqListTable;
