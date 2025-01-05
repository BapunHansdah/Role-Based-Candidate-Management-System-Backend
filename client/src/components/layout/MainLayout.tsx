import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">{children}</div>;
}

export default MainLayout;
