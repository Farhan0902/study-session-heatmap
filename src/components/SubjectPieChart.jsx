import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatSubject, formatDuration } from "../utils/format";

const COLORS = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e42", // orange
  "#ef4444", // red
  "#e879f9", // fuchsia
  "#fbbf24", // yellow
  "#38bdf8", // sky
  "#a3e635", // lime
  "#f472b6", // pink
  "#6ee7b7", // teal
];

export default function SubjectPieChart({ data = [] }) {
  if (!data.length) return <div className="font-bold text-slate-400">No data</div>;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={({ name }) => formatSubject(name)}
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [formatDuration(value), formatSubject(name)]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
