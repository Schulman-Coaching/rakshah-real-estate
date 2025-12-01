import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Real Beit Shemesh street names by neighborhood (matching schema enum)
const streetsByNeighborhood: Record<string, string[]> = {
  RBS_ALEPH: ['Nachal Dolev', 'Nachal Refaim', 'Nachal Sorek', 'Nachal Lachish', 'Nachal Maor', 'Nachal Luz', 'Nachal Arugot', 'Nachal Kishon'],
  RBS_BET: ['Nachal Ayalon', 'Nachal Nachshon', 'Nachal Ein Gedi', 'Nachal Timna', 'Nachal Habesor', 'Nachal Tzin'],
  RBS_GIMMEL_1: ['Nachal Revivim', 'Nachal Hakfar', 'Nachal Katlav', 'Nachal Gilo'],
  RBS_GIMMEL_2: ['Nachal Refa', 'Nachal Meron', 'Nachal Kziv'],
  RBS_GIMMEL_3: ['Nachal Shamir', 'Nachal Adulam', 'Nachal Tzofim'],
  RBS_DALED: ['Derech HaEla', 'Nachal Soreq', 'Nachal Shilo', 'Rechov HaBosem', 'Nachal Prat', 'Nachal Arnon'],
  RBS_HEY: ['Nachal Michmas', 'Nachal Rosh', 'Nachal Kidron'],
  OLD_BS_CENTER: ['Rechov HaRav Kook', 'Rechov HaNassi', 'Rechov Herzl', 'Rechov Ben Gurion', 'Rechov HaPalmach'],
  OLD_BS_NORTH: ['Rechov HaTaasia', 'Rechov HaMelacha', 'Rechov HaOman', 'Rechov Yigal Alon'],
  SHEINFELD: ['Rechov HaDekel', 'Rechov HaGefen', 'Rechov HaRimon', 'Rechov HaTamar'],
  NEVE_SHAMIR: ['Rechov HaShaked', 'Rechov HaEgoz', 'Rechov HaTapuach'],
  GIVAT_SAVION: ['Rechov HaTzuk', 'Rechov HaGiva', 'Rechov HaNof'],
  NOFEI_HASHEMESH: ['Rechov Maalot HaShemesh', 'Rechov Ohr HaShemesh', 'Rechov Zricha'],
  // Sde Dov (Tel Aviv) - Premium development
  SDE_DOV_NORTH: ['Sderot Nordau', 'Rechov HaYarkon', 'Rechov Ben Yehuda', 'Rechov Dizengoff'],
  SDE_DOV_SOUTH: ['Rechov Arlozorov', 'Sderot Rokach', 'Rechov Pinkas', 'Rechov Weizmann'],
  SDE_DOV_BEACHFRONT: ['Tayelet Tel Aviv', 'Rechov HaYam', 'Kikar HaMedina', 'Rechov HaChof'],
}

// Realistic property descriptions
const saleDescriptions = [
  'Beautifully renovated apartment in a quiet, family-friendly building. Large living room with natural light, modern kitchen with granite countertops, and spacious bedrooms. Close to schools, shuls, and shopping.',
  'Stunning corner apartment with views from every window. Recently upgraded with new flooring, air conditioning throughout, and a private storage room. Perfect for a growing family.',
  'Move-in ready apartment in excellent condition. Features include a large sukka balcony, separate laundry room, and ample closet space. Walking distance to all amenities.',
  'Spacious duplex with private entrance and garden. Perfect for those seeking privacy and space. High ceilings, open floor plan, and modern finishes throughout.',
  'Prime location apartment steps from the main shopping area. Newly painted with updated bathrooms and kitchen. Building has 24/7 security and well-maintained common areas.',
  'Light-filled apartment on a high floor with spectacular sunset views. Large mamad (safe room) that can be used as an extra bedroom. Shabbat elevator in building.',
  'Charming garden apartment with private outdoor space - perfect for BBQs and sukkot. Three exposures ensure natural light all day. Underground parking included.',
  'Penthouse-style apartment with high ceilings and rooftop access. Completely renovated with designer finishes. A rare find in this sought-after neighborhood.',
]

