import { useState } from "react";
import { Search as SearchIcon, User, Building2, Mail, Phone, MapPin, Eye } from "lucide-react";

interface SearchResult {
  id: string;
  type: "HCW" | "Business";
  name: string;
  identifier: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  photo?: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "HCW",
    name: "Sarah Johnson",
    identifier: "HCW-2024-001",
    email: "sarah.j@email.com",
    phone: "+61 412 345 678",
    location: "Sydney, NSW",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    type: "Business",
    name: "MediCare Solutions",
    identifier: "BUS-2024-001",
    email: "contact@medicare.com.au",
    phone: "+61 2 9876 5432",
    location: "Melbourne, VIC",
    status: "Verified",
  },
  {
    id: "3",
    type: "HCW",
    name: "Michael Chen",
    identifier: "HCW-2024-002",
    email: "m.chen@email.com",
    phone: "+61 423 456 789",
    location: "Brisbane, QLD",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "4",
    type: "Business",
    name: "HealthPlus Pty Ltd",
    identifier: "BUS-2024-002",
    email: "info@healthplus.com.au",
    phone: "+61 3 8765 4321",
    location: "Perth, WA",
    status: "Pending",
  },
  {
    id: "5",
    type: "HCW",
    name: "Emily Wilson",
    identifier: "HCW-2024-003",
    email: "emily.w@email.com",
    phone: "+61 434 567 890",
    location: "Adelaide, SA",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=3",
  },
];

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"all" | "HCW" | "Business">("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Mock search - filter results based on query and type
    let filtered = mockResults.filter(
      (result) =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchType !== "all") {
      filtered = filtered.filter((result) => result.type === searchType);
    }

    setResults(filtered);
    setHasSearched(true);
  };

  const handleViewProfile = (result: SearchResult) => {
    alert(`Viewing profile: ${result.name} (${result.identifier})`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Search Clients & Businesses</h1>
        <p className="text-gray-500">Search by name, ID, email, or business number</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by name, ID, email, or business number..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7A45] focus:border-transparent outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-[#FF7A45] text-white rounded-xl hover:bg-[#FF6A35] transition font-medium"
          >
            Search
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setSearchType("all")}
            className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
              searchType === "all"
                ? "bg-[#FF7A45] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSearchType("HCW")}
            className={`px-4 py-2 rounded-lg transition font-medium text-sm flex items-center gap-2 ${
              searchType === "HCW"
                ? "bg-[#FF7A45] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <User className="w-4 h-4" />
            Healthcare Workers
          </button>
          <button
            onClick={() => setSearchType("Business")}
            className={`px-4 py-2 rounded-lg transition font-medium text-sm flex items-center gap-2 ${
              searchType === "Business"
                ? "bg-[#FF7A45] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Businesses
          </button>
        </div>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Results ({results.length})
            </h3>
            {results.length > 0 && (
              <button className="text-sm text-[#FF7A45] hover:underline">Export Results</button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No results found</h4>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="border border-gray-200 rounded-2xl p-6 hover:border-[#FF7A45] hover:shadow-md transition"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {result.type === "HCW" ? (
                      <img
                        src={result.photo}
                        alt={result.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{result.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{result.identifier}</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${
                          result.status === "Active" || result.status === "Verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {result.status}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{result.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{result.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{result.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleViewProfile(result)}
                    className="w-full py-2 bg-[#FF7A45] text-white rounded-xl hover:bg-[#FF6A35] transition font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!hasSearched && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Enter a name, ID, email, or business number to find healthcare workers and businesses on
            the platform
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Healthcare Workers</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <span>Businesses</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
