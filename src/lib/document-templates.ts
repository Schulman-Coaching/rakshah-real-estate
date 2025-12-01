// Legal Document Templates for Israeli Real Estate

export interface DocumentData {
  // Parties
  partyAName: string
  partyAId?: string
  partyAPhone?: string
  partyAEmail?: string
  partyAAddress?: string
  partyBName?: string
  partyBId?: string
  partyBPhone?: string
  partyBEmail?: string
  partyBAddress?: string

  // Property
  propertyAddress: string
  propertyDetails?: string

  // Terms
  price?: number
  startDate?: string
  endDate?: string
  paymentTerms?: string
  specialTerms?: string
}

export type DocumentType =
  | 'RENTAL_AGREEMENT'
  | 'PURCHASE_OFFER'
  | 'TENANT_APPLICATION'
  | 'PROPERTY_DISCLOSURE'
  | 'INSPECTION_CHECKLIST'

export const DOCUMENT_TYPES = {
  RENTAL_AGREEMENT: {
    name: 'Rental Agreement',
    nameHe: 'הסכם שכירות',
    description: 'Standard residential rental agreement',
    icon: '📄',
  },
  PURCHASE_OFFER: {
    name: 'Purchase Offer',
    nameHe: 'הצעת רכישה',
    description: 'Formal offer to purchase a property',
    icon: '📋',
  },
  TENANT_APPLICATION: {
    name: 'Tenant Application',
    nameHe: 'טופס בקשת שוכר',
    description: 'Application form for prospective tenants',
    icon: '📝',
  },
  PROPERTY_DISCLOSURE: {
    name: 'Property Disclosure',
    nameHe: 'גילוי נאות על הנכס',
    description: 'Seller disclosure of property condition',
    icon: '📃',
  },
  INSPECTION_CHECKLIST: {
    name: 'Inspection Checklist',
    nameHe: 'רשימת בדיקה',
    description: 'Move-in/move-out inspection checklist',
    icon: '✅',
  },
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '_____________'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatPrice(price: number | undefined): string {
  if (!price) return '_____________'
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
  }).format(price)
}

