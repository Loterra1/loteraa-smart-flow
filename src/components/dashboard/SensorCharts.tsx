
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

// Sample data for the past 7 days
const sensorData = [
  { day: "Mon", temperature: 22, humidity: 65, motion: 8 },
  { day: "Tue", temperature: 25, humidity: 62, motion: 12 },
  { day: "Wed", temperature: 28, humidity: 58, motion: 5 },
  { day: "Thu", temperature: 30, humidity: 54, motion: 15 },
  { day: "Fri", temperature: 29, humidity: 57, motion: 7 },
  { day: "Sat", temperature: 26, humidity: 61, motion: 3 },
  { day: "Sun", temperature: 24, humidity: 63, motion: 10 },
];

export default function SensorCharts() {
  return (
    <div className="mb-8">
      <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-white">Sensor Data Trends (7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-[300px]">
              <ChartContainer 
                config={{
                  temperature: { 
                    label: "Temperature (°C)",
                    theme: { light: "#7142F6", dark: "#7142F6" } 
                  },
                  humidity: { 
                    label: "Humidity (%)",
                    theme: { light: "#3182F4", dark: "#3182F4" } 
                  }
                }}
              >
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C3248" />
                  <XAxis dataKey="day" stroke="#C8C8C9" />
                  <YAxis stroke="#C8C8C9" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    name="Temperature (°C)" 
                    stroke="var(--color-temperature)" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="humidity" 
                    name="Humidity (%)" 
                    stroke="var(--color-humidity)" 
                  />
                </LineChart>
              </ChartContainer>
            </div>
            <div className="h-[300px]">
              <ChartContainer 
                config={{
                  motion: { 
                    label: "Motion Events",
                    theme: { light: "#0CCCBC", dark: "#0CCCBC" } 
                  }
                }}
              >
                <BarChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C3248" />
                  <XAxis dataKey="day" stroke="#C8C8C9" />
                  <YAxis stroke="#C8C8C9" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="motion" 
                    name="Motion Events" 
                    fill="var(--color-motion)" 
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-loteraa-gray/90 backdrop-blur-md border border-loteraa-gray/50 p-3 rounded-md shadow-lg">
      <p className="font-medium text-white">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}
