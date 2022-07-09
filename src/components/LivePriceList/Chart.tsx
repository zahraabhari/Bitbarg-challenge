import { AreaChart, Area, ResponsiveContainer } from "recharts";
interface ChartProps {
  data: Array<{ value: number | string }>;
  color: string;
}
export default function Chart({ data, color }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={200}
        height={60}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id={`linear_${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color={color} stop-opacity="0.125"></stop>
            <stop offset="0.55" stop-color={color} stop-opacity="0.125"></stop>
            <stop offset="1" stop-color={color} stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fill={`url(#linear_${color})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
