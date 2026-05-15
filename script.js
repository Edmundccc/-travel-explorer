/* ============================================================
   Travel Explorer — single-file app logic
   Vanilla JS, no dependencies. All persistence via localStorage.
   ============================================================ */

// ============================================================
// OpenWeather: paste your free API key from https://openweathermap.org/api
// ============================================================
const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";

// ============================================================
// Data — 12 curated cities
// ============================================================
const CITIES = [
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    img: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=900&q=80",
    flight: "6h 30m",
    budgetSGD: 180,
    season: "Apr–Jun · Sep–Nov",
    blurb: "Palaces, Hanok alleys, late-night barbecue, and skincare that's basically a competitive sport.",
    guide: {
      overview: "Seoul is two cities stacked on top of each other — neon and Gangnam high-rises above, Joseon-era palaces and stone alleys below. Three days gives you a taste of both, and the food alone is reason enough to come back.",
      itinerary: [
        { day: "Day 1 — Old Seoul", items: [["Morning", "Gyeongbokgung Palace + hanbok rental"], ["Lunch", "Tosokchon samgyetang"], ["Afternoon", "Bukchon Hanok Village + Insadong"], ["Evening", "Gwangjang Market street eats"]] },
        { day: "Day 2 — Modern Seoul", items: [["Morning", "Hongdae cafés + indie shops"], ["Lunch", "Korean BBQ in Mapo"], ["Afternoon", "DDP + Dongdaemun fabric market"], ["Evening", "N Seoul Tower at sunset"]] },
        { day: "Day 3 — Eat & Roam", items: [["Morning", "Ikseon-dong brunch"], ["Lunch", "Tongin Market lunchbox café"], ["Afternoon", "Itaewon vintage + Han River bike"], ["Evening", "Fried chicken + beer in Yeonnam-dong"]] }
      ],
      food: ["Tosokchon (ginseng chicken)", "Myeongdong Kyoja (knife-cut noodles)", "Mapo Galbi (BBQ)", "Onion (café in Anguk)", "Gwangjang bindaetteok (mung-bean pancake)"],
      transport: "Get a T-money card at any 7-Eleven. The metro is fast, signed in English, and covers everywhere you'd want to go. Taxis are cheap after midnight; use Kakao T.",
      costs: { Flight: "S$650", Accommodation: "S$140/night", Food: "S$55/day", Transport: "S$10/day", Activities: "S$30/day" },
      safety: ["Very low crime — solo travel is comfortable.", "Watch alcohol pours in late-night bars in Itaewon.", "Mountain trails: stick to marked paths in winter."],
      photoSpots: ["Bukchon Hanok rooftop viewpoint", "Ihwa Mural Village stairs", "Cheonggyecheon stream after dark", "Han River + 63 Building at sunset"]
    }
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
    flight: "Home base",
    budgetSGD: 160,
    season: "Feb–Apr",
    blurb: "Hawker centres, Peranakan shophouses, and a skyline that took the future personally.",
    guide: {
      overview: "Yes, we live here. Three days is enough for a friend visiting — hawker food, one architectural wow, one green lung, one neighbourhood walk. Skip Sentosa unless you have kids.",
      itinerary: [
        { day: "Day 1 — Icons", items: [["Morning", "Gardens by the Bay (Cloud Forest)"], ["Lunch", "Maxwell Food Centre"], ["Afternoon", "Chinatown + Telok Ayer"], ["Evening", "Marina Bay light show"]] },
        { day: "Day 2 — Neighbourhoods", items: [["Morning", "Tiong Bahru brunch"], ["Lunch", "Old Airport Road hawker"], ["Afternoon", "Joo Chiat + Katong"], ["Evening", "Haji Lane drinks"]] },
        { day: "Day 3 — Green", items: [["Morning", "Botanic Gardens"], ["Lunch", "Adam Road nasi lemak"], ["Afternoon", "MacRitchie treetop walk"], ["Evening", "Open Farm Community dinner"]] }
      ],
      food: ["Tian Tian Hainanese chicken rice", "328 Katong Laksa", "Chomp Chomp BBQ stingray", "Tekka Centre biryani", "Tiong Bahru kueh"],
      transport: "EZ-Link or just tap your contactless card on the MRT. Grab fills the gaps. Walk where you can — short distances surprise visitors.",
      costs: { Flight: "S$0", Accommodation: "S$200/night", Food: "S$40/day", Transport: "S$8/day", Activities: "S$25/day" },
      safety: ["Among the safest cities in the world.", "Strict laws on jaywalking, smoking, vapes — read signs.", "Tap water is safe to drink."],
      photoSpots: ["Marina Bay Sands SkyPark", "Haji Lane murals", "Tiong Bahru Bakery's wall of pastries", "Helix Bridge at blue hour"]
    }
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    flight: "2h 40m",
    budgetSGD: 120,
    season: "May–Sep",
    blurb: "Rice terraces, beach clubs, temple sunsets, and the world's slowest scooter traffic.",
    guide: {
      overview: "Bali rewards a slow trip. Pick two bases — usually Ubud + a beach (Canggu or Uluwatu) — and resist trying to see all of it. Wet season (Nov–Mar) is cheaper but you'll be rained on.",
      itinerary: [
        { day: "Day 1 — Ubud", items: [["Morning", "Tegallalang rice terraces"], ["Lunch", "Hujan Locale"], ["Afternoon", "Sacred Monkey Forest"], ["Evening", "Kecak fire dance at Pura Dalem Taman Kaja"]] },
        { day: "Day 2 — Uluwatu", items: [["Morning", "Drive south, breakfast at Drifter"], ["Lunch", "Single Fin warung"], ["Afternoon", "Bingin Beach swim"], ["Evening", "Uluwatu Temple sunset + seafood at Jimbaran"]] },
        { day: "Day 3 — Canggu", items: [["Morning", "Surf lesson at Batu Bolong"], ["Lunch", "Crate Café"], ["Afternoon", "Echo Beach scooter loop"], ["Evening", "La Brisa beach bar"]] }
      ],
      food: ["Babi guling at Ibu Oka", "Nasi campur at Warung Wardani", "Sambal matah on anything", "Mie goreng at any warung", "Fresh coconut, all day"],
      transport: "Rent a scooter only if you've ridden before — Bali traffic is unforgiving. Otherwise use Grab/Gojek for short hops, and hire a private driver (~S$60/day) for cross-island days.",
      costs: { Flight: "S$280", Accommodation: "S$80/night", Food: "S$30/day", Transport: "S$15/day", Activities: "S$25/day" },
      safety: ["Wear a helmet always — most travel insurance won't cover scooter accidents without proof of helmet + licence.", "Drink bottled water; ice in established cafés is fine.", "Monkeys at Uluwatu and Ubud will steal sunglasses — keep them packed."],
      photoSpots: ["Tegallalang rice terraces at sunrise", "Lempuyang 'Gates of Heaven'", "Bingin cliffside warungs", "Tanah Lot at golden hour"]
    }
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
    flight: "7h 00m",
    budgetSGD: 250,
    season: "Mar–May · Oct–Nov",
    blurb: "Neon-lit alleys, omakase counters, and a metro that hums like clockwork.",
    guide: {
      overview: "Tokyo is twenty cities. Don't try to cover all of it — pick three neighbourhoods, eat at counters, and let the metro do the rest. Spring cherry blossom and autumn momiji are the headline seasons; book three months out.",
      itinerary: [
        { day: "Day 1 — East Tokyo", items: [["Morning", "Tsukiji outer market breakfast"], ["Lunch", "Standing sushi at Numazuko"], ["Afternoon", "Asakusa + Senso-ji"], ["Evening", "Tokyo Skytree + Sumida sunset"]] },
        { day: "Day 2 — West Tokyo", items: [["Morning", "Meiji Shrine + Harajuku"], ["Lunch", "Afuri ramen, Omotesando"], ["Afternoon", "Shibuya Crossing + Scramble Square"], ["Evening", "Omoide Yokocho yakitori, Shinjuku"]] },
        { day: "Day 3 — Slow Tokyo", items: [["Morning", "Yanaka Ginza walk"], ["Lunch", "Soba in Kagurazaka"], ["Afternoon", "teamLab Borderless or Planets"], ["Evening", "Omakase counter in Roppongi"]] }
      ],
      food: ["Sushi Dai (Toyosu)", "Ichiran ramen, any branch", "Tonkatsu Maisen, Aoyama", "Onigiri at Onigiri Asakusa Yadoroku", "Convenience store karaage (don't sleep on it)"],
      transport: "Get a Suica IC card on arrival at the airport. JR + Tokyo Metro covers everywhere; you almost never need a taxi inside the city.",
      costs: { Flight: "S$700", Accommodation: "S$200/night", Food: "S$70/day", Transport: "S$12/day", Activities: "S$40/day" },
      safety: ["Astonishingly safe — lost wallets get returned.", "Don't eat while walking in most areas.", "Earthquake protocol is posted in every hotel — skim it."],
      photoSpots: ["Shibuya Sky observation deck", "Senso-ji at dawn (empty)", "Yanaka Ginza stairs at sunset", "teamLab Planets infinity room"]
    }
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=900&q=80",
    flight: "2h 30m",
    budgetSGD: 120,
    season: "Nov–Feb",
    blurb: "Street food carts, temple complexes, and rooftop bars that go on forever.",
    guide: {
      overview: "Bangkok is chaos with a smile. Three days: one temple day, one street-food day, one design-and-mall day. Skip Khao San unless nostalgia.",
      itinerary: [
        { day: "Day 1 — Old City", items: [["Morning", "Grand Palace + Wat Pho"], ["Lunch", "Tha Tien pad thai stalls"], ["Afternoon", "Wat Arun by ferry"], ["Evening", "Riverside rooftop, Sala Rattanakosin"]] },
        { day: "Day 2 — Food + Markets", items: [["Morning", "Or Tor Kor market"], ["Lunch", "Boat noodles, Victory Monument"], ["Afternoon", "Chinatown wander"], ["Evening", "Yaowarat street food crawl"]] },
        { day: "Day 3 — Design + Cocktails", items: [["Morning", "Jim Thompson House"], ["Lunch", "Bangkok Bold Kitchen"], ["Afternoon", "Siam Discovery + EmQuartier"], ["Evening", "Tep Bar live music + cocktails"]] }
      ],
      food: ["Jay Fai (crab omelette, queue early)", "Thip Samai pad thai", "Raan Jay Fai khao kha moo", "Polo Fried Chicken", "Mango sticky rice anywhere on the street"],
      transport: "BTS Skytrain + MRT for spine routes; Grab or tuk-tuk for short hops; Chao Phraya Express Boat is the prettiest way to move along the river.",
      costs: { Flight: "S$240", Accommodation: "S$90/night", Food: "S$30/day", Transport: "S$10/day", Activities: "S$25/day" },
      safety: ["Tuk-tuk gem shop scam is still active — refuse 'closed temple' detours.", "Drink bottled water.", "Cover shoulders + knees at temples."],
      photoSpots: ["Wat Arun from the river at dusk", "Chinatown neon at night", "Lebua rooftop", "Yaowarat steam + street stalls"]
    }
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    country: "China SAR",
    img: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=900&q=80",
    flight: "4h 00m",
    budgetSGD: 200,
    season: "Oct–Dec",
    blurb: "Dim sum trolleys, Star Ferry crossings, and stairs that lead to unexpectedly beautiful trails.",
    guide: {
      overview: "Hong Kong rewards walkers. Three days: one urban-icon day, one food-and-markets day, one nature day (yes — the trails are world-class).",
      itinerary: [
        { day: "Day 1 — Skyline", items: [["Morning", "Peak Tram + circular trail"], ["Lunch", "Tim Ho Wan dim sum"], ["Afternoon", "Star Ferry to TST"], ["Evening", "Symphony of Lights from Avenue of Stars"]] },
        { day: "Day 2 — Markets", items: [["Morning", "Sham Shui Po breakfast (Lau Sum Kee)"], ["Lunch", "Yat Lok roast goose"], ["Afternoon", "Tai Ping Shan vintage shops"], ["Evening", "Soho cocktails (PMQ area)"]] },
        { day: "Day 3 — Nature", items: [["Morning", "Dragon's Back hike"], ["Lunch", "Big Wave Bay shack lunch"], ["Afternoon", "Stanley Market"], ["Evening", "Wan Chai dai pai dong dinner"]] }
      ],
      food: ["Tim Ho Wan baked BBQ buns", "Yat Lok roast goose", "Mak's Noodle wonton", "Australia Dairy Co. scrambled eggs", "Egg waffles on the street"],
      transport: "Octopus card on arrival. MTR + Star Ferry + double-decker tram cover everything photogenic. Taxis are cheap by colour zone — red for Kowloon/HK Island.",
      costs: { Flight: "S$450", Accommodation: "S$220/night", Food: "S$50/day", Transport: "S$15/day", Activities: "S$30/day" },
      safety: ["Very safe, even late.", "Watch for slippery pavements after rain — slopes are everywhere.", "Hiking: carry water, the humidity is brutal."],
      photoSpots: ["Choi Hung Estate basketball court", "Quarry Bay 'Monster Building'", "Dragon's Back ridge", "Central Mid-Levels escalator at dusk"]
    }
  },
  {
    id: "kualalumpur",
    name: "Kuala Lumpur",
    country: "Malaysia",
    img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80",
    flight: "1h 00m",
    budgetSGD: 100,
    season: "May–Jul",
    blurb: "Petronas Towers, banana-leaf rice, mamak stalls, and Bukit Bintang's chaotic charm.",
    guide: {
      overview: "KL is the easiest weekend trip from Singapore — and underrated. Three days: one food crawl, one architecture day, one day trip (Batu Caves or Genting).",
      itinerary: [
        { day: "Day 1 — City", items: [["Morning", "Masjid Jamek + Merdeka Square"], ["Lunch", "Yut Kee Hainanese kopitiam"], ["Afternoon", "KL Tower + KLCC park"], ["Evening", "Skybar at Traders, looking at Petronas"]] },
        { day: "Day 2 — Eats", items: [["Morning", "Imbi Market breakfast"], ["Lunch", "Banana leaf rice, Bangsar"], ["Afternoon", "Central Market + Petaling Street"], ["Evening", "Jalan Alor street food crawl"]] },
        { day: "Day 3 — Day trip", items: [["Morning", "Batu Caves stairs"], ["Lunch", "Old Town White Coffee"], ["Afternoon", "Thean Hou Temple"], ["Evening", "TREC nightlife in Jalan Tun Razak"]] }
      ],
      food: ["Nasi lemak at Village Park", "Hokkien mee at Kim Lian Kee", "Banana leaf at Sri Nirwana Maju", "Soup kambing at Restoran Yusoof Dan Zakhir", "Roti canai, any mamak after midnight"],
      transport: "Grab is cheap and ubiquitous. Monorail + LRT covers the city centre. Avoid driving — KL traffic is genuinely punishing.",
      costs: { Flight: "S$160", Accommodation: "S$80/night", Food: "S$25/day", Transport: "S$10/day", Activities: "S$15/day" },
      safety: ["Pickpockets in crowded markets — front pockets only.", "Use metered taxis at the airport, not touts.", "Friday afternoons: businesses pause around 12:30–2:30pm."],
      photoSpots: ["Batu Caves rainbow stairs", "Petronas Towers from KLCC park lake", "Thean Hou Temple lanterns", "Sultan Abdul Samad building at blue hour"]
    }
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
    flight: "4h 30m",
    budgetSGD: 500,
    season: "Nov–Apr",
    blurb: "Overwater villas, glass-clear lagoons, and bioluminescent beaches that look photoshopped.",
    guide: {
      overview: "The Maldives is a resort country. Three days is short — most people stay 5–7. Pick a resort that matches your style (snorkel-first vs spa-first), and budget seaplane transfers separately (~S$700 return).",
      itinerary: [
        { day: "Day 1 — Arrival", items: [["Morning", "Seaplane to resort"], ["Lunch", "Resort welcome lunch"], ["Afternoon", "Lagoon snorkel test"], ["Evening", "Sunset dolphin cruise"]] },
        { day: "Day 2 — Reefs", items: [["Morning", "House reef snorkel"], ["Lunch", "Beachside grill"], ["Afternoon", "Sandbank picnic"], ["Evening", "Spa + private dinner"]] },
        { day: "Day 3 — Slow", items: [["Morning", "Yoga on the deck"], ["Lunch", "Underwater restaurant (if available)"], ["Afternoon", "Manta or whale shark snorkel"], ["Evening", "Bioluminescence walk on Vaadhoo-style beach"]] }
      ],
      food: ["Mas huni (tuna + coconut) breakfast", "Fihunu mas (grilled reef fish)", "Garudhiya (clear tuna broth)", "Bondibai (rice pudding)", "Fresh-cracked coconut"],
      transport: "Domestic seaplane or speedboat — booked through the resort. Local atoll-hopping by ferry exists but is slow.",
      costs: { Flight: "S$650", Accommodation: "S$600/night (resort)", Food: "S$100/day", Transport: "S$700 seaplane return", Activities: "S$120/day" },
      safety: ["Tap water is desalinated, generally safe in resorts.", "Reef-safe sunscreen is required at many resorts.", "Local-island travel: cover shoulders + knees outside designated bikini beaches."],
      photoSpots: ["Overwater villa deck at sunrise", "Sandbank from above (drone, with permit)", "Bioluminescent shoreline after dark", "Manta point underwater"]
    }
  },
  {
    id: "phuketkrabi",
    name: "Phuket & Krabi",
    country: "Thailand",
    img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=900&q=80",
    flight: "2h 00m",
    budgetSGD: 140,
    season: "Nov–Apr",
    blurb: "Longtail boats, limestone karsts, beach bars, and the Andaman's most photographed coastline.",
    guide: {
      overview: "Combine them. Two nights Phuket (beaches + nightlife or family), two nights Krabi/Railay (climbing + quieter sand). Ferries connect the two in about 2 hours.",
      itinerary: [
        { day: "Day 1 — Phuket Old Town", items: [["Morning", "Phuket Old Town Sino-Portuguese walk"], ["Lunch", "Tu Kab Khao (Phuket cuisine)"], ["Afternoon", "Promthep Cape"], ["Evening", "Kata Beach sunset"]] },
        { day: "Day 2 — Phi Phi", items: [["Morning", "Speedboat to Phi Phi"], ["Lunch", "Phi Phi Don beach lunch"], ["Afternoon", "Maya Bay (with permit)"], ["Evening", "Patong (if you must) or quiet Kata"]] },
        { day: "Day 3 — Railay", items: [["Morning", "Ferry to Krabi + longtail to Railay"], ["Lunch", "Phra Nang Beach"], ["Afternoon", "Climbing or kayaking lagoons"], ["Evening", "Sunset bar at Railay West"]] }
      ],
      food: ["Mee Hokkien Phuket-style", "Roti pancakes on the beach", "Green curry with rotis at Krabi night market", "Massaman curry", "Fresh seafood BBQ at Kata night market"],
      transport: "Grab works in Phuket town but is patchy elsewhere — hire a metered taxi or scooter. Krabi to Railay: only by longtail boat (no road).",
      costs: { Flight: "S$220", Accommodation: "S$120/night", Food: "S$30/day", Transport: "S$25/day", Activities: "S$50/day" },
      safety: ["Sea conditions can shift fast — check before any longtail trip.", "Patong: scams around jet-ski damage claims are well-documented.", "Stinging jellyfish do appear; lifeguards post warnings."],
      photoSpots: ["Phra Nang Beach + Railay karsts", "Phuket Old Town pastel shophouses", "Promthep Cape sunset", "Hong Island lagoons by kayak"]
    }
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80",
    flight: "8h 00m",
    budgetSGD: 280,
    season: "Sep–Nov · Mar–May",
    blurb: "Harbour walks, ocean pools, brunch culture, and a coastline that genuinely earns the hype.",
    guide: {
      overview: "Sydney is outdoor-first. Three days: one harbour day, one coastal walk day, one neighbourhoods + food day. Add a day trip to the Blue Mountains if you have a fourth.",
      itinerary: [
        { day: "Day 1 — Harbour", items: [["Morning", "Opera House + Botanic Gardens"], ["Lunch", "Quay Bar"], ["Afternoon", "Harbour Bridge climb or walk"], ["Evening", "Sunset ferry to Manly"]] },
        { day: "Day 2 — Coast", items: [["Morning", "Bondi to Coogee coastal walk"], ["Lunch", "Three Blue Ducks, Bronte"], ["Afternoon", "Icebergs ocean pool"], ["Evening", "Surry Hills dinner (Nomad)"]] },
        { day: "Day 3 — Inner West", items: [["Morning", "Surry Hills brunch (Bills)"], ["Lunch", "Spice Alley Chippendale"], ["Afternoon", "Newtown record + bookshops"], ["Evening", "Cocktails at Maybe Sammy"]] }
      ],
      food: ["Bourke Street Bakery", "Spice I Am (Thai)", "Tetsuya's (special occasion)", "Reuben Hills coffee", "Harry's Café de Wheels pie at midnight"],
      transport: "Opal card on contactless — buses, trains, ferries, all on one tap. Ferries are the prettiest way to move around the harbour.",
      costs: { Flight: "S$650", Accommodation: "S$260/night", Food: "S$70/day", Transport: "S$15/day", Activities: "S$40/day" },
      safety: ["Sun: SPF 50, every day, even cloudy.", "Surf beaches have rip currents — swim between the flags.", "Drink water; the dry heat sneaks up on you."],
      photoSpots: ["Bondi Icebergs pool", "Opera House from Mrs Macquarie's Chair", "Manly Beach pano from the headland", "Wedding Cake Rock (admire — don't step on it)"]
    }
  },
  {
    id: "taipei",
    name: "Taipei",
    country: "Taiwan",
    img: "https://images.unsplash.com/photo-1552993302-9085f3a4e3b1?auto=format&fit=crop&w=900&q=80",
    flight: "4h 30m",
    budgetSGD: 150,
    season: "Oct–Dec",
    blurb: "Night markets, beef noodle shops, mountain temples, and a tea culture worth slowing down for.",
    guide: {
      overview: "Taipei is one of the friendliest food cities in Asia. Three days: one night-market day, one mountain-temple day, one design-and-tea day. Get a day trip to Jiufen if you can.",
      itinerary: [
        { day: "Day 1 — Old + New", items: [["Morning", "Longshan Temple + Bopiliao"], ["Lunch", "Lin Dong Fang beef noodle"], ["Afternoon", "Xinyi shopping + Taipei 101"], ["Evening", "Raohe Night Market"]] },
        { day: "Day 2 — Mountains", items: [["Morning", "Elephant Mountain hike"], ["Lunch", "Yongkang Street din tai fung-adjacent"], ["Afternoon", "Beitou hot springs"], ["Evening", "Shilin Night Market"]] },
        { day: "Day 3 — Day trip", items: [["Morning", "Train to Ruifang"], ["Lunch", "Jiufen old street"], ["Afternoon", "Shifen sky lanterns + waterfall"], ["Evening", "Back to Taipei for tea in Da'an"]] }
      ],
      food: ["Yongkang Beef Noodle", "Fu Hang Dou Jiang breakfast", "Ay-Chung mee sua", "Shilin oyster omelette", "Bubble tea at Chun Shui Tang"],
      transport: "EasyCard for MRT + buses. The MRT is clean, signed in English, and runs late. YouBike for short coastal/park rides.",
      costs: { Flight: "S$420", Accommodation: "S$120/night", Food: "S$30/day", Transport: "S$8/day", Activities: "S$20/day" },
      safety: ["Very safe, even alone at night.", "Typhoon season Jul–Sep: monitor advisories.", "Pavement bikes/scooters: stay alert at crossings."],
      photoSpots: ["Elephant Mountain → Taipei 101 view", "Jiufen lanterns at dusk", "Shifen sky lanterns", "Beitou Library + thermal valley steam"]
    }
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    img: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=900&q=80",
    flight: "3h 30m",
    budgetSGD: 100,
    season: "Oct–Apr",
    blurb: "Old Quarter alleys, egg coffee, Halong day-trips, and the most photogenic chaos in Southeast Asia.",
    guide: {
      overview: "Hanoi is layered — French colonial bones, Old Quarter buzz, and a slower lake-life around Hoan Kiem. Three days plus a Halong Bay overnight is the classic.",
      itinerary: [
        { day: "Day 1 — Old Quarter", items: [["Morning", "Hoan Kiem Lake + Ngoc Son Temple"], ["Lunch", "Bun cha Huong Lien (the Obama one)"], ["Afternoon", "Old Quarter walking food tour"], ["Evening", "Water puppet theatre"]] },
        { day: "Day 2 — French + Coffee", items: [["Morning", "Temple of Literature"], ["Lunch", "Cha ca La Vong"], ["Afternoon", "Hoa Lo Prison + French Quarter walk"], ["Evening", "Egg coffee at Giang Café"]] },
        { day: "Day 3 — Halong day", items: [["Morning", "Pickup to Halong Bay"], ["Lunch", "On board"], ["Afternoon", "Kayak + cave"], ["Evening", "Back to Hanoi for late beer hoi on Ta Hien"]] }
      ],
      food: ["Pho Gia Truyen", "Bun cha Huong Lien", "Banh mi 25", "Cha ca La Vong", "Egg coffee + coconut coffee anywhere on Nha Tho"],
      transport: "Grab bike for short Old Quarter hops (often faster than a car). Walk where you can — the alleys are the point. Trains/buses for out-of-town day trips."
,
      costs: { Flight: "S$280", Accommodation: "S$70/night", Food: "S$20/day", Transport: "S$8/day", Activities: "S$30/day (Halong day)" },
      safety: ["Crossing the street: walk slow + steady, don't stop. Drivers will flow around you.", "Tap water is not potable — bottled only.", "Watch belongings on the back of motorbike taxis."],
      photoSpots: ["Train Street (now access-controlled — check before going)", "Hoan Kiem Lake at dawn", "Long Bien Bridge", "Temple of Literature courtyards"]
    }
  }
];