export function generateRentalAgreement(data: DocumentData): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="margin-bottom: 5px;">RESIDENTIAL RENTAL AGREEMENT</h1>
    <h2 style="color: #666; font-weight: normal;">הסכם שכירות למגורים</h2>
  </div>

  <p style="text-align: center; margin-bottom: 30px;">
    Made and entered into on <strong>${formatDate(data.startDate)}</strong>
  </p>

  <h3>BETWEEN:</h3>
  <table style="width: 100%; margin-bottom: 30px;">
    <tr>
      <td style="width: 50%; vertical-align: top; padding: 10px; border: 1px solid #ddd;">
        <strong>LANDLORD (Party A):</strong><br>
        Name: ${data.partyAName || '_____________'}<br>
        ID Number: ${data.partyAId || '_____________'}<br>
        Phone: ${data.partyAPhone || '_____________'}<br>
        Email: ${data.partyAEmail || '_____________'}<br>
        Address: ${data.partyAAddress || '_____________'}
      </td>
      <td style="width: 50%; vertical-align: top; padding: 10px; border: 1px solid #ddd;">
        <strong>TENANT (Party B):</strong><br>
        Name: ${data.partyBName || '_____________'}<br>
        ID Number: ${data.partyBId || '_____________'}<br>
        Phone: ${data.partyBPhone || '_____________'}<br>
        Email: ${data.partyBEmail || '_____________'}<br>
        Address: ${data.partyBAddress || '_____________'}
      </td>
    </tr>
  </table>

  <h3>1. THE PROPERTY</h3>
  <p>
    The Landlord hereby agrees to rent to the Tenant, and the Tenant agrees to rent from the Landlord,
    the property located at:
  </p>
  <p style="margin-left: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #0d9488;">
    <strong>${data.propertyAddress || '_____________'}</strong><br>
    ${data.propertyDetails || ''}
  </p>

  <h3>2. RENTAL PERIOD</h3>
  <p>
    The rental period shall commence on <strong>${formatDate(data.startDate)}</strong>
    and shall terminate on <strong>${formatDate(data.endDate)}</strong>,
    for a total period as specified.
  </p>

  <h3>3. RENT</h3>
  <p>
    The monthly rent for the Property shall be <strong>${formatPrice(data.price)}</strong> (Israeli Shekels),
    payable on the first day of each month.
  </p>
  ${data.paymentTerms ? `<p>Payment Terms: ${data.paymentTerms}</p>` : ''}

  <h3>4. SECURITY DEPOSIT</h3>
  <p>
    Upon signing this Agreement, the Tenant shall pay a security deposit equal to two (2) months' rent,
    totaling <strong>${formatPrice((data.price || 0) * 2)}</strong>.
    This deposit shall be returned within 30 days of the termination of this Agreement,
    less any deductions for damages beyond normal wear and tear.
  </p>

  <h3>5. USE OF PROPERTY</h3>
  <p>
    The Property shall be used exclusively for residential purposes. The Tenant shall not use the
    Property for any illegal purposes or in any manner that would violate local regulations.
  </p>

  <h3>6. MAINTENANCE AND REPAIRS</h3>
  <p>
    <strong>Landlord's Responsibilities:</strong> The Landlord shall be responsible for major repairs
    including plumbing, electrical systems, and structural maintenance.
  </p>
  <p>
    <strong>Tenant's Responsibilities:</strong> The Tenant shall maintain the Property in good condition
    and be responsible for minor repairs and routine maintenance up to 500 ILS per incident.
  </p>

  <h3>7. UTILITIES AND EXPENSES</h3>
  <p>
    The Tenant shall be responsible for payment of: electricity, water, gas, internet, and Arnona
    (municipal tax) during the rental period. The Landlord shall be responsible for: Vaad Bayit
    (building maintenance fees).
  </p>

  <h3>8. SUBLETTING</h3>
  <p>
    The Tenant shall not sublet the Property or assign this Agreement without the prior written
    consent of the Landlord.
  </p>

  <h3>9. TERMINATION</h3>
  <p>
    Either party may terminate this Agreement by providing 60 days written notice.
    Early termination by the Tenant without proper notice may result in forfeiture of the security deposit.
  </p>

  ${data.specialTerms ? `
  <h3>10. SPECIAL TERMS</h3>
  <p>${data.specialTerms}</p>
  ` : ''}

  <h3>SIGNATURES</h3>
  <table style="width: 100%; margin-top: 40px;">
    <tr>
      <td style="width: 50%; padding: 20px; text-align: center;">
        <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto; padding-top: 10px;">
          Landlord Signature<br>
          <small>חתימת המשכיר</small>
        </div>
        <p>Date: _____________</p>
      </td>
      <td style="width: 50%; padding: 20px; text-align: center;">
        <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto; padding-top: 10px;">
          Tenant Signature<br>
          <small>חתימת השוכר</small>
        </div>
        <p>Date: _____________</p>
      </td>
    </tr>
  </table>

  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
    <p>This document was prepared using Rakshah Real Estate document services.</p>
    <p>This is a template and should be reviewed by a qualified attorney before signing.</p>
  </div>
