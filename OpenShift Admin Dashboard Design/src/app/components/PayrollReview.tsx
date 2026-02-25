import { FileText, Download, CheckCircle, Eye } from "lucide-react";

interface PayrollBatch {
  id: string;
  batchId: string;
  numberOfWorkers: number;
  totalAmount: number;
  status: "pending" | "approved" | "processed";
  date: string;
  period: string;
}

const mockBatches: PayrollBatch[] = [
  {
    id: "1",
    batchId: "BATCH-2024-156",
    numberOfWorkers: 45,
    totalAmount: 48250,
    status: "pending",
    date: "2024-06-15",
    period: "June 1-15, 2024",
  },
  {
    id: "2",
    batchId: "BATCH-2024-155",
    numberOfWorkers: 52,
    totalAmount: 56780,
    status: "approved",
    date: "2024-06-01",
    period: "May 16-31, 2024",
  },
  {
    id: "3",
    batchId: "BATCH-2024-154",
    numberOfWorkers: 48,
    totalAmount: 51200,
    status: "processed",
    date: "2024-05-15",
    period: "May 1-15, 2024",
  },
  {
    id: "4",
    batchId: "BATCH-2024-153",
    numberOfWorkers: 43,
    totalAmount: 45890,
    status: "processed",
    date: "2024-05-01",
    period: "April 16-30, 2024",
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
  if (status === "processed") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
        <CheckCircle className="w-4 h-4" />
        Processed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
      <Eye className="w-4 h-4" />
      Pending Review
    </span>
  );
};

export function PayrollReview() {
  const handleReviewBatch = (batchId: string) => {
    alert(`Reviewing batch: ${batchId}`);
  };

  const handleApprovePayment = (batchId: string) => {
    alert(`Payment approved for batch: ${batchId}`);
  };

  const handleGenerateReport = (batchId: string) => {
    alert(`Generating report for batch: ${batchId}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payroll Review</h1>
        <p className="text-gray-500">Review and approve batch payments for healthcare workers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Pending Review</span>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">$48,250</p>
          <p className="text-sm text-gray-500 mt-1">1 batch • 45 workers</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">This Month</span>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">$156,230</p>
          <p className="text-sm text-gray-500 mt-1">3 batches • 145 workers</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Processed</span>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">$1.2M</p>
          <p className="text-sm text-gray-500 mt-1">Year to date</p>
        </div>
      </div>

      {/* Payroll Batches Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F7F8FA] border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Batch ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Period</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Workers</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Total Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBatches.map((batch) => (
                <tr key={batch.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{batch.batchId}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{batch.period}</td>
                  <td className="px-6 py-4 text-gray-600">{batch.numberOfWorkers}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      ${batch.totalAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={batch.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReviewBatch(batch.batchId)}
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        Review
                      </button>
                      {batch.status === "pending" && (
                        <button
                          onClick={() => handleApprovePayment(batch.batchId)}
                          className="px-3 py-1.5 text-sm bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition"
                        >
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleGenerateReport(batch.batchId)}
                        className="px-3 py-1.5 text-sm bg-[#FF7A45] text-white rounded-lg hover:bg-[#FF6A35] transition"
                      >
                        <Download className="w-4 h-4 inline mr-1" />
                        Report
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
