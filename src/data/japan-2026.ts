/**
 * Japan 2026 trip data — migrated from docs/Japan Trip 2026 - Itinerary (shareable).html
 */

export type JapanPlaceKind = 'route_stop' | 'wishlist' | 'trail' | 'race' | 'transfer'
export type TripPhase = 'a' | 'b' | 'c' | 'air' | 'trans'

export interface JapanCoordinates {
  lat: number
  lng: number
}

export interface JapanLink {
  label: string
  url: string
}

export interface JapanPlace {
  id: string
  name: string
  region: string
  kind: JapanPlaceKind
  coordinates: JapanCoordinates
  phase?: TripPhase
  onRoute: boolean
  description?: string
  links?: JapanLink[]
  tags?: string[]
  /** Highlight on map (e.g. Nov 1 race cluster) */
  pulse?: boolean
}

export interface TripLeg {
  id: string
  label: string
  startDate: string
  endDate: string
  days: number
  phase: TripPhase
  placeIds: string[]
  highlights: string
  runNotes?: string
  dateLabel: string
}

export interface TripRace {
  id: string
  dateLabel: string
  name: string
  location: string
  distances: string
  near: string
  url: string
  placeId: string
}

export interface TripTrail {
  id: string
  base: string
  name: string
  distance: string
  description: string
  url: string
  placeId: string
}

export interface WishlistRegion {
  id: string
  title: string
  items: { name: string; description: string; placeId: string }[]
}

export const TRIP_START = '2026-11-04'
export const TRIP_END = '2026-11-27'
export const TRIP_TITLE = 'Japan 2026 — Itinerary & Map'
export const TRIP_SUBTITLE =
  'A 24-day walking trip · November 2026 · sequenced for peak autumn colour'

export const PHASE_COLORS: Record<TripPhase, string> = {
  a: '#2e7d6b',
  b: '#b5651d',
  c: '#a23b5e',
  air: '#6b7280',
  trans: '#c9a06a',
}

export const PHASE_LABELS: Record<TripPhase, string> = {
  a: 'Chūbu',
  b: 'Wakayama / Kumano',
  c: 'Kansai',
  air: 'Flights',
  trans: 'Transit',
}

