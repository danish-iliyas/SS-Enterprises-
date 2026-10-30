// Starter content loaded by `npm run seed`. Everything here can be edited later from the admin panel.

const L = (en, hi) => ({ en, hi });

export const settings = {
  businessName: 'SS Enterprises',
  tagline: L('Your Trusted Home Appliance Service Expert.', 'Aapke Ghar Ke Appliances Ka Bharosemand Service Partner.'),
  phone: '8182818841',
  whatsapp: '918182818841',
  email: '',
  address: L(
    'Zara Technical Institute Ke Samne, Garwar Road, Ballia, Uttar Pradesh',
    'Zara Technical Institute Ke Samne, Garwar Road, Ballia, Uttar Pradesh'
  ),
  hours: L('Mon – Sun: 9:00 AM – 8:00 PM', 'Somvaar – Ravivaar: Subah 9 se Raat 8 baje tak'),
  serviceArea: L('Ballia and nearby areas', 'Ballia aur aas-paas ke ilaake'),
  mapEmbedUrl: 'https://www.google.com/maps?q=Zara+Technical+Institute,+Garwar+Road,+Ballia,+Uttar+Pradesh&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Zara+Technical+Institute+Garwar+Road+Ballia',
  about: L(
    'SS Enterprises is a local home appliance repair, maintenance, installation and spare-parts business based in Ballia, Uttar Pradesh.\n\nWe provide solutions for RO water purifiers, air conditioners, coolers, washing machines, refrigerators, geysers and electrical appliances.\n\nOur goal is to provide reliable service, affordable pricing and convenient home appliance solutions to customers in Ballia and nearby areas.',
    'SS Enterprises Ballia, Uttar Pradesh ka ek local business hai jo ghar ke appliances ki repair, maintenance, installation aur spare parts ka kaam karta hai.\n\nHum RO water purifier, AC, cooler, washing machine, fridge, geyser aur bijli ke kaam ki service dete hain.\n\nHamara lakshya hai Ballia aur aas-paas ke logon ko bharosemand service, sahi daam aur aasan appliance solution dena.'
  ),
  defaultDiscount: 30,
  banners: [],
};

