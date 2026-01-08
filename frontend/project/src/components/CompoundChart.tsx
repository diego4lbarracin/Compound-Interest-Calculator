import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface YearData {
  year: number;
  current_principal: number;
  interest_earned: number;
  total_amount: number;
}

interface CompoundChartProps {
  data: YearData[] | null;
  isDark: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: YearData;
    value: number;
    dataKey: string;
  }>;
  isDark: boolean;
}

function CustomTooltip({ active, payload, isDark }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div
      className={`p-4 rounded-lg shadow-xl border ${
        isDark
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <p className="font-bold mb-2">Year {data.year}</p>
      <p className="text-sm">
        <span className="text-blue-500 font-semibold">Current Principal: </span>
        $
        {data.current_principal.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}
      </p>
      <p className="text-sm">
        <span className="text-green-500 font-semibold">Total Amount: </span>$
        {data.total_amount.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}
      </p>
      <p className="text-sm">
        <span className="text-orange-500 font-semibold">Interest Earned: </span>
        $
        {data.interest_earned.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

export default function CompoundChart({ data, isDark }: CompoundChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center rounded-xl ${
          isDark ? "bg-gray-800/50" : "bg-gray-100"
        } backdrop-blur-sm`}
      >
        <p
          className={`text-center ${
            isDark ? "text-gray-400" : "text-gray-500"
          } blur-sm text-lg`}
        >
          Enter your investment details
          <br />
          and click Calculate
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div
        className={`p-6 rounded-xl ${
          isDark ? "bg-gray-800" : "bg-white"
        } shadow-xl h-full flex flex-col`}
      >
        <h3
          className={`text-xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Investment Growth Over Time
        </h3>

        <div className="space-y-6 flex-1 flex flex-col">
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-blue-50"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Final Amount
              </span>
              <span
                className={`text-2xl font-bold ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                $
                {data[data.length - 1].total_amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Total Interest Earned
              </span>
              <span
                className={`text-xl font-semibold ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                $
                {data[data.length - 1].interest_earned.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="year"
                  stroke={isDark ? "#9ca3af" : "#6b7280"}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke={isDark ? "#9ca3af" : "#6b7280"}
                  style={{ fontSize: "12px" }}
                  label={{
                    value: "Amount ($)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip content={<CustomTooltip isDark={isDark} />} />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  textColor={isDark ? "#d1d5db" : "#374151"}
                />
                <Line
                  type="monotone"
                  dataKey="current_principal"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 5 }}
                  activeDot={{ r: 8 }}
                  name="Current Principal"
                  isAnimationActive={true}
                />
                <Line
                  type="monotone"
                  dataKey="total_amount"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                  activeDot={{ r: 8 }}
                  name="Total Amount"
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Current Principal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Total Amount
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