// Static SGD-base FX rates (illustrative — see comment below for live).
const FX_RATES_FROM_SGD = {
  USD: 0.74,
  EUR: 0.68,
  JPY: 115,
  KRW: 1020,
  THB: 27,
  IDR: 11800,
  MYR: 3.45,
  HKD: 5.78,
  TWD: 23.6,
  VND: 18900,
  AUD: 1.13,
  MVR: 11.4
};

/*
  Live rates option (uncomment to enable, requires internet):
  --------------------------------------------------------------
  async function loadLiveRates() {
    const res = await fetch("https://api.exchangerate.host/latest?base=SGD");
    const data = await res.json();
    Object.keys(FX_RATES_FROM_SGD).forEach(code => {
      if (data.rates[code]) FX_RATES_FROM_SGD[code] = data.rates[code];
    });
  }
*/

const PACKING_CATEGORIES = {
  Documents: ["Passport (+ photocopy)", "Visa / eTA", "Travel insurance", "Vaccination card", "Driving permit"],
  Clothing: ["Underwear ×7", "Light layers", "Walking shoes", "Sandals", "Swimwear", "Rain jacket"],
  Electronics: ["Phone + charger", "Power bank", "Universal adapter", "Camera + SD card", "Earbuds"],
  Medication: ["Personal prescriptions", "Paracetamol", "Anti-diarrhoeal", "Antihistamine", "Plasters + antiseptic"],
  "Travel Essentials": ["Reusable water bottle", "Sunscreen SPF 50", "Sunglasses", "Mosquito repellent", "Small day pack"]
};

const LS_KEYS = {
  enquiries: "travelExplorer.enquiries",
  packing: "travelExplorer.packing",
  itinerary: "travelExplorer.itinerary"
};

// ============================================================
// Boot
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCityCards();
  populateCityDropdowns();
  initFooterYear();
  initNav();
  initFeaturedCard();
  initGuideModal();
  initBudgetCalculator();
  initCurrencyConverter();
  initPackingChecklist();
  initItineraryPlanner();
  initWeather();
  initEnquiryForm();
  initEnquiryViewer();
});

// ============================================================
// City Cards
// ============================================================
function renderCityCards() {
  const grid = document.getElementById("cities-grid");
  if (!grid) return;

  grid.innerHTML = CITIES.map(city => `
    <article class="city-card" data-city="${city.id}">
      <div class="city-card__media">
        <img src="${city.img}" alt="${city.name}" loading="lazy" />
      </div>
      <div class="city-card__body">
        <div class="city-card__name">
          <h3>${city.name}</h3>
          <span class="city-card__country">${city.country}</span>
        </div>
        <p class="city-card__blurb">${city.blurb}</p>
        <dl class="city-card__meta">
          <div><dt>Flight from SG</dt><dd>${city.flight}</dd></div>
          <div><dt>Daily budget</dt><dd>S$${city.budgetSGD}</dd></div>
          <div><dt>Best season</dt><dd>${city.season}</dd></div>
        </dl>
        <button type="button" class="city-card__cta" data-open-city="${city.id}">View Guide</button>
      </div>
    </article>
  `).join("");

  grid.addEventListener("click", e => {
    const btn = e.target.closest("[data-open-city]");
    if (btn) openGuideModal(btn.dataset.openCity);
  });
}

