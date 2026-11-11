const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

const avatar = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&h=200&q=80`

export const listings = [
  {
    id: 'lagos-loft',
    title: 'Sunlit Loft in Victoria Island',
    location: 'Lagos, Nigeria',
    pricePerNight: 95,
    rating: 4.92,
    reviewCount: 128,
    beds: 2,
    baths: 1,
    guests: 4,
    tags: ['City views', 'Workspace', 'Walkable'],
    images: [
      img('photo-1522708323590-d24dbb6b0267'),
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1493809842364-78817add7ffb'),
      img('photo-1484154218962-a197022b5858'),
    ],
    description:
      'A bright open-plan loft with floor-to-ceiling windows and skyline views. Minutes from restaurants, galleries and the waterfront. Walk through it in 3D before you book.',
    amenities: ['Fast Wi-Fi', 'Air conditioning', 'Backup power', 'Full kitchen', 'Washer', 'Secure parking'],
    host: {
      name: 'Adaeze',
      avatarUrl: avatar('photo-1494790108377-be9c29b29330'),
    },
    area:
      'Victoria Island is Lagos at its most polished: waterfront promenades, galleries, rooftop bars and some of the city’s best dining within minutes. Traffic can be heavy at rush hour, so a short ride often beats a long walk.',
    tour3d: true,
    modelPath: '/models/apartment.glb',
  },
  {
    id: 'lekki-waterfront',
    title: 'Lagoon-View Apartment in Lekki',
    location: 'Lagos, Nigeria',
    pricePerNight: 85,
    rating: 4.86,
    reviewCount: 74,
    beds: 2,
    baths: 2,
    guests: 4,
    tags: ['Lagoon views', 'Pool', 'Gated'],
    images: [
      img('photo-1600607687939-ce8a6c25118c'),
      img('photo-1600566753190-17f0baa2a6c3'),
      img('photo-1560185007-cde436f6a4d0'),
    ],
    description:
      'A calm two-bedroom apartment overlooking the lagoon, in a gated estate with a pool and round-the-clock security. Cafés, beach spots and markets are a short drive away. Ideal for longer stays and remote work.',
    amenities: ['Fast Wi-Fi', 'Pool', 'Backup power', 'Air conditioning', 'Full kitchen', 'Secure parking'],
    host: {
      name: 'Tunde',
      avatarUrl: avatar('photo-1472099645785-5658abf4ff4e'),
    },
    area:
      'Lekki’s lagoon side is calmer and greener than the mainland, with beach clubs, markets and weekend art spots nearby. It’s a popular base for remote work and longer stays.',
    tour3d: false,
  },
  {
    id: 'lisbon-terrace',
    title: 'Terrace Apartment in Alfama',
    location: 'Lisbon, Portugal',
    pricePerNight: 120,
    rating: 4.85,
    reviewCount: 214,
    beds: 1,
    baths: 1,
    guests: 2,
    tags: ['Terrace', 'Historic', 'Romantic'],
    images: [
      img('photo-1560448204-e02f11c3d0e2'),
      img('photo-1505691938895-1758d7feb511'),
      img('photo-1540518614846-7eded433c457'),
    ],
    description:
      'A cozy apartment with a private terrace overlooking terracotta rooftops. Surrounded by tiled lanes, fado bars and tram stops. Perfect for a slow city break.',
    amenities: ['Wi-Fi', 'Terrace', 'Espresso machine', 'Heating', 'Self check-in'],
    host: {
      name: 'Miguel',
      avatarUrl: avatar('photo-1507003211169-0a1dd7228f2d'),
    },
    area:
      'Alfama is Lisbon’s oldest quarter, a maze of steep lanes, viewpoints and fado bars. Comfortable shoes help, as there are lots of stairs.',
    tour3d: false,
  },
  {
    id: 'kyoto-machiya',
    title: 'Quiet Machiya near Gion',
    location: 'Kyoto, Japan',
    pricePerNight: 165,
    rating: 4.97,
    reviewCount: 89,
    beds: 3,
    baths: 1,
    guests: 5,
    tags: ['Traditional', 'Garden', 'Quiet'],
    images: [
      img('photo-1554995207-c18c203602cb'),
      img('photo-1507089947368-19c1da9775ae'),
      img('photo-1556909114-f6e7ad7d3136'),
      img('photo-1502005229762-cf1b2da7c5d6'),
    ],
    description:
      'A restored townhouse that blends wooden beams with modern comfort. Enjoy a small courtyard garden and a deep soaking tub. Temples and tea houses are a short stroll away.',
    amenities: ['Wi-Fi', 'Soaking tub', 'Courtyard garden', 'Kitchen', 'Washer', 'Air conditioning'],
    host: {
      name: 'Haruka',
      avatarUrl: avatar('photo-1438761681033-6461ffad8d80'),
    },
    area:
      'Gion is known for teahouses, lantern-lit lanes and nearby temples. Early mornings are the quietest time to wander.',
    tour3d: false,
  },
  {
    id: 'cape-town-villa',
    title: 'Hillside Villa with Pool',
    location: 'Cape Town, South Africa',
    pricePerNight: 240,
    rating: 4.88,
    reviewCount: 167,
    beds: 4,
    baths: 3,
    guests: 8,
    tags: ['Pool', 'Ocean views', 'Family friendly'],
    images: [
      img('photo-1512917774080-9991f1c4c750'),
      img('photo-1564013799919-ab600027ffc6'),
      img('photo-1600596542815-ffad4c1539a9'),
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1598928506311-c55ded91a20c'),
    ],
    description:
      'A spacious villa set into the hillside with a heated pool and sweeping views of the bay. Large living areas open onto sunny decks. Ideal for families and groups.',
    amenities: ['Heated pool', 'Braai area', 'Wi-Fi', 'Backup power', 'Full kitchen', 'Free parking'],
    host: {
      name: 'Thabo',
      avatarUrl: avatar('photo-1500648767791-00dcc994a43e'),
    },
    area:
      'The hillside gives you bay views and fresh mountain air, with beaches, wine estates and hiking trails a short drive away. A car makes everything easier.',
    tour3d: false,
  },
  {
    id: 'mexico-city-studio',
    title: 'Designer Studio in Roma Norte',
    location: 'Mexico City, Mexico',
    pricePerNight: 78,
    rating: 4.79,
    reviewCount: 302,
    beds: 1,
    baths: 1,
    guests: 2,
    tags: ['Design', 'Cafés nearby', 'Remote work'],
    images: [
      img('photo-1449844908441-8829872d2607'),
      img('photo-1518780664697-55e3ad937233'),
      img('photo-1568605114967-8130f3a36994'),
    ],
    description:
      'A compact studio with warm textures, plants and a dedicated desk. Tree-lined streets, bakeries and bookshops are right outside the door. Great for longer stays.',
    amenities: ['Wi-Fi', 'Desk', 'Kitchenette', 'Air conditioning', 'Self check-in'],
    host: {
      name: 'Valeria',
      avatarUrl: avatar('photo-1544005313-94ddf0286df2'),
    },
    area:
      'Roma Norte is a leafy neighborhood of cafés, bookshops and Art Deco facades, easy to explore entirely on foot.',
    tour3d: false,
  },
]

export const getListingById = (id) => listings.find((l) => l.id === id)