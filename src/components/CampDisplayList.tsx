import React, { useState, useEffect } from "react";
import CampDescription from "./CampDescription";
import Loader from "./Loader";

interface CampDisplayListProps {
  refreshData: boolean;
}

export interface CampData {
  location: string;
  description: string;
  address: string;
  id: string;
}

const CampDisplayList: React.FC<CampDisplayListProps> = ({ refreshData }) => {
  const [campDescriptions, setCampDescriptions] = useState<CampData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        setIsLoading(true);
        const url = `https://jah5bhajkh.execute-api.us-east-1.amazonaws.com/DEV/descriptions`;
        const response = await fetch(url, {
          headers: {
            "x-api-key": "efmr7ASvRi1VX7tFhp4tPaJn6sK9jLqe4CpgEDmm",
          },
        });
        let data: CampData[] = await response.json();
        console.log("Camp Description DATA fetched: ", data);

        // Filter any bad data
        data = data.filter(
          (item) => item.address !== "" && item.address !== undefined
        );

        setCampDescriptions(data);
      } catch (error) {
        console.error("Error fetching camp descriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescriptions();
  }, [refreshData]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Camp Description List</h1>
      {isLoading ? (
        <Loader label="Loading " />
      ) : (
        campDescriptions.map((descriptions) => (
          <CampDescription
            key={descriptions.id}
            location={descriptions.location}
            description={descriptions.description}
            address={descriptions.address}
          />
        ))
      )}
    </div>
  );
};

export default CampDisplayList;