const rentalDescriptions = [
  'Available immediately - well-maintained apartment in a central location. Includes air conditioning, washing machine, and basic furniture. Flexible lease terms available.',
  'Lovely furnished apartment ideal for young couples or small families. All utilities included in rent. Close to public transportation and shopping centers.',
  'Unfurnished apartment ready for your personal touch. New paint, clean, and ready for immediate occupancy. Long-term tenants preferred.',
  'Spacious rental with option to purchase furniture from current tenants. Great natural light, quiet neighbors, and responsive building management.',
  'Short-term rental available (6-12 months). Fully equipped kitchen, comfortable bedrooms, and a welcoming living space. Perfect for olim or those in transition.',
]

// Sde Dov specific descriptions (Tel Aviv premium)
const sdeDovSaleDescriptions = [
  'Stunning new development in Tel Aviv\'s most exciting neighborhood. Floor-to-ceiling windows with breathtaking Mediterranean sea views. Smart home features throughout.',
  'Luxury penthouse in the heart of Sde Dov with private rooftop terrace. State-of-the-art finishes, Italian kitchen, and panoramic city views. Steps from the beach.',
  'Brand new apartment in premium high-rise tower. Resort-style amenities including pool, gym, and concierge. Direct beach access and underground parking.',
  'Architect-designed apartment with open floor plan and designer finishes. Minutes from Tel Aviv\'s best restaurants, galleries, and nightlife.',
  'Investment opportunity in Tel Aviv\'s newest neighborhood. Projected high appreciation with first residents moving in soon. Pre-construction pricing available.',
  'Beachfront living at its finest. Wake up to stunning sunrises over the Mediterranean. Walking distance to parks, cafes, and the vibrant Tel Aviv promenade.',
]

const sdeDovRentalDescriptions = [
  'Fully furnished luxury apartment with sea views. Doorman building with 24/7 security. Perfect for executives or diplomats.',
  'Modern apartment in new tower with all amenities. Short or long-term lease available. Includes gym access and parking.',
  'Stunning beachfront rental with balcony overlooking the Mediterranean. Fully equipped for comfortable living.',
]

