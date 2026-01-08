import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CalculationRequest {
  initialInvestment: number;
  monthlyContribution: number;
  lengthYears: number;
  interestRate: number;
  compoundFrequency: string;
}

interface YearData {
  year: number;
  current_principal: number;
  interest_earned: number;
  total_amount: number;
}

function getCompoundFrequency(frequency: string): number {
  const frequencies: { [key: string]: number } = {
    'Annually': 1,
    'Semiannually': 2,
    'Quarterly': 4,
    'Monthly': 12,
    'Daily': 365
  };
  return frequencies[frequency] || 12;
}

function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  years: number,
  annualRate: number,
  compoundFrequency: number
): YearData[] {
  const results: YearData[] = [];
  const rate = annualRate / 100;
  const n = compoundFrequency;
  
  let currentPrincipal = principal;
  let totalAmount = principal;
  let totalInterest = 0;
  
  results.push({
    year: 0,
    current_principal: currentPrincipal,
    interest_earned: 0,
    total_amount: totalAmount
  });
  
  for (let year = 1; year <= years; year++) {
    const periodsInYear = n;
    let yearStartAmount = totalAmount;
    
    for (let period = 1; period <= periodsInYear; period++) {
      const interestForPeriod = yearStartAmount * (rate / n);
      yearStartAmount = yearStartAmount + interestForPeriod;
      
      if (period % (n / 12) === 0 || n === 1) {
        yearStartAmount += monthlyContribution;
        currentPrincipal += monthlyContribution;
      }
    }
    
    totalAmount = yearStartAmount;
    totalInterest = totalAmount - currentPrincipal;
    
    results.push({
      year: year,
      current_principal: currentPrincipal,
      interest_earned: totalInterest,
      total_amount: totalAmount
    });
  }
  
  return results;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { initialInvestment, monthlyContribution, lengthYears, interestRate, compoundFrequency }: CalculationRequest = await req.json();
    
    if (!initialInvestment || !lengthYears || !interestRate || !compoundFrequency) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const frequency = getCompoundFrequency(compoundFrequency);
    const results = calculateCompoundInterest(
      initialInvestment,
      monthlyContribution || 0,
      lengthYears,
      interestRate,
      frequency
    );
    
    return new Response(
      JSON.stringify(results),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request data' }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});