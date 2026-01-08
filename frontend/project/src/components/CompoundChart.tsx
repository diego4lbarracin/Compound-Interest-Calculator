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

  const maxValue = Math.max(...data.map((d) => d.total_amount));

  // Calculate path data for SVG lines
  const createPath = (
    dataPoints: number[],
    maxVal: number,
    height: number,
    width: number
  ) => {
    const points = dataPoints.map((value, index) => {
      const x = (index / (dataPoints.length - 1)) * width;
      const y = height - (value / maxVal) * height;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  const chartHeight = 320;
  const chartWidth = 600;

  const principalData = data.map((d) => d.current_principal);
  const totalAmountData = data.map((d) => d.total_amount);

  const principalPath = createPath(
    principalData,
    maxValue,
    chartHeight,
    chartWidth
  );
  const totalAmountPath = createPath(
    totalAmountData,
    maxValue,
    chartHeight,
    chartWidth
  );

  return (
    <div className="w-full h-full">
      <div
        className={`p-6 rounded-xl ${
          isDark ? "bg-gray-800" : "bg-white"
        } shadow-xl h-full`}
      >
        <h3
          className={`text-xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Investment Growth Over Time
        </h3>

        <div className="space-y-6">
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
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Total Principal
              </span>
              <span
                className={`text-xl font-semibold ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              >
                $
                {data[data.length - 1].current_principal.toLocaleString(
                  "en-US",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}
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

          {/* SVG Line Chart */}
          <div className="relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={(chartHeight / 4) * i}
                  x2={chartWidth}
                  y2={(chartHeight / 4) * i}
                  stroke={isDark ? "#374151" : "#E5E7EB"}
                  strokeWidth="1"
                />
              ))}

              {/* Principal line */}
              <path
                d={principalPath}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Total amount line */}
              <path
                d={totalAmountPath}
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points for principal */}
              {data.map((yearData, index) => {
                const x = (index / (data.length - 1)) * chartWidth;
                const y =
                  chartHeight -
                  (yearData.current_principal / maxValue) * chartHeight;
                return (
                  <circle
                    key={`principal-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#8B5CF6"
                    className="hover:r-6 transition-all cursor-pointer"
                  >
                    <title>
                      Year {yearData.year}: $
                      {yearData.current_principal.toLocaleString()}
                    </title>
                  </circle>
                );
              })}

              {/* Data points for total amount */}
              {data.map((yearData, index) => {
                const x = (index / (data.length - 1)) * chartWidth;
                const y =
                  chartHeight -
                  (yearData.total_amount / maxValue) * chartHeight;
                return (
                  <circle
                    key={`total-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#10B981"
                    className="hover:r-6 transition-all cursor-pointer"
                  >
                    <title>
                      Year {yearData.year}: $
                      {yearData.total_amount.toLocaleString()}
                    </title>
                  </circle>
                );
              })}
            </svg>

            {/* Y-axis labels */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between -ml-20 py-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  $
                  {((maxValue * (4 - i)) / 4).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2 px-1">
              {data
                .filter(
                  (_, i) =>
                    i % Math.ceil(data.length / 10) === 0 ||
                    i === data.length - 1
                )
                .map((yearData) => (
                  <span
                    key={yearData.year}
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Yr {yearData.year}
                  </span>
                ))}
            </div>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Principal Contributions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Total Amount (Principal + Interest)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
