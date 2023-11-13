import React from "react";
import { XSquare } from "lucide-react"

interface CampDescriptionProps {
  id: string;
  location: string;
  description: string;
  address: string;
  deleteItemClicked: (id: string) => void;
}

const CampDescription: React.FC<CampDescriptionProps> = ({
  id,
  location,
  description,
  address,
  deleteItemClicked,
}) => {
  return (
    <div className="flex flex-row justify-between border border-gray-300 pl-4 p-2 rounded-md my-3">
      <div>
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
      <div>
        <div onClick={() => deleteItemClicked(id)} className="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-md">
          <XSquare className="h-6 w-6" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};
export default CampDescription;
