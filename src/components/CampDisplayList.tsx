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
  const [dataVersion, setDataVersion] = useState<number>(0);

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

        setCampDescriptions(data);
      } catch (error) {
        console.error("Error fetching camp descriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescriptions();
  }, [refreshData, dataVersion]);

  const deleteDescription = async (descriptionId: string) => {
    try {
      const url = `https://jah5bhajkh.execute-api.us-east-1.amazonaws.com/DEV/descriptions`;
      // Construct the request payload
      const requestBody = {
        id: descriptionId,
      };
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "x-api-key": "efmr7ASvRi1VX7tFhp4tPaJn6sK9jLqe4CpgEDmm",
        },
        body: JSON.stringify(requestBody),
      });
      const text = await response.text();
      const responseData = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to delete description.");
      }

      console.log("Description deleted successfully:", responseData.message);
      setDataVersion(prevVersion => prevVersion + 1);
    } catch (error) {
      console.error("Error deleting description:", error);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Camp Description List</h1>
      {isLoading ? (
        <Loader label="Loading " />
      ) : (
        campDescriptions.map((descriptions) => (
          <CampDescription
            key={descriptions.id}
            id={descriptions.id}
            location={descriptions.location}
            description={descriptions.description}
            address={descriptions.address}
            deleteItemClicked={deleteDescription}
          />
        ))
      )}
    </div>
  );
};

export default CampDisplayList;
