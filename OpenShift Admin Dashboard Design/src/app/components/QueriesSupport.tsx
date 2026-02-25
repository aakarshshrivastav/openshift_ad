import { useState } from "react";
import { MessageSquare, User, Building2, CheckCircle, Clock, AlertCircle, Send } from "lucide-react";

interface Query {
  id: string;
  queryId: string;
  raisedBy: string;
  raisedByType: "HCW" | "Business";
  subject: string;
  status: "open" | "resolved";
  priority: "high" | "medium" | "low";
  createdAt: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: string;
  senderType: "user" | "admin";
  message: string;
  timestamp: string;
}

const mockQueries: Query[] = [
  {
    id: "1",
    queryId: "QRY-12345",
    raisedBy: "Sarah Johnson",
    raisedByType: "HCW",
    subject: "Payment not received for last shift",
    status: "open",
    priority: "high",
    createdAt: "2024-06-15 10:30 AM",
    messages: [
      {
        id: "1",
        sender: "Sarah Johnson",
        senderType: "user",
        message: "Hello, I completed my shift on June 10th but haven't received payment yet. Can you please check?",
        timestamp: "2024-06-15 10:30 AM",
      },
    ],
  },
  {
    id: "2",
    queryId: "QRY-12344",
    raisedBy: "MediCare Solutions",
    raisedByType: "Business",
    subject: "Unable to post new shift",
    status: "open",
    priority: "medium",
    createdAt: "2024-06-15 09:15 AM",
    messages: [
      {
        id: "1",
        sender: "MediCare Solutions",
        senderType: "user",
        message: "We're getting an error when trying to post a new shift. The system says 'Invalid shift duration'.",
        timestamp: "2024-06-15 09:15 AM",
      },
      {
        id: "2",
        sender: "Admin",
        senderType: "admin",
        message: "Thank you for reporting this. Can you please provide the shift details you're trying to post?",
        timestamp: "2024-06-15 09:45 AM",
      },
    ],
  },
  {
    id: "3",
    queryId: "QRY-12343",
    raisedBy: "Michael Chen",
    raisedByType: "HCW",
    subject: "Profile verification status",
    status: "resolved",
    priority: "low",
    createdAt: "2024-06-14 03:20 PM",
    messages: [
      {
        id: "1",
        sender: "Michael Chen",
        senderType: "user",
        message: "When will my profile be verified? I submitted all documents 3 days ago.",
        timestamp: "2024-06-14 03:20 PM",
      },
      {
        id: "2",
        sender: "Admin",
        senderType: "admin",
        message: "Your profile has been reviewed and approved. You should now have full access to the platform.",
        timestamp: "2024-06-14 04:15 PM",
      },
    ],
  },
];

const PriorityBadge = ({ priority }: { priority: string }) => {
  if (priority === "high") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
        <AlertCircle className="w-3 h-3" />
        High
      </span>
    );
  }
  if (priority === "medium") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
        <Clock className="w-3 h-3" />
        Medium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
      <MessageSquare className="w-3 h-3" />
      Low
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "resolved") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
        <CheckCircle className="w-3 h-3" />
        Resolved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
      <Clock className="w-3 h-3" />
      Open
    </span>
  );
};

export function QueriesSupport() {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(mockQueries[0]);
  const [replyMessage, setReplyMessage] = useState("");

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    alert(`Reply sent to ${selectedQuery?.raisedBy}: ${replyMessage}`);
    setReplyMessage("");
  };

  const handleMarkResolved = () => {
    alert(`Marked query ${selectedQuery?.queryId} as resolved`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Queries & Support</h1>
        <p className="text-gray-500">Manage and respond to user queries</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Queries List */}
        <div className="col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">All Queries</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {mockQueries.map((query) => (
              <button
                key={query.id}
                onClick={() => setSelectedQuery(query)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition ${
                  selectedQuery?.id === query.id ? "bg-[#FFF4EF]" : ""
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      query.raisedByType === "HCW" ? "bg-blue-100" : "bg-purple-100"
                    }`}
                  >
                    {query.raisedByType === "HCW" ? (
                      <User className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Building2 className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm truncate">{query.raisedBy}</span>
                      <PriorityBadge priority={query.priority} />
                    </div>
                    <p className="text-sm text-gray-900 font-medium mb-1 truncate">{query.subject}</p>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={query.status} />
                      <span className="text-xs text-gray-500">{query.queryId}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation View */}
        <div className="col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-250px)]">
          {selectedQuery ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedQuery.raisedByType === "HCW" ? "bg-blue-100" : "bg-purple-100"
                      }`}
                    >
                      {selectedQuery.raisedByType === "HCW" ? (
                        <User className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Building2 className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedQuery.raisedBy}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedQuery.raisedByType === "HCW" ? "Healthcare Worker" : "Business"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <PriorityBadge priority={selectedQuery.priority} />
                    <StatusBadge status={selectedQuery.status} />
                  </div>
                </div>
                <div className="pl-15">
                  <p className="text-gray-900 font-medium mb-1">{selectedQuery.subject}</p>
                  <p className="text-sm text-gray-500">{selectedQuery.queryId} • {selectedQuery.createdAt}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedQuery.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderType === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 ${
                        message.senderType === "admin"
                          ? "bg-[#FF7A45] text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm font-medium mb-1">{message.sender}</p>
                      <p className="text-sm mb-2">{message.message}</p>
                      <p
                        className={`text-xs ${
                          message.senderType === "admin" ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7A45] focus:border-transparent outline-none"
                    onKeyPress={(e) => e.key === "Enter" && handleSendReply()}
                  />
                  <button
                    onClick={handleSendReply}
                    className="px-6 py-3 bg-[#FF7A45] text-white rounded-xl hover:bg-[#FF6A35] transition flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </button>
                </div>
                {selectedQuery.status === "open" && (
                  <button
                    onClick={handleMarkResolved}
                    className="w-full py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#16A34A] transition font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Resolved
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a query to view conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