export const japanPlaces: JapanPlace[] = [
  // Route stops
  {
    id: 'osaka',
    name: 'Osaka',
    region: 'Kansai',
    kind: 'route_stop',
    coordinates: { lat: 34.6937, lng: 135.5023 },
    phase: 'air',
    onRoute: true,
    description: 'Arrive and depart via KIX.',
    tags: ['food', 'urban'],
  },
  {
    id: 'kanazawa',
    name: 'Kanazawa',
    region: 'Chūbu',
    kind: 'route_stop',
    coordinates: { lat: 36.5613, lng: 136.6562 },
    phase: 'a',
    onRoute: true,
    description: 'Kenroku-en garden · Higashi Chaya geisha district · samurai quarter.',
    tags: ['culture', 'garden', 'foliage'],
  },
  {
    id: 'kiso-valley',
    name: 'Kiso Valley',
    region: 'Chūbu',
    kind: 'route_stop',
    coordinates: { lat: 35.5100, lng: 137.5830 },
    phase: 'a',
    onRoute: true,
    description: 'Magome → Tsumago Nakasendo walk (~7 km) · post towns · forest.',
    tags: ['walk', 'forest', 'history'],
  },
  {
    id: 'koyasan',
    name: 'Koyasan',
    region: 'Kansai',
    kind: 'route_stop',
    coordinates: { lat: 34.2130, lng: 135.5840 },
    phase: 'b',
    onRoute: true,
    description: 'Shukubō temple stay · Okunoin cemetery at dawn · morning prayers.',
    tags: ['temple', 'spiritual'],
  },
  {
    id: 'kii-tanabe',
    name: 'Kii-Tanabe',
    region: 'Wakayama',
    kind: 'route_stop',
    coordinates: { lat: 33.7333, lng: 135.3833 },
    phase: 'trans',
    onRoute: true,
    description: 'Transfer · stock up · Tanabe guesthouse base for Kumano Kodo.',
    tags: ['logistics'],
  },
  {
    id: 'kumano-hongu',
    name: 'Kumano Hongū',
    region: 'Wakayama',
    kind: 'route_stop',
    coordinates: { lat: 33.8414, lng: 135.7728 },
    phase: 'b',
    onRoute: true,
    description: 'Kumano Hongū Taisha — heart of the Nakahechi pilgrimage route.',
    tags: ['temple', 'walk', 'spiritual'],
  },
  {
    id: 'nachi-falls',
    name: 'Nachi Falls',
    region: 'Wakayama',
    kind: 'route_stop',
    coordinates: { lat: 33.6710, lng: 135.8905 },
    phase: 'b',
    onRoute: true,
    description: 'Nachi Falls · Kumano Nachi Taisha · Daimonzaka cedar staircase.',
    tags: ['waterfall', 'temple', 'walk'],
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    region: 'Kansai',
    kind: 'route_stop',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    phase: 'c',
    onRoute: true,
    description: "Fushimi Inari trails · Arashiyama bamboo & hills · Philosopher's Path · Eikandō foliage (peak week).",
    tags: ['temple', 'foliage', 'culture'],
  },
  {
    id: 'nara',
    name: 'Nara',
    region: 'Kansai',
    kind: 'route_stop',
    coordinates: { lat: 34.6851, lng: 135.8048 },
    phase: 'c',
    onRoute: true,
    description: 'Tōdai-ji · Kasuga Taisha · Nara Park forest trails · deer.',
    tags: ['temple', 'nature', 'foliage'],
  },
  // Kumano trail vertices
  {
    id: 'takijiri',
    name: 'Takijiri-oji',
    region: 'Wakayama',
    kind: 'transfer',
    coordinates: { lat: 33.8796, lng: 135.8284 },
    phase: 'b',
    onRoute: true,
    description: 'Traditional start of the Kumano Kodo Nakahechi route.',
    tags: ['walk'],
  },
  {
    id: 'takahara',
    name: 'Takahara',
    region: 'Wakayama',
    kind: 'transfer',
    coordinates: { lat: 33.8500, lng: 135.7900 },
    phase: 'b',
    onRoute: true,
    description: 'Kumano Kodo overnight stop — village in the clouds.',
    tags: ['walk'],
  },
  {
    id: 'chikatsuyu',
    name: 'Chikatsuyu',
    region: 'Wakayama',
    kind: 'transfer',
    coordinates: { lat: 33.8500, lng: 135.7700 },
    phase: 'b',
    onRoute: true,
    description: 'Kumano Kodo village stop between mountain passes.',
    tags: ['walk'],
  },
  {
    id: 'koguchi',
    name: 'Koguchi',
    region: 'Wakayama',
    kind: 'transfer',
    coordinates: { lat: 33.8200, lng: 135.7900 },
    phase: 'b',
    onRoute: true,
    description: 'Gateway village before the climb to Nachi.',
    tags: ['walk'],
  },
  // Wishlist — Tokyo & Kanto
  {
    id: 'tokyo',
    name: 'Tokyo',
    region: 'Kanto',
    kind: 'wishlist',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    onRoute: false,
    description: 'Yokocho food alleys; Toyosu morning tuna market + fresh sushi.',
    tags: ['food', 'urban'],
  },
  {
    id: 'hakone',
    name: 'Hakone',
    region: 'Kanto',
    kind: 'wishlist',
    coordinates: { lat: 35.2327, lng: 139.1067 },
    onRoute: false,
    description: 'Day trip: Lake Ashi, ropeway/cable car, pirate boat cruise.',
    tags: ['nature', 'onsen'],
  },
  {
    id: 'nikko',
    name: 'Nikkō',
    region: 'Kanto',
    kind: 'wishlist',
    coordinates: { lat: 36.7580, lng: 139.5988 },
    onRoute: false,
    description: 'Tōshōgū temples, Kegon Falls, waterfalls/river/mountains.',
    tags: ['temple', 'waterfall', 'foliage'],
  },
  {
    id: 'mt-fuji',
    name: 'Mt Fuji area',
    region: 'Kanto',
    kind: 'wishlist',
    coordinates: { lat: 35.3606, lng: 138.7278 },
    onRoute: false,
    description: 'Shiraito Falls at the base of Fuji.',
    tags: ['nature', 'mountain'],
  },
  // Wishlist — Chūbu
  {
    id: 'takayama',
    name: 'Takayama',
    region: 'Chūbu',
    kind: 'wishlist',
    coordinates: { lat: 36.1461, lng: 137.2522 },
    onRoute: false,
    description: 'Old town, morning markets.',
    tags: ['culture', 'food'],
  },
  {
    id: 'shirakawa-go',
    name: 'Shirakawa-gō',
    region: 'Chūbu',
    kind: 'wishlist',
    coordinates: { lat: 36.2590, lng: 136.8980 },
    onRoute: false,
    description: 'Thatched gasshō village in the Japan Alps.',
    tags: ['architecture', 'history'],
  },
  {
    id: 'ainokura',
    name: 'Ainokura / Gokayama',
    region: 'Chūbu',
    kind: 'wishlist',
    coordinates: { lat: 36.4090, lng: 136.9370 },
    onRoute: false,
    description: 'Thatched gasshō villages in a remote mountain valley.',
    tags: ['architecture', 'history'],
  },
  {
    id: 'onioshidashi',
    name: 'Onioshidashi / Mt Asama',
    region: 'Chūbu',
    kind: 'wishlist',
    coordinates: { lat: 36.2617, lng: 138.5150 },
    onRoute: false,
    description: '"Demons push out" lava field from the 1783 eruption.',
    tags: ['nature', 'volcano'],
  },
  // Wishlist — Chūgoku
  {
    id: 'hiroshima',
    name: 'Hiroshima',
    region: 'Chūgoku',
    kind: 'wishlist',
    coordinates: { lat: 34.3853, lng: 132.4553 },
    onRoute: false,
    description: 'Peace Memorial Park and museum.',
    tags: ['history', 'culture'],
  },
  {
    id: 'miyajima',
    name: 'Miyajima',
    region: 'Chūgoku',
    kind: 'wishlist',
    coordinates: { lat: 34.2958, lng: 132.3197 },
    onRoute: false,
    description: 'Itsukushima floating torii (ferry from Hiroshima).',
    tags: ['temple', 'island'],
  },
  {
    id: 'motonosumi',
    name: 'Motonosumi Shrine',
    region: 'Chūgoku',
    kind: 'wishlist',
    coordinates: { lat: 34.4427, lng: 131.0792 },
    onRoute: false,
    description: 'Red torii gates leading to the sea in Nagato.',
    tags: ['shrine', 'coast'],
  },
  {
    id: 'tottori-dunes',
    name: 'Tottori Sand Dunes',
    region: 'Chūgoku',
    kind: 'wishlist',
    coordinates: { lat: 35.5407, lng: 134.2290 },
    onRoute: false,
    description: 'Dunes behind pine forest on the Sea of Japan coast.',
    tags: ['nature', 'coast'],
  },
  // Wishlist — Islands & remote
  {
    id: 'oboke',
    name: 'Ōboke Gorge',
    region: 'Shikoku',
    kind: 'wishlist',
    coordinates: { lat: 33.7820, lng: 133.6900 },
    onRoute: false,
    description: 'Dramatic gorge in the Iya Valley.',
    tags: ['nature', 'gorge'],
  },
  {
    id: 'takachiho',
    name: 'Takachiho Gorge',
    region: 'Kyushu',
    kind: 'wishlist',
    coordinates: { lat: 32.7123, lng: 131.3089 },
    onRoute: false,
    description: 'Manai Falls, Amano-Iwato cave (Amaterasu myth).',
    tags: ['mythology', 'waterfall'],
  },
  {
    id: 'kakunodate',
    name: 'Kakunodate',
    region: 'Tōhoku',
    kind: 'wishlist',
    coordinates: { lat: 39.5900, lng: 140.5639 },
    onRoute: false,
    description: 'Samurai street in Akita prefecture.',
    tags: ['history', 'architecture'],
  },
  {
    id: 'oyasu-gorge',
    name: 'Oyasu Gorge',
    region: 'Tōhoku',
    kind: 'wishlist',
    coordinates: { lat: 39.1197, lng: 139.9339 },
    onRoute: false,
    description: 'Scenic gorge — car needed.',
    tags: ['nature', 'gorge'],
  },
  {
    id: 'yakushima',
    name: 'Yakushima',
    region: 'Islands',
    kind: 'wishlist',
    coordinates: { lat: 30.3517, lng: 130.4986 },
    onRoute: false,
    description: 'Ancient cedar forest (Jōmon Sugi). Wet year-round.',
    tags: ['forest', 'island', 'hike'],
  },
  {
    id: 'okinawa',
    name: 'Okinawa',
    region: 'Islands',
    kind: 'wishlist',
    coordinates: { lat: 26.2124, lng: 127.6792 },
    onRoute: false,
    description: 'Diving and coral reefs (wetsuit in November).',
    tags: ['dive', 'island', 'beach'],
  },
  {
    id: 'miyako',
    name: 'Miyako Islands',
    region: 'Islands',
    kind: 'wishlist',
    coordinates: { lat: 24.7933, lng: 125.2847 },
    onRoute: false,
    description: 'Crystal-clear water and coral reefs.',
    tags: ['dive', 'island', 'beach'],
  },
  // Trail runs
  {
    id: 'trail-daimonji',
    name: 'Mount Daimonji',
    region: 'Kansai',
    kind: 'trail',
    coordinates: { lat: 35.0270, lng: 135.7850 },
    onRoute: false,
    description: '~4 km, city-view bonfire site above Kyoto.',
    links: [
      { label: 'AllTrails', url: 'https://www.alltrails.com/trail/japan/kyoto/mount-daimonji-ginkaku-ji' },
      { label: 'Kyoto trail running', url: 'https://www.alltrails.com/japan/kyoto/kyoto/trail-running' },
    ],
    tags: ['run', 'trail'],
  },
  {
    id: 'trail-kintoki',
    name: 'Mount Kintoki',
    region: 'Kanto',
    kind: 'trail',
    coordinates: { lat: 35.2625, lng: 139.0255 },
    onRoute: false,
    description: '~4.7 km, close Fuji views; chained scramble near Hakone.',
    links: [{ label: 'AllTrails', url: 'https://www.alltrails.com/trail/japan/kanagawa/mount-kintoki' }],
    tags: ['run', 'trail'],
  },
  {
    id: 'trail-kegon',
    name: 'Kegon Falls → Akechidaira',
    region: 'Kanto',
    kind: 'trail',
    coordinates: { lat: 36.7397, lng: 139.4978 },
    onRoute: false,
    description: 'Autumn colour trail near Nikkō.',
    links: [{ label: 'AllTrails', url: 'https://www.alltrails.com/trail/japan/tochigi/chuzenji-onsen-bus-stop-kegon-falls' }],
    tags: ['run', 'trail', 'foliage'],
  },
  {
    id: 'trail-kawaguchi',
    name: 'Lake Kawaguchi Walk',
    region: 'Kanto',
    kind: 'trail',
    coordinates: { lat: 35.5127, lng: 138.7558 },
    onRoute: false,
    description: '~18 km flat, postcard Fuji views — most runnable.',
    links: [{ label: 'AllTrails', url: 'https://www.alltrails.com/parks/japan/yamanashi/fuji-hakone-izu-national-park/trail-running' }],
    tags: ['run', 'trail'],
  },
  {
    id: 'trail-nakasendo',
    name: 'Magome → Tsumago',
    region: 'Chūbu',
    kind: 'trail',
    coordinates: { lat: 35.5100, lng: 137.5830 },
    onRoute: true,
    description: '~7 km Nakasendo — run the leg one of you isn\'t walking.',
    links: [{ label: 'AllTrails', url: 'https://www.alltrails.com/trail/japan/gifu/nakasendo-magome-tsumago' }],
    tags: ['run', 'walk'],
  },
  {
    id: 'trail-nachi-loop',
    name: 'Nachi Falls–Daimonzaka loop',
    region: 'Wakayama',
    kind: 'trail',
    coordinates: { lat: 33.6710, lng: 135.8905 },
    onRoute: true,
    description: '~4.7 km, ancient cedar staircase.',
    links: [{ label: 'AllTrails', url: 'https://www.alltrails.com/trail/japan/wakayama/nachi-falls-kumano-nachi-taisha-daimonzaka-parking-lot-loop' }],
    tags: ['run', 'trail'],
  },
  {
    id: 'trail-misen',
    name: 'Mt Misen – Daishoin',
    region: 'Chūgoku',
    kind: 'trail',
    coordinates: { lat: 34.2433, lng: 132.3150 },
    onRoute: false,
    description: '~5.3 km, sacred summit on Miyajima.',
    links: [{ label: 'AllTrails', url: 'https://www.alltrails.com/trail/japan/hiroshima/mount-misen-daishoin-course' }],
    tags: ['run', 'trail'],
  },
  {
    id: 'trail-shiratani',
    name: 'Shiratani Unsuikyō',
    region: 'Islands',
    kind: 'trail',
    coordinates: { lat: 30.3470, lng: 130.5240 },
    onRoute: false,
    description: '~6 km moss forest on Yakushima.',
    links: [{ label: 'AllTrails', url: 'https://www.alltrails.com/trail/japan/kagoshima--2/shiratani-unsuikyo-ravine--2' }],
    tags: ['run', 'trail', 'forest'],
  },
  // Races
  {
    id: 'race-biwa',
    name: 'Lake Biwa 100 (UTMB)',
    region: 'Kansai',
    kind: 'race',
    coordinates: { lat: 35.0047, lng: 135.8686 },
    onRoute: false,
    description: '169 km ultra near Kyoto (15 min from Ōtsu). Oct 30–Nov 1.',
    links: [{ label: 'Race info', url: 'https://ultraracecalendar.com/calendar/2026/ultras/japan/' }],
    tags: ['race', 'ultra'],
    pulse: true,
  },
  {
    id: 'race-nakanoto',
    name: 'Nakanoto Treasure Trail',
    region: 'Chūbu',
    kind: 'race',
    coordinates: { lat: 37.3182, lng: 137.1633 },
    onRoute: false,
    description: '15 / 25.7 / 47.8 km trail race in Noto, Ishikawa. Nov 1.',
    links: [{ label: 'Race info', url: 'https://www.ahotu.com/calendar/trail-running/japan' }],
    tags: ['race', 'trail'],
    pulse: true,
  },
  {
    id: 'race-shimonoseki',
    name: 'Shimonoseki Kaikyō Marathon',
    region: 'Chūgoku',
    kind: 'race',
    coordinates: { lat: 33.9578, lng: 130.9414 },
    onRoute: false,
    description: '42 km marathon in Yamaguchi. Nov 1. Registration from 15 May.',
    links: [{ label: 'Race info', url: 'https://www.ahotu.com/event/shimonoseki-kaikyo-marathon' }],
    tags: ['race', 'marathon'],
    pulse: true,
  },
  {
    id: 'race-fukuoka',
    name: 'Fukuoka Marathon',
    region: 'Kyushu',
    kind: 'race',
    coordinates: { lat: 33.5904, lng: 130.4017 },
    onRoute: false,
    description: '42 km marathon. Nov 8. Registration from 20 Apr.',
    links: [{ label: 'Race info', url: 'https://www.ahotu.com/event/fukuoka-marathon' }],
    tags: ['race', 'marathon'],
  },
  {
    id: 'race-kaga',
    name: 'Kaga Spa Trail Endurance 100 (UTMB)',
    region: 'Chūbu',
    kind: 'race',
    coordinates: { lat: 36.3094, lng: 136.3075 },
    onRoute: false,
    description: 'Up to 100 km near Kanazawa. Nov 26–28.',
    links: [{ label: 'Race info', url: 'https://kagaspa.utmb.world/' }],
    tags: ['race', 'ultra'],
  },
]

