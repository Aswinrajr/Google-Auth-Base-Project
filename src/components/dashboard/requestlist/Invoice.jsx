/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import capilary_logo from "../../../assets/images/Logo_Picture.png";


// eslint-disable-next-line react/prop-types
const Invoice = ({ formData, onSubmit }) => {
  const invoice = {
    number: "#45124568",
    date: new Date(),
    dueDate: new Date(),
    from: {
      name: "Soldo Apps",
      email: "info@soldoapps.com",
      address: "123 Tech Park, Silicon Valley, CA",
    },
    billTo: {
      name: "John Doe",
      email: "johndoe@example.com",
      address: "456 Elm Street, New York, NY",
    },
    shipTo: {
      name: "Jane Doe",
      email: "janedoe@example.com",
      address: "789 Oak Avenue, Los Angeles, CA",
    },
    items: [
      {
        description: "Delivery of Package A",
        rate: 50,
        quantity: 2,
        tax: 5,
        amount: 110,
      },
      {
        description: "Delivery of Package B",
        rate: 30,
        quantity: 3,
        tax: 4.5,
        amount: 94.5,
      },
    ],
    subtotal: 204.5,
    discount: 20.45,
    shippingCost: 15,
    salesTax: 10.23,
    total: 209.28,
    paymentInstruction: "Please pay via bank transfer to account #123456789.",
    notes: "Thank you for using our service!",
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      <header className="py-6 px-6 flex justify-between items-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={capilary_logo}
              alt="Capillary Technologies"
              className="h-40 w-auto"
            />
          </div>
          <div className="text-start">
            <p className="font-semibold">Capillary Technologies India Ltd</p>
            <p>360, bearing PID No: 101, 360, 15th Cross Rd,</p>
            <p>Sector 4, HSR Layout</p>
            <p>Bengaluru, Karnataka 560102</p>
            <p>India</p>
            <p className="mt-2">
              Web:{" "}
              <a href="http://www.capillarytech.com" className="text-blue-500">
                www.capillarytech.com
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:accounts@capillarytech.com"
                className="text-blue-500"
              >
                accounts@capillarytech.com
              </a>
            </p>
            <p className="mt-2">
              Tax No.: <span className="font-semibold">29AAECK7007Q1ZY</span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-2xl font-bold">Purchase Order</h1>
          <span className="font-medium block">
            Invoice No. {invoice.number}
          </span>
          <p className="text-sm mt-2">
            Issued on {format(invoice.date, "MMMM d, yyyy")}
          </p>
          <p className="text-sm">
            Due Date: {format(invoice.dueDate, "MMMM d, yyyy")}
          </p>
        </div>
      </header>

      <div className="p-6 grid grid-cols-2 gap-6 mb-3">
        <div className="p-2 border-2 border-solid border-black">
          <h2 className="text-lg font-medium mb-2">Bill to</h2>
          <address className="not-italic">
            <div className="font-medium">{invoice.billTo.name}</div>
            <div>{invoice.billTo.email}</div>
            <div>{invoice.billTo.address}</div>
          </address>
        </div>

        <div className="text-right p-2 border-2 border-solid border-black">
          {" "}
          <h2 className="text-lg font-medium mb-2">Ship To</h2>
          <address className="not-italic">
            <div className="font-medium">{invoice.shipTo.name}</div>
            <div>{invoice.shipTo.email}</div>
            <div>{invoice.shipTo.address}</div>
          </address>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-6 mb-3">
        <div className="p-2 ">
          <h2 className="text-lg font-medium mb-2">Payment Terms</h2>
        </div>

        <div className="text-right p-2 ">
          {" "}
          <h2 className="text-lg font-medium mb-2">
            Tax Terms:Inclusion of Tax
          </h2>
        </div>
      </div>

      <div className="ml-7 p-1 mb-2 ">
        <h2 className="text-lg">30 days from receipt of invoice</h2>
      </div>

      <table className="w-full bg-gray-100 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 font-medium">
            <th className="p-3 text-left">SNo</th>
            <th className="p-3 text-left">Description of Service</th>
            <th className="p-3 text-right">Quantity</th>
            <th className="p-3 text-right">Unit</th>
            <th className="p-3 text-right">Rate</th>
            <th className="p-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">1</td>
            <td className="p-3">
              ITEM:SUBSCRIPTION FEE (OVERHEADS) Microsoft 365 Apps for business
              Subcription Period: 16/06/2024 To 15/06/2025 Service Period :
              16/06/2024 To 15/06/2025 Department : Information Technology
              Requested By : Sweta Banerjee Approved By : Muralidhar
            </td>
            <td className="p-3 text-right">140</td>
            <td className="p-3 text-right">Qty</td>
            <td className="p-3 text-right">₹ 6,523.00</td>
            <td className="p-3 text-right">₹ 9,13,220.00</td>
          </tr>
        </tbody>
      </table>

      <div className="p-6 space-y-2">
        <div className="flex justify-between border-t pt-4">
          <p className="text-gray-600 font-medium">Total</p>
          <p className="font-bold text-2xl">${invoice.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="border-t pt-6 px-6 pb-6 space-y-2">
        <p className="text-gray-600 font-medium">Payment Instruction</p>
        <p>{invoice.paymentInstruction}</p>

        <p className="text-gray-600 font-medium">Notes</p>
        <p>{invoice.notes}</p>
      </div>
    </div>
  );
};

export default Invoice;
