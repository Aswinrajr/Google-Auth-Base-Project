import { Send, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetcAllChats, sendMessageComments } from "../../../api/service/adminServices";

const ChatComments = ({ reqId }) => {
  console.log("reqid", reqId);
  const userId = localStorage.getItem("userId");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(()=>{
    const fetchChats = async()=>{
        const resposne =await fetcAllChats(reqId)
        console.log(resposne)
        if(resposne.status===200){
            setChatMessages(resposne.data.chatData.commentLogs)
        }

    }
    fetchChats()

  },[])

  const [newMessage, setNewMessage] = useState("");
  const [activeChatTopic, setActiveChatTopic] = useState(null);

  const chatTopics = [
    "Head of Dept",
    "Business Finance",
    "Vendor Management",
    "Legal",
    "Info Security",
    "PO Team",
    "Head of Finance",
    "Payments",
    "Other Queries",
  ];

  const filteredMessages = activeChatTopic
    ? chatMessages.filter((msg) => msg.topic === activeChatTopic)
    : chatMessages;

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMsg = {
        reqId: reqId,
        senderId: userId,
        username: "Current User",
        userImage: null,
        message: newMessage,
        timestamp: new Date(),
        topic: activeChatTopic || "General Discussion",
      };
      console.log("newMessage", newMsg);
      const response = await sendMessageComments(newMsg);
      console.log(response);
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-full">
      {/* Topics Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r p-4 space-y-2">
        <h3 className="text-xl font-semibold text-primary mb-4">Chat Topics</h3>
        <div
          onClick={() => setActiveChatTopic(null)}
          className={`p-3 rounded-lg cursor-pointer ${
            activeChatTopic === null
              ? "bg-primary text-white"
              : "hover:bg-gray-200"
          }`}
        >
          All Discussions
        </div>
        {chatTopics.map((topic, index) => (
          <div
            key={index}
            onClick={() => setActiveChatTopic(topic)}
            className={`p-3 rounded-lg cursor-pointer ${
              activeChatTopic === topic
                ? "bg-primary text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {topic}
          </div>
        ))}
      </div>

      <div className="w-3/4 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map((msg) => (
            <div key={msg._id} className="flex items-start space-x-3">
              {msg.userImage ? (
                <img
                  src={msg.userImage}
                  alt={msg.senderName}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <UserCircle2 className="w-10 h-10 text-gray-400" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{msg.senderName}</span>
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
          <input
            id="message"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg"
            autoComplete="off"
          />

          <select
            value={activeChatTopic || ""}
            onChange={(e) => setActiveChatTopic(e.target.value || null)}
            className="p-2 border rounded-lg"
          >
            <option value="">Select Topic</option>
            {chatTopics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>

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

export default ChatComments;
