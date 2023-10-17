import React, { useState, useEffect } from "react";
import Alert from "./Alert";

interface AlertDisplayListProps {
  // Add any props you might need here
}

interface AlertData {
  datetime: string;
  location: string;
  description: string;
  type: string;
  id: string;
}

const AlertDisplayList: React.FC<AlertDisplayListProps> = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const url = `https://jah5bhajkh.execute-api.us-east-1.amazonaws.com/DEV/alerts`;
        const response = await fetch(url, {
          headers: {
            "x-api-key": "efmr7ASvRi1VX7tFhp4tPaJn6sK9jLqe4CpgEDmm",
          },
        });
        const data: AlertData[] = await response.json();
        console.log('DATA fetched: ', data);
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Alert Display</h1>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          datetime={alert.datetime}
          location={alert.location}
          description={alert.description}
          type={alert.type}
        />
      ))}
    </div>
  );
};

export default AlertDisplayList;
