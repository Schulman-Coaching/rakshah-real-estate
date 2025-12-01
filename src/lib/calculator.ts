// Israeli Real Estate Cost Calculator Utilities

// Mas Rechisha (Purchase Tax) rates for 2024
// For Israeli citizens buying their ONLY residence (first home)
const FIRST_HOME_TAX_BRACKETS = [
  { max: 1978745, rate: 0 },
  { max: 2347040, rate: 0.035 },
  { max: 6055070, rate: 0.05 },
  { max: 20183560, rate: 0.08 },
  { max: Infinity, rate: 0.10 },
]

// For additional properties (investment/second home)
const ADDITIONAL_HOME_TAX_BRACKETS = [
  { max: 6055070, rate: 0.08 },
  { max: 20183560, rate: 0.10 },
  { max: Infinity, rate: 0.10 },
]

// New Oleh (immigrant) benefits - exempt up to ~1.8M ILS
const OLEH_EXEMPTION_AMOUNT = 1838840

export interface PurchaseCostInput {
  propertyPrice: number
  isFirstHome: boolean
  isNewOleh: boolean
  includeAgentFees?: boolean
  includeLawyerFees?: boolean
  includeMortgageFees?: boolean
  mortgageAmount?: number
  renovationBudget?: number
}

export interface PurchaseCostResult {
  propertyPrice: number
  purchaseTax: number
  purchaseTaxRate: string
  lawyerFees: number
  agentFees: number
  mortgageFees: number
  appraisalFees: number
  registrationFees: number
  movingCosts: number
  renovationBudget: number
  totalAdditionalCosts: number
  totalCost: number
  breakdown: {
    label: string
    amount: number
    description: string
  }[]
}

export function calculatePurchaseTax(
  price: number,
  isFirstHome: boolean,
  isNewOleh: boolean
): { tax: number; effectiveRate: string } {
  // New Oleh exemption
  if (isNewOleh) {
    const taxableAmount = Math.max(0, price - OLEH_EXEMPTION_AMOUNT)
    if (taxableAmount === 0) {
      return { tax: 0, effectiveRate: '0%' }
    }
    // For olim, apply first home rates to the taxable portion
    const tax = calculateBracketTax(taxableAmount, FIRST_HOME_TAX_BRACKETS)
    const effectiveRate = ((tax / price) * 100).toFixed(2) + '%'
    return { tax, effectiveRate }
  }

  const brackets = isFirstHome ? FIRST_HOME_TAX_BRACKETS : ADDITIONAL_HOME_TAX_BRACKETS
  const tax = calculateBracketTax(price, brackets)
  const effectiveRate = ((tax / price) * 100).toFixed(2) + '%'

  return { tax, effectiveRate }
}

function calculateBracketTax(
  amount: number,
  brackets: { max: number; rate: number }[]
): number {
  let tax = 0
  let previousMax = 0

  for (const bracket of brackets) {
    if (amount <= previousMax) break

    const taxableInBracket = Math.min(amount, bracket.max) - previousMax
    if (taxableInBracket > 0) {
      tax += taxableInBracket * bracket.rate
    }

    previousMax = bracket.max
  }

  return Math.round(tax)
}

