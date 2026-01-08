import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CalculatorForm from './components/CalculatorForm';
import CompoundChart from './components/CompoundChart';
import ETFSection from './components/ETFSection';

interface YearData {
  year: number;
  current_principal: number;
  interest_earned: number;
  total_amount: number;
}

interface FormData {
  initialInvestment: string;
  monthlyContribution: string;
  lengthYears: string;
  interestRate: string;
  compoundFrequency: string;
}

function App() {
  const [isDark, setIsDark] = useState(false);
  const [calculationData, setCalculationData] = useState<YearData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interestRate, setInterestRate] = useState<number>(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleCalculate = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/calculate-compound-interest`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          initialInvestment: parseFloat(formData.initialInvestment),
          monthlyContribution: parseFloat(formData.monthlyContribution),
          lengthYears: parseInt(formData.lengthYears),
          interestRate: parseFloat(formData.interestRate),
          compoundFrequency: formData.compoundFrequency,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate');
      }

      const data: YearData[] = await response.json();
      setCalculationData(data);
      setInterestRate(parseFloat(formData.interestRate));
    } catch (error) {
      console.error('Error calculating compound interest:', error);
      alert('Failed to calculate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className={`p-6 md:p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Investment Parameters
            </h2>
            <CalculatorForm
              onCalculate={handleCalculate}
              isLoading={isLoading}
              isDark={isDark}
            />
          </div>

          <div className="h-[600px]">
            <CompoundChart data={calculationData} isDark={isDark} />
          </div>
        </div>

        {calculationData && (
          <ETFSection interestRate={interestRate} isDark={isDark} />
        )}
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
