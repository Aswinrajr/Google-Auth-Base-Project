import React from 'react';
import {formatDateToDDMMYY} from "../../../utils/dateFormat"
import { FileText } from 'lucide-react';

const RequestLogs = ({ logData }) => {
  const renderLogItem = (key, value) => {
    const colorMap = {
      status: value === 'Approved' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
    };

    const displayValue = key === 'approvalDate' 
      ? formatDateToDDMMYY(value) 
      : value;

    return (
      <div 
        key={key} 
        className={`p-3 rounded-lg ${key === 'status' ? colorMap[key] : 'bg-gray-50'} flex justify-between items-center mb-2`}
      >
        <span className="font-medium text-gray-700 capitalize">
          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
        </span>
        <span className="font-semibold">{displayValue}</span>
      </div>
    );
  };

  if (!logData || logData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl">
        <FileText className="text-gray-400 mb-4" size={48} />
        <p className="text-gray-600 text-center">
          No log entries available
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {logData?.map((log, index) => (
        <div 
          key={log._id || index} 
          className="border-b last:border-b-0 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Request Log #{index + 1}
            </h2>
            <span className="text-sm text-gray-500">
              {formatDateToDDMMYY(log.approvalDate)}
            </span>
          </div>
          <div className="space-y-2">
            {Object.entries(log)
              .filter(([key]) => !['_id', 'remarks'].includes(key))
              .map(([key, value]) => renderLogItem(key, value))
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestLogs;