import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Check, 
  Home, 
  SlidersHorizontal, 
  Heart, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Wifi, 
  Key, 
  Wrench, 
  PhoneCall, 
  Dog, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface MarketItem {
  name: string;
  state: string;
  homesCount: number;
  emoji: string;
  avgRent: string;
}

const MARKETS: MarketItem[] = [
  { name: 'Atlanta', state: 'GA', homesCount: 1240, emoji: '🍑', avgRent: '$2,150' },
  { name: 'Austin', state: 'TX', homesCount: 480, emoji: '🎸', avgRent: '$2,450' },
  { name: 'Carolinas', state: 'NC/SC', homesCount: 950, emoji: '🌲', avgRent: '$2,080' },
  { name: 'Chicago', state: 'IL', homesCount: 620, emoji: '🏙️', avgRent: '$2,320' },
  { name: 'Dallas-Fort Worth', state: 'TX', homesCount: 1520, emoji: '🤠', avgRent: '$2,290' },
  { name: 'Denver', state: 'CO', homesCount: 390, emoji: '🏔️', avgRent: '$2,650' },
  { name: 'Houston', state: 'TX', homesCount: 740, emoji: '🚀', avgRent: '$2,100' },
  { name: 'Jacksonville', state: 'FL', homesCount: 880, emoji: '⛵', avgRent: '$2,050' },
  { name: 'Las Vegas', state: 'NV', homesCount: 910, emoji: '🎰', avgRent: '$2,200' },
  { name: 'Orlando', state: 'FL', homesCount: 1100, emoji: '🌴', avgRent: '$2,380' },
  { name: 'Phoenix', state: 'AZ', homesCount: 1180, emoji: '☀️', avgRent: '$2,190' },
  { name: 'Seattle', state: 'WA', homesCount: 430, emoji: '☕', avgRent: '$2,950' },
  { name: 'South Florida', state: 'FL', homesCount: 820, emoji: '🏖️', avgRent: '$3,100' },
  { name: 'Southern California', state: 'CA', homesCount: 760, emoji: '🏄‍♂️', avgRent: '$3,400' },
  { name: 'Tampa', state: 'FL', homesCount: 990, emoji: '🌊', avgRent: '$2,420' },
  { name: 'Minneapolis', state: 'MN', homesCount: 310, emoji: '❄️', avgRent: '$2,180' }
];

