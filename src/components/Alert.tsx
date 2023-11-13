import React from "react";
import { XSquare } from "lucide-react"

interface AlertProps {
  id: string;
  datetime: string;
  location: string;
  description: string;
  type: string;
  isInPast: boolean;
  deleteItemClicked: (id: string) => void;
}

const Alert: React.FC<AlertProps> = ({
  id,
  datetime,
  location,
  description,
  type,
  isInPast,
  deleteItemClicked,
}) => {
  const dateTitleClass = isInPast ? 'text-red-700' : 'text-gray-700';
  const dateClass = isInPast ? 'text-red-600' : 'text-gray-600';
  return (
    <div className="flex flex-row justify-between border border-gray-300 pl-4 p-2 rounded-md my-3">
      <div>
        <div className="mb-1">
          <span className="font-semibold text-gray-700">Type:</span>
          <span className="ml-1 text-gray-600">{type}</span>
        </div>
        <div className="mb-1">
          <span className="font-semibold text-gray-700">Location:</span>
          <span className="ml-1 text-gray-600">{location}</span>
        </div>
        <div className="mb-1">
          <span className="font-semibold text-gray-700">Description:</span>
          <span className="ml-1 text-gray-600">{description}</span>
        </div>
        <div>
          <span className={`font-semibold ${dateTitleClass}`}>Date & Time:</span>
          <span className={`ml-1 ${dateClass}`}>{datetime} {isInPast ? '(expired)' : ''}</span>
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
export default Alert;
