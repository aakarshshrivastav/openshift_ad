import { Users, Building2, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const summaryCards = [
  { title: "Pending HCW Approvals", value: "24", icon: Users, color: "bg-blue-500", change: "+12%" },
  { title: "Pending Business Approvals", value: "8", icon: Building2, color: "bg-purple-500", change: "+3%" },
  { title: "Active Shifts Today", value: "342", icon: Calendar, color: "bg-green-500", change: "+18%" },
  { title: "Payments Pending Review", value: "$48,250", icon: DollarSign, color: "bg-[#FF7A45]", change: "+8%" },
  { title: "Platform Revenue (Monthly)", value: "$124,500", icon: TrendingUp, color: "bg-emerald-500", change: "+15%" },
];

const revenueData = [
  { month: "Jan", revenue: 65000 },
  { month: "Feb", revenue: 72000 },
  { month: "Mar", revenue: 85000 },
  { month: "Apr", revenue: 95000 },
  { month: "May", revenue: 110000 },
  { month: "Jun", revenue: 124500 },
];

const onboardingData = [
  { month: "Jan", workers: 45, businesses: 12 },
  { month: "Feb", workers: 52, businesses: 15 },
  { month: "Mar", workers: 68, businesses: 18 },
  { month: "Apr", workers: 78, businesses: 22 },
  { month: "May", workers: 92, businesses: 28 },
  { month: "Jun", workers: 105, businesses: 32 },
];

export function Overview() {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{card.change}</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">{card.value}</p>
              <p className="text-sm text-gray-500">{card.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Monthly Revenue</h3>
            <p className="text-sm text-gray-500">Platform revenue over the last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
              <Bar dataKey="revenue" fill="#FF7A45" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Onboarding Stats Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Onboarding Statistics</h3>
            <p className="text-sm text-gray-500">Workers vs Business onboarding trends</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={onboardingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
              <Line type="monotone" dataKey="workers" stroke="#22C55E" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="businesses" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#22C55E] rounded-full"></div>
              <span className="text-sm text-gray-600">Healthcare Workers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#8B5CF6] rounded-full"></div>
              <span className="text-sm text-gray-600">Businesses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "New HCW registration", user: "Sarah Johnson", time: "5 minutes ago", type: "pending" },
            { action: "Business approved", user: "MediCare Solutions", time: "15 minutes ago", type: "success" },
            { action: "Payroll batch processed", user: "Batch #2024-156", time: "1 hour ago", type: "success" },
            { action: "Query resolved", user: "Query #12345", time: "2 hours ago", type: "success" },
            { action: "New business registration", user: "HealthPlus Pty Ltd", time: "3 hours ago", type: "pending" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "success" ? "bg-[#22C55E]" : "bg-[#FF7A45]"
                  }`}
                ></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
