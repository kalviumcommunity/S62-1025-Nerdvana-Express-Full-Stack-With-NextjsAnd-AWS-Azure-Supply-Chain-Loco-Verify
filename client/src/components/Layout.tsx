import React from "react";
import Header from "@/components/Header";

export default function Layout({
  children,
  fullWidth = false,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      {/* If fullWidth → no container */}
      <main className={fullWidth ? "" : "max-w-5xl mx-auto px-4 py-8"}>
        {children}
      </main>
    </div>
  );
}