export const services = [
  {
    slug: 'ro-water-purifier-service',
    appliance: 'ro',
    icon: 'ro',
    name: L('RO Water Purifier', 'RO Water Purifier'),
    short: L('New RO installation, repair, filter & membrane change and AMC.', 'Naya RO lagwana, repair, filter aur membrane badalna, AMC.'),
    description: L(
      'Clean drinking water keeps your family healthy. We install new RO water purifiers, repair all common faults, replace filters and membranes on time, and offer annual maintenance so your RO keeps giving pure, tasty water.',
      'Saaf peene ka paani parivaar ki sehat ke liye zaroori hai. Hum naya RO lagate hain, har tarah ki kharabi theek karte hain, samay par filter aur membrane badalte hain, aur saalana maintenance dete hain taaki aapka RO hamesha saaf aur meetha paani de.'
    ),
    offerings: [
      L('New RO installation', 'Naya RO installation'),
      L('RO repair', 'RO repair'),
      L('Filter replacement', 'Filter badalna'),
      L('Membrane replacement', 'Membrane badalna'),
      L('RO servicing', 'RO servicing'),
      L('Annual maintenance (AMC)', 'Saalana maintenance (AMC)'),
      L('RO spare parts', 'RO spare parts'),
    ],
    problems: [
      L('Water not coming or very slow flow', 'Paani nahi aa raha ya bahut dheere aa raha hai'),
      L('Bad taste or smell in water', 'Paani ka swaad ya smell kharab'),
      L('Water leaking from the machine', 'Machine se paani tapak raha hai'),
      L('Motor making noise or not starting', 'Motor aawaz kar rahi hai ya chalu nahi ho rahi'),
      L('Tank not getting full / RO not stopping', 'Tank nahi bhar raha / RO band nahi ho raha'),
    ],
    solutions: [
      L('Full check-up and TDS testing of your water', 'Poori jaanch aur paani ki TDS testing'),
      L('Replacement of choked filters and membrane', 'Band filter aur membrane badalna'),
      L('Pump, SMPS and valve repair or replacement', 'Pump, SMPS aur valve ki repair ya badlav'),
      L('Leak fixing and pipe fitting', 'Leakage theek karna aur pipe fitting'),
    ],
  },
  {
    slug: 'ac-repair-service',
    appliance: 'ac',
    icon: 'ac',
    name: L('Air Conditioner (AC)', 'AC (Air Conditioner)'),
    short: L('AC installation, repair, gas filling, servicing and cleaning.', 'AC lagana, repair, gas filling, servicing aur safai.'),
    description: L(
      'Beat the Ballia heat with an AC that cools properly. We install split and window ACs, find and fix cooling problems, refill gas, and do deep cleaning and servicing so your AC runs cool and saves electricity.',
      'Ballia ki garmi mein AC ka theek se thanda karna zaroori hai. Hum split aur window AC lagate hain, cooling ki dikkat theek karte hain, gas bharte hain, aur achhi safai aur servicing karte hain taaki AC thanda kare aur bijli bhi bache.'
    ),
    offerings: [
      L('New AC installation', 'Naya AC installation'),
      L('AC repair', 'AC repair'),
      L('Gas filling', 'Gas filling'),
      L('AC servicing', 'AC servicing'),
      L('AC cleaning (jet wash)', 'AC safai (jet wash)'),
      L('AC maintenance', 'AC maintenance'),
      L('AC spare parts', 'AC spare parts'),
    ],
    problems: [
      L('AC not cooling properly', 'AC theek se thanda nahi kar raha'),
      L('Water dripping from indoor unit', 'Indoor unit se paani gir raha hai'),
      L('Bad smell or noise', 'Badbu ya aawaz aa rahi hai'),
      L('AC not turning on / tripping', 'AC chalu nahi ho raha / trip ho raha hai'),
      L('Ice on pipes or coil', 'Pipe ya coil par barf jam rahi hai'),
    ],
    solutions: [
      L('Gas leak check and gas refilling', 'Gas leak jaanch aur gas bharna'),
      L('Filter, coil and drain pipe cleaning', 'Filter, coil aur drain pipe ki safai'),
      L('Capacitor, PCB and fan motor repair', 'Capacitor, PCB aur fan motor repair'),
      L('Proper installation with stand and copper piping', 'Stand aur copper pipe ke saath sahi installation'),
    ],
  },
  {
    slug: 'cooler-repair-service',
    appliance: 'cooler',
    icon: 'cooler',
    name: L('Air Cooler', 'Cooler'),
    short: L('Cooler repair, motor & pump change, new cooling pads.', 'Cooler repair, motor aur pump badalna, naye cooling pad.'),
    description: L(
      'Get your cooler ready for summer. We repair desert and room coolers, replace motors, water pumps and cooling pads, and fix wiring so your cooler gives strong, cool air.',
      'Garmi se pehle cooler taiyaar karwayein. Hum desert aur room cooler ki repair karte hain, motor, pump aur cooling pad badalte hain, aur wiring theek karte hain taaki cooler tez aur thandi hawa de.'
    ),
    offerings: [
      L('Cooler repair', 'Cooler repair'),
      L('Motor replacement', 'Motor badalna'),
      L('Pump replacement', 'Pump badalna'),
      L('Cooling pad replacement', 'Cooling pad badalna'),
      L('General maintenance', 'General maintenance'),
    ],
    problems: [
      L('Fan not running or running slow', 'Pankha nahi chal raha ya dheere chal raha'),
      L('Pump not lifting water', 'Pump paani nahi utha raha'),
      L('Air is not cool', 'Hawa thandi nahi hai'),
      L('Body shock or wiring problem', 'Current lagna ya wiring ki dikkat'),
    ],
    solutions: [
      L('Motor rewinding or new motor', 'Motor winding ya nayi motor'),
      L('New water pump and pipe', 'Naya pump aur pipe'),
      L('Fresh honeycomb / wood-wool pads', 'Naye honeycomb / ghaas ke pad'),
      L('Safe wiring and switch repair', 'Surakshit wiring aur switch repair'),
    ],
  },
  {
    slug: 'washing-machine-repair',
    appliance: 'washing_machine',
    icon: 'washing_machine',
    name: L('Washing Machine', 'Washing Machine'),
    short: L('Automatic & semi-automatic repair, motor and drain pump.', 'Automatic aur semi-automatic repair, motor aur drain pump.'),
    description: L(
      'We repair fully automatic (front and top load) and semi-automatic washing machines. From drum and motor problems to drain pumps and installation, our technician fixes it at your home.',
      'Hum fully automatic (front aur top load) aur semi-automatic washing machine ki repair karte hain. Drum aur motor se lekar drain pump aur installation tak, technician ghar par hi theek karta hai.'
    ),
    offerings: [
      L('Automatic washing machine repair', 'Automatic washing machine repair'),
      L('Semi-automatic washing machine repair', 'Semi-automatic washing machine repair'),
      L('Motor and drain pump repair', 'Motor aur drain pump repair'),
      L('Installation', 'Installation'),
      L('General servicing', 'General servicing'),
    ],
    problems: [
      L('Drum not spinning', 'Drum nahi ghoom raha'),
      L('Water not draining', 'Paani bahar nahi nikal raha'),
      L('Too much noise or shaking', 'Bahut aawaz ya hilna'),
      L('Machine not starting / error code', 'Machine chalu nahi ho rahi / error code'),
      L('Water leakage', 'Paani leak hona'),
    ],
    solutions: [
      L('Motor, belt and timer repair', 'Motor, belt aur timer repair'),
      L('Drain pump and inlet valve replacement', 'Drain pump aur inlet valve badalna'),
      L('PCB checking and repair', 'PCB jaanch aur repair'),
      L('Proper levelling and installation', 'Sahi level aur installation'),
    ],
  },
  {
    slug: 'fridge-repair-service',
    appliance: 'refrigerator',
    icon: 'refrigerator',
    name: L('Refrigerator', 'Fridge'),
    short: L('Fridge repair, cooling problems, compressor and gas.', 'Fridge repair, cooling ki dikkat, compressor aur gas.'),
    description: L(
      'A fridge that stops cooling can spoil food quickly. We repair single-door and double-door refrigerators, fix cooling problems, handle compressor-related work and do general maintenance.',
      'Fridge thanda na kare to khana jaldi kharab ho jaata hai. Hum single door aur double door fridge ki repair karte hain, cooling ki dikkat theek karte hain, compressor ka kaam aur general maintenance karte hain.'
    ),
    offerings: [
      L('Fridge repair', 'Fridge repair'),
      L('Cooling problems', 'Cooling ki dikkat'),
      L('Compressor-related service', 'Compressor ka kaam'),
      L('Gas filling', 'Gas filling'),
      L('General maintenance', 'General maintenance'),
    ],
    problems: [
      L('Fridge not cooling', 'Fridge thanda nahi kar raha'),
      L('Too much ice in freezer', 'Freezer mein bahut barf jam rahi hai'),
      L('Compressor not starting / clicking sound', 'Compressor chalu nahi ho raha / tik-tik aawaz'),
      L('Water under the fridge', 'Fridge ke neeche paani'),
    ],
    solutions: [
      L('Gas leak repair and gas charging', 'Gas leak repair aur gas bharna'),
      L('Thermostat, relay and overload replacement', 'Thermostat, relay aur overload badalna'),
      L('Defrost system repair', 'Defrost system repair'),
      L('Door gasket replacement', 'Darwaze ki rubber (gasket) badalna'),
    ],
  },
  {
    slug: 'geyser-repair-service',
    appliance: 'geyser',
    icon: 'geyser',
    name: L('Geyser', 'Geyser'),
    short: L('Geyser installation, heating element change and repair.', 'Geyser lagana, heating element badalna aur repair.'),
    description: L(
      'Hot water in winter without worry. We install new geysers safely, replace heating elements and thermostats, and fix leaks and electrical faults.',
      'Sardi mein bina tension garam paani. Hum naya geyser surakshit tareeke se lagate hain, heating element aur thermostat badalte hain, aur leakage aur bijli ki kharabi theek karte hain.'
    ),
    offerings: [
      L('Geyser installation', 'Geyser installation'),
      L('Heating element replacement', 'Heating element badalna'),
      L('Geyser repair', 'Geyser repair'),
      L('General maintenance', 'General maintenance'),
    ],
    problems: [
      L('Water not heating', 'Paani garam nahi ho raha'),
      L('MCB tripping when geyser is on', 'Geyser chalane par MCB trip hona'),
      L('Water leaking from tank or pipes', 'Tank ya pipe se paani tapakna'),
      L('Too hot water / no auto cut', 'Bahut garam paani / auto cut nahi'),
    ],
    solutions: [
      L('New heating element and thermostat', 'Naya heating element aur thermostat'),
      L('Safety valve and pipe fitting', 'Safety valve aur pipe fitting'),
      L('Descaling and tank cleaning', 'Tank ki safai aur namak hatana'),
      L('Proper earthing check', 'Earthing ki jaanch'),
    ],
  },
  {
    slug: 'electrical-wiring-service',
    appliance: 'electrical',
    icon: 'wiring',
    name: L('Electrical Wiring', 'Bijli Wiring'),
    short: L('New house wiring, re-wiring, switchboards and MCB.', 'Naye ghar ki wiring, purani wiring badalna, switchboard aur MCB.'),
    description: L(
      'Safe wiring protects your home and appliances. We do complete house wiring, re-wiring of old houses, switchboard and MCB installation, and earthing — neatly and safely.',
      'Surakshit wiring aapke ghar aur appliances ki raksha karti hai. Hum poore ghar ki wiring, purane ghar ki nayi wiring, switchboard aur MCB lagana, aur earthing ka kaam saaf aur surakshit tareeke se karte hain.'
    ),
    offerings: [
      L('Home electrical wiring', 'Ghar ki bijli wiring'),
      L('Switchboard installation', 'Switchboard lagana'),
      L('MCB / distribution board fitting', 'MCB / DB fitting'),
      L('Earthing work', 'Earthing ka kaam'),
      L('Inverter wiring', 'Inverter wiring'),
    ],
    problems: [
      L('Frequent short circuit or sparking', 'Baar-baar short circuit ya chingaari'),
      L('Old wiring getting hot', 'Purani wiring garam hona'),
      L('Shock from switches or appliances', 'Switch ya appliance se current lagna'),
      L('New room / shop needs wiring', 'Naye kamre / dukaan mein wiring chahiye'),
    ],
    solutions: [
      L('Quality wires and proper load planning', 'Achhe taar aur sahi load ki planning'),
      L('MCB and earthing for safety', 'Suraksha ke liye MCB aur earthing'),
      L('Neat concealed or casing wiring', 'Saaf concealed ya casing wiring'),
    ],
  },
  {
    slug: 'home-electrical-repair',
    appliance: 'electrical',
    icon: 'electrical',
    name: L('Home Electrical Repair', 'Ghar Ki Bijli Repair'),
    short: L('Fan, light, switch and electrical fault repair.', 'Pankha, light, switch aur bijli ki kharabi ki repair.'),
    description: L(
      'Small electrical problems should not wait. We install and repair ceiling fans, lights and fittings, replace switches and sockets, and find and fix electrical faults in your home.',
      'Chhoti bijli ki dikkat ko intezaar nahi karna chahiye. Hum ceiling fan, light aur fitting lagate aur repair karte hain, switch aur socket badalte hain, aur ghar ki bijli ki kharabi dhoondh kar theek karte hain.'
    ),
    offerings: [
      L('Fan installation and repair', 'Pankha lagana aur repair'),
      L('Electrical fault repair', 'Bijli fault repair'),
      L('Light and fitting installation', 'Light aur fitting lagana'),
      L('Switch and socket replacement', 'Switch aur socket badalna'),
      L('Doorbell and small appliance repair', 'Doorbell aur chhote appliance repair'),
    ],
    problems: [
      L('Fan running slow or making noise', 'Pankha dheere chal raha ya aawaz kar raha'),
      L('Lights flickering', 'Light jhapak rahi hai'),
      L('Switch or socket burnt / loose', 'Switch ya socket jal gaya / dheela'),
      L('Power not coming in one room', 'Ek kamre mein bijli nahi aa rahi'),
    ],
    solutions: [
      L('Fan capacitor and bearing change', 'Pankhe ka capacitor aur bearing badalna'),
      L('Fault finding with proper testing', 'Sahi testing se fault dhoondhna'),
      L('New switches, sockets and holders', 'Naye switch, socket aur holder'),
    ],
  },
];