export const tripLegs: TripLeg[] = [
  {
    id: 'arrive-osaka',
    label: 'Osaka',
    dateLabel: 'Nov 4',
    startDate: '2026-11-04',
    endDate: '2026-11-04',
    days: 1,
    phase: 'air',
    placeIds: ['osaka'],
    highlights: 'Arrive KIX, settle',
    runNotes: '—',
  },
  {
    id: 'kanazawa',
    label: 'Kanazawa',
    dateLabel: 'Nov 5–7',
    startDate: '2026-11-05',
    endDate: '2026-11-07',
    days: 3,
    phase: 'a',
    placeIds: ['kanazawa'],
    highlights: 'Kenroku-en garden · Higashi Chaya geisha district · samurai quarter',
    runNotes: 'Ishikawa races nearby*',
  },
  {
    id: 'kiso-valley',
    label: 'Kiso Valley',
    dateLabel: 'Nov 8–10',
    startDate: '2026-11-08',
    endDate: '2026-11-10',
    days: 3,
    phase: 'a',
    placeIds: ['kiso-valley', 'trail-nakasendo'],
    highlights: 'Magome → Tsumago Nakasendo walk (~7 km) · post towns · forest',
    runNotes: 'run the Nakasendo leg',
  },
  {
    id: 'koyasan',
    label: 'Koyasan',
    dateLabel: 'Nov 11–12',
    startDate: '2026-11-11',
    endDate: '2026-11-12',
    days: 2,
    phase: 'b',
    placeIds: ['koyasan'],
    highlights: 'Shukubō temple stay · Okunoin cemetery at dawn · morning prayers',
    runNotes: 'quiet forest paths',
  },
  {
    id: 'tanabe-transfer',
    label: '→ Kii-Tanabe',
    dateLabel: 'Nov 13',
    startDate: '2026-11-13',
    endDate: '2026-11-13',
    days: 1,
    phase: 'trans',
    placeIds: ['kii-tanabe'],
    highlights: 'Transfer · stock up · Tanabe guesthouse',
    runNotes: '—',
  },
  {
    id: 'kumano-kodo',
    label: 'Kumano Kodo',
    dateLabel: 'Nov 14–17',
    startDate: '2026-11-14',
    endDate: '2026-11-17',
    days: 4,
    phase: 'b',
    placeIds: ['takijiri', 'takahara', 'chikatsuyu', 'kumano-hongu', 'koguchi', 'nachi-falls', 'trail-nachi-loop'],
    highlights: 'Nakahechi: Takijiri→Takahara→Chikatsuyu→Hongū→(boat)→Koguchi→Nachi Falls · onsen ryokan',
    runNotes: 'Nachi Falls loop; run sections',
  },
  {
    id: 'kyoto-transfer',
    label: '→ Kyoto',
    dateLabel: 'Nov 18',
    startDate: '2026-11-18',
    endDate: '2026-11-18',
    days: 1,
    phase: 'trans',
    placeIds: ['kyoto'],
    highlights: 'Train up the coast',
    runNotes: '—',
  },
  {
    id: 'kyoto',
    label: 'Kyoto',
    dateLabel: 'Nov 19–24',
    startDate: '2026-11-19',
    endDate: '2026-11-24',
    days: 6,
    phase: 'c',
    placeIds: ['kyoto', 'trail-daimonji'],
    highlights: "Fushimi Inari trails · Arashiyama bamboo & hills · Philosopher's Path · Eikandō foliage (peak week)",
    runNotes: 'Mount Daimonji morning run',
  },
  {
    id: 'nara',
    label: 'Nara',
    dateLabel: 'Nov 25–26',
    startDate: '2026-11-25',
    endDate: '2026-11-26',
    days: 2,
    phase: 'c',
    placeIds: ['nara'],
    highlights: 'Tōdai-ji · Kasuga Taisha · Nara Park forest trails · deer',
    runNotes: 'gentle park trails',
  },
  {
    id: 'depart-osaka',
    label: 'Osaka',
    dateLabel: 'Nov 27',
    startDate: '2026-11-27',
    endDate: '2026-11-27',
    days: 1,
    phase: 'air',
    placeIds: ['osaka'],
    highlights: 'Depart KIX',
    runNotes: '—',
  },
]

