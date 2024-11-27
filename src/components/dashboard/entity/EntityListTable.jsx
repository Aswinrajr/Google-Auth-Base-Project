/* eslint-disable react/prop-types */
import { useState } from "react";
import { Edit, Trash2, Search, Download, Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EntityListTable = ({ onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      sno: 1,
      entityName: "Entity 1",
      category: "Category 1",
      addressLine: "123 Main St",
      area: "Area 1",
      city: "City 1",
      state: "State 1",
      pincode: "123456",
      country: "Country 1",
      landmark: "Landmark 1",
      latitude: "12.3456",
      longitude: "78.9101",
      status: "Pending",
    },
    {
      sno: 2,
      entityName: "Entity 2",
      category: "Category 2",
      addressLine: "456 Market Ave",
      area: "Area 2",
      city: "City 2",
      state: "State 2",
      pincode: "654321",
      country: "Country 2",
      landmark: "Landmark 2",
      latitude: "21.5432",
      longitude: "89.0123",
      status: "Approved",
    },
    {
      sno: 3,
      entityName: "Entity 3",
      category: "Category 3",
      addressLine: "789 Park Blvd",
      area: "Area 3",
      city: "City 3",
      state: "State 3",
      pincode: "789123",
      country: "Country 3",
      landmark: "Landmark 3",
      latitude: "34.5678",
      longitude: "90.1234",
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Entity List</h2>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="relative flex-1 min-w-[300px] max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search requests..."
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
              onClick={() => navigate("/entity-list-table/entities")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Entity
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
                      entityName
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      category
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      addressLine
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      area
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      city
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      state
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      pincode
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      country
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      landmark
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      latitude
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      longitude
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
                        {user.entityName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.addressLine}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.area}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.city}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.state}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.pincode}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.country}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.landmark}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.latitude}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.longitude}
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
                            // onClick={() => onEdit(user)}
                            className="text-primary hover:text-primary/80"
                            onClick={() => navigate("/entity-list-table/edit-entities")}
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

export default EntityListTable;
