import { useState } from "react";
import { CheckCircle, XCircle, Clock, X } from "lucide-react";

interface HCWorker {
  id: string;
  name: string;
  workerId: string;
  ahpraNumber: string;
  npcNumber: string;
  photo: string;
  status: "approved" | "not-approved" | "pending";
}

const mockWorkers: HCWorker[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    workerId: "HCW-2024-001",
    ahpraNumber: "MED0012345678",
    npcNumber: "NPC-789456123",
    photo: "https://i.pravatar.cc/150?img=1",
    status: "approved",
  },
  {
    id: "2",
    name: "Michael Chen",
    workerId: "HCW-2024-002",
    ahpraNumber: "NUR0098765432",
    npcNumber: "NPC-456789321",
    photo: "https://i.pravatar.cc/150?img=2",
    status: "pending",
  },
  {
    id: "3",
    name: "Emily Wilson",
    workerId: "HCW-2024-003",
    ahpraNumber: "NUR0045612378",
    npcNumber: "NPC-147258369",
    photo: "https://i.pravatar.cc/150?img=3",
    status: "not-approved",
  },
  {
    id: "4",
    name: "David Martinez",
    workerId: "HCW-2024-004",
    ahpraNumber: "MED0087654321",
    npcNumber: "NPC-963852741",
    photo: "https://i.pravatar.cc/150?img=4",
    status: "pending",
  },
  {
    id: "5",
    name: "Jessica Brown",
    workerId: "HCW-2024-005",
    ahpraNumber: "NUR0067891234",
    npcNumber: "NPC-852741963",
    photo: "https://i.pravatar.cc/150?img=5",
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
  if (status === "not-approved") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
        <XCircle className="w-4 h-4" />
        Not Approved
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

export function HealthcareWorkerAuth() {
  const [selectedWorker, setSelectedWorker] = useState<HCWorker | null>(null);
  const [remarks, setRemarks] = useState("");

  const handleApprove = () => {
    alert(`Approved worker: ${selectedWorker?.name}`);
    setSelectedWorker(null);
    setRemarks("");
  };

  const handleReject = () => {
    if (!remarks.trim()) {
      alert("Please provide remarks for rejection");
      return;
    }
    alert(`Rejected worker: ${selectedWorker?.name}\nRemarks: ${remarks}`);
    setSelectedWorker(null);
    setRemarks("");
  };

  return (
    <div className="relative">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Healthcare Worker Authentication</h1>
        <p className="text-gray-500">Review and approve healthcare worker registrations</p>
      </div>

      {/* Workers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F7F8FA] border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Worker</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Worker ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">AHPRA Number</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">NPC Number</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockWorkers.map((worker) => (
                <tr
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker)}
                  className="border-b border-gray-100 hover:bg-[#FFF4EF] cursor-pointer transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={worker.photo}
                        alt={worker.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">{worker.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{worker.workerId}</td>
                  <td className="px-6 py-4 text-gray-600">{worker.ahpraNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{worker.npcNumber}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={worker.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedWorker && (
        <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Worker Details</h3>
            <button
              onClick={() => setSelectedWorker(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Profile Section */}
            <div className="text-center pb-6 border-b border-gray-200">
              <img
                src={selectedWorker.photo}
                alt={selectedWorker.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold text-gray-900">{selectedWorker.name}</h4>
              <p className="text-gray-500 mb-3">{selectedWorker.workerId}</p>
              <StatusBadge status={selectedWorker.status} />
            </div>

            {/* Registration Numbers */}
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900">Registration Information</h5>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">AHPRA Registration Number</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedWorker.ahpraNumber}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">NPC Registration Number</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedWorker.npcNumber}</p>
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
      {selectedWorker && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSelectedWorker(null)}
        />
      )}
    </div>
  );
}
