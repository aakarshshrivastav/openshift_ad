import { useState } from "react";
import { useNavigate } from "react-router";
import { LogIn } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in production this would validate credentials
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF7A45] to-[#FF9F70] rounded-2xl mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">OpenShift</h1>
          <p className="text-gray-500">Admin Login</p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7A45] focus:border-transparent outline-none transition"
                placeholder="admin@openshift.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7A45] focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF7A45] text-white py-3 rounded-xl hover:bg-[#FF6A35] transition font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-[#FF7A45] hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure admin access only
        </p>
      </div>
    </div>
  );
}