</div>
  `
}

export function generatePurchaseOffer(data: DocumentData): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="margin-bottom: 5px;">OFFER TO PURCHASE REAL ESTATE</h1>
    <h2 style="color: #666; font-weight: normal;">הצעה לרכישת נכס</h2>
  </div>

  <p style="text-align: center; margin-bottom: 30px;">
    Date: <strong>${formatDate(data.startDate)}</strong>
  </p>

  <h3>1. PARTIES</h3>
  <table style="width: 100%; margin-bottom: 30px;">
    <tr>
      <td style="width: 50%; vertical-align: top; padding: 10px; border: 1px solid #ddd;">
        <strong>BUYER (Offeror):</strong><br>
        Name: ${data.partyAName || '_____________'}<br>
        ID Number: ${data.partyAId || '_____________'}<br>
        Phone: ${data.partyAPhone || '_____________'}<br>
        Email: ${data.partyAEmail || '_____________'}<br>
        Address: ${data.partyAAddress || '_____________'}
      </td>
      <td style="width: 50%; vertical-align: top; padding: 10px; border: 1px solid #ddd;">
        <strong>SELLER:</strong><br>
        Name: ${data.partyBName || '_____________'}<br>
        ID Number: ${data.partyBId || '_____________'}<br>
        Phone: ${data.partyBPhone || '_____________'}<br>
        Address: ${data.partyBAddress || '_____________'}
      </td>
    </tr>
  </table>

  <h3>2. PROPERTY</h3>
  <p>
    The Buyer hereby offers to purchase the following property:
  </p>
  <p style="margin-left: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #0d9488;">
    <strong>${data.propertyAddress || '_____________'}</strong><br>
    ${data.propertyDetails || ''}
  </p>

  <h3>3. PURCHASE PRICE</h3>
  <p>
    The Buyer offers to purchase the Property for the sum of <strong>${formatPrice(data.price)}</strong>
    (Israeli Shekels).
  </p>

  <h3>4. PAYMENT SCHEDULE</h3>
  <p>${data.paymentTerms || `
    The purchase price shall be paid as follows:
    <ul>
      <li>Upon signing: 10% deposit</li>
      <li>Upon signing the full contract: Additional 40%</li>
      <li>Upon delivery of possession: Remaining 50%</li>
    </ul>
  `}</p>

  <h3>5. CONDITIONS</h3>
  <p>This offer is conditional upon:</p>
  <ul>
    <li>Clear title to the Property</li>
    <li>No outstanding debts or liens on the Property</li>
    <li>Property being in substantially the same condition as viewed</li>
    <li>Buyer obtaining mortgage financing (if applicable)</li>
  </ul>

  <h3>6. VALIDITY</h3>
  <p>
    This offer shall remain open for acceptance until <strong>${formatDate(data.endDate)}</strong>,
    after which it shall automatically expire unless extended in writing.
  </p>

  ${data.specialTerms ? `
  <h3>7. SPECIAL CONDITIONS</h3>
  <p>${data.specialTerms}</p>
  ` : ''}

  <h3>SIGNATURES</h3>
  <table style="width: 100%; margin-top: 40px;">
    <tr>
      <td style="width: 50%; padding: 20px; text-align: center;">
        <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto; padding-top: 10px;">
          Buyer Signature<br>
          <small>חתימת הקונה</small>
        </div>
        <p>Date: _____________</p>
      </td>
      <td style="width: 50%; padding: 20px; text-align: center;">
        <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto; padding-top: 10px;">
          Seller Acceptance<br>
          <small>קבלת המוכר</small>
        </div>
        <p>Date: _____________</p>
      </td>
    </tr>
  </table>

  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
    <p>This document was prepared using Rakshah Real Estate document services.</p>
    <p><strong>Important:</strong> This offer does not constitute a binding contract.
    A formal purchase agreement should be prepared by qualified legal counsel.</p>
  </div>
</div>
  `
}

export function generateTenantApplication(data: DocumentData): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="margin-bottom: 5px;">TENANT APPLICATION FORM</h1>
    <h2 style="color: #666; font-weight: normal;">טופס בקשת שכירות</h2>
  </div>

  <h3>PROPERTY INFORMATION</h3>
  <p style="margin-left: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #0d9488;">
    <strong>${data.propertyAddress || '_____________'}</strong>
  </p>

  <h3>APPLICANT INFORMATION</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>Full Name:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${data.partyAName || '_____________'}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>ID/Passport Number:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${data.partyAId || '_____________'}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${data.partyAPhone || '_____________'}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${data.partyAEmail || '_____________'}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Current Address:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${data.partyAAddress || '_____________'}</td>
    </tr>
  </table>

  <h3 style="margin-top: 30px;">EMPLOYMENT INFORMATION</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>Employer:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Position:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Monthly Income:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Employment Duration:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
  </table>

  <h3 style="margin-top: 30px;">RENTAL HISTORY</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>Previous Address:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Previous Landlord:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Landlord Phone:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Reason for Leaving:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
  </table>

  <h3 style="margin-top: 30px;">REFERENCES</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Reference 1:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">Name: _____________ Phone: _____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Reference 2:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">Name: _____________ Phone: _____________</td>
    </tr>
  </table>

  <h3 style="margin-top: 30px;">DECLARATION</h3>
  <p>
    I hereby declare that all information provided in this application is true and accurate.
    I authorize the landlord to verify the information provided and to contact the references listed.
  </p>

  <div style="margin-top: 40px;">
    <p>Signature: _________________________</p>
    <p>Date: _________________________</p>
  </div>

  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
    <p>This document was prepared using Rakshah Real Estate document services.</p>
  </div>
