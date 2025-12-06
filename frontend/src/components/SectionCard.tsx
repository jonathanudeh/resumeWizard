// src/components/SectionCard.tsx

import React from "react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  // Keep className for flexibility, though not strictly needed for this style
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-100 ${className}`}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};
