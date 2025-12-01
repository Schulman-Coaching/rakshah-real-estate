// Neighborhood display names
export const NEIGHBORHOOD_NAMES: Record<string, { en: string; he: string }> = {
  RBS_ALEPH: { en: 'RBS Aleph', he: "רמת בית שמש א'" },
  RBS_BET: { en: 'RBS Bet', he: "רמת בית שמש ב'" },
  RBS_GIMMEL_1: { en: 'RBS Gimmel 1', he: "רמת בית שמש ג'1" },
  RBS_GIMMEL_2: { en: 'RBS Gimmel 2', he: "רמת בית שמש ג'2" },
  RBS_GIMMEL_3: { en: 'RBS Gimmel 3', he: "רמת בית שמש ג'3" },
  RBS_DALED: { en: 'RBS Daled', he: "רמת בית שמש ד'" },
  RBS_HEY: { en: 'RBS Hey', he: "רמת בית שמש ה'" },
  OLD_BS_CENTER: { en: 'Old Beit Shemesh Center', he: 'בית שמש העתיקה - מרכז' },
  OLD_BS_NORTH: { en: 'Old Beit Shemesh North', he: 'בית שמש העתיקה - צפון' },
  SHEINFELD: { en: 'Sheinfeld', he: 'שיינפלד' },
  NOFEI_HASHEMESH: { en: 'Nofei HaShemesh', he: 'נופי השמש' },
  NEVE_SHAMIR: { en: 'Neve Shamir', he: 'נווה שמיר' },
  GIVAT_SAVION: { en: 'Givat Savion', he: 'גבעת סביון' },
  MEVO_BEITAR: { en: 'Mevo Beitar', he: 'מבוא ביתר' },
  TZAFRIRIM: { en: 'Tzafririm', he: 'צפרירים' },
  NAHAL_SOREK: { en: 'Nahal Sorek', he: 'נחל שורק' },
  // Sde Dov (Tel Aviv)
  SDE_DOV_NORTH: { en: 'Sde Dov North', he: 'שדה דב צפון' },
  SDE_DOV_SOUTH: { en: 'Sde Dov South', he: 'שדה דב דרום' },
  SDE_DOV_BEACHFRONT: { en: 'Sde Dov Beachfront', he: 'שדה דב חוף הים' },
}

// Sde Dov specific neighborhoods
export const SDE_DOV_NEIGHBORHOODS = [
  'SDE_DOV_NORTH',
  'SDE_DOV_SOUTH',
  'SDE_DOV_BEACHFRONT',
]

// Check if a neighborhood is in Sde Dov
export function isSdeDovNeighborhood(neighborhood: string): boolean {
  return SDE_DOV_NEIGHBORHOODS.includes(neighborhood)
}

// Property type display names
export const PROPERTY_TYPE_NAMES: Record<string, { en: string; he: string }> = {
  APARTMENT: { en: 'Apartment', he: 'דירה' },
  PENTHOUSE: { en: 'Penthouse', he: 'פנטהאוז' },
  GARDEN_APARTMENT: { en: 'Garden Apartment', he: 'דירת גן' },
  DUPLEX: { en: 'Duplex', he: 'דופלקס' },
  COTTAGE: { en: 'Cottage', he: 'קוטג\'' },
  VILLA: { en: 'Villa', he: 'וילה' },
  TOWNHOUSE: { en: 'Townhouse', he: 'טאון האוס' },
  STUDIO: { en: 'Studio', he: 'סטודיו' },
  ROOM: { en: 'Room', he: 'חדר' },
  COMMERCIAL: { en: 'Commercial', he: 'מסחרי' },
  LAND: { en: 'Land', he: 'קרקע' },
}

// Listing type display names
export const LISTING_TYPE_NAMES: Record<string, { en: string; he: string }> = {
  SALE: { en: 'For Sale', he: 'למכירה' },
  RENT: { en: 'For Rent', he: 'להשכרה' },
  SHORT_TERM: { en: 'Short Term', he: 'טווח קצר' },
}

// Furnished status display names
export const FURNISHED_STATUS_NAMES: Record<string, { en: string; he: string }> = {
  UNFURNISHED: { en: 'Unfurnished', he: 'לא מרוהט' },
  PARTIAL: { en: 'Partially Furnished', he: 'מרוהט חלקית' },
  FULLY_FURNISHED: { en: 'Fully Furnished', he: 'מרוהט מלא' },
}

// Building type display names
export const BUILDING_TYPE_NAMES: Record<string, { en: string; he: string }> = {
  NEW_CONSTRUCTION: { en: 'New Construction', he: 'בנייה חדשה' },
  RESALE: { en: 'Resale', he: 'יד שנייה' },
  TAMA_38: { en: 'TAMA 38', he: 'תמ"א 38' },
  PINUI_BINUI: { en: 'Pinui Binui', he: 'פינוי בינוי' },
}

// Currency formatter for Israeli Shekels
export function formatPrice(price: number, listingType: string = 'SALE'): string {
  const formatter = new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const formatted = formatter.format(price)

  if (listingType === 'RENT' || listingType === 'SHORT_TERM') {
    return `${formatted}/mo`
  }

  return formatted
}

// Format area in square meters
export function formatArea(sqm: number): string {
  return `${sqm.toLocaleString()} m²`
}
