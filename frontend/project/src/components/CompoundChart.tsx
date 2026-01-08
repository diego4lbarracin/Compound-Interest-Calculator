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
      <div className={`w-full h-full flex items-center justify-center rounded-xl ${
        isDark ? 'bg-gray-800/50' : 'bg-gray-100'
      } backdrop-blur-sm`}>
        <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'} blur-sm text-lg`}>
          Enter your investment details<br />and click Calculate
        </p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.total_amount));
  const maxPrincipal = Math.max(...data.map(d => d.current_principal));

  return (
    <div className="w-full h-full">
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl h-full`}>
        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Investment Growth Over Time
        </h3>

        <div className="space-y-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Final Amount</span>
              <span className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                ${data[data.length - 1].total_amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Interest Earned</span>
              <span className={`text-xl font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                ${data[data.length - 1].interest_earned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="relative h-96">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`flex items-center border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} w-20 text-right pr-2`}>
                    ${((maxValue * (4 - i)) / 4).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 pl-24 pr-4 pt-2 pb-2 flex items-end gap-1">
              {data.slice(1).map((yearData, index) => {
                const totalHeight = (yearData.total_amount / maxValue) * 100;
                const principalHeight = (yearData.current_principal / maxValue) * 100;

                return (
                  <div key={index} className="flex-1 flex flex-col justify-end group relative">
                    <div className="relative h-full flex flex-col justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-md transition-all duration-300 hover:opacity-80"
                        style={{ height: `${totalHeight - principalHeight}%` }}
                      />
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-b-md transition-all duration-300 hover:opacity-80"
                        style={{ height: `${principalHeight}%` }}
                      />
                    </div>

                    <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 invisible group-hover:visible ${
                      isDark ? 'bg-gray-900' : 'bg-gray-800'
                    } text-white text-xs rounded-lg p-2 whitespace-nowrap shadow-xl z-10`}>
                      <div>Year {yearData.year}</div>
                      <div>Total: ${yearData.total_amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                      <div>Interest: ${yearData.interest_earned.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                    </div>

                    <span className={`text-xs text-center mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {yearData.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded"></div>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Principal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-400 rounded"></div>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Interest Earned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
