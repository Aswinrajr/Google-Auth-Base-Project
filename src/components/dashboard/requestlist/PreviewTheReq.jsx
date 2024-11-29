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
  UserCircle2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchIndividualReq } from "../../../api/service/adminServices";

const PreviewTheReq = () => {
  const params = useParams();

  const [request, setRequest] = useState(null);
  const [activeSection, setActiveSection] = useState("commercials");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      username: "John Doe",
      userImage: null,
      message: "Can we discuss the payment terms for this request?",
      timestamp: new Date("2024-02-15T10:30:00"),
      topic: "Payment Discussion",
    },
    {
      id: 2,
      username: "Jane Smith",
      userImage: null,
      message: "I have some questions about the competitive quotations.",
      timestamp: new Date("2024-02-15T11:15:00"),
      topic: "Quotation Inquiry",
    },
  ]);
  const [newMessage, setNewMessage] = useState();
  const [activeChatTopic, setActiveChatTopic] = useState(null);

  // Fetch request details
  useEffect(() => {
    const fetchReq = async () => {
      try {
        const response = await fetchIndividualReq(params.id);
        if (response.status === 200) {
          setRequest(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    };
    fetchReq();
  }, []);

  const ChatSection = () => {
    const chatTopics = [...new Set(chatMessages.map((msg) => msg.topic))];

    const filteredMessages = activeChatTopic
      ? chatMessages.filter((msg) => msg.topic === activeChatTopic)
      : chatMessages;

    const handleSendMessage = () => {
      const message = document.getElementById("message")
      console.log("Message",message)
      if (newMessage.trim()) {
        const newMsg = {
          id: chatMessages.length + 1,
          username: "Current User", // Replace with actual username
          userImage: null,
          message: newMessage,
          timestamp: new Date(),
          topic: activeChatTopic || "General Discussion",
        };
        setChatMessages([...chatMessages, newMsg]);
        setNewMessage("");
      }
    };

    return (
      <div className="flex h-full">
        {/* Topics Sidebar */}
        <div className="w-1/4 bg-gray-100 border-r p-4 space-y-2">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Chat Topics
          </h3>
          <div
            onClick={() => setActiveChatTopic(null)}
            className={`
              p-3 rounded-lg cursor-pointer 
              ${
                activeChatTopic === null
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200"
              }
            `}
          >
            All Discussions
          </div>
          {chatTopics.map((topic, index) => (
            <div
              key={index}
              onClick={() => setActiveChatTopic(topic)}
              className={`
                p-3 rounded-lg cursor-pointer 
                ${
                  activeChatTopic === topic
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200"
                }
              `}
            >
              {topic}
            </div>
          ))}
        </div>

        <div className="w-3/4 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-3">
                {msg.userImage ? (
                  <img
                    src={msg.userImage}
                    alt={msg.username}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <UserCircle2 className="w-10 h-10 text-gray-400" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{msg.username}</span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg mt-1">
                    <p>{msg.message}</p>
                    {msg.topic && (
                      <span className="text-xs text-primary mt-1 block">
                        Topic: {msg.topic}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4 flex items-center space-x-3">
            <input id="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg"
           
            />

            <select
              value={activeChatTopic || ""}
              onChange={(e) => setActiveChatTopic(e.target.value || null)}
              className="p-2 border rounded-lg"
            >
              <option value="">Select Subject</option>
              {chatTopics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
              <option value="">Others</option>
            </select>
            <div className="relative group">
              <label className="flex items-center cursor-pointer">
                <input type="file" className="hidden" />
                <div className="p-2 rounded-lg border hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586a2 2 0 00-2.828-2.828z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 3.879a2 2 0 113.121 3.121L10.243 16.121a4 4 0 11-5.657-5.657L16 3.879z"
                    />
                  </svg>
                </div>
              </label>
              <span className="absolute left-1/2 bottom-full mb-1 transform -translate-x-1/2 whitespace-nowrap bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Attachments
              </span>
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

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
        return <ChatSection />;

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
                    label: "Amount",
                    value: `${request.commercials.currency} ${request.commercials.amount}`,
                  },
                  { label: "Bill To", value: request.commercials.billTo },
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
                      ? new Date(
                          request.procurements.quotationDate
                        ).toLocaleDateString()
                      : "N/A",
                  },
                  {
                    label: "Expected Delivery",
                    value: request.procurements.expectedDeliveryDate
                      ? new Date(
                          request.procurements.expectedDeliveryDate
                        ).toLocaleDateString()
                      : "N/A",
                  },
                  {
                    label: "PO Expiry Date",
                    value: request.procurements.poExpiryDate
                      ? new Date(
                          request.procurements.poExpiryDate
                        ).toLocaleDateString()
                      : "N/A",
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
                        {item.value}
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
                  <div className="text-green-600 flex items-center">
                    <CheckCircle2 className="mr-2" size={20} />
                    Files uploaded successfully
                  </div>
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
