'use client'

import { useState, useRef } from 'react'
import {
  FileText,
  Download,
  Printer,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DOCUMENT_TYPES,
  generateDocument,
  type DocumentType,
  type DocumentData
} from '@/lib/document-templates'

type Step = 'select' | 'fill' | 'preview'

export default function DocumentsPage() {
  const [step, setStep] = useState<Step>('select')
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null)
  const [formData, setFormData] = useState<DocumentData>({
    partyAName: '',
    partyAId: '',
    partyAPhone: '',
    partyAEmail: '',
    partyAAddress: '',
    partyBName: '',
    partyBId: '',
    partyBPhone: '',
    partyBEmail: '',
    partyBAddress: '',
    propertyAddress: '',
    propertyDetails: '',
    price: undefined,
    startDate: '',
    endDate: '',
    paymentTerms: '',
    specialTerms: '',
  })
  const [generatedHtml, setGeneratedHtml] = useState('')
  const previewRef = useRef<HTMLDivElement>(null)

  const handleSelectType = (type: DocumentType) => {
    setSelectedType(type)
    setStep('fill')
  }

  const handleInputChange = (field: keyof DocumentData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerateDocument = () => {
    if (!selectedType) return
    const html = generateDocument(selectedType, formData)
    setGeneratedHtml(html)
    setStep('preview')
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${selectedType ? DOCUMENT_TYPES[selectedType].name : 'Document'}</title>
            <style>
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            ${generatedHtml}
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  const handleDownload = () => {
    const blob = new Blob([`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${selectedType ? DOCUMENT_TYPES[selectedType].name : 'Document'}</title>
        </head>
        <body>
          ${generatedHtml}
        </body>
      </html>
    `], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedType?.toLowerCase().replace(/_/g, '-')}-${Date.now()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-8">
      {(['select', 'fill', 'preview'] as Step[]).map((s, idx) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === s
                ? 'bg-purple-600 text-white'
                : ['select', 'fill', 'preview'].indexOf(step) > idx
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {['select', 'fill', 'preview'].indexOf(step) > idx ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              idx + 1
            )}
          </div>
          {idx < 2 && (
            <div className={`w-16 h-0.5 mx-2 ${
              ['select', 'fill', 'preview'].indexOf(step) > idx
                ? 'bg-green-500'
                : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Legal Document Preparation</h1>
              <p className="text-purple-100">
                Create rental agreements, purchase offers, and other real estate documents
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {renderStepIndicator()}

        {/* Step 1: Select Document Type */}
        {step === 'select' && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">
              Select Document Type
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {(Object.entries(DOCUMENT_TYPES) as [DocumentType, typeof DOCUMENT_TYPES[keyof typeof DOCUMENT_TYPES]][]).map(
                ([key, doc]) => (
                  <Card
                    key={key}
                    className="cursor-pointer hover:shadow-lg transition-shadow hover:border-purple-300"
                    onClick={() => handleSelectType(key)}
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl mb-4">{doc.icon}</div>
                      <h3 className="font-semibold text-lg mb-1">{doc.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{doc.nameHe}</p>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        )}

        {/* Step 2: Fill Form */}
        {step === 'fill' && selectedType && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" onClick={() => setStep('select')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h2 className="text-xl font-bold">
                {DOCUMENT_TYPES[selectedType].name}
              </h2>
              <div />
            </div>

            <div className="space-y-6">
              {/* Party A */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedType === 'RENTAL_AGREEMENT' ? 'Landlord' :
                     selectedType === 'PURCHASE_OFFER' ? 'Buyer' :
                     selectedType === 'TENANT_APPLICATION' ? 'Applicant' : 'Party A'} Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <Input
                      value={formData.partyAName}
                      onChange={(e) => handleInputChange('partyAName', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                    <Input
                      value={formData.partyAId}
                      onChange={(e) => handleInputChange('partyAId', e.target.value)}
                      placeholder="Teudat Zehut"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input
                      value={formData.partyAPhone}
                      onChange={(e) => handleInputChange('partyAPhone', e.target.value)}
                      placeholder="050-000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      type="email"
                      value={formData.partyAEmail}
                      onChange={(e) => handleInputChange('partyAEmail', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <Input
                      value={formData.partyAAddress}
                      onChange={(e) => handleInputChange('partyAAddress', e.target.value)}
                      placeholder="Current address"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Party B (for agreements) */}
              {(selectedType === 'RENTAL_AGREEMENT' || selectedType === 'PURCHASE_OFFER' || selectedType === 'INSPECTION_CHECKLIST') && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {selectedType === 'RENTAL_AGREEMENT' ? 'Tenant' :
                       selectedType === 'PURCHASE_OFFER' ? 'Seller' : 'Tenant'} Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input
                        value={formData.partyBName}
                        onChange={(e) => handleInputChange('partyBName', e.target.value)}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                      <Input
                        value={formData.partyBId}
                        onChange={(e) => handleInputChange('partyBId', e.target.value)}
                        placeholder="Teudat Zehut"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input
                        value={formData.partyBPhone}
                        onChange={(e) => handleInputChange('partyBPhone', e.target.value)}
                        placeholder="050-000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        type="email"
                        value={formData.partyBEmail}
                        onChange={(e) => handleInputChange('partyBEmail', e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <Input
                        value={formData.partyBAddress}
                        onChange={(e) => handleInputChange('partyBAddress', e.target.value)}
                        placeholder="Current address"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Property */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Address *</label>
                    <Input
                      value={formData.propertyAddress}
                      onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                      placeholder="Full property address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Details</label>
                    <textarea
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      value={formData.propertyDetails}
                      onChange={(e) => handleInputChange('propertyDetails', e.target.value)}
                      placeholder="e.g., 4 rooms, 2nd floor, parking spot #15"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Terms */}
              <Card>
                <CardHeader>
                  <CardTitle>Terms</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  {(selectedType === 'RENTAL_AGREEMENT' || selectedType === 'PURCHASE_OFFER') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {selectedType === 'RENTAL_AGREEMENT' ? 'Monthly Rent (ILS)' : 'Purchase Price (ILS)'}
                      </label>
                      <Input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                        placeholder="Amount in ILS"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                  {selectedType === 'RENTAL_AGREEMENT' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                      />
                    </div>
                  )}
                  {selectedType === 'PURCHASE_OFFER' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Offer Valid Until</label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                    <textarea
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={2}
                      value={formData.paymentTerms}
                      onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                      placeholder="e.g., Bank transfer on the 1st of each month"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Terms</label>
                    <textarea
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      value={formData.specialTerms}
                      onChange={(e) => handleInputChange('specialTerms', e.target.value)}
                      placeholder="Any additional terms or conditions"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setStep('select')}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateDocument}>
                  Generate Document
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 'preview' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" onClick={() => setStep('fill')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div
                  ref={previewRef}
                  className="bg-white"
                  dangerouslySetInnerHTML={{ __html: generatedHtml }}
                />
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> This document is a template and should be reviewed by a
                qualified legal professional before signing. Rakshah Real Estate is not responsible
                for the legal validity of this document.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
