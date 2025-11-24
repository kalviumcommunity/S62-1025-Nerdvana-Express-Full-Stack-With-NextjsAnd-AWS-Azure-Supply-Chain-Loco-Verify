"use client";

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

        {user ? (
          <div className="bg-white p-4 rounded shadow">
            <p>Welcome Admin, {user.name}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}
