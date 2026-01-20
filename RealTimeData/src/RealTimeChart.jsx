import { useEffect, useState, useRef, memo } from "react";
import { useQuery } from "@apollo/client/react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GET_METRICS } from "./queries";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const initialChartData = {
  labels: [],
  datasets: [
    {
      label: "Live Metrics",
      data: [],
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.2)",
      tension: 0.3,
      pointRadius: 2,
    },
  ],
};

const chartOptions = {
  responsive: true,
  animation: false, 
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      grid: { color: "#e5e7eb" },
    },
  },
};

function RealtimeChart() {
  const { data, error } = useQuery(GET_METRICS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: false,
    pollInterval: 3001, 
  });

  const [chartData, setChartData] = useState(initialChartData);

 useEffect(() => {
   if (!data || !data.allMetrics) return;

   const labels = data.allMetrics.map((m) => m.timestamp);
   const values = data.allMetrics.map((m) => Number(m.value));

   setChartData({
     labels,
     datasets: [
       {
         label: "Live Metrics",
         data: values,
         borderColor: "#2563eb",
         backgroundColor: "rgba(37,99,235,0.2)",
         tension: 0.3,
         pointRadius: 2,
       },
     ],
   });
 }, [data]);

  console.log("Apollo data:", data);


  if (error) return <p>Error loading data</p>;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line
        key={chartData.labels.length}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}

export default memo(RealtimeChart);
