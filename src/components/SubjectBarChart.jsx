import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function SubjectBarChart({ data = [] }) {
  // data: [{ name, value }]
  if (!data.length) return <div className="text-slate-400">No data</div>;
  return (
    <BarChart
      height={300}
      width={600}
      layout="vertical"
      series={[
        {
          data: data.map((d) => d.value),
          label: "Minutes",
        },
      ]}
      xAxis={[{
        scaleType: "band",
        data: data.map((d) => d.name),
        width: 140,
      }]}
      yAxis={[{
        min: 0,
        max: Math.max(...data.map((d) => d.value), 100),
        valueFormatter: (value) => `${value} min`,
      }]}
    />
  );
}