export const tripRaces: TripRace[] = [
  {
    id: 'race-biwa-row',
    dateLabel: 'Oct 30–Nov 1',
    name: 'Lake Biwa 100 (UTMB)',
    location: 'Ōtsu, Shiga',
    distances: '169 km',
    near: 'Kyoto (15 min)',
    url: 'https://ultraracecalendar.com/calendar/2026/ultras/japan/',
    placeId: 'race-biwa',
  },
  {
    id: 'race-nakanoto-row',
    dateLabel: 'Nov 1',
    name: 'Nakanoto Treasure Trail',
    location: 'Noto, Ishikawa',
    distances: '15 / 25.7 / 47.8 km',
    near: 'Kanazawa',
    url: 'https://www.ahotu.com/calendar/trail-running/japan',
    placeId: 'race-nakanoto',
  },
  {
    id: 'race-shimonoseki-row',
    dateLabel: 'Nov 1',
    name: 'Shimonoseki Kaikyō Marathon',
    location: 'Yamaguchi',
    distances: '42 km',
    near: 'Nagato/Hiroshima · reg 15 May',
    url: 'https://www.ahotu.com/event/shimonoseki-kaikyo-marathon',
    placeId: 'race-shimonoseki',
  },
  {
    id: 'race-fukuoka-row',
    dateLabel: 'Nov 8',
    name: 'Fukuoka Marathon',
    location: 'Fukuoka',
    distances: '42 km',
    near: 'Kyushu · reg 20 Apr',
    url: 'https://www.ahotu.com/event/fukuoka-marathon',
    placeId: 'race-fukuoka',
  },
  {
    id: 'race-kaga-row',
    dateLabel: 'Nov 26–28',
    name: 'Kaga Spa Trail Endurance 100 (UTMB)',
    location: 'Kaga, Ishikawa',
    distances: 'up to 100',
    near: 'Kanazawa',
    url: 'https://kagaspa.utmb.world/',
    placeId: 'race-kaga',
  },
]

