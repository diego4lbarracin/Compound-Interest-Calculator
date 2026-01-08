import { useState, FormEvent } from 'react';
import { Info } from 'lucide-react';

interface FormData {
  initialInvestment: string;
  monthlyContribution: string;
  lengthYears: string;
  interestRate: string;
  compoundFrequency: string;
}

interface CalculatorFormProps {
  onCalculate: (data: FormData) => void;
  isLoading: boolean;
  isDark: boolean;
}

export default function CalculatorForm({ onCalculate, isLoading, isDark }: CalculatorFormProps) {
  const [formData, setFormData] = useState<FormData>({
    initialInvestment: '',
    monthlyContribution: '0',
    lengthYears: '',
    interestRate: '',
    compoundFrequency: 'Monthly',
  });

  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/[^\d.-]/g, '');
    if (!numbers) return '';
    const num = parseFloat(numbers);
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  const handleCurrencyChange = (field: 'initialInvestment' | 'monthlyContribution', value: string) => {
    const numbers = value.replace(/[^\d.-]/g, '');
    setFormData({ ...formData, [field]: numbers });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onCalculate(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      initialInvestment: '',
      monthlyContribution: '0',
      lengthYears: '',
      interestRate: '',
      compoundFrequency: 'Monthly',
    });
  };

  const isFormValid = () => {
    return (
      formData.initialInvestment !== '' &&
      parseFloat(formData.initialInvestment) > 0 &&
      formData.lengthYears !== '' &&
      parseInt(formData.lengthYears) > 0 &&
      formData.interestRate !== '' &&
      parseFloat(formData.interestRate) > 0
    );
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border ${
    isDark
      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`;

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass}>
          Initial Investment <span className="text-red-500">*</span>
          <div className="relative group inline-block ml-1">
            <Info className="w-4 h-4 inline cursor-help" />
            <div className={`absolute left-0 top-6 w-64 p-3 rounded-lg shadow-lg text-xs z-10 invisible group-hover:visible ${
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'
            }`}>
              Amount of money that you have available to invest initially.
            </div>
          </div>
        </label>
        <div className="relative">
          <span className={`absolute left-3 top-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>$</span>
          <input
            type="text"
            value={formatCurrency(formData.initialInvestment)}
            onChange={(e) => handleCurrencyChange('initialInvestment', e.target.value)}
            className={`${inputClass} pl-8`}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Monthly Contribution
          <div className="relative group inline-block ml-1">
            <Info className="w-4 h-4 inline cursor-help" />
            <div className={`absolute left-0 top-6 w-64 p-3 rounded-lg shadow-lg text-xs z-10 invisible group-hover:visible ${
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'
            }`}>
              Amount that you plan to add to the principal every month, or a negative number for the amount that you plan to withdraw every month.
            </div>
          </div>
        </label>
        <div className="relative">
          <span className={`absolute left-3 top-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>$</span>
          <input
            type="text"
            value={formatCurrency(formData.monthlyContribution)}
            onChange={(e) => handleCurrencyChange('monthlyContribution', e.target.value)}
            className={`${inputClass} pl-8`}
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Length of Time in Years <span className="text-red-500">*</span>
          <div className="relative group inline-block ml-1">
            <Info className="w-4 h-4 inline cursor-help" />
            <div className={`absolute left-0 top-6 w-64 p-3 rounded-lg shadow-lg text-xs z-10 invisible group-hover:visible ${
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'
            }`}>
              Length of time, in years, that you plan to save.
            </div>
          </div>
        </label>
        <input
          type="number"
          value={formData.lengthYears}
          onChange={(e) => setFormData({ ...formData, lengthYears: e.target.value })}
          className={inputClass}
          placeholder="10"
          min="1"
          required
        />
      </div>

      <div>
        <label className={labelClass}>
          Estimated Interest Rate <span className="text-red-500">*</span>
          <div className="relative group inline-block ml-1">
            <Info className="w-4 h-4 inline cursor-help" />
            <div className={`absolute left-0 top-6 w-64 p-3 rounded-lg shadow-lg text-xs z-10 invisible group-hover:visible ${
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'
            }`}>
              Your estimated annual interest rate.
            </div>
          </div>
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.interestRate}
            onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
            className={`${inputClass} pr-8`}
            placeholder="7.5"
            step="0.1"
            min="0"
            required
          />
          <span className={`absolute right-3 top-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>%</span>
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Compound Frequency <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.compoundFrequency}
          onChange={(e) => setFormData({ ...formData, compoundFrequency: e.target.value })}
          className={inputClass}
          required
        >
          <option value="Annually">Annually</option>
          <option value="Semiannually">Semiannually</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Monthly">Monthly</option>
          <option value="Daily">Daily</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            isFormValid() && !isLoading
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : isDark
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'CALCULATING...' : 'CALCULATE'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            isDark
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          } shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
        >
          RESET
        </button>
      </div>
    </form>
  );
}
