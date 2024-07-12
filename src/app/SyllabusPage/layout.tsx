import React from "react";
import "@/app/globals.css";

interface LayoutProps {
    children: React.ReactNode;
}

export default function SyllabusLayout({ children }: LayoutProps) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