export const tripTrails: TripTrail[] = [
  {
    id: 'trail-daimonji-row',
    base: 'Kyoto',
    name: 'Mount Daimonji',
    distance: '~4 km',
    description: 'City-view bonfire site',
    url: 'https://www.alltrails.com/trail/japan/kyoto/mount-daimonji-ginkaku-ji',
    placeId: 'trail-daimonji',
  },
  {
    id: 'trail-kintoki-row',
    base: 'Hakone',
    name: 'Mount Kintoki',
    distance: '~4.7 km',
    description: 'Close Fuji views; chained scramble',
    url: 'https://www.alltrails.com/trail/japan/kanagawa/mount-kintoki',
    placeId: 'trail-kintoki',
  },
  {
    id: 'trail-kegon-row',
    base: 'Nikkō',
    name: 'Kegon Falls → Akechidaira',
    distance: 'varies',
    description: 'Autumn colour',
    url: 'https://www.alltrails.com/trail/japan/tochigi/chuzenji-onsen-bus-stop-kegon-falls',
    placeId: 'trail-kegon',
  },
  {
    id: 'trail-kawaguchi-row',
    base: 'Mt Fuji',
    name: 'Lake Kawaguchi Walk',
    distance: '~18 km',
    description: 'Flat, postcard Fuji — most runnable',
    url: 'https://www.alltrails.com/parks/japan/yamanashi/fuji-hakone-izu-national-park/trail-running',
    placeId: 'trail-kawaguchi',
  },
  {
    id: 'trail-nakasendo-row',
    base: 'Kiso Valley',
    name: 'Magome → Tsumago',
    distance: '~7 km',
    description: "Run the leg one of you isn't walking",
    url: 'https://www.alltrails.com/trail/japan/gifu/nakasendo-magome-tsumago',
    placeId: 'trail-nakasendo',
  },
  {
    id: 'trail-nachi-row',
    base: 'Kumano / Tanabe',
    name: 'Nachi Falls–Daimonzaka loop',
    distance: '~4.7 km',
    description: 'Ancient cedar staircase',
    url: 'https://www.alltrails.com/trail/japan/wakayama/nachi-falls-kumano-nachi-taisha-daimonzaka-parking-lot-loop',
    placeId: 'trail-nachi-loop',
  },
  {
    id: 'trail-misen-row',
    base: 'Hiroshima/Miyajima',
    name: 'Mt Misen – Daishoin',
    distance: '~5.3 km',
    description: 'Sacred summit',
    url: 'https://www.alltrails.com/trail/japan/hiroshima/mount-misen-daishoin-course',
    placeId: 'trail-misen',
  },
  {
    id: 'trail-shiratani-row',
    base: 'Yakushima',
    name: 'Shiratani Unsuikyō',
    distance: '~6 km',
    description: 'Moss forest',
    url: 'https://www.alltrails.com/trail/japan/kagoshima--2/shiratani-unsuikyo-ravine--2',
    placeId: 'trail-shiratani',
  },
]

