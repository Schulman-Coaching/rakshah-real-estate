'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Calculator,
  Home,
  Building,
  Banknote,
  Info,
  Plane,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { formatPrice } from '@/lib/constants'
import {
  calculatePurchaseCosts,
  calculateRentalCosts,
  calculateMortgage,
  type PurchaseCostResult,
  type RentalAnalysisResult,
  type MortgageResult
} from '@/lib/calculator'

type CalculatorTab = 'purchase' | 'rental' | 'mortgage'

export default function CalculatorPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<CalculatorTab>('purchase')

  // Purchase calculator state
  const [propertyPrice, setPropertyPrice] = useState(searchParams.get('price') || '2500000')
  const [isFirstHome, setIsFirstHome] = useState(true)
  const [isNewOleh, setIsNewOleh] = useState(false)
  const [includeAgentFees, setIncludeAgentFees] = useState(true)
  const [includeLawyerFees, setIncludeLawyerFees] = useState(true)
  const [mortgageAmount, setMortgageAmount] = useState('0')
  const [renovationBudget, setRenovationBudget] = useState('0')
  const [purchaseResult, setPurchaseResult] = useState<PurchaseCostResult | null>(null)

  // Rental calculator state
  const [monthlyRent, setMonthlyRent] = useState('6000')
  const [leasePeriod, setLeasePeriod] = useState('12')
  const [depositMonths, setDepositMonths] = useState('2')
  const [includeRentalAgentFees, setIncludeRentalAgentFees] = useState(true)
  const [rentalResult, setRentalResult] = useState<RentalAnalysisResult | null>(null)

  // Mortgage calculator state
  const [mortgagePropertyPrice, setMortgagePropertyPrice] = useState(searchParams.get('price') || '2500000')
  const [downPaymentPercent, setDownPaymentPercent] = useState('25')
  const [interestRate, setInterestRate] = useState('4.5')
  const [loanTermYears, setLoanTermYears] = useState('25')
  const [mortgageResult, setMortgageResult] = useState<MortgageResult | null>(null)

  // Calculate purchase costs
  useEffect(() => {
    if (activeTab === 'purchase' && propertyPrice) {
      const result = calculatePurchaseCosts({
        propertyPrice: parseFloat(propertyPrice) || 0,
        isFirstHome,
        isNewOleh,
        includeAgentFees,
        includeLawyerFees,
        includeMortgageFees: parseFloat(mortgageAmount) > 0,
        mortgageAmount: parseFloat(mortgageAmount) || 0,
        renovationBudget: parseFloat(renovationBudget) || 0,
      })
      setPurchaseResult(result)
    }
  }, [activeTab, propertyPrice, isFirstHome, isNewOleh, includeAgentFees, includeLawyerFees, mortgageAmount, renovationBudget])

  // Calculate rental costs
  useEffect(() => {
    if (activeTab === 'rental' && monthlyRent) {
      const result = calculateRentalCosts({
        monthlyRent: parseFloat(monthlyRent) || 0,
        leasePeriodMonths: parseInt(leasePeriod) || 12,
        depositMonths: parseInt(depositMonths) || 2,
        includeAgentFees: includeRentalAgentFees,
      })
      setRentalResult(result)
    }
  }, [activeTab, monthlyRent, leasePeriod, depositMonths, includeRentalAgentFees])

  // Calculate mortgage
  useEffect(() => {
    if (activeTab === 'mortgage' && mortgagePropertyPrice) {
      const result = calculateMortgage({
        propertyPrice: parseFloat(mortgagePropertyPrice) || 0,
        downPaymentPercent: parseFloat(downPaymentPercent) || 25,
        interestRate: parseFloat(interestRate) || 4.5,
        loanTermYears: parseInt(loanTermYears) || 25,
      })
      setMortgageResult(result)
    }
  }, [activeTab, mortgagePropertyPrice, downPaymentPercent, interestRate, loanTermYears])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Real Estate Calculator</h1>
              <p className="text-blue-100">
                Calculate purchase costs, rental expenses, and mortgage payments
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <Button
            variant={activeTab === 'purchase' ? 'default' : 'outline'}
            onClick={() => setActiveTab('purchase')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Purchase Costs
          </Button>
          <Button
            variant={activeTab === 'rental' ? 'default' : 'outline'}
            onClick={() => setActiveTab('rental')}
            className="flex items-center gap-2"
          >
            <Building className="h-4 w-4" />
            Rental Analysis
          </Button>
          <Button
            variant={activeTab === 'mortgage' ? 'default' : 'outline'}
            onClick={() => setActiveTab('mortgage')}
            className="flex items-center gap-2"
          >
            <Banknote className="h-4 w-4" />
            Mortgage Calculator
          </Button>
        </div>

        {/* Purchase Calculator */}
        {activeTab === 'purchase' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>
                    Enter the property price and your situation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Price (ILS)
                    </label>
                    <Input
                      type="number"
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(e.target.value)}
                      placeholder="2,500,000"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={isFirstHome}
                        onChange={(e) => setIsFirstHome(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="font-medium">First Home (Dira Yechida)</span>
                        <p className="text-sm text-gray-500">
                          Lower purchase tax rates for your only residence
                        </p>
                      </div>
                      <Home className="h-5 w-5 text-gray-400" />
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={isNewOleh}
                        onChange={(e) => setIsNewOleh(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="font-medium">New Oleh Benefits</span>
                        <p className="text-sm text-gray-500">
                          Tax exemption up to ~1.8M ILS for new immigrants
                        </p>
                      </div>
                      <Plane className="h-5 w-5 text-gray-400" />
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Costs</CardTitle>
                  <CardDescription>
                    Include or exclude various fees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAgentFees}
                      onChange={(e) => setIncludeAgentFees(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Include Agent Commission (2% + VAT)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLawyerFees}
                      onChange={(e) => setIncludeLawyerFees(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Include Lawyer Fees (0.5% + VAT)</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mortgage Amount (if applicable)
                    </label>
                    <Input
                      type="number"
                      value={mortgageAmount}
                      onChange={(e) => setMortgageAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Renovation Budget
                    </label>
                    <Input
                      type="number"
                      value={renovationBudget}
                      onChange={(e) => setRenovationBudget(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            {purchaseResult && (
              <div className="space-y-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-blue-600 font-medium mb-1">Total Cost</p>
                      <p className="text-4xl font-bold text-blue-700">
                        {formatPrice(purchaseResult.totalCost)}
                      </p>
                      <p className="text-sm text-blue-600 mt-2">
                        Additional costs: {formatPrice(purchaseResult.totalAdditionalCosts)} ({((purchaseResult.totalAdditionalCosts / purchaseResult.propertyPrice) * 100).toFixed(1)}% of property price)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {purchaseResult.breakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-start py-3 border-b last:border-0"
                        >
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <p className="font-semibold text-right whitespace-nowrap">
                            {formatPrice(item.amount)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tax info */}
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">
                          Purchase Tax (Mas Rechisha): {purchaseResult.purchaseTaxRate}
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">
                          {isNewOleh
                            ? 'As a new Oleh, you receive a tax exemption on the first ~1.8M ILS.'
                            : isFirstHome
                            ? 'As a first-home buyer, you benefit from reduced tax rates.'
                            : 'Investment/additional property rates apply (8-10%).'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Rental Calculator */}
        {activeTab === 'rental' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Rental Details</CardTitle>
                <CardDescription>
                  Enter rental terms to calculate total costs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Rent (ILS)
                  </label>
                  <Input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    placeholder="6,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lease Period (months)
                  </label>
                  <Input
                    type="number"
                    value={leasePeriod}
                    onChange={(e) => setLeasePeriod(e.target.value)}
                    placeholder="12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security Deposit (months)
                  </label>
                  <Input
                    type="number"
                    value={depositMonths}
                    onChange={(e) => setDepositMonths(e.target.value)}
                    placeholder="2"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeRentalAgentFees}
                    onChange={(e) => setIncludeRentalAgentFees(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Include Agent Fees (1 month + VAT)</span>
                </label>
              </CardContent>
            </Card>

            {rentalResult && (
              <div className="space-y-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-blue-600 font-medium mb-1">
                        Initial Costs (Move-in)
                      </p>
                      <p className="text-4xl font-bold text-blue-700">
                        {formatPrice(rentalResult.initialCosts)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Yearly Rent</p>
                        <p className="text-xl font-semibold">{formatPrice(rentalResult.yearlyRent)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Lease Cost</p>
                        <p className="text-xl font-semibold">{formatPrice(rentalResult.totalLeaseCost)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Move-in Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {rentalResult.breakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-start py-3 border-b last:border-0"
                        >
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <p className="font-semibold">{formatPrice(item.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Mortgage Calculator */}
        {activeTab === 'mortgage' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Details</CardTitle>
                <CardDescription>
                  Calculate your monthly mortgage payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Price (ILS)
                  </label>
                  <Input
                    type="number"
                    value={mortgagePropertyPrice}
                    onChange={(e) => setMortgagePropertyPrice(e.target.value)}
                    placeholder="2,500,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Down Payment (%)
                  </label>
                  <Input
                    type="number"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(e.target.value)}
                    placeholder="25"
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 25% for first home, 50% for investment property
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="4.5"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Term (years)
                  </label>
                  <Input
                    type="number"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(e.target.value)}
                    placeholder="25"
                    max="30"
                  />
                </div>
              </CardContent>
            </Card>

            {mortgageResult && (
              <div className="space-y-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-blue-600 font-medium mb-1">
                        Monthly Payment
                      </p>
                      <p className="text-4xl font-bold text-blue-700">
                        {formatPrice(mortgageResult.monthlyPayment)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Loan Amount</p>
                        <p className="text-xl font-semibold">{formatPrice(mortgageResult.loanAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Down Payment</p>
                        <p className="text-xl font-semibold">{formatPrice(mortgageResult.downPayment)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Loan Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Loan-to-Value (LTV)</span>
                        <span className="font-semibold">{mortgageResult.ltv}%</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Total Payment</span>
                        <span className="font-semibold">{formatPrice(mortgageResult.totalPayment)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold text-red-600">
                          {formatPrice(mortgageResult.totalInterest)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {mortgageResult.ltv > 75 && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">High LTV Warning</p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Israeli banks typically require a minimum 25% down payment for first homes.
                            Investment properties usually require 50% down payment.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <Card className="mt-8 bg-gray-100">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> These calculations are estimates based on current tax rates
              and typical fees. Actual costs may vary. For accurate calculations, consult with a
              licensed real estate lawyer or tax advisor. Tax brackets are updated as of 2024.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
