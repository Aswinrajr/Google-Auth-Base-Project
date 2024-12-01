import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Edit2,
  Package,
  DollarSign,
  ClipboardList,
  XCircle,
  PauseCircle,
  Send,
  
} from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchIndividualReq } from "../../../api/service/adminServices";
import { formatDateToDDMMYY } from "../../../utils/dateFormat";
import ChatComments from "./ChatComments";

const PreviewTheReq = () => {
  const params = useParams();

  const [request, setRequest] = useState(null);
  const [activeSection, setActiveSection] = useState("commercials");
  
  // Fetch request details
  useEffect(() => {
    const fetchReq = async () => {
      try {
        const response = await fetchIndividualReq(params.id);
        console.log(response);
        if (response.status === 200) {
          setRequest(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    };
    fetchReq();
  }, [params.id]);



  // Section Navigation Component
  const SectionNavigation = () => {
    const sections = [
      {
        key: "commercials",
        icon: DollarSign,
        label: "Commercials",
        color: "text-primary hover:bg-primary/10",
      },
      {
        key: "procurements",
        icon: Package,
        label: "Procurements",
        color: "text-primary hover:bg-primary/10",
      },
      {
        key: "supplies",
        icon: ClipboardList,
        label: "Supplies",
        color: "text-primary hover:bg-primary/10",
      },
      {
        key: "chat",
        icon: Send,
        label: "Discussions",
        color: "text-primary hover:bg-primary/10",
      },
    ];

    return (
      <div className="flex border-b">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`
                flex-1 p-4 flex items-center justify-center 
                ${
                  activeSection === section.key
                    ? "bg-primary/10 border-b-2 border-primary"
                    : "hover:bg-gray-100"
                }
                ${section.color} 
                transition-all duration-300
              `}
            >
              <Icon className="mr-2" size={20} />
              <span className="font-semibold">{section.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Render Section Content
  const renderSectionContent = () => {
    if (!request) return null;

    switch (activeSection) {
      case "chat":
        return <ChatComments reqId={params.id} />;

      case "commercials":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-primary border-b pb-3">
              Commercials Details
            </h2>
            {request.commercials && (
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Bill To",
                    value: `${request.commercials.billTo}`,
                  },
                  { label: "Ship To", value: request.commercials.shipTo },
                  { label: "City", value: request.commercials.city },
                  {
                    label: "Cost Centre",
                    value: request.commercials.costCentre,
                  },
                  { label: "Currency", value: request.commercials.currency },
                  {
                    label: "Department",
                    value: request.commercials.department,
                  },
                  { label: "Entity", value: request.commercials.entity },
                  {
                    label: "Payment Type",
                    value: request.commercials.paymentType,
                  },
                ]
                  .filter((item) => item.value)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between p-3 rounded-lg"
                    >
                      <span className="text-gray-600 font-medium">
                        {item.label}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {request.commercials?.paymentTerms?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Payment Terms
                </h3>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-primary/10">
                      <tr>
                        <th className="p-3 text-left text-primary">
                          Payment Term
                        </th>
                        <th className="p-3 text-left text-primary">Type</th>
                        <th className="p-3 text-right text-primary">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {request.commercials.paymentTerms.map((term, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3">{term.paymentTerm}</td>
                          <td className="p-3">{term.paymentType}</td>
                          <td className="p-3 text-right">
                            {term.percentageTerm}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case "procurements":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-primary border-b pb-3">
              Procurements Details
            </h2>
            {request.procurements && (
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Vendor", value: request.procurements.vendor },
                  {
                    label: "Quotation Number",
                    value: request.procurements.quotationNumber,
                  },
                  {
                    label: "Quotation Date",
                    value: request.procurements.quotationDate
                      ? formatDateToDDMMYY(request.procurements.quotationDate)
                      : "N/A",
                  },
                  {
                    label: "Po ExpiryDate",
                    value: request.procurements.poExpiryDate
                      ? formatDateToDDMMYY(request.procurements.poExpiryDate)
                      : "N/A",
                  },
                  {
                    label: "Po Validity From",
                    value: request.procurements.poValidityFrom
                      ? formatDateToDDMMYY(request.procurements.poValidityFrom)
                      : "N/A",
                  },
                  {
                    label: "Po Validity To",
                    value: request.procurements.poValidityTo
                      ? formatDateToDDMMYY(request.procurements.poValidityTo)
                      : "N/A",
                  },
                  {
                    label: "Final Quotation",
                    value: request.procurements.quotationCopy, // Assuming this is the URL
                    isLink: true, // Add a flag to indicate this is a link
                  },
                ]
                  .filter((item) => item.value)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-600 font-medium">
                        {item.label}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {item.isLink ? (
                          <a
                            href={item.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            View Document
                          </a>
                        ) : (
                          item.value
                        )}
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {request.procurements?.competitiveQuotations?.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Competitive Quotations
                </h3>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <ul className="space-y-2">
                    {request.procurements.competitiveQuotations.map(
                      (fileUrl, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            {`Comptative Quaotation ${index + 1}`}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 flex items-center">
                No files uploaded
              </div>
            )}
          </div>
        );

      case "supplies":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-primary border-b pb-3">
              Supplies Details
            </h2>

            {request.supplies?.totalValue !== undefined && (
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
                <span className="text-gray-600 font-medium">Total Value</span>
                <span className="text-gray-800 font-semibold">
                  {request.supplies.totalValue}
                </span>
              </div>
            )}

            {request.supplies?.services?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Services
                </h3>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-primary/10">
                      <tr>
                        <th className="p-3 text-left text-primary">
                          Product Name
                        </th>
                        <th className="p-3 text-left text-primary">Quantity</th>
                        <th className="p-3 text-left text-primary">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {request.supplies.services.map((service, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            {service.productName || "N/A"}
                          </td>
                          <td className="p-3">{service.quantity || "N/A"}</td>
                          <td className="p-3">{service.price || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {request.supplies?.remarks && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Remarks
                </h3>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {request.supplies.remarks}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!request) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="bg-primary text-white p-4 text-center shadow-md">
        <h1 className="text-2xl font-bold">Purchase Order Preview</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Section Navigation */}
        <SectionNavigation />

        {/* Section Content */}
        <div className="flex-1 overflow-y-auto">{renderSectionContent()}</div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white p-4 flex justify-between items-center border-t shadow-md">
        <button
          onClick={() => {
            /* Handle back/edit logic */
          }}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <Edit2 className="mr-2 inline-block" size={20} />
          Edit
        </button>
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
            <XCircle className="mr-2" /> Reject
          </button>
          <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center">
            <PauseCircle className="mr-2" /> Hold
          </button>
          <button
            onClick={() => {
              /* Handle submit logic */
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
          >
            <CheckCircle2 className="mr-2" />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewTheReq;