export const wishlistRegions: WishlistRegion[] = [
  {
    id: 'kanto',
    title: 'Tokyo & Kanto (east)',
    items: [
      { name: 'Tokyo', description: 'Yokocho food alleys; Toyosu morning tuna market + fresh sushi.', placeId: 'tokyo' },
      { name: 'Hakone', description: 'Day trip: Lake Ashi, ropeway/cable car, pirate boat cruise.', placeId: 'hakone' },
      { name: 'Nikkō', description: 'Tōshōgū temples, Kegon Falls, waterfalls/river/mountains.', placeId: 'nikko' },
      { name: 'Mt Fuji area', description: 'Shiraito Falls at the base of Fuji.', placeId: 'mt-fuji' },
    ],
  },
  {
    id: 'chubu',
    title: 'Central Japan — Japan Alps & Chūbu',
    items: [
      { name: 'Nakasendo (Kiso Valley)', description: 'Tsumago → Magome ~8 km samurai trail; bus between towns.', placeId: 'kiso-valley' },
      { name: 'Takayama', description: 'Old town, morning markets. Kanazawa — Kenroku-en, samurai/geisha districts.', placeId: 'takayama' },
      { name: 'Shirakawa-gō & Ainokura/Gokayama', description: 'Thatched gasshō villages.', placeId: 'shirakawa-go' },
      { name: 'Onioshidashi / Mt Asama', description: '"Demons push out" lava field (1783 eruption).', placeId: 'onioshidashi' },
    ],
  },
  {
    id: 'kansai',
    title: 'Kansai — Kyoto, Nara, Wakayama',
    items: [
      { name: 'Kyoto', description: 'Best for foliage — temples, shrines, gardens, Arashiyama bamboo grove.', placeId: 'kyoto' },
      { name: 'Kōyasan', description: 'Temple stay (shukubō), Okunoin cemetery.', placeId: 'koyasan' },
      { name: 'Kumano Kodo', description: 'Pilgrimage, Nachi Falls, cedar & cypress forest.', placeId: 'nachi-falls' },
    ],
  },
  {
    id: 'chugoku',
    title: 'Western Honshu — Chūgoku',
    items: [
      { name: 'Hiroshima', description: 'Peace Park. Miyajima — Itsukushima floating torii (ferry).', placeId: 'hiroshima' },
      { name: 'Motonosumi Shrine, Nagato', description: 'Red torii to the sea.', placeId: 'motonosumi' },
      { name: 'Tottori Sand Dunes', description: 'Dunes behind pine forest.', placeId: 'tottori-dunes' },
    ],
  },
  {
    id: 'remote',
    title: 'Shikoku · Kyushu · Tōhoku · Islands',
    items: [
      { name: 'Ōboke Gorge', description: 'Iya Valley dramatic gorge.', placeId: 'oboke' },
      { name: 'Takachiho Gorge', description: 'Manai Falls, Amano-Iwato (Amaterasu myth).', placeId: 'takachiho' },
      { name: 'Kakunodate', description: 'Samurai street (Akita). Oyasu Gorge — car needed.', placeId: 'kakunodate' },
      { name: 'Yakushima', description: 'Ancient cedar (Jōmon Sugi).', placeId: 'yakushima' },
      { name: 'Okinawa & Miyako Is.', description: 'Diving / coral reefs.', placeId: 'okinawa' },
    ],
  },
]

