import React from "react";

interface AlertProps {
  datetime: string;
  location: string;
  description: string;
  type: string;
}

const Alert: React.FC<AlertProps> = ({
  datetime,
  location,
  description,
  type,
}) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Date & Time:</span>
        <span className="ml-1 text-gray-600">{datetime}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Location:</span>
        <span className="ml-1 text-gray-600">{location}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Description:</span>
        <span className="ml-1 text-gray-600">{description}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Type:</span>
        <span className="ml-1 text-gray-600">{type}</span>
      </div>
    </div>
  );
};
export default Alert;
