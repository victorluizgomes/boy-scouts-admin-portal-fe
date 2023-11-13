import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import Loader from "./Loader";

interface AlertDisplayListProps {
  refreshData: boolean;
}

export interface AlertData {
  datetime: string;
  location: string;
  description: string;
  type: string;
  isInPast: boolean;
  id: string;
}

const AlertDisplayList: React.FC<AlertDisplayListProps> = ({ refreshData }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataVersion, setDataVersion] = useState<number>(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const url = `https://jah5bhajkh.execute-api.us-east-1.amazonaws.com/DEV/alerts`;
        const response = await fetch(url, {
          headers: {
            "x-api-key": "efmr7ASvRi1VX7tFhp4tPaJn6sK9jLqe4CpgEDmm",
          },
        });
        let data: AlertData[] = await response.json();
        console.log("Alert DATA fetched: ", data);

        // Get the current date and time
        const currentDate = new Date();

        // Add an isInPast property to each alert
        data = data.map((item) => {
          if (item.datetime) {
            const itemDate = new Date(item.datetime.replace(" EST", ""));
            return { ...item, isInPast: itemDate < currentDate };
          } else {
            return { ...item, isInPast: true };
          }
        });

        // Sort the filtered data
        data.sort((a, b) => {
          if (a.datetime && b.datetime) {
            const dateA = new Date(a.datetime.replace(" EST", ""));
            const dateB = new Date(b.datetime.replace(" EST", ""));
            return dateB.getTime() - dateA.getTime();
          } else {
            return 1;
          }
        });

        console.log("Filtered and sorted data:", data);
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [refreshData, dataVersion]);

  const deleteAlert = async (alertId: string) => {
    try {
      const url = `https://jah5bhajkh.execute-api.us-east-1.amazonaws.com/DEV/alerts`;
      // Construct the request payload
      const requestBody = {
        id: alertId,
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
        throw new Error(responseData.message || "Failed to delete alert.");
      }

      console.log("Alert deleted successfully:", responseData.message);
      setDataVersion(prevVersion => prevVersion + 1);
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Alerts List</h1>
      {isLoading ? (
        <Loader label="Loading " />
      ) : (
        alerts.map((alert) => (
          <Alert
            key={alert.id}
            id={alert.id}
            datetime={alert.datetime}
            location={alert.location}
            description={alert.description}
            type={alert.type}
            isInPast={alert.isInPast}
            deleteItemClicked={deleteAlert}
          />
        ))
      )}
    </div>
  );
};

export default AlertDisplayList;
