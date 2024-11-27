import { useState } from "react";
import profile from "../../../assets/images/capilary_logo.png";
import {
  FileText,
  MapPin,
  DollarSign,
  Building2,
  CalendarDays,
  Users,
  MessageCircle,
  Send,
  CheckCircle,
  XCircle,
  PauseCircle,
} from "lucide-react";

const request = {
  reqid: "REQ-12345",
  status: "Pending",
  commercials: {
    site: "New York Office",
    amount: "1,200",
    currency: "USD",
    department: "Finance",
    entity: "XYZ Corporation",
    costCentre: "CC-101",
  },
  procurements: {
    vendor: "ABC Supplies",
    expectedDeliveryDate: "2024-12-15T00:00:00Z",
  },
  commentLogs: [
    {
      senderId: "user-1",
      senderName: "John Doe",
      senderPic: profile,
      message: "Please review the details.",
      timestamp: "2024-11-20T10:30:00Z",
    },
    {
      senderId: "user-2",
      senderName: "Jane Smith",
      senderPic: profile,
      message: "All looks good to me!",
      timestamp: "2024-11-21T15:45:00Z",
    },
  ],
};

const PreviewTheReq = () => {
  const role = localStorage.getItem("role");
  const [comments, setComments] = useState(request.commentLogs || []);
  const [newComment, setNewComment] = useState("");

  const handleSendComment = () => {
    if (newComment.trim()) {
      const mockComment = {
        senderId: "current-user-id",
        senderName: "Current User",
        senderPic: "path/to/current/user/pic",
        message: newComment,
        timestamp: new Date().toISOString(),
      };
      setComments([...comments, mockComment]);
      setNewComment("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Request Details</h1>
            <div
              className={`px-4 py-1 rounded-full font-semibold ${getStatusColor(
                request.status
              )}`}
            >
              {request.status}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">
                Request Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                  <FileText className="text-primary w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Request ID</p>
                    <p className="font-semibold text-gray-800">
                      {request.reqid}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-primary w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Site</p>
                    <p className="font-semibold text-gray-800">
                      {request.commercials.site}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercials Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">
                Commercials
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                  <DollarSign className="text-green-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-semibold text-gray-800">
                      {request.commercials.currency}{" "}
                      {request.commercials.amount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Building2 className="text-purple-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-semibold text-gray-800">
                      {request.commercials.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Users className="text-indigo-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Entity</p>
                    <p className="font-semibold text-gray-800">
                      {request.commercials.entity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="text-teal-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Cost Centre</p>
                    <p className="font-semibold text-gray-800">
                      {request.commercials.costCentre}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Procurement Details */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">
                Procurement Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                  <Users className="text-orange-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Vendor</p>
                    <p className="font-semibold text-gray-800">
                      {request.procurements.vendor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="text-red-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Expected Delivery</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(
                        request.procurements.expectedDeliveryDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Comments Section */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <MessageCircle className="mr-2 text-primary w-6 h-6" />
                Comments
              </h2>
              <span className="text-sm text-gray-500">
                {comments.length} comments
              </span>
            </div>

            {/* Comments List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto mb-6">
              {comments.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <MessageCircle className="mx-auto mb-2 w-12 h-12 text-gray-300" />
                  <p>No comments yet</p>
                </div>
              ) : (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm"
                  >
                    <img
                      src={comment.senderPic || "/default-avatar.png"}
                      alt={comment.senderName}
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm text-gray-800">
                          {comment.senderName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type a comment..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition duration-300"
              />
              <button
                onClick={handleSendComment}
                className="bg-primary text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
              >
                <Send className="mr-2" /> Send
              </button>
            </div>
          </div>
        </div>

        {role === "HR" && (
          <div className="bg-gray-100 p-6 flex justify-end space-x-4 border-t">
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
              <XCircle className="mr-2" /> Reject
            </button>
            <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center">
              <PauseCircle className="mr-2" /> Hold
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
              <CheckCircle className="mr-2" /> Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewTheReq;
