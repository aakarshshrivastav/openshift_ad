import { useState } from "react";
import { CheckCircle, XCircle, Clock, X, Building2 } from "lucide-react";

interface Business {
  id: string;
  businessName: string;
  businessId: string;
  abn: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "approved" | "rejected" | "pending";
}

const mockBusinesses: Business[] = [
  {
    id: "1",
    businessName: "MediCare Solutions",
    businessId: "BUS-2024-001",
    abn: "51 824 753 556",
    contactPerson: "John Smith",
    email: "john@medicare.com.au",
    phone: "+61 2 9876 5432",
    status: "approved",
  },
  {
    id: "2",
    businessName: "HealthPlus Pty Ltd",
    businessId: "BUS-2024-002",
    abn: "82 614 365 278",
    contactPerson: "Lisa Anderson",
    email: "lisa@healthplus.com.au",
    phone: "+61 3 8765 4321",
    status: "pending",
  },
  {
    id: "3",
    businessName: "CareFirst Services",
    businessId: "BUS-2024-003",
    abn: "33 915 482 739",
    contactPerson: "Mark Thompson",
    email: "mark@carefirst.com.au",
    phone: "+61 7 7654 3210",
    status: "rejected",
  },
  {
    id: "4",
    businessName: "Elite Healthcare Group",
    businessId: "BUS-2024-004",
    abn: "67 482 159 836",
    contactPerson: "Emma Wilson",
    email: "emma@elitehc.com.au",
    phone: "+61 8 9123 4567",
    status: "pending",
  },
  {
    id: "5",
    businessName: "WellCare Group",
    businessId: "BUS-2024-005",
    abn: "45 753 951 842",
    contactPerson: "Robert Lee",
    email: "robert@wellcare.com.au",
    phone: "+61 2 8765 1234",
    status: "approved",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
        <CheckCircle className="w-4 h-4" />
        Approved
      </span>
    );
  }
  if (status === "rejected") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
        <XCircle className="w-4 h-4" />
        Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
      <Clock className="w-4 h-4" />
      Pending
    </span>
  );
};

export function BusinessAuth() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [remarks, setRemarks] = useState("");

  const handleApprove = () => {
    alert(`Approved business: ${selectedBusiness?.businessName}`);
    setSelectedBusiness(null);
    setRemarks("");
  };

  const handleReject = () => {
    if (!remarks.trim()) {
      alert("Please provide remarks for rejection");
      return;
    }
    alert(`Rejected business: ${selectedBusiness?.businessName}\nRemarks: ${remarks}`);
    setSelectedBusiness(null);
    setRemarks("");
  };

  return (
    <div className="relative">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Business Authentication</h1>
        <p className="text-gray-500">Review and approve business organization registrations</p>
      </div>

      {/* Business Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F7F8FA] border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Business Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Business ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">ABN</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Contact Person</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBusinesses.map((business) => (
                <tr
                  key={business.id}
                  onClick={() => setSelectedBusiness(business)}
                  className="border-b border-gray-100 hover:bg-[#FFF4EF] cursor-pointer transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{business.businessName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{business.businessId}</td>
                  <td className="px-6 py-4 text-gray-600">{business.abn}</td>
                  <td className="px-6 py-4 text-gray-600">{business.contactPerson}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={business.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedBusiness && (
        <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
            <button
              onClick={() => setSelectedBusiness(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Business Info */}
            <div className="text-center pb-6 border-b border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">{selectedBusiness.businessName}</h4>
              <p className="text-gray-500 mb-3">{selectedBusiness.businessId}</p>
              <StatusBadge status={selectedBusiness.status} />
            </div>

            {/* Business Details */}
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900">Business Information</h5>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Australian Business Number</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedBusiness.abn}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Contact Person</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedBusiness.contactPerson}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedBusiness.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedBusiness.phone}</p>
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-3">
              <label className="block font-semibold text-gray-900">Remarks (Required for Rejection)</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks or reason for rejection..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7A45] focus:border-transparent outline-none resize-none"
                rows={4}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleApprove}
                className="flex-1 bg-[#22C55E] text-white py-3 rounded-xl hover:bg-[#16A34A] transition font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Approve
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-[#EF4444] text-white py-3 rounded-xl hover:bg-[#DC2626] transition font-medium flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {selectedBusiness && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSelectedBusiness(null)}
        />
      )}
    </div>
  );
}
