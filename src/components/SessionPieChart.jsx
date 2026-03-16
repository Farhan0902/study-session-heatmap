import { PieChart } from "@mui/x-charts/PieChart";

export default function SessionPieChart({ data = [], granularity }) {
  // data: [{ name, value }]
  if (!data.length) return <div className="text-slate-400">No data</div>;
  return (
    <PieChart
      height={240}
      width={240}
      series={[
        {
          data: data.map((d) => ({ id: d.name, value: d.count || d.value, label: d.name })),
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
    />
  );
}
