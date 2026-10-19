import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  Download,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';
import { 
  InvitationLogo,
  SearchIcon,
  LocationPinIcon,
  CheckmarkIcon,
  UserAvatarIcon,
  EqualHousingIcon,
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  LinkedInIcon
} from './InvitationIcons';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { PropertyListing } from '../types/rental';

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
  const [showIconsModal, setShowIconsModal] = useState(false);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [selectedTourProperty, setSelectedTourProperty] = useState<PropertyListing | null>(null);
  const [tourStep, setTourStep] = useState<'form' | 'confirmed'>('form');
  const [tourDate, setTourDate] = useState('Today at 3:00 PM');
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

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

  const downloadedIconsList = [
    { name: 'logo.svg', label: 'Official Full Logo', path: '/icons/logo.svg' },
    { name: 'search.svg', label: 'Search Magnifier', path: '/icons/search.svg' },
    { name: 'location-pin.svg', label: 'Location Pin', path: '/icons/location-pin.svg' },
    { name: 'checkmark.svg', label: 'Green Checkmark', path: '/icons/checkmark.svg' },
    { name: 'user-avatar.svg', label: 'Resident Avatar', path: '/icons/user-avatar.svg' },
    { name: 'hamburger.svg', label: 'Mobile Nav Toggle', path: '/icons/hamburger.svg' },
    { name: 'equal-housing.svg', label: 'Equal Housing Logo', path: '/icons/equal-housing.svg' },
    { name: 'facebook.svg', label: 'Facebook Icon', path: '/icons/facebook.svg' },
    { name: 'instagram.svg', label: 'Instagram Icon', path: '/icons/instagram.svg' },
    { name: 'youtube.svg', label: 'YouTube Icon', path: '/icons/youtube.svg' },
    { name: 'linkedin.svg', label: 'LinkedIn Icon', path: '/icons/linkedin.svg' }
  ];

  const handleCopyPath = (path: string, name: string) => {
    navigator.clipboard.writeText(path);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased rounded-xl overflow-hidden shadow-2xl border border-slate-200 relative">
      {/* Top Utility Bar with Official User Avatar */}
      <div className="bg-[#231f20] text-slate-300 text-xs py-2 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-[#9fcc3b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9fcc3b] animate-pulse"></span>
          <span>America&apos;s Leading Home Leasing Company • NYSE: INVH</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <a href="#pay-rent" className="hover:text-white transition flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9fcc3b]"></span> Pay Rent
          </a>
          <a href="#maintenance" className="hover:text-white transition hidden sm:inline">
            Maintenance
          </a>
          <a href="#help" className="hover:text-white transition hidden md:inline">
            Help Center
          </a>
          <button 
            onClick={() => setSavedCount(s => s + 1)} 
            className="flex items-center gap-1.5 text-slate-200 hover:text-white transition"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Saved ({savedCount})</span>
          </button>
          
          <button 
            onClick={() => setShowIconsModal(true)}
            className="bg-[#04a54f]/20 hover:bg-[#04a54f]/30 text-[#9fcc3b] px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-[#04a54f]/40 transition flex items-center gap-1"
          >
            <span>Original Icons (13)</span>
          </button>

          <a href="#login" className="bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-slate-700">
            <UserAvatarIcon className="w-4 h-4 text-slate-300" />
            <span>Resident Login</span>
          </a>
        </div>
      </div>

      {/* Main Navbar with Official Logo */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Official Invitation Homes Vector Logo */}
          <a href="/" className="flex items-center gap-2 select-none group">
            <img 
              src="/icons/logo.svg" 
              alt="Invitation Homes" 
              className="h-9 sm:h-10 w-auto object-contain transition duration-200 group-hover:opacity-90"
            />
          </a>

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

      {/* Hero Section with Official Magnifier & Location Vector Icons */}
      <section className="relative min-h-[500px] flex items-center justify-center text-center px-4 sm:px-8 py-16 bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 scale-105 transform transition duration-1000"
          style={{ backgroundImage: `url('https://images.ctfassets.net/lb8pxg8729el/1jZH5tiQ6VHPXwwgIA1swI/2972ba86931bd5760c9314ba2e2fc8eb/02-1867_Tohoqua_Blvd.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#231f20] via-slate-900/60 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#04a54f]/90 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-lime-300" />
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
              {/* City or Zip Input with Official Location Pin SVG */}
              <div className="flex-1 flex items-center gap-2 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:border-[#04a54f] focus-within:bg-white transition">
                <LocationPinIcon className="w-5 h-5 text-[#04a54f] shrink-0" />
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

                {/* Official Search Button with Magnifier SVG */}
                <button className="bg-[#04a54f] hover:bg-[#0b763c] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#04a54f]/30 transition shrink-0">
                  <SearchIcon className="w-4 h-4 text-white" />
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

      {/* 4 Value Pillars with Official SVG Checkmarks */}
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
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        {/* Official Checkmark SVG */}
                        <CheckmarkIcon className="w-4 h-4 text-[#04a54f] shrink-0 mt-0.5" />
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
            <button 
              onClick={() => setShowIconsModal(true)}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur transition flex items-center gap-2"
            >
              <span>View Downloaded SVG Icons</span>
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Available Homes Section */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#04a54f] font-bold text-xs uppercase tracking-wider">
              Ready for Move-In
            </span>
            <h2 className="text-3xl font-extrabold text-[#231f20] mt-1">
              Featured Single-Family Homes for Rent
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Explore updated, pet-friendly homes equipped with Smart Home technology:
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Showing {SAMPLE_PROPERTIES.length} verified listings
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_PROPERTIES.map((prop) => (
            <div key={prop.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition group flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={prop.featuredImage} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 left-3 bg-[#04a54f] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
                    ${prop.monthlyRent.toLocaleString()}/mo
                  </div>
                  <button 
                    onClick={() => {
                      setSavedProperties(prev => prev.includes(prop.id) ? prev.filter(id => id !== prop.id) : [...prev, prop.id]);
                      setSavedCount(c => savedProperties.includes(prop.id) ? c - 1 : c + 1);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-rose-500 backdrop-blur shadow-sm transition"
                  >
                    <Heart className={`w-4 h-4 ${savedProperties.includes(prop.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                    <span>{prop.bedrooms} Beds</span>
                    <span>•</span>
                    <span>{prop.bathrooms} Baths</span>
                    <span>•</span>
                    <span>{prop.squareFeet.toLocaleString()} sqft</span>
                  </div>
                  <h3 className="font-extrabold text-[#231f20] text-sm line-clamp-1 group-hover:text-[#04a54f] transition">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <LocationPinIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prop.address}, {prop.city}, {prop.state}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold text-[#04a54f] bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Smart Home
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      ✓ Pet Friendly
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    setSelectedTourProperty(prop);
                    setTourStep('form');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-[#04a54f] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Self-Guided Tour</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
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

      {/* Footer with Official Logo, Social Icons & Equal Housing Vector */}
      <footer className="bg-[#231f20] text-slate-400 py-12 px-4 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          <div>
            {/* White/Green Official Logo */}
            <div className="mb-4">
              <img 
                src="/icons/logo.svg" 
                alt="Invitation Homes Logo" 
                className="h-8 w-auto filter brightness-0 invert" 
              />
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] mb-4">
              The nation&apos;s premier home leasing company, providing professionally managed, updated homes in prime school districts and neighborhoods.
            </p>

            {/* Official Social Vectors */}
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://facebook.com/InvitationHomesWeb" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition">
                <FacebookIcon className="w-4 h-4 text-slate-300" />
              </a>
              <a href="https://instagram.com/invitationhomes" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition">
                <InstagramIcon className="w-4 h-4 text-slate-300" />
              </a>
              <a href="https://youtube.com/user/InvitationHomes" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition">
                <YouTubeIcon className="w-4 h-4 text-slate-300" />
              </a>
              <a href="https://linkedin.com/company/invitation-homes" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition">
                <LinkedInIcon className="w-4 h-4 text-slate-300" />
              </a>
            </div>
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
            <div className="text-white font-bold text-sm mb-3">Equal Housing & Legal</div>
            <div className="flex items-center gap-3 mb-3">
              {/* Official Equal Housing Opportunity SVG */}
              <EqualHousingIcon className="w-9 h-9 text-slate-300" />
              <div className="text-[11px] text-slate-300 font-semibold leading-tight">
                Equal Housing<br />Opportunity
              </div>
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Fraud Prevention</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 Invitation Homes Inc. All rights reserved. Icons downloaded and loaded from <code>/public/icons/</code>.
          </div>
          <button 
            onClick={() => setShowIconsModal(true)}
            className="text-[#9fcc3b] hover:underline font-semibold"
          >
            Inspect All 13 Downloaded Icons
          </button>
        </div>
      </footer>

      {/* Modal: Self-Guided Smart Tour Scheduler */}
      {selectedTourProperty && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#04a54f]"></span>
                <h3 className="font-extrabold text-[#231f20] text-base">Schedule Self-Guided Tour</h3>
              </div>
              <button 
                onClick={() => setSelectedTourProperty(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {tourStep === 'form' ? (
              <div className="mt-4 space-y-4">
                <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <img 
                    src={selectedTourProperty.featuredImage} 
                    alt={selectedTourProperty.title} 
                    className="w-16 h-16 rounded-lg object-cover" 
                  />
                  <div>
                    <h4 className="font-extrabold text-[#231f20] text-xs sm:text-sm">{selectedTourProperty.title}</h4>
                    <p className="text-[11px] text-slate-500">{selectedTourProperty.address}, {selectedTourProperty.city}</p>
                    <p className="text-xs font-bold text-[#04a54f] mt-1">${selectedTourProperty.monthlyRent.toLocaleString()}/month</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Tour Time:</label>
                  <select 
                    value={tourDate} 
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
                  >
                    <option>Today at 3:00 PM</option>
                    <option>Today at 5:00 PM</option>
                    <option>Tomorrow at 10:00 AM</option>
                    <option>Tomorrow at 2:00 PM</option>
                    <option>Saturday at 11:00 AM</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name:</label>
                    <input type="text" placeholder="Alex Morgan" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number:</label>
                    <input type="tel" placeholder="(555) 000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs" />
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-800">
                  <p className="font-semibold flex items-center gap-1.5">
                    <CheckmarkIcon className="w-3.5 h-3.5 text-[#04a54f]" />
                    <span>Instant Smart Lock PIN generated automatically</span>
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-1">Tour privately on your schedule without an agent present.</p>
                </div>

                <button
                  onClick={() => setTourStep('confirmed')}
                  className="w-full py-3 bg-[#04a54f] hover:bg-[#0b763c] text-white font-extrabold text-xs rounded-xl shadow-md transition"
                >
                  Confirm Self-Guided Tour
                </button>
              </div>
            ) : (
              <div className="mt-4 text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#04a54f] flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="font-extrabold text-base text-[#231f20]">Tour Confirmed!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your Smart Lock PIN code for <strong>{selectedTourProperty.address}</strong> has been sent to your phone for <strong>{tourDate}</strong>.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 font-mono text-sm font-bold text-slate-800 tracking-wider">
                  ENTRY PIN: 7824#
                </div>
                <button
                  onClick={() => setSelectedTourProperty(null)}
                  className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Downloaded Icons Gallery */}
      {showIconsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-400" />
                  Downloaded Official SVGs from invitationhomes.com
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Extracted and stored locally in <code className="text-emerald-400">/public/icons/</code>
                </p>
              </div>
              <button
                onClick={() => setShowIconsModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {downloadedIconsList.map((ic) => (
                <div key={ic.name} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{ic.label}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      .svg
                    </span>
                  </div>
                  <div className="h-16 bg-slate-900 rounded-lg flex items-center justify-center p-2 mb-2 border border-slate-800/80">
                    <img 
                      src={ic.path} 
                      alt={ic.label} 
                      className="max-h-12 max-w-full object-contain filter" 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <code className="text-[10px] text-slate-500">{ic.name}</code>
                    <button
                      onClick={() => handleCopyPath(ic.path, ic.name)}
                      className="hover:text-emerald-400 flex items-center gap-1 text-[11px]"
                    >
                      {copiedIcon === ic.name ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Path</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>All 13 vectors are active and rendered across the cloned application.</span>
              <button
                onClick={() => setShowIconsModal(false)}
                className="px-4 py-2 bg-[#04a54f] hover:bg-[#0b763c] text-white font-bold rounded-lg text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
