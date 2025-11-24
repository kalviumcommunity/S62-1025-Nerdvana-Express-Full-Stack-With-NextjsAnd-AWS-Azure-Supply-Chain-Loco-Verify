"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/vendor/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border">
      {/* Welcome Header */}
      <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
      <p className="text-gray-500 mt-1">Vendor Dashboard</p>

      {/* Profile Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 border rounded-xl bg-gray-50">
          <h2 className="text-lg font-semibold">Your Profile</h2>
          <p className="mt-3 text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {user.phone || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Shop Name:</strong> {user.shopName}
          </p>
        </div>

        {/* License Status Box */}
        <div className="p-5 border rounded-xl bg-gray-50">
          <h2 className="text-lg font-semibold">License Status</h2>
          <p className="mt-3 text-gray-700">
            Currently:{" "}
            <span className="font-bold text-blue-600">
              {user.licenseStatus || "No application yet"}
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col md:flex-row gap-4">
        <button
          onClick={() => router.push("/vendor/apply")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Apply for License
        </button>

        <button
          onClick={() => router.push("/vendor/upload")}
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-900 transition"
        >
          Upload Documents
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/vendor/login");
          }}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
