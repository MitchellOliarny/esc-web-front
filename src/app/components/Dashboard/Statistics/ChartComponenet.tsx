// components/ChartComponent.tsx

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

interface ChartProps {
  data: number[];
  chartHeight: number[];
  labels: string[];
  height?: number;
}

const ChartComponent: React.FC<ChartProps> = ({
  data,
  chartHeight,
  labels,
  height,
}) => {
  Chart.register(ChartDataLabels);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current && data.length) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: "bar", // Set chart type to bar
          data: {
            labels: labels,
            datasets: [
              {
                label: "Match Data",
                data: data,
                borderRadius: 2,
                backgroundColor: [
                  "#5ECCBA",
                  "#5ECCBA",
                  "#5ECCBA",
                  "#E2E2E2",
                  "#FF6F4D",
                  "#FF6F4D",
                  "#FF6F4D",
                ],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                color: "white",
                anchor: "end",
                align: "top",
                font: {
                  weight: "bold",
                },
              },
            },
            scales: {
              x: {
                display: true,
                grid: {
                  display: false,
                },
              },
              y: {
                display: false,
                beginAtZero: true,
                max: chartHeight[0] * 1.2,
                min: chartHeight[chartHeight.length - 1],
                ticks: {
                  stepSize: 1,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
      }
    }

    return () => {
      // Clean up the chart instance
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [labels, data]);

  useEffect(() => {
    if (canvasRef.current && height) {
      canvasRef.current.style.height = `${height}px`;
    }
  }, [height]);

  return <canvas ref={canvasRef} style={{ height: "fit-content", width: '100%' }} />;
};

export default ChartComponent;