function populateCityDropdowns() {
  const opts = CITIES.map(c => `<option value="${c.id}">${c.name}, ${c.country}</option>`).join("");
  const budget = document.getElementById("budget-destination");
  const enquiry = document.getElementById("enquiry-destination");
  if (budget) budget.innerHTML = `<option value="">Select a destination…</option>` + opts;
  if (enquiry) enquiry.innerHTML = `<option value="">Select a destination…</option>` + opts;

  const fx = document.getElementById("fx-currency");
  if (fx) {
    fx.innerHTML = Object.keys(FX_RATES_FROM_SGD)
      .map(code => `<option value="${code}">${code}</option>`)
      .join("");
    fx.value = "JPY";
  }
}

function initFooterYear() {
  const y = document.getElementById("footer-year");
  if (y) y.textContent = new Date().getFullYear();
}

function initFeaturedCard() {
  const btn = document.querySelector("[data-open-city='tokyo']");
  if (btn) btn.addEventListener("click", () => openGuideModal("tokyo"));
}

// ============================================================
// Nav: smooth scroll + active section + mobile close
// ============================================================
function initNav() {
  const links = document.querySelectorAll(".nav__links a");
  const toggle = document.getElementById("nav-toggle");

  links.forEach(link => {
    link.addEventListener("click", () => {
      if (toggle && toggle.checked) toggle.checked = false;
    });
  });

  // Scroll-spy
  const sections = ["home", "guides", "cities", "reviews", "tools", "weather", "safety", "enquiry"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = id => {
    links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + id));
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(s => io.observe(s));
}