export const routeFlowChips = [
  { label: 'Osaka', phase: 'air' as TripPhase, days: undefined, icon: '✈' },
  { label: 'Kanazawa', phase: 'a' as TripPhase, days: '3d' },
  { label: 'Kiso Valley', phase: 'a' as TripPhase, days: '3d' },
  { label: 'Koyasan', phase: 'b' as TripPhase, days: '2d' },
  { label: 'Kii-Tanabe', phase: 'b' as TripPhase, days: undefined },
  { label: 'Kumano Hongū', phase: 'b' as TripPhase, days: undefined },
  { label: 'Nachi Falls', phase: 'b' as TripPhase, days: 'Kumano Kodo 4d' },
  { label: 'Kyoto', phase: 'c' as TripPhase, days: '6d' },
  { label: 'Nara', phase: 'c' as TripPhase, days: '2d' },
  { label: 'Osaka', phase: 'air' as TripPhase, days: undefined, icon: '✈' },
]

/** Ordered route polyline coordinates (main legs + Kumano detail) */
export const routePolyline: JapanCoordinates[] = [
  { lat: 34.6937, lng: 135.5023 },
  { lat: 36.5613, lng: 136.6562 },
  { lat: 35.5100, lng: 137.5830 },
  { lat: 34.2130, lng: 135.5840 },
  { lat: 33.7333, lng: 135.3833 },
  { lat: 33.8796, lng: 135.8284 },
  { lat: 33.8500, lng: 135.7900 },
  { lat: 33.8500, lng: 135.7700 },
  { lat: 33.8414, lng: 135.7728 },
  { lat: 33.8200, lng: 135.7900 },
  { lat: 33.6710, lng: 135.8905 },
  { lat: 35.0116, lng: 135.7681 },
  { lat: 34.6851, lng: 135.8048 },
  { lat: 34.6937, lng: 135.5023 },
]

