// Financial Calculation Utilities
// Phase 1, Step 1.2

/**
 * Calculate monthly payment for a loan using amortization formula
 * P = L[c(1 + c)^n]/[(1 + c)^n - 1]
 */
export const calculateMonthlyPayment = (
  principal: number,
  annualInterestRate: number,
  years: number
): number => {
  if (annualInterestRate === 0) return principal / (years * 12);
  
  const monthlyRate = annualInterestRate / 100 / 12;
  const numPayments = years * 12;
  
  const payment =
    principal *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  return Math.round(payment * 100) / 100;
};

/**
 * Calculate total interest paid on a loan
 */
export const calculateTotalInterest = (
  principal: number,
  monthlyPayment: number,
  years: number
): number => {
  const totalPaid = monthlyPayment * years * 12;
  return Math.round((totalPaid - principal) * 100) / 100;
};

/**
 * Calculate net worth
 */
export const calculateNetWorth = (
  savings: number,
  debt: number,
  assets: number = 0
): number => {
  return savings + assets - debt;
};

/**
 * Calculate monthly after-tax income
 * Simplified tax calculation (rough estimate)
 */
export const calculateMonthlyAfterTax = (annualIncome: number): number => {
  // Rough estimate: 25% effective tax rate
  const afterTax = annualIncome * 0.75;
  return Math.round((afterTax / 12) * 100) / 100;
};

/**
 * Calculate months needed to save a target amount
 */
export const calculateMonthsToSave = (
  targetAmount: number,
  monthlySavings: number,
  currentSavings: number = 0
): number => {
  if (monthlySavings <= 0) return Infinity;
  const needed = targetAmount - currentSavings;
  return Math.ceil(needed / monthlySavings);
};

/**
 * Calculate compound interest (future value)
 * FV = PV * (1 + r)^n
 */
export const calculateCompoundInterest = (
  principal: number,
  annualRate: number,
  years: number,
  monthlyContribution: number = 0
): number => {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  
  // Future value of principal
  const fvPrincipal = principal * Math.pow(1 + monthlyRate, months);
  
  // Future value of monthly contributions (annuity)
  const fvContributions =
    monthlyContribution *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
  return Math.round((fvPrincipal + fvContributions) * 100) / 100;
};

/**
 * Calculate emergency fund target (3-6 months of expenses)
 */
export const calculateEmergencyFundTarget = (
  monthlyExpenses: number,
  months: number = 6
): number => {
  return monthlyExpenses * months;
};

/**
 * Calculate debt-to-income ratio
 * DTI = (Total Monthly Debt Payments / Gross Monthly Income) * 100
 */
export const calculateDebtToIncomeRatio = (
  monthlyDebtPayments: number,
  monthlyIncome: number
): number => {
  if (monthlyIncome === 0) return 0;
  return Math.round((monthlyDebtPayments / monthlyIncome) * 100 * 100) / 100;
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  initial: number,
  current: number
): number => {
  if (initial === 0) return 0;
  return Math.round(((current - initial) / initial) * 100 * 100) / 100;
};

/**
 * Calculate housing affordability (30% rule)
 */
export const calculateAffordableRent = (monthlyIncome: number): number => {
  return Math.round(monthlyIncome * 0.30);
};

/**
 * Apply 50/30/20 budgeting rule
 */
export const apply50_30_20Rule = (monthlyIncome: number) => {
  return {
    needs: monthlyIncome * 0.50, // 50% for needs
    wants: monthlyIncome * 0.30, // 30% for wants
    savings: monthlyIncome * 0.20, // 20% for savings/debt
  };
};