// ============================================================
// Guide Modal
// ============================================================
function initGuideModal() {
  const modal = document.getElementById("guide-modal");
  if (!modal) return;

  modal.addEventListener("click", e => {
    if (e.target.matches("[data-close-modal]")) closeGuideModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hidden) closeGuideModal();
  });
}

function openGuideModal(cityId) {
  const city = CITIES.find(c => c.id === cityId);
  if (!city) return;

  const modal = document.getElementById("guide-modal");
  modal.querySelector("#modal-title").textContent = city.name;
  modal.querySelector("#modal-country").textContent = city.country;
  const img = modal.querySelector("#modal-image");
  img.src = city.img;
  img.alt = city.name;

  const body = modal.querySelector("#modal-body");
  body.innerHTML = `
    <section>
      <h3>Overview</h3>
      <p class="modal__overview">${city.guide.overview}</p>
    </section>

    <section>
      <h3>3-Day Itinerary</h3>
      <div class="modal__itinerary">
        ${city.guide.itinerary.map(d => `
          <div class="modal__day">
            <h4>${d.day}</h4>
            <ul>
              ${d.items.map(([time, what]) => `<li><strong>${time}</strong><span>${what}</span></li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </section>

    <section>
      <h3>Food Recommendations</h3>
      <ul class="modal__list">${city.guide.food.map(f => `<li>${f}</li>`).join("")}</ul>
    </section>

    <section>
      <h3>Transport Tips</h3>
      <p>${city.guide.transport}</p>
    </section>

    <section>
      <h3>Estimated Cost Breakdown (per person)</h3>
      <dl class="modal__costs">
        ${Object.entries(city.guide.costs).map(([k, v]) => `
          <div class="modal__cost-cell"><dt>${k}</dt><dd>${v}</dd></div>
        `).join("")}
      </dl>
    </section>

    <section>
      <h3>Safety Tips</h3>
      <ul class="modal__list">${city.guide.safety.map(s => `<li>${s}</li>`).join("")}</ul>
    </section>

    <section>
      <h3>Best Photo Spots</h3>
      <ul class="modal__list">${city.guide.photoSpots.map(p => `<li>${p}</li>`).join("")}</ul>
    </section>
  `;

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGuideModal() {
  const modal = document.getElementById("guide-modal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ============================================================
// Budget Calculator
// ============================================================
function initBudgetCalculator() {
  const form = document.getElementById("budget-form");
  if (!form) return;

  const travellers = document.getElementById("budget-travellers");
  const days = document.getElementById("budget-days");
  const daily = document.getElementById("budget-daily");
  const dest = document.getElementById("budget-destination");
  const out = document.getElementById("budget-output");

  const fmt = n => "S$" + Math.round(n).toLocaleString();

  const compute = () => {
    const t = Math.max(1, parseInt(travellers.value || "1", 10));
    const d = Math.max(1, parseInt(days.value || "1", 10));
    const p = Math.max(0, parseFloat(daily.value || "0"));
    out.textContent = fmt(t * d * p);
  };

  dest.addEventListener("change", () => {
    const city = CITIES.find(c => c.id === dest.value);
    if (city) {
      daily.value = city.budgetSGD;
      compute();
    }
  });

  [travellers, days, daily].forEach(el => el.addEventListener("input", compute));
  compute();
}

// ============================================================
// Currency Converter
// ============================================================
function initCurrencyConverter() {
  const form = document.getElementById("fx-form");
  if (!form) return;

  const amount = document.getElementById("fx-amount");
  const currency = document.getElementById("fx-currency");
  const out = document.getElementById("fx-output");

  const compute = () => {
    const sgd = Math.max(0, parseFloat(amount.value || "0"));
    const code = currency.value;
    const rate = FX_RATES_FROM_SGD[code];
    if (!rate) { out.textContent = "—"; return; }
    const converted = sgd * rate;
    const decimals = converted >= 1000 ? 0 : 2;
    out.textContent = `${converted.toLocaleString(undefined, { maximumFractionDigits: decimals })} ${code}`;
  };

  amount.addEventListener("input", compute);
  currency.addEventListener("change", compute);
  compute();
}

// ============================================================
// Packing Checklist (localStorage)
// ============================================================
function initPackingChecklist() {
  const list = document.getElementById("packing-list");
  if (!list) return;

  let state = readJSON(LS_KEYS.packing, {});

  list.innerHTML = Object.entries(PACKING_CATEGORIES).map(([cat, items]) => `
    <div class="packing-cat">
      <h4>${cat}</h4>
      <ul>
        ${items.map(item => {
          const checked = state[cat] && state[cat][item];
          return `<li><label>
            <input type="checkbox" data-cat="${cat}" data-item="${item}" ${checked ? "checked" : ""} />
            <span>${item}</span>
          </label></li>`;
        }).join("")}
      </ul>
    </div>
  `).join("");

  list.addEventListener("change", e => {
    const cb = e.target.closest('input[type="checkbox"]');
    if (!cb) return;
    const { cat, item } = cb.dataset;
    state[cat] = state[cat] || {};
    state[cat][item] = cb.checked;
    writeJSON(LS_KEYS.packing, state);
  });

  const reset = document.getElementById("packing-reset");
  if (reset) {
    reset.addEventListener("click", () => {
      state = {};
      writeJSON(LS_KEYS.packing, state);
      list.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
      showToast("Checklist reset.");
    });
  }
}

// ============================================================
// Itinerary Planner (localStorage)
// ============================================================
function initItineraryPlanner() {
  const form = document.getElementById("itinerary-form");
  const list = document.getElementById("itinerary-list");
  if (!form || !list) return;

  let items = readJSON(LS_KEYS.itinerary, []);
  render();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const item = {
      id: Date.now().toString(36),
      day: form.querySelector("#it-day").value.trim(),
      time: form.querySelector("#it-time").value,
      activity: form.querySelector("#it-activity").value.trim(),
      notes: form.querySelector("#it-notes").value.trim()
    };
    if (!item.day || !item.time || !item.activity) return;
    items.push(item);
    items.sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time));
    writeJSON(LS_KEYS.itinerary, items);
    form.reset();
    render();
  });

  list.addEventListener("click", e => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    items = items.filter(it => it.id !== btn.dataset.remove);
    writeJSON(LS_KEYS.itinerary, items);
    render();
  });

  function render() {
    list.innerHTML = items.map(it => `
      <li class="itinerary-item">
        <span class="itinerary-item__day">${escapeHTML(it.day)}</span>
        <span class="itinerary-item__time">${it.time}</span>
        <span class="itinerary-item__activity">
          ${escapeHTML(it.activity)}
          ${it.notes ? `<small>${escapeHTML(it.notes)}</small>` : ""}
        </span>
        <button type="button" class="itinerary-item__remove" data-remove="${it.id}" aria-label="Remove">×</button>
      </li>
    `).join("");
  }
}