// Generate realistic properties
async function generateProperties() {
  const properties = []

  const neighborhoods = Object.keys(streetsByNeighborhood)
  const propertyTypes = ['APARTMENT', 'PENTHOUSE', 'GARDEN_APARTMENT', 'DUPLEX', 'COTTAGE', 'VILLA']

  // Generate 65 properties across different neighborhoods (including Sde Dov Tel Aviv)
  for (let i = 0; i < 65; i++) {
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)]
    const streets = streetsByNeighborhood[neighborhood]
    const street = streets[Math.floor(Math.random() * streets.length)]
    const houseNumber = Math.floor(Math.random() * 50) + 1
    const apartmentNumber = Math.floor(Math.random() * 20) + 1

    const isSale = Math.random() > 0.3 // 70% sales, 30% rentals
    const listingType = isSale ? 'SALE' : 'RENT'

    // Determine property type based on neighborhood characteristics
    let propertyType = 'APARTMENT'
    const typeRandom = Math.random()
    if (neighborhood.includes('GIMMEL') || neighborhood.includes('DALED') || neighborhood.includes('HEY')) {
      // Newer areas - more variety
      if (typeRandom < 0.5) propertyType = 'APARTMENT'
      else if (typeRandom < 0.7) propertyType = 'GARDEN_APARTMENT'
      else if (typeRandom < 0.85) propertyType = 'PENTHOUSE'
      else propertyType = 'DUPLEX'
    } else if (neighborhood === 'NEVE_SHAMIR' || neighborhood === 'GIVAT_SAVION') {
      // Upscale areas
      if (typeRandom < 0.3) propertyType = 'VILLA'
      else if (typeRandom < 0.5) propertyType = 'COTTAGE'
      else if (typeRandom < 0.7) propertyType = 'PENTHOUSE'
      else propertyType = 'APARTMENT'
    } else {
      // Standard areas
      if (typeRandom < 0.7) propertyType = 'APARTMENT'
      else if (typeRandom < 0.85) propertyType = 'GARDEN_APARTMENT'
      else propertyType = 'PENTHOUSE'
    }

    // Room count based on property type
    let rooms = 4
    if (propertyType === 'VILLA' || propertyType === 'COTTAGE') {
      rooms = Math.floor(Math.random() * 3) + 6 // 6-8 rooms
    } else if (propertyType === 'PENTHOUSE' || propertyType === 'DUPLEX') {
      rooms = Math.floor(Math.random() * 2) + 5 // 5-6 rooms
    } else {
      rooms = Math.floor(Math.random() * 3) + 3 // 3-5 rooms
    }

    const bedrooms = rooms - 1
    const bathrooms = propertyType === 'VILLA' ? 3 : (rooms >= 5 ? 2 : 1.5)

    // Size based on rooms and type
    let sizeSqm = rooms * 25 + Math.floor(Math.random() * 20)
    if (propertyType === 'VILLA') sizeSqm += 100
    if (propertyType === 'COTTAGE') sizeSqm += 50
    if (propertyType === 'GARDEN_APARTMENT') sizeSqm += 30

    // Check if Sde Dov neighborhood
    const isSdeDov = neighborhood.includes('SDE_DOV')

    // Price calculation - realistic prices (2024)
    let pricePerSqm = 0
    if (isSdeDov) {
      // Sde Dov (Tel Aviv) - Premium pricing
      if (neighborhood === 'SDE_DOV_BEACHFRONT') {
        pricePerSqm = 75000 + Math.floor(Math.random() * 25000) // Beachfront: 75,000-100,000/sqm
      } else if (neighborhood === 'SDE_DOV_NORTH') {
        pricePerSqm = 55000 + Math.floor(Math.random() * 15000) // North: 55,000-70,000/sqm
      } else {
        pricePerSqm = 60000 + Math.floor(Math.random() * 20000) // South: 60,000-80,000/sqm
      }
    } else if (neighborhood.includes('GIMMEL') || neighborhood.includes('DALED') || neighborhood.includes('HEY')) {
      pricePerSqm = 22000 + Math.floor(Math.random() * 5000) // Newer areas: 22,000-27,000/sqm
    } else if (neighborhood === 'NEVE_SHAMIR' || neighborhood === 'GIVAT_SAVION') {
      pricePerSqm = 25000 + Math.floor(Math.random() * 8000) // Premium areas: 25,000-33,000/sqm
    } else if (neighborhood === 'RBS_ALEPH' || neighborhood === 'RBS_BET') {
      pricePerSqm = 23000 + Math.floor(Math.random() * 5000) // Established areas: 23,000-28,000/sqm
    } else if (neighborhood.includes('OLD_BS')) {
      pricePerSqm = 18000 + Math.floor(Math.random() * 6000) // Old Beit Shemesh: 18,000-24,000/sqm
    } else {
      pricePerSqm = 20000 + Math.floor(Math.random() * 5000) // Other areas: 20,000-25,000/sqm
    }

    let price = 0
    if (isSale) {
      price = Math.round((sizeSqm * pricePerSqm) / 10000) * 10000 // Round to nearest 10,000
    } else {
      // Rental prices - Sde Dov is much higher than Beit Shemesh
      if (isSdeDov) {
        const baseRent = rooms * 4500 // Tel Aviv premium rentals
        price = Math.round(baseRent / 100) * 100 + Math.floor(Math.random() * 10) * 100
      } else {
        const baseRent = rooms * 1200
        price = Math.round(baseRent / 100) * 100 + Math.floor(Math.random() * 5) * 100
      }
    }

    // Floor calculation
    const totalFloors = Math.floor(Math.random() * 6) + 3 // 3-8 floors
    let floor = Math.floor(Math.random() * totalFloors) + 1
    if (propertyType === 'GARDEN_APARTMENT') floor = 0
    if (propertyType === 'PENTHOUSE') floor = totalFloors

    // Features
    const hasElevator = totalFloors > 4 || Math.random() > 0.3
    const hasSukka = Math.random() > 0.3
    const hasMamad = neighborhood.includes('GIMMEL') || neighborhood.includes('DALED') || neighborhood.includes('HEY') || Math.random() > 0.5
    const hasParking = Math.random() > 0.2
    const hasAC = Math.random() > 0.3
    const hasShabbatElevator = hasElevator && Math.random() > 0.4

    // Different titles/descriptions for Sde Dov vs Beit Shemesh
    const neighborhoodDisplay = neighborhood.replace(/_/g, ' ')
    const title = isSdeDov
      ? `${rooms}-Room ${propertyType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())} in ${neighborhoodDisplay}, Tel Aviv`
      : `${rooms}-Room ${propertyType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())} in ${neighborhoodDisplay}`
    const titleHe = isSdeDov
      ? `דירת ${rooms} חדרים ב${neighborhoodDisplay}, תל אביב`
      : `דירת ${rooms} חדרים ב${neighborhoodDisplay}`

    // Use Sde Dov specific descriptions for Tel Aviv properties
    let description: string
    if (isSdeDov) {
      description = isSale
        ? sdeDovSaleDescriptions[Math.floor(Math.random() * sdeDovSaleDescriptions.length)]
        : sdeDovRentalDescriptions[Math.floor(Math.random() * sdeDovRentalDescriptions.length)]
    } else {
      description = isSale
        ? saleDescriptions[Math.floor(Math.random() * saleDescriptions.length)]
        : rentalDescriptions[Math.floor(Math.random() * rentalDescriptions.length)]
    }

    // Map furnished status to schema enum
    const furnishedStatus = isSale
      ? 'UNFURNISHED'
      : (Math.random() > 0.6 ? 'FULLY_FURNISHED' : (Math.random() > 0.5 ? 'PARTIAL' : 'UNFURNISHED'))

    properties.push({
      title,
      titleHe,
      description,
      descriptionHe: 'תיאור הנכס בעברית יתווסף בקרוב.',
      slug: `${neighborhood.toLowerCase().replace(/_/g, '-')}-${rooms}-room-${propertyType.toLowerCase().replace(/_/g, '-')}-${i + 1}`,
      listingType,
      propertyType,
      status: 'ACTIVE',
      price,
      neighborhood,
      address: isSdeDov
        ? `${street} ${houseNumber}/${apartmentNumber}, Tel Aviv`
        : `${street} ${houseNumber}/${apartmentNumber}, Beit Shemesh`,
      addressHe: isSdeDov
        ? `${street} ${houseNumber}/${apartmentNumber}, תל אביב`
        : `${street} ${houseNumber}/${apartmentNumber}, בית שמש`,
      floor,
      totalFloors,
      rooms,
      bedrooms,
      bathrooms,
      sizeSqm,
      balconies: hasSukka ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 2),
      parking: hasParking ? Math.floor(Math.random() * 2) + 1 : 0,
      storage: Math.random() > 0.4,
      elevator: hasElevator,
      airConditioning: hasAC,
      sukka: hasSukka,
      mamad: hasMamad,
      garden: propertyType === 'GARDEN_APARTMENT' || propertyType === 'VILLA' || propertyType === 'COTTAGE',
      rooftop: propertyType === 'PENTHOUSE',
      furnished: furnishedStatus,
      renovated: Math.random() > 0.4,
      yearBuilt: neighborhood.includes('GIMMEL') || neighborhood.includes('DALED') || neighborhood.includes('HEY')
        ? 2018 + Math.floor(Math.random() * 7)
        : 2000 + Math.floor(Math.random() * 20),
      arnona: Math.floor(sizeSqm * 12) + Math.floor(Math.random() * 500),
      vaadBayit: 100 + Math.floor(Math.random() * 300),
      kosherKitchen: true,
      separateSink: Math.random() > 0.5,
      accessibleBuilding: hasElevator && Math.random() > 0.5,
      shabbatElevator: hasShabbatElevator,
      contactName: 'Sarah Rakshah',
      contactPhone: '052-000-0000',
      contactEmail: 'sarah@rakshah-realestate.com',
      isOwnerListing: Math.random() > 0.7,
      availableFrom: new Date(Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000), // Random date within 90 days
    })
  }

  return properties
}

