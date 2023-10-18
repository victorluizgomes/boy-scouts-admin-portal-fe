import React, { useState, useEffect } from "react";
import Alert from "./Alert";

interface AlertDisplayListProps {
  refreshData: boolean;
}

export interface AlertData {
  datetime: string;
  location: string;
  description: string;
  type: string;
  id: string;
}

const AlertDisplayList: React.FC<AlertDisplayListProps> = ({ refreshData }) => {
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
        let data: AlertData[] = await response.json();
        console.log('DATA fetched: ', data);

        // Filter any bad data
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2} (AM|PM) EST$/;
        data = data.filter(item => dateRegex.test(item.datetime));

        // Sort the filtered data
        data.sort((a, b) => {
            const dateA = new Date(a.datetime.replace(' EST', ''));
            const dateB = new Date(b.datetime.replace(' EST', ''));
            return dateA.getTime() - dateB.getTime();
        });

        console.log('Filtered and sorted data:', data);
        setAlerts(data);

    } catch (error) {
        console.error("Error fetching alerts:", error);
    }
    };

    fetchAlerts();
  }, [refreshData]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Alerts List</h1>
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