// ============================================================
// Weather (OpenWeather)
// ============================================================
function initWeather() {
  const form = document.getElementById("weather-form");
  if (!form) return;

  const input = document.getElementById("weather-city");
  const result = document.getElementById("weather-result");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;
    await fetchWeather(city, result);
  });
}

async function fetchWeather(city, result) {
  // Show placeholder message if no key yet
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "YOUR_API_KEY_HERE") {
    result.hidden = false;
    result.className = "weather-result weather-result--info";
    result.innerHTML = `
      <div>
        <strong>Add your OpenWeather API key</strong>
        <p class="muted" style="margin: 6px 0 0;">
          Open <code>script.js</code>, replace <code>YOUR_API_KEY_HERE</code> with a free key from
          <a href="https://openweathermap.org/api" target="_blank" rel="noopener">openweathermap.org/api</a>,
          and reload this page.
        </p>
      </div>`;
    return;
  }

  result.hidden = false;
  result.className = "weather-result weather-result--info";
  result.innerHTML = `<div>Loading weather for ${escapeHTML(city)}…</div>`;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    const icon = weatherEmoji(data.weather[0].main);
    result.className = "weather-result";
    result.innerHTML = `
      <div class="weather-result__icon" aria-hidden="true">${icon}</div>
      <div>
        <div class="weather-result__temp">${Math.round(data.main.temp)}°C</div>
        <div class="weather-result__city">${data.name}, ${data.sys.country} · ${data.weather[0].description}</div>
        <div class="weather-result__meta">
          <span>Feels like ${Math.round(data.main.feels_like)}°C</span>
          <span>Humidity ${data.main.humidity}%</span>
          <span>Wind ${Math.round(data.wind.speed * 3.6)} km/h</span>
        </div>
      </div>`;
  } catch (err) {
    result.className = "weather-result weather-result--error";
    result.innerHTML = `<div><strong>Could not load weather.</strong><p class="muted" style="margin:6px 0 0;">${escapeHTML(err.message)}. Check the city spelling or your API key.</p></div>`;
  }
}

