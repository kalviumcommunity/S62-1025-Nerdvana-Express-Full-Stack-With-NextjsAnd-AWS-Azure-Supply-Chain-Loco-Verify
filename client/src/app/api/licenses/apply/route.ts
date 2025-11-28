"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function VendorApplyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    licenseType: "",
    idProofFile: null as File | null,
    shopPhotoFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("licenseType", form.licenseType);
      if (form.idProofFile) formData.append("idProof", form.idProofFile);
      if (form.shopPhotoFile) formData.append("shopPhoto", form.shopPhotoFile);

      const res = await fetch("/api/licenses/apply", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("License application submitted!");
      router.push("/vendor/dashboard");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Apply for New License
        </h1>
        <p className="text-gray-500 mb-6">Submit your application below.</p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* License Type */}
          <div>
            <label className="text-gray-800 font-medium">License Type</label>
            <select
              name="licenseType"
              required
              onChange={handleChange}
              className="w-full mt-2 border p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Type</option>
              <option value="Tea Stall">Tea Stall</option>
              <option value="Book Shop">Book Shop</option>
              <option value="Food Counter">Food Counter</option>
            </select>
          </div>

          {/* ID Proof */}
          <div>
            <label className="text-gray-800 font-medium">Upload ID Proof</label>
            <input
              type="file"
              required
              name="idProofFile"
              onChange={handleChange}
              className="w-full mt-2 border p-3 rounded-xl bg-gray-50"
            />
          </div>

          {/* Shop Photo */}
          <div>
            <label className="text-gray-800 font-medium">
              Upload Shop Photo
            </label>
            <input
              type="file"
              required
              name="shopPhotoFile"
              onChange={handleChange}
              className="w-full mt-2 border p-3 rounded-xl bg-gray-50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
