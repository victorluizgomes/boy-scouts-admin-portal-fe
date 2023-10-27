import React from "react";

interface CampDescriptionProps {
  location: string;
  description: string;
  address: string;
}

const CampDescription: React.FC<CampDescriptionProps> = ({
  location,
  description,
  address,
}) => {
  return (
    <div className="border border-gray-300 pl-4 p-2 rounded-md my-3">
      <div className="mb-1">
        <span className="font-semibold text-gray-700">Location:</span>
        <span className="ml-1 text-gray-600">{location}</span>
      </div>
      <div className="mb-1">
        <span className="font-semibold text-gray-700">Description:</span>
        <span className="ml-1 text-gray-600">{description}</span>
      </div>
      <div>
        <span className="font-semibold text-gray-700">Address:</span>
        <span className="ml-1 text-gray-600">{address}</span>
      </div>
    </div>
  );
};
export default CampDescription;