</div>
  `
}

export function generateInspectionChecklist(data: DocumentData): string {
  const rooms = ['Living Room', 'Kitchen', 'Bedroom 1', 'Bedroom 2', 'Bathroom', 'Balcony']
  const items = ['Walls', 'Ceiling', 'Floor', 'Windows', 'Doors', 'Light fixtures', 'Electrical outlets', 'A/C unit']

  return `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="margin-bottom: 5px;">PROPERTY INSPECTION CHECKLIST</h1>
    <h2 style="color: #666; font-weight: normal;">רשימת בדיקת נכס</h2>
  </div>

  <table style="width: 100%; margin-bottom: 20px;">
    <tr>
      <td><strong>Property:</strong> ${data.propertyAddress || '_____________'}</td>
      <td><strong>Date:</strong> ${formatDate(data.startDate)}</td>
    </tr>
    <tr>
      <td><strong>Landlord:</strong> ${data.partyAName || '_____________'}</td>
      <td><strong>Tenant:</strong> ${data.partyBName || '_____________'}</td>
    </tr>
  </table>

  <p style="margin-bottom: 20px;">
    <strong>Type:</strong>
    □ Move-In Inspection &nbsp;&nbsp; □ Move-Out Inspection
  </p>

  ${rooms.map(room => `
  <h3 style="background: #f0f0f0; padding: 10px; margin-top: 20px;">${room}</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="background: #e0e0e0;">
      <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Item</th>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: center; width: 80px;">Good</th>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: center; width: 80px;">Fair</th>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: center; width: 80px;">Poor</th>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Notes</th>
    </tr>
    ${items.map(item => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${item}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">□</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">□</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">□</td>
      <td style="padding: 8px; border: 1px solid #ddd;"></td>
    </tr>
    `).join('')}
  </table>
  `).join('')}

  <h3 style="margin-top: 30px;">UTILITIES</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">Electricity Meter Reading:</td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">Water Meter Reading:</td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">Gas Meter Reading:</td>
      <td style="padding: 10px; border: 1px solid #ddd;">_____________</td>
    </tr>
  </table>

  <h3 style="margin-top: 30px;">KEYS PROVIDED</h3>
  <p>
    □ Main door keys (quantity: _____) &nbsp;&nbsp;
    □ Building entrance key &nbsp;&nbsp;
    □ Mailbox key &nbsp;&nbsp;
    □ Storage room key
  </p>

  <h3 style="margin-top: 30px;">ADDITIONAL NOTES</h3>
  <div style="border: 1px solid #ddd; padding: 20px; min-height: 100px;">
    ${data.specialTerms || ''}
  </div>

  <h3 style="margin-top: 30px;">SIGNATURES</h3>
  <table style="width: 100%; margin-top: 20px;">
    <tr>
      <td style="width: 50%; padding: 20px; text-align: center;">
        <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto; padding-top: 10px;">
          Landlord Signature
        </div>
        <p>Date: _____________</p>
      </td>
      <td style="width: 50%; padding: 20px; text-align: center;">
        <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto; padding-top: 10px;">
          Tenant Signature
        </div>
        <p>Date: _____________</p>
      </td>
    </tr>
  </table>

  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
    <p>This document was prepared using Rakshah Real Estate document services.</p>
  </div>
</div>
  `
}

export function generateDocument(type: DocumentType, data: DocumentData): string {
  switch (type) {
    case 'RENTAL_AGREEMENT':
      return generateRentalAgreement(data)
    case 'PURCHASE_OFFER':
      return generatePurchaseOffer(data)
    case 'TENANT_APPLICATION':
      return generateTenantApplication(data)
    case 'INSPECTION_CHECKLIST':
      return generateInspectionChecklist(data)
    default:
      return '<p>Document type not supported</p>'
  }
}
