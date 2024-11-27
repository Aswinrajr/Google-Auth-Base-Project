import { format } from "date-fns";
import capilary_logo from "../../../assets/images/capilary_logo.png";

const Invoice = ({ formData, onSubmit }) => {
  const invoice = {
    number: "INV-001",
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
        <div className="flex items-center ">
          <img src={capilary_logo} alt="Soldo Apps" className="h-40 w-full" />
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold">Delivery Service Invoice</h1>
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
        <div>
          <h2 className="text-lg font-medium mb-2">Bill to</h2>
          <address className="not-italic">
            <div className="font-medium">{invoice.billTo.name}</div>
            <div>{invoice.billTo.email}</div>
            <div>{invoice.billTo.address}</div>
          </address>
        </div>

        <div className="text-right">
          {" "}
          <h2 className="text-lg font-medium mb-2">Ship To</h2>
          <address className="not-italic">
            <div className="font-medium">{invoice.shipTo.name}</div>
            <div>{invoice.shipTo.email}</div>
            <div>{invoice.shipTo.address}</div>
          </address>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-5 text-gray-600 font-medium">
          <p>Name</p>
          <p className="text-right">RATE</p>
          <p className="text-right">QTY</p>
          <p className="text-right"></p>
          <p className="text-right">AMOUNT</p>
        </div>
        {invoice.items.map((item, index) => (
          <div key={index} className="grid grid-cols-5 items-center">
            <p>{item.description}</p>
            <p className="text-right">${item.rate.toFixed(2)}</p>
            <p className="text-right">{item.quantity}</p>
            <p className="text-right"></p>
            <p className="text-right">${item.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>

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
