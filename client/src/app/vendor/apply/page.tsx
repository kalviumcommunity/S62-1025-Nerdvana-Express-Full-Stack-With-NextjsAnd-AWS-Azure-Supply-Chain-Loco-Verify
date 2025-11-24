"use client";

import { useState } from "react";

export default function ApplyPage() {
  const [licenseType, setLicenseType] = useState("");
  const [idProof, setIdProof] = useState<File | null>(null);
  const [shopPhoto, setShopPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    if (!user?.id || !token) {
      setMessage("You must be logged in.");
      setLoading(false);
      return;
    }

    try {
      // Create form-data payload
      const formData = new FormData();
      formData.append("vendorId", user.id);
      formData.append("licenseType", licenseType);
      if (idProof) formData.append("idProof", idProof);
      if (shopPhoto) formData.append("shopPhoto", shopPhoto);

      const res = await fetch("/api/licenses/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong.");
      } else {
        setMessage("Application submitted successfully!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting application.");
    }

    setLoading(false);
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Apply for New License</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* License Type */}
        <div>
          <label className="block mb-1 font-medium">License Type</label>
          <select
            className="border p-2 rounded w-full"
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Tea Stall">Tea Stall</option>
            <option value="Book Shop">Book Shop</option>
            <option value="Food Counter">Food Counter</option>
          </select>
        </div>

        {/* ID Proof */}
        <div>
          <label className="block mb-1 font-medium">Upload ID Proof</label>
          <input
            type="file"
            onChange={(e) => setIdProof(e.target.files?.[0] || null)}
            required
          />
        </div>

        {/* Shop Photo */}
        <div>
          <label className="block mb-1 font-medium">Upload Shop Photo</label>
          <input
            type="file"
            onChange={(e) => setShopPhoto(e.target.files?.[0] || null)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {message && <p className="mt-4 font-medium">{message}</p>}
    </div>
  );
}