function weatherEmoji(main) {
  const map = {
    Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️",
    Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Fog: "🌫️",
    Haze: "🌫️", Smoke: "🌫️"
  };
  return map[main] || "🌍";
}

// ============================================================
// Enquiry Form (localStorage)
// ============================================================
function initEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  const status = document.getElementById("enquiry-status");

  form.addEventListener("submit", e => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    const data = Object.fromEntries(new FormData(form).entries());

    const required = ["fullName", "email", "phone", "destination", "travelDate", "travellers"];
    const missing = required.filter(k => !data[k]);
    if (missing.length) {
      status.classList.add("is-error");
      status.textContent = "Please fill in all required fields.";
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      status.classList.add("is-error");
      status.textContent = "That email doesn't look right.";
      return;
    }

    const enquiries = readJSON(LS_KEYS.enquiries, []);
    enquiries.push({ ...data, submittedAt: new Date().toISOString() });
    writeJSON(LS_KEYS.enquiries, enquiries);

    form.reset();
    status.classList.add("is-success");
    status.textContent = "Thanks — your enquiry was saved. We'll be in touch within two business days.";
    showToast("Enquiry sent ✓");
    renderEnquiryList();
  });
}

// ============================================================
// Enquiry Viewer (debug panel)
// ============================================================
function initEnquiryViewer() {
  const toggle = document.getElementById("enquiry-viewer-toggle");
  const panel = document.getElementById("enquiry-viewer-panel");
  const clear = document.getElementById("enquiry-clear");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.textContent = panel.hidden ? "View saved enquiries ▾" : "Hide saved enquiries ▴";
    if (!panel.hidden) renderEnquiryList();
  });

  if (clear) {
    clear.addEventListener("click", () => {
      if (!confirm("Delete all saved enquiries from this browser?")) return;
      writeJSON(LS_KEYS.enquiries, []);
      renderEnquiryList();
      showToast("All enquiries cleared.");
    });
  }
}