// Generate sample images for properties
function generatePropertyImages(propertyId: string, propertyType: string) {
  // Using placeholder images - in production, these would be real photos
  const imageCount = Math.floor(Math.random() * 4) + 3 // 3-6 images
  const images = []

  const imageTypes = ['living', 'kitchen', 'bedroom', 'bathroom', 'balcony', 'exterior']

  for (let i = 0; i < imageCount; i++) {
    images.push({
      propertyId,
      url: `https://placehold.co/800x600/0d9488/white?text=${encodeURIComponent(`${propertyType} - ${imageTypes[i % imageTypes.length]}`)}`,
      caption: `${propertyType.replace(/_/g, ' ')} ${imageTypes[i % imageTypes.length]}`,
      order: i,
      isPrimary: i === 0,
    })
  }

  return images
}

async function main() {
  console.log('Starting seed...')

  // Clear existing data
  console.log('Clearing existing data...')
  await prisma.propertyImage.deleteMany()
  await prisma.inquiry.deleteMany()
  await prisma.property.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  console.log('Creating admin user...')
  const adminUser = await prisma.user.create({
    data: {
      email: 'sarah@rakshah-realestate.com',
      name: 'Sarah Rakshah',
      phone: '052-000-0000',
      role: 'ADMIN',
    },
  })
  console.log(`Created admin user: ${adminUser.email}`)

  // Generate and create properties
  console.log('Generating properties...')
  const propertiesData = await generateProperties()

  for (const propertyData of propertiesData) {
    const property = await prisma.property.create({
      data: propertyData,
    })

    // Add images
    const images = generatePropertyImages(property.id, property.propertyType)
    for (const imageData of images) {
      await prisma.propertyImage.create({
        data: imageData,
      })
    }

    console.log(`Created property: ${property.title}`)
  }

  // Create some sample inquiries
  console.log('Creating sample inquiries...')
  const properties = await prisma.property.findMany({ take: 5 })

  const sampleInquiries = [
    { name: 'David Cohen', email: 'david.cohen@email.com', phone: '054-123-4567', message: 'Hi, I am interested in viewing this property. Is it still available?' },
    { name: 'Rachel Levy', email: 'rachel.l@email.com', phone: '050-987-6543', message: 'We are a young couple looking to buy our first home. Can we schedule a viewing?' },
    { name: 'Moshe Stern', email: 'mstern@email.com', phone: '052-555-1234', message: 'What is the arnona and vaad bayit for this property?' },
    { name: 'Sarah Goldberg', email: 'sgold@email.com', phone: '058-111-2222', message: 'Is the price negotiable? We are pre-approved for a mortgage.' },
    { name: 'Yosef Katz', email: 'ykatz@email.com', phone: '053-333-4444', message: 'Is the sukka balcony covered? How big is it?' },
  ]

  for (let i = 0; i < properties.length; i++) {
    await prisma.inquiry.create({
      data: {
        propertyId: properties[i].id,
        ...sampleInquiries[i],
        status: i === 0 ? 'NEW' : (i === 1 ? 'CONTACTED' : 'SCHEDULED'),
      },
    })
  }

  console.log('Seed completed successfully!')
  console.log(`Created ${propertiesData.length} properties with images`)
  console.log(`Created ${sampleInquiries.length} sample inquiries`)
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
