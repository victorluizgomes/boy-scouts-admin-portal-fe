import React from "react";
import { Loader2 } from "lucide-react"

interface LoaderProps {
  label: string;
}

const Loader: React.FC<LoaderProps> = ({
  label
}) => {
  return (
    <div className="flex w-full items-center">
        <Loader2 className="mr-3 h-6 w-6 animate-spin" strokeWidth={2} />
        <span className="text-xl">{label}</span>
    </div>
  );
};
export default Loader;