export const InvitationHomesApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bedFilter, setBedFilter] = useState('any');
  const [maxPrice, setMaxPrice] = useState('any');
  const [savedCount, setSavedCount] = useState(0);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [activeMarketTab, setActiveMarketTab] = useState<'all' | 'sunbelt' | 'west' | 'midwest'>('all');

  const filteredMarkets = MARKETS.filter((m) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.state.toLowerCase().includes(q);
    }
    if (activeMarketTab === 'sunbelt') return ['GA', 'FL', 'TX', 'AZ', 'NV', 'NC/SC'].includes(m.state);
    if (activeMarketTab === 'west') return ['CO', 'WA', 'CA'].includes(m.state);
    if (activeMarketTab === 'midwest') return ['IL', 'MN'].includes(m.state);
    return true;
  });

  const pillars = [
    {
      title: 'More value',
      subtitle: 'Premium Upgrades & Smart Technology',
      image: 'https://images.ctfassets.net/lb8pxg8729el/6pej8fzJpko7GeIKHjnYvf/8d88deee2974036859b4a4ba6bbe696a/Home_Page__More_value_2.jpg',
      points: [
        'Updated designer kitchens with stainless steel appliances',
        'Smart Home lock, thermostat, and leak sensor suite',
        'High-speed gigabit internet & streaming app packages'
      ]
    },
    {
      title: 'More simplicity',
      subtitle: 'Frictionless Digital Living',
      image: 'https://images.ctfassets.net/lb8pxg8729el/3C0DnDdcICuAtjvZrRv8Ya/990eb8ef3862152a840cdbb75f19b662/Home_Page__Seamless_1.jpg',
      points: [
        'Self-guided smart lock tours on your schedule',
        '100% paperless digital lease application & signature',
        '1-tap rent payment and maintenance tracking via app'
      ]
    },
    {
      title: 'More flexibility',
      subtitle: 'Space for What Matters Most',
      image: 'https://images.ctfassets.net/lb8pxg8729el/7c0bFEpqFYSm48ptOQpqpU/72f1eaea87929e8f3906867394658e29/Home_Page__Flexibility_2.jpg',
      points: [
        'Private fenced backyards for pets and recreation',
        'Pet-friendly: Up to 3 pets per home, no weight limits',
        'Hassle-free transfers across 16 major US metro markets'
      ]
    },
    {
      title: 'More Genuine CARE™',
      subtitle: 'Dedicated Local Field Teams',
      image: 'https://images.ctfassets.net/lb8pxg8729el/4qk51PK0dpnmxugLggAVOQ/55b8be349310f0448a843331932ca083/Home_Page__Pros_2.jpg',
      points: [
        'Full-time ProCare certified maintenance technicians',
        'Pre-move-in comprehensive 300-point home inspection',
        '24/7 round-the-clock emergency dispatch center'
      ]
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-sans antialiased rounded-xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Top Utility Bar */}
      <div className="bg-[#231f20] text-slate-300 text-xs py-2 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>America&apos;s Leading Home Leasing Company • NYSE: INVH</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <a href="#pay-rent" className="hover:text-white transition flex items-center gap-1">
            <span className="text-[#9fcc3b]">●</span> Pay Rent
          </a>
          <a href="#maintenance" className="hover:text-white transition hidden sm:inline">
            Maintenance
          </a>
          <a href="#help" className="hover:text-white transition hidden md:inline">
            Help Center
          </a>
          <button 
            onClick={() => setSavedCount(s => s + 1)} 
            className="flex items-center gap-1 text-slate-200 hover:text-white"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Saved ({savedCount})</span>
          </button>
          <a href="#login" className="bg-slate-700/80 hover:bg-slate-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
            Resident Login
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#04a54f] to-[#9fcc3b] flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              IH
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#231f20] block leading-none">invitation</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#04a54f] block leading-none mt-0.5">homes</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#find-home" className="text-[#04a54f] hover:text-[#0b763c] flex items-center gap-1">
              Find your home <span className="text-xs">▾</span>
            </a>
            <a href="#our-difference" className="hover:text-[#04a54f] transition flex items-center gap-1">
              Our difference <span className="text-xs">▾</span>
            </a>
            <a href="#resources" className="hover:text-[#04a54f] transition flex items-center gap-1">
              Resources <span className="text-xs">▾</span>
            </a>
            <a href="#about" className="hover:text-[#04a54f] transition flex items-center gap-1">
              About <span className="text-xs">▾</span>
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#apply"
            className="px-5 py-2 rounded-full bg-[#04a54f] hover:bg-[#0b763c] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#04a54f]/25 transition"
          >
            Apply Now
          </a>
        </div>
      </header>

      {/* Hero Section with Live Search */}
      <section className="relative min-h-[500px] flex items-center justify-center text-center px-4 sm:px-8 py-16 bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 scale-105 transform transition duration-1000"
          style={{ backgroundImage: `url('https://images.ctfassets.net/lb8pxg8729el/1jZH5tiQ6VHPXwwgIA1swI/2972ba86931bd5760c9314ba2e2fc8eb/02-1867_Tohoqua_Blvd.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-slate-900/60 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#04a54f]/90 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            80,000+ Homes • 16 Premier US Metro Markets
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Live freer. <span className="text-[#9fcc3b]">Lease a house.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
            Updated single-family rental homes in top neighborhoods with fenced yards, Smart Home tech, and pet-friendly living.
          </p>

          {/* Interactive Search Box */}
          <div className="mt-8 bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl max-w-3xl mx-auto border border-slate-200 text-left">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* City or Zip Input */}
              <div className="flex-1 flex items-center gap-2 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:border-[#04a54f] focus-within:bg-white transition">
                <MapPin className="w-5 h-5 text-[#04a54f] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by city, state, or zip code (e.g. Atlanta, Austin, 30301)..."
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
                />
              </div>

              {/* Beds Filter */}
              <div className="flex gap-2">
                <select
                  value={bedFilter}
                  onChange={(e) => setBedFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#04a54f]"
                >
                  <option value="any">Any Beds</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>

                {/* Price Filter */}
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#04a54f]"
                >
                  <option value="any">Max Price</option>
                  <option value="2200">$2,200/mo</option>
                  <option value="2600">$2,600/mo</option>
                  <option value="3200">$3,200/mo</option>
                  <option value="4500">$4,500/mo</option>
                </select>

                {/* Search Button */}
                <button className="bg-[#04a54f] hover:bg-[#0b763c] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#04a54f]/30 transition shrink-0">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {searchQuery && (
              <div className="mt-2 text-xs text-slate-500 px-2 flex items-center justify-between">
                <span>Filtering available markets: <strong>{filteredMarkets.length}</strong> matching metro areas</span>
                <button onClick={() => setSearchQuery('')} className="text-[#04a54f] font-semibold hover:underline">
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4 Value Pillars: "A lease that comes with more" */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#04a54f] font-bold text-xs uppercase tracking-wider">
            The Invitation Homes Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231f20] mt-1 tracking-tight">
            A lease that comes with more
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            There’s the old way to rent a home, then there’s our way. Professionally managed, updated single-family homes with genuine care.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => setActivePillar(idx)}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white cursor-pointer group flex flex-col ${
                activePillar === idx
                  ? 'border-[#04a54f] ring-2 ring-[#04a54f]/20 shadow-xl'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#231f20]/80 backdrop-blur text-white text-[11px] font-bold">
                  Pillar #{idx + 1}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-[#231f20] group-hover:text-[#04a54f] transition">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#04a54f] mt-0.5 mb-3">
                    {pillar.subtitle}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#04a54f] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#04a54f]">
                  <span>Learn details</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="bg-gradient-to-r from-[#0b763c] via-[#04a54f] to-[#168241] text-white py-14 px-4 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#9fcc3b] text-xs uppercase tracking-widest font-extrabold">
            Reinventing the Single-Family Lease
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-2 leading-snug">
            &ldquo;There’s the old way to rent a home, then there’s our way.&rdquo;
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            At Invitation Homes, we offer pet-friendly, yard-having homes for rent with Smart Home technology in awesome neighborhoods across the country. Live in a great house without the headache and long-term commitment of owning. Some might call that entitled. <strong className="text-white">We call it smart.</strong>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="px-6 py-3 rounded-full bg-[#9fcc3b] hover:bg-[#8ebb2f] text-[#231f20] font-extrabold text-sm shadow-lg transition">
              Explore Available Neighborhoods
            </button>
            <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur transition">
              How Smart Home Tech Works
            </button>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#04a54f] font-bold text-xs uppercase tracking-wider">
              16 Premier Metro Hubs
            </span>
            <h2 className="text-3xl font-extrabold text-[#231f20] mt-1">
              Discover Homes in Your Preferred Location
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select a metro area to explore available houses for rent:
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveMarketTab('all')}
              className={`px-3 py-1.5 rounded-lg transition ${activeMarketTab === 'all' ? 'bg-white text-[#04a54f] shadow-sm' : 'hover:text-slate-900'}`}
            >
              All Regions ({MARKETS.length})
            </button>
            <button
              onClick={() => setActiveMarketTab('sunbelt')}
              className={`px-3 py-1.5 rounded-lg transition ${activeMarketTab === 'sunbelt' ? 'bg-white text-[#04a54f] shadow-sm' : 'hover:text-slate-900'}`}
            >
              Sunbelt Hubs
            </button>
            <button
              onClick={() => setActiveMarketTab('west')}
              className={`px-3 py-1.5 rounded-lg transition ${activeMarketTab === 'west' ? 'bg-white text-[#04a54f] shadow-sm' : 'hover:text-slate-900'}`}
            >
              West Coast & Mountain
            </button>
            <button
              onClick={() => setActiveMarketTab('midwest')}
              className={`px-3 py-1.5 rounded-lg transition ${activeMarketTab === 'midwest' ? 'bg-white text-[#04a54f] shadow-sm' : 'hover:text-slate-900'}`}
            >
              Midwest
            </button>
          </div>
        </div>

        {/* Markets Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMarkets.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#04a54f] hover:shadow-lg transition group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl p-2 rounded-lg bg-slate-50 group-hover:bg-emerald-50 transition">
                  {m.emoji}
                </span>
                <span className="text-xs font-bold text-[#04a54f] bg-emerald-50 px-2 py-0.5 rounded-full">
                  Avg. {m.avgRent}
                </span>
              </div>
              <h3 className="font-extrabold text-[#231f20] text-base group-hover:text-[#04a54f] transition">
                {m.name}, {m.state}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {m.homesCount.toLocaleString()}+ active rental homes
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 group-hover:text-[#04a54f] font-semibold transition">
                <span>View listings</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ProCare & Smart Home Feature Highlights */}
      <section className="bg-slate-50 py-16 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#04a54f] flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#231f20] text-base">ProCare Maintenance</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                In-house certified pros who inspect every home before move-in and respond 24/7 to emergency repairs.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-lime-100 text-[#0b763c] flex items-center justify-center shrink-0">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#231f20] text-base">Smart Home Ready</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Keyless smart entry locks, smart thermostats, and smart leak sensors controllable directly from your phone.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#04a54f] flex items-center justify-center shrink-0">
              <Dog className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#231f20] text-base">Pet-Friendly Yards</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Up to 3 pets per home with no arbitrary weight restrictions. Most houses include private fenced backyards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#231f20] text-slate-400 py-12 px-4 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          <div>
            <div className="text-white font-extrabold text-base mb-3">invitation homes</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              The nation&apos;s premier home leasing company, providing professionally managed, updated homes in prime school districts and neighborhoods.
            </p>
          </div>
          <div>
            <div className="text-white font-bold text-sm mb-3">Find your home</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Search locations</a></li>
              <li><a href="#" className="hover:text-white transition">Rental communities</a></li>
              <li><a href="#" className="hover:text-white transition">Qualification guidelines</a></li>
              <li><a href="#" className="hover:text-white transition">Leasing fees breakdown</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold text-sm mb-3">Our difference</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Why Invitation Homes</a></li>
              <li><a href="#" className="hover:text-white transition">ProCare maintenance</a></li>
              <li><a href="#" className="hover:text-white transition">Smart Home features</a></li>
              <li><a href="#" className="hover:text-white transition">Resident perks</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold text-sm mb-3">Resident portal</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Pay rent online</a></li>
              <li><a href="#" className="hover:text-white transition">Submit maintenance ticket</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center & FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">24/7 Support line</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 Invitation Homes Inc. All rights reserved. Equal Housing Opportunity.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Fraud Prevention</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