export function calculatePurchaseCosts(input: PurchaseCostInput): PurchaseCostResult {
  const {
    propertyPrice,
    isFirstHome,
    isNewOleh,
    includeAgentFees = true,
    includeLawyerFees = true,
    includeMortgageFees = true,
    mortgageAmount = 0,
    renovationBudget = 0,
  } = input

  // Calculate purchase tax
  const { tax: purchaseTax, effectiveRate: purchaseTaxRate } = calculatePurchaseTax(
    propertyPrice,
    isFirstHome,
    isNewOleh
  )

  // Lawyer fees (typically 0.5%-1% + VAT)
  const lawyerFees = includeLawyerFees
    ? Math.round(propertyPrice * 0.005 * 1.17) // 0.5% + 17% VAT
    : 0

  // Real estate agent fees (typically 2% + VAT for buyer)
  const agentFees = includeAgentFees
    ? Math.round(propertyPrice * 0.02 * 1.17) // 2% + 17% VAT
    : 0

  // Mortgage related fees
  const mortgageFees = includeMortgageFees && mortgageAmount > 0
    ? Math.round(mortgageAmount * 0.005) // ~0.5% of mortgage
    : 0

  // Appraisal fee (shomah)
  const appraisalFees = mortgageAmount > 0 ? 2500 : 0

  // Tabu registration fees
  const registrationFees = Math.round(propertyPrice * 0.0025) // ~0.25%

  // Moving costs estimate
  const movingCosts = 5000 // Average moving cost in Israel

  // Calculate totals
  const totalAdditionalCosts =
    purchaseTax +
    lawyerFees +
    agentFees +
    mortgageFees +
    appraisalFees +
    registrationFees +
    movingCosts +
    renovationBudget

  const totalCost = propertyPrice + totalAdditionalCosts

  // Build detailed breakdown
  const breakdown = [
    {
      label: 'Property Price',
      amount: propertyPrice,
      description: 'The base purchase price of the property',
    },
    {
      label: 'Purchase Tax (Mas Rechisha)',
      amount: purchaseTax,
      description: `Israeli property purchase tax at ${purchaseTaxRate} effective rate`,
    },
    {
      label: 'Lawyer Fees',
      amount: lawyerFees,
      description: 'Legal representation for the transaction (0.5% + VAT)',
    },
    {
      label: 'Agent Commission',
      amount: agentFees,
      description: 'Real estate agent fees (2% + VAT)',
    },
  ]

  if (mortgageAmount > 0) {
    breakdown.push(
      {
        label: 'Mortgage Fees',
        amount: mortgageFees,
        description: 'Bank mortgage origination fees',
      },
      {
        label: 'Property Appraisal',
        amount: appraisalFees,
        description: 'Shomah (valuation) required by the bank',
      }
    )
  }

  breakdown.push(
    {
      label: 'Tabu Registration',
      amount: registrationFees,
      description: 'Land registry (Tabu) registration fees',
    },
    {
      label: 'Moving Costs',
      amount: movingCosts,
      description: 'Estimated moving and setup costs',
    }
  )

  if (renovationBudget > 0) {
    breakdown.push({
      label: 'Renovation Budget',
      amount: renovationBudget,
      description: 'Your allocated budget for renovations',
    })
  }

  return {
    propertyPrice,
    purchaseTax,
    purchaseTaxRate,
    lawyerFees,
    agentFees,
    mortgageFees,
    appraisalFees,
    registrationFees,
    movingCosts,
    renovationBudget,
    totalAdditionalCosts,
    totalCost,
    breakdown,
  }
}

// Rental analysis
export interface RentalAnalysisInput {
  monthlyRent: number
  leasePeriodMonths: number
  depositMonths: number
  includeAgentFees?: boolean
}

export interface RentalAnalysisResult {
  monthlyRent: number
  yearlyRent: number
  totalLeaseCost: number
  deposit: number
  agentFees: number
  initialCosts: number
  breakdown: {
    label: string
    amount: number
    description: string
  }[]
}

export function calculateRentalCosts(input: RentalAnalysisInput): RentalAnalysisResult {
  const {
    monthlyRent,
    leasePeriodMonths,
    depositMonths,
    includeAgentFees = true,
  } = input

  const yearlyRent = monthlyRent * 12
  const totalLeaseCost = monthlyRent * leasePeriodMonths
  const deposit = monthlyRent * depositMonths

  // Agent fees (typically one month rent + VAT)
  const agentFees = includeAgentFees
    ? Math.round(monthlyRent * 1.17)
    : 0

  // Initial costs (first month + deposit + agent)
  const initialCosts = monthlyRent + deposit + agentFees

  const breakdown = [
    {
      label: 'First Month Rent',
      amount: monthlyRent,
      description: 'First month rent due at signing',
    },
    {
      label: 'Security Deposit',
      amount: deposit,
      description: `${depositMonths} months deposit (refundable)`,
    },
    {
      label: 'Agent Fees',
      amount: agentFees,
      description: 'One month rent + VAT (if applicable)',
    },
  ]

  return {
    monthlyRent,
    yearlyRent,
    totalLeaseCost,
    deposit,
    agentFees,
    initialCosts,
    breakdown,
  }
}

// Mortgage calculator
export interface MortgageInput {
  propertyPrice: number
  downPaymentPercent: number
  interestRate: number
  loanTermYears: number
}

export interface MortgageResult {
  loanAmount: number
  downPayment: number
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  ltv: number
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { propertyPrice, downPaymentPercent, interestRate, loanTermYears } = input

  const downPayment = propertyPrice * (downPaymentPercent / 100)
  const loanAmount = propertyPrice - downPayment
  const ltv = 100 - downPaymentPercent

  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTermYears * 12

  // PMT formula
  let monthlyPayment: number
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numberOfPayments
  } else {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  }

  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = totalPayment - loanAmount

  return {
    loanAmount: Math.round(loanAmount),
    downPayment: Math.round(downPayment),
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    ltv,
  }
}
