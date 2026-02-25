import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  Building2,
  DollarSign,
  MessageSquare,
  Search as SearchIcon,
  LogOut,
  ChevronLeft,
  Bell,
  User,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "hcw", label: "Healthcare Workers", icon: Users, path: "/hcw-auth" },
  { id: "business", label: "Business Organizations", icon: Building2, path: "/business-auth" },
  { id: "payroll", label: "Payroll Review", icon: DollarSign, path: "/payroll" },
  { id: "queries", label: "Queries & Support", icon: MessageSquare, path: "/queries" },
  { id: "search", label: "Search", icon: SearchIcon, path: "/search" },
];

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
        onMouseEnter={() => setSidebarCollapsed(false)}
        onMouseLeave={() => setSidebarCollapsed(true)}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF7A45] to-[#FF9F70] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            {!sidebarCollapsed && (
              <span className="font-semibold text-gray-900">OpenShift</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-[#FFF4EF] text-[#FF7A45]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarCollapsed ? "ml-20" : "ml-64"} transition-all duration-300`}>
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-gray-500">UBAM</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}