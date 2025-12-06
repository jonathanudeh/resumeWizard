import React from "react";

export const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-[#1D4ED8] rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1D4ED8] rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="mt-4 text-[#4B5563] font-medium">{message}</p>
    </div>
  );
};
