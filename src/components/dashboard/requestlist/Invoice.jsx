import React from 'react';
import logo from '../../../assets/images/capilary_logo.png'; // Replace with your company logo image

const Invoice = () => {
  // Sample invoice data
  const invoiceData = {
    invoiceNo: '001',
    date: 'Feb 15th, 2023',
    from: {
      name: 'Soldo Apps',
      address: '123 Main St, Chicago, USA',
      email: 'info@soldoapps.com',
      phone: '(626) 5767667',
    },
    to: {
      name: 'Shepard Corp.',
      address: 'North st, 32, Chicago, USA',
      email: 'shepard@gmail.com',
      phone: '(626) 7689767',
    },
    items: [
      {
        description: 'Prototype',
        quantity: 2000,
        rate: 20.5,
        tax: 20.5,
        amount: 20230.4,
      },
      {
        description: 'Design',
        quantity: 2000,
        rate: 20.5,
        tax: 20.5,
        amount: 20230.4,
      },
    ],
    subtotal: 40460.8,
    discount: 0.2,
    shippingCost: 50.0,
    salesTax: 450.0,
    total: 6480.0,
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Company Logo" className="h-16" />
          <h1 className="text-4xl font-semibold text-blue-700">Invoice</h1>
        </div>
        <div className="text-right">
          <div className="text-xl font-medium text-gray-700">Invoice No: {invoiceData.invoiceNo}</div>
          <div className="text-sm text-gray-500">Date: {invoiceData.date}</div>
        </div>
      </div>

      {/* From and To Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">From:</h3>
          <p className="text-gray-600">{invoiceData.from.name}</p>
          <p className="text-gray-600">{invoiceData.from.address}</p>
          <p className="text-gray-600">{invoiceData.from.email}</p>
          <p className="text-gray-600">{invoiceData.from.phone}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Bill to:</h3>
          <p className="text-gray-600">{invoiceData.to.name}</p>
          <p className="text-gray-600">{invoiceData.to.address}</p>
          <p className="text-gray-600">{invoiceData.to.email}</p>
          <p className="text-gray-600">{invoiceData.to.phone}</p>
        </div>
      </div>

      {/* Item List Table */}
      <table className="min-w-full table-auto mb-12">
        <thead className="bg-blue-50 text-left">
          <tr>
            <th className="py-3 px-6 text-sm text-gray-700">Description</th>
            <th className="py-3 px-6 text-sm text-gray-700">Qty</th>
            <th className="py-3 px-6 text-sm text-gray-700">Rate</th>
            <th className="py-3 px-6 text-sm text-gray-700">Tax</th>
            <th className="py-3 px-6 text-sm text-gray-700">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="py-4 px-6 text-sm text-gray-700">{item.description}</td>
              <td className="py-4 px-6 text-sm text-gray-700">{item.quantity}</td>
              <td className="py-4 px-6 text-sm text-gray-700">${item.rate.toFixed(2)}</td>
              <td className="py-4 px-6 text-sm text-gray-700">${item.tax.toFixed(2)}</td>
              <td className="py-4 px-6 text-sm text-gray-700">${item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="flex justify-between items-center mb-12">
        <div className="text-sm text-gray-600">
          <p>Thank you for your business! If you have any questions, feel free to contact us.</p>
        </div>
        <div className="text-right">
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
            <div>Subtotal:</div>
            <div className="font-semibold">${invoiceData.subtotal.toFixed(2)}</div>
            <div>Discount:</div>
            <div className="font-semibold">-${(invoiceData.subtotal * invoiceData.discount).toFixed(2)}</div>
            <div>Shipping:</div>
            <div className="font-semibold">${invoiceData.shippingCost.toFixed(2)}</div>
            <div>Sales Tax:</div>
            <div className="font-semibold">${invoiceData.salesTax.toFixed(2)}</div>
            <div className="text-lg font-semibold">Total:</div>
            <div className="text-lg font-semibold">${invoiceData.total.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <div className="text-sm text-center text-gray-600 mt-8">
        <p>Prototype-based programming is a style of object-oriented programming in which behavior reuse is achieved by cloning, not by inheritance.</p>
      </div>
    </div>
  );
};

export default Invoice;
