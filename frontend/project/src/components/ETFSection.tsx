import { TrendingUp, AlertTriangle } from 'lucide-react';

interface ETFSectionProps {
  interestRate: number;
  isDark: boolean;
}

interface ETF {
  symbol: string;
  name: string;
  avgReturn: number;
  description: string;
}

export default function ETFSection({ interestRate, isDark }: ETFSectionProps) {
  const getRecommendedETFs = (targetRate: number): ETF[] => {
    const allETFs = [
      { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', avgReturn: 10.5, description: 'Tracks the S&P 500 index' },
      { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', avgReturn: 10.2, description: 'Total US stock market exposure' },
      { symbol: 'QQQ', name: 'Invesco QQQ Trust', avgReturn: 15.8, description: 'Nasdaq-100 technology-focused' },
      { symbol: 'VGT', name: 'Vanguard Information Technology ETF', avgReturn: 18.2, description: 'Technology sector focus' },
      { symbol: 'VUG', name: 'Vanguard Growth ETF', avgReturn: 12.5, description: 'Large-cap growth stocks' },
      { symbol: 'VIG', name: 'Vanguard Dividend Appreciation ETF', avgReturn: 9.8, description: 'Dividend growth stocks' },
      { symbol: 'SCHD', name: 'Schwab US Dividend Equity ETF', avgReturn: 11.2, description: 'High dividend yield focus' },
      { symbol: 'VYM', name: 'Vanguard High Dividend Yield ETF', avgReturn: 9.5, description: 'High dividend paying stocks' },
      { symbol: 'VXUS', name: 'Vanguard Total International Stock ETF', avgReturn: 6.8, description: 'International diversification' },
      { symbol: 'VEA', name: 'Vanguard Developed Markets ETF', avgReturn: 7.2, description: 'Developed international markets' },
      { symbol: 'AGG', name: 'iShares Core US Aggregate Bond ETF', avgReturn: 3.5, description: 'US investment-grade bonds' },
      { symbol: 'BND', name: 'Vanguard Total Bond Market ETF', avgReturn: 3.2, description: 'Total bond market exposure' },
    ];

    const tolerance = 3;
    const filtered = allETFs.filter(
      etf => Math.abs(etf.avgReturn - targetRate) <= tolerance
    );

    if (filtered.length >= 3) {
      return filtered.slice(0, 4);
    }

    return allETFs
      .sort((a, b) => Math.abs(a.avgReturn - targetRate) - Math.abs(b.avgReturn - targetRate))
      .slice(0, 4);
  };

  const recommendedETFs = getRecommendedETFs(interestRate);

  return (
    <div className={`mt-16 p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
      <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Do you want to replicate your calculations with your own money?
      </h2>

      <div className={`mb-8 p-6 rounded-xl ${isDark ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <div>
            <h3 className={`font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-800'}`}>
              Important Disclaimer
            </h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-yellow-200' : 'text-yellow-900'}`}>
              This is not financial advice. The information provided here is for educational purposes only.
              You should conduct your own due diligence and understand the risks of investing in the stock market
              before making any investment decisions. Past performance does not guarantee future results.
              Consider consulting with a qualified financial advisor for personalized investment advice.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <TrendingUp className="w-6 h-6" />
          What is an ETF?
        </h3>
        <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          An <span className="font-semibold">ETF (Exchange-Traded Fund)</span> is a type of investment fund that holds
          a collection of assets such as stocks, bonds, or commodities. ETFs trade on stock exchanges, similar to
          individual stocks, making them easy to buy and sell throughout the trading day.
        </p>
        <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          ETFs offer several advantages including diversification, lower costs compared to mutual funds, and tax efficiency.
          They allow investors to gain exposure to entire market segments or investment strategies through a single purchase.
        </p>
      </div>

      <div>
        <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          ETFs with Similar Returns (~{interestRate}% annually)
        </h3>
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Based on your desired estimated interest rate of {interestRate}%, here are some ETFs that have
          had similar rates of return over the last 5 years:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedETFs.map((etf) => (
            <div
              key={etf.symbol}
              className={`p-6 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-xl ${
                isDark
                  ? 'bg-gray-700 border-gray-600 hover:border-blue-500'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {etf.symbol}
                </h4>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                }`}>
                  {etf.avgReturn}% avg
                </span>
              </div>
              <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {etf.name}
              </h5>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {etf.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
