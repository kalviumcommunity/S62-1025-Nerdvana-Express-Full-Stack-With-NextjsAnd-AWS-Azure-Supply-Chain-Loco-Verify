"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  XCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import Layout from "@/components/Layout";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [needsAttention, setNeedsAttention] = useState(false);

  // Fetch admin license data
  const fetchData = async () => {
    setLoading(true);
    const url = `/api/admin/licenses?page=${page}&limit=10&status=${status}&type=${type}&needsAttention=${needsAttention}`;

    const res = await fetch(url, { method: "GET" });
    const json = await res.json();

    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, status, type, needsAttention]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-950 text-white pt-28 px-6 max-w-7xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {/* STATS */}
        {data?.statistics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={<Clock className="h-8 w-8 text-blue-400" />}
              label="Pending"
              value={data.statistics.pendingCount}
              color="blue"
            />
            <StatCard
              icon={<ShieldCheck className="h-8 w-8 text-green-400" />}
              label="Approved"
              value={data.statistics.byStatus.find((s: any) => s.status === "APPROVED")?._count?.status || 0}
              color="green"
            />
            <StatCard
              icon={<XCircle className="h-8 w-8 text-red-400" />}
              label="Rejected"
              value={data.statistics.byStatus.find((s: any) => s.status === "REJECTED")?._count?.status || 0}
              color="red"
            />
            <StatCard
              icon={<AlertTriangle className="h-8 w-8 text-yellow-400" />}
              label="Expiring Soon"
              value={data.statistics.expiringSoonCount}
              color="yellow"
            />
          </div>
        )}

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg text-gray-300"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="EXPIRED">Expired</option>
          </select>

          {/* Type filter */}
          <input
            placeholder="Filter by type..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg text-gray-300"
          />

          {/* Needs attention switch */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={needsAttention}
              onChange={(e) => setNeedsAttention(e.target.checked)}
            />
            <span className="text-gray-400">Needs Attention</span>
          </label>

          <button
            onClick={() => {
              setPage(1);
              fetchData();
            }}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Apply Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-800 text-gray-400 text-sm">
              <tr>
                <th className="p-4 text-left">Vendor</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Expires</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-300">
              {loading ? (
                <tr><td className="p-4">Loading...</td></tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={6}>
                    No licenses found.
                  </td>
                </tr>
              ) : (
                data.data.map((l: any) => (
                  <tr key={l.id} className="border-b border-gray-800">
                    <td className="p-4">{l.vendor?.name || "N/A"}</td>
                    <td className="p-4">{l.licenseType}</td>
                    <td className="p-4">
                      <StatusBadge status={l.status} />
                    </td>

                    <td className="p-4">
                      {l.expiresAt ? new Date(l.expiresAt).toLocaleDateString() : "—"}
                    </td>

                    <td className="p-4">{l.vendor?.email}</td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => bulkAction([l.id], "APPROVE")}
                        className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => bulkAction([l.id], "REJECT")}
                        className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {data?.pagination && (
          <div className="flex justify-between items-center mt-6 text-gray-400">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="flex items-center gap-1 hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>

            <span>
              Page {data.pagination.page} of {data.pagination.pages}
            </span>

            <button
              disabled={page >= data.pagination.pages}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-1 hover:text-white disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Small Stat Card Component
function StatCard({ icon, label, value, color }: any) {
  const bgColors: any = {
    blue: "from-blue-600/20 to-blue-800/10 border-blue-500/20",
    green: "from-green-600/20 to-green-800/10 border-green-500/20",
    red: "from-red-600/20 to-red-800/10 border-red-500/20",
    yellow: "from-yellow-600/20 to-yellow-800/10 border-yellow-500/20",
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${bgColors[color]} border`}
    >
      {icon}
      <h3 className="text-3xl font-bold mt-3">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

// action handler
async function bulkAction(ids: string[], action: string) {
  await fetch("/api/admin/licenses", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      licenseIds: ids,
      action,
      reason: `Admin ${action.toLowerCase()}ed`,
    }),
  });

  window.location.reload();
}