export const kumanoPolyline: JapanCoordinates[] = [
  { lat: 33.8796, lng: 135.8284 },
  { lat: 33.8500, lng: 135.7900 },
  { lat: 33.8500, lng: 135.7700 },
  { lat: 33.8414, lng: 135.7728 },
  { lat: 33.8200, lng: 135.7900 },
  { lat: 33.6710, lng: 135.8905 },
]

export type MapLayer = 'route' | 'wishlist' | 'trails' | 'races'

export const DEFAULT_LAYERS: Record<MapLayer, boolean> = {
  route: true,
  wishlist: false,
  trails: true,
  races: false,
}

export function getPlaceById(id: string): JapanPlace | undefined {
  return japanPlaces.find((p) => p.id === id)
}

/** Map layer that must be enabled for a place's marker to render. */
export function getLayerForPlaceKind(kind: JapanPlaceKind): MapLayer {
  switch (kind) {
    case 'wishlist':
      return 'wishlist'
    case 'trail':
      return 'trails'
    case 'race':
      return 'races'
    default:
      return 'route'
  }
}

export function getPlacesByKind(kind: JapanPlaceKind): JapanPlace[] {
  return japanPlaces.filter((p) => p.kind === kind)
}

export function getPlacesForLayers(layers: Record<MapLayer, boolean>): JapanPlace[] {
  const result: JapanPlace[] = []
  if (layers.route) {
    result.push(...japanPlaces.filter((p) => p.onRoute && (p.kind === 'route_stop' || p.kind === 'transfer')))
  }
  if (layers.wishlist) {
    result.push(...japanPlaces.filter((p) => p.kind === 'wishlist'))
  }
  if (layers.trails) {
    result.push(...japanPlaces.filter((p) => p.kind === 'trail'))
  }
  if (layers.races) {
    result.push(...japanPlaces.filter((p) => p.kind === 'race'))
  }
  const seen = new Set<string>()
  return result.filter((p) => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })
}

export function googleMapsUrl(place: JapanPlace): string {
  const { lat, lng } = place.coordinates
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}

export function getLegBounds(leg: TripLeg): [JapanCoordinates, JapanCoordinates] | null {
  const places = leg.placeIds.map(getPlaceById).filter(Boolean) as JapanPlace[]
  if (places.length === 0) return null
  const lats = places.map((p) => p.coordinates.lat)
  const lngs = places.map((p) => p.coordinates.lng)
  return [
    { lat: Math.min(...lats), lng: Math.min(...lngs) },
    { lat: Math.max(...lats), lng: Math.max(...lngs) },
  ]
}

export const tripOverview =
  'Two travellers (splitting up at times — one walks while the other buses ahead and meets — and walking some sections together). November 2026: cool, dry, and Japan\'s best month for autumn colour (kōyō), which moves south through the month and peaks in many temple areas in the second half of November.'

export const seasonalWarning =
  "Doesn't work in November: Kawachi Wisteria (Apr–May only) · Hitachi Seaside Park (flowers peak spring/mid-Oct) · Kamikōchi (closes ~mid-Nov for winter — only if very early in the trip). Yakushima works year-round but is wet."

export const foliageNote =
  'Central/mountains peak early–mid Nov; Kyoto & Nara gardens peak the last week — this order chases the colour. Races: the Ishikawa races near Kanazawa are Nov 1 & Nov 26–28; to catch the Nov 1 trail race, start ~Oct 30 in Kanazawa (Kyoto then lands slightly before absolute peak).'

export const kumanoLodging = [
  { name: 'GuestHouse Aizu', price: '$29' },
  { name: 'Shin Kumano', price: '$31' },
  { name: 'Nagisa', price: '$38' },
  { name: 'Ogawaya', price: '$39' },
]

export const logisticsItems = [
  'Transit: Pasmo / Welcome Suica IC card. Car for Oyasu Gorge, Tottori, rural spots.',
  'Flight tips (Mum): hydrate (own bottle), keep legs moving + compression socks (DVT), eye mask + earplugs, stay warm, build buffers.',
  'Decide: total days (sets what extras fit) · book Kumano/Tanabe lodging ASAP · race vs. guaranteed peak Kyoto colour.',
]
