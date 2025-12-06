import React from "react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};