function renderEnquiryList() {
  const list = document.getElementById("enquiry-viewer-list");
  if (!list) return;
  const entries = readJSON(LS_KEYS.enquiries, []);
  list.innerHTML = entries
    .slice()
    .reverse()
    .map(e => {
      const dest = CITIES.find(c => c.id === e.destination);
      const destLabel = dest ? `${dest.name}, ${dest.country}` : (e.destination || "—");
      const when = new Date(e.submittedAt).toLocaleString();
      return `<li>
        <strong>${escapeHTML(e.fullName)} → ${escapeHTML(destLabel)}</strong>
        <span class="muted">${escapeHTML(e.email)} · ${escapeHTML(e.phone)} · ${escapeHTML(e.travellers)} travellers · ${escapeHTML(e.travelDate)}</span>
        ${e.message ? `<p style="margin:8px 0 0;">${escapeHTML(e.message)}</p>` : ""}
        <p class="muted" style="margin:6px 0 0; font-size:0.78rem;">Saved ${when}</p>
      </li>`;
    })
    .join("");
}

// ============================================================
// Toast helper
// ============================================================
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add("is-visible"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove("is-visible");
    setTimeout(() => { t.hidden = true; }, 300);
  }, 2400);
}

// ============================================================
// Utilities
// ============================================================
function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or disabled — fail quietly
  }
}

function escapeHTML(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}