export const categories = [
  { slug: 'ro-water-purifiers', name: L('RO Water Purifiers', 'RO Water Purifier'), order: 1 },
  { slug: 'ro-filters', name: L('RO Filters', 'RO Filter'), order: 2 },
  { slug: 'ro-membranes', name: L('RO Membranes', 'RO Membrane'), order: 3 },
  { slug: 'ro-pumps', name: L('RO Pumps', 'RO Pump'), order: 4 },
  { slug: 'ro-accessories', name: L('RO Accessories', 'RO Accessories'), order: 5 },
  { slug: 'ac-spare-parts', name: L('AC Spare Parts', 'AC Spare Parts'), order: 6 },
  { slug: 'cooler-spare-parts', name: L('Cooler Spare Parts', 'Cooler Spare Parts'), order: 7 },
  { slug: 'washing-machine-spare-parts', name: L('Washing Machine Spare Parts', 'Washing Machine Spare Parts'), order: 8 },
  { slug: 'electrical-accessories', name: L('Electrical Accessories', 'Bijli Ka Saamaan'), order: 9 },
  { slug: 'other-spare-parts', name: L('Other Appliance Spare Parts', 'Anya Appliance Spare Parts'), order: 10 },
];

// SAMPLE products. MRP / stock values are placeholders — update them from Admin → Products.
// `art` picks the illustration used to generate the starter product image.
export const products = [
  {
    category: 'ro-water-purifiers', art: 'ro', featured: true, mrp: 14999, stock: 5,
    name: L('RO + UV Water Purifier (Wall Mount, 12 L)', 'RO + UV Water Purifier (Deewar Par, 12 Litre)'),
    shortDescription: L('Multi-stage purification for borewell and tank water.', 'Borewell aur tanki ke paani ke liye kai stage ki safai.'),
    description: L(
      'A wall-mounted RO + UV water purifier suitable for high-TDS borewell and municipal water. Comes with free installation in Ballia city.',
      'Deewar par lagne wala RO + UV water purifier, zyada TDS wale borewell aur nagar palika ke paani ke liye. Ballia shahar mein free installation.'
    ),
    specs: [
      { label: 'Purification', value: 'RO + UV + UF' },
      { label: 'Storage', value: '12 Litres' },
      { label: 'Suitable for', value: 'TDS up to 2000 ppm' },
      { label: 'Installation', value: 'Wall mount / Counter top' },
    ],
  },
  {
    category: 'ro-water-purifiers', art: 'ro', featured: true, mrp: 11999, stock: 3,
    name: L('RO + Mineral Water Purifier (10 L)', 'RO + Mineral Water Purifier (10 Litre)'),
    shortDescription: L('Keeps essential minerals for better taste.', 'Zaroori minerals bachata hai, swaad behtar.'),
    description: L('RO water purifier with mineral cartridge for tasty and healthy water.', 'Mineral cartridge wala RO jo swaadisht aur sehatmand paani deta hai.'),
    specs: [
      { label: 'Purification', value: 'RO + Mineral' },
      { label: 'Storage', value: '10 Litres' },
      { label: 'Power', value: '36 W' },
    ],
  },
  {
    category: 'ro-filters', art: 'filter', featured: true, mrp: 999, stock: 25,
    name: L('RO Filter Set (Sediment + Pre-Carbon + Post-Carbon)', 'RO Filter Set (Sediment + Pre-Carbon + Post-Carbon)'),
    shortDescription: L('Complete set for regular RO service.', 'RO ki regular service ke liye poora set.'),
    description: L('Standard size filter set suitable for most domestic RO purifiers. Change every 6–9 months.', 'Zyaadatar ghar ke RO mein lagne wala filter set. Har 6–9 mahine mein badlein.'),
    specs: [
      { label: 'Includes', value: 'Sediment, Pre-carbon, Post-carbon' },
      { label: 'Size', value: '10 inch standard' },
      { label: 'Change every', value: '6–9 months' },
    ],
  },
  {
    category: 'ro-filters', art: 'filter', mrp: 349, stock: 40,
    name: L('Inline Post-Carbon Filter', 'Inline Post-Carbon Filter'),
    shortDescription: L('Removes bad taste and smell.', 'Paani ka kharab swaad aur smell hatata hai.'),
    description: L('Inline post-carbon filter with quick-connect fittings.', 'Quick fitting wala inline post-carbon filter.'),
    specs: [{ label: 'Fitting', value: '1/4" quick connect' }],
  },
  {
    category: 'ro-membranes', art: 'membrane', featured: true, mrp: 1999, stock: 12,
    name: L('RO Membrane 80 GPD', 'RO Membrane 80 GPD'),
    shortDescription: L('High-rejection membrane for pure water.', 'Shuddh paani ke liye achhi membrane.'),
    description: L('80 GPD RO membrane for domestic purifiers. Suitable for TDS up to 2000 ppm.', 'Ghar ke RO ke liye 80 GPD membrane. 2000 ppm TDS tak ke liye.'),
    specs: [
      { label: 'Capacity', value: '80 GPD' },
      { label: 'Rejection', value: 'Up to 96%' },
    ],
  },
  {
    category: 'ro-pumps', art: 'pump', featured: true, mrp: 2499, stock: 8,
    name: L('RO Booster Pump 24V', 'RO Booster Pump 24V'),
    shortDescription: L('Strong pressure for steady water flow.', 'Achha pressure, lagataar paani.'),
    description: L('24V DC booster pump for domestic RO systems.', 'Ghar ke RO ke liye 24V DC booster pump.'),
    specs: [
      { label: 'Voltage', value: '24V DC' },
      { label: 'Flow', value: '75–100 GPD' },
    ],
  },
  {
    category: 'ro-accessories', art: 'accessory', mrp: 299, stock: 30,
    name: L('RO Tap / Faucet (Steel Finish)', 'RO Tap / Nal (Steel Finish)'),
    shortDescription: L('Long-neck tap for RO purifiers.', 'RO ke liye lambi gardan wala nal.'),
    description: L('Durable long-neck faucet compatible with most RO purifiers.', 'Majboot nal jo zyaadatar RO mein lag jaata hai.'),
    specs: [{ label: 'Material', value: 'ABS with steel finish' }],
  },
  {
    category: 'ro-accessories', art: 'tools', mrp: 499, stock: 15,
    name: L('RO SMPS Adapter 24V', 'RO SMPS Adapter 24V'),
    shortDescription: L('Power supply for RO pump.', 'RO pump ke liye power supply.'),
    description: L('24V 2.5A SMPS adapter for RO booster pump.', 'RO booster pump ke liye 24V 2.5A SMPS.'),
    specs: [{ label: 'Output', value: '24V, 2.5A' }],
  },
  {
    category: 'ac-spare-parts', art: 'capacitor', featured: true, mrp: 599, stock: 20,
    name: L('AC Capacitor 45+5 MFD', 'AC Capacitor 45+5 MFD'),
    shortDescription: L('Dual run capacitor for AC outdoor unit.', 'AC outdoor unit ke liye dual capacitor.'),
    description: L('Dual run capacitor for split AC compressor and fan motor.', 'Split AC compressor aur fan motor ke liye dual run capacitor.'),
    specs: [
      { label: 'Rating', value: '45+5 MFD' },
      { label: 'Voltage', value: '440 VAC' },
    ],
  },
  {
    category: 'cooler-spare-parts', art: 'motor', mrp: 1799, stock: 10,
    name: L('Cooler Motor (High Speed)', 'Cooler Motor (Tez Speed)'),
    shortDescription: L('Copper winding motor for desert coolers.', 'Desert cooler ke liye copper winding motor.'),
    description: L('High-speed copper winding motor suitable for most desert coolers.', 'Zyaadatar desert cooler mein lagne wali tez copper winding motor.'),
    specs: [
      { label: 'Winding', value: '100% Copper' },
      { label: 'Speed', value: '1350 RPM' },
    ],
  },
  {
    category: 'cooler-spare-parts', art: 'cooling_pad', mrp: 699, stock: 18,
    name: L('Honeycomb Cooling Pad', 'Honeycomb Cooling Pad'),
    shortDescription: L('Better cooling, lasts longer than grass pads.', 'Behtar thandak, ghaas wale pad se zyada tikta hai.'),
    description: L('Honeycomb cooling pad. Cut to size for your cooler.', 'Honeycomb cooling pad. Aapke cooler ke naap se kaata ja sakta hai.'),
    specs: [{ label: 'Thickness', value: '100 mm' }],
  },
  {
    category: 'washing-machine-spare-parts', art: 'drain_pump', mrp: 899, stock: 9,
    name: L('Washing Machine Drain Pump', 'Washing Machine Drain Pump'),
    shortDescription: L('For front-load automatic machines.', 'Front-load automatic machine ke liye.'),
    description: L('Universal drain pump for front-load washing machines.', 'Front-load washing machine ke liye universal drain pump.'),
    specs: [{ label: 'Voltage', value: '220–240V' }],
  },
  {
    category: 'electrical-accessories', art: 'switch', mrp: 449, stock: 35,
    name: L('Modular Switchboard (4 Switch + 1 Socket)', 'Modular Switchboard (4 Switch + 1 Socket)'),
    shortDescription: L('Ready-to-fit modular board.', 'Lagane ke liye taiyaar modular board.'),
    description: L('Modular switch plate with 4 switches and one 3-pin socket.', '4 switch aur ek 3-pin socket wala modular board.'),
    specs: [{ label: 'Rating', value: '6A / 16A' }],
  },
  {
    category: 'other-spare-parts', art: 'geyser', mrp: 799, stock: 0, available: false,
    name: L('Geyser Heating Element 2000W', 'Geyser Heating Element 2000W'),
    shortDescription: L('Replacement element for storage geysers.', 'Storage geyser ke liye heating element.'),
    description: L('2000W copper heating element for most storage geysers.', 'Zyaadatar storage geyser ke liye 2000W copper heating element.'),
    specs: [{ label: 'Power', value: '2000 W' }],
  },
];

// SAMPLE testimonials — replace with genuine customer reviews from Admin → Testimonials.
export const testimonials = [
  {
    name: 'Rakesh Singh', location: 'Ballia', rating: 5, order: 1,
    text: L('My RO was giving bad-tasting water. They changed the filters the same day. Good service.', 'Mera RO kharab swaad ka paani de raha tha. Usi din filter badal diya. Achhi service.'),
  },
  {
    name: 'Sunita Devi', location: 'Bansdih', rating: 5, order: 2,
    text: L('AC gas filling done properly and the price was told before the work. Very honest.', 'AC mein gas sahi se bhari aur daam pehle hi bata diya. Bahut imaandaar.'),
  },
  {
    name: 'Amit Kumar', location: 'Rasra', rating: 4, order: 3,
    text: L('Cooler motor changed quickly. Technician came on time.', 'Cooler ki motor jaldi badal di. Technician samay par aaye.'),
  },
  {
    name: 'Pooja Gupta', location: 'Ballia City', rating: 5, order: 4,
    text: L('Washing machine was not draining. Fixed at home without any hassle.', 'Washing machine se paani nahi nikal raha tha. Ghar par hi aaraam se theek kar diya.'),
  },
];
