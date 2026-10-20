import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Share2, SlidersHorizontal } from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { PropertyListing } from '../types/rental';
import { OfficialFooter, OfficialHeader } from './OfficialSiteChrome';
import { RenterGuidePage } from './RenterGuides';
import { GoogleRentalMap } from './GoogleRentalMap';

const contentPages: Record<string, { title: string; intro: string; links: [string, string][] }> = {
  '/communities/': { title: 'Rental communities', intro: 'Explore newly built single-family rental homes in select communities.', links: [['Find homes for rent', '/search/houses-for-rent'], ['Before you apply', '/before-you-apply']] },
  '/qualify': { title: 'Qualification requirements', intro: 'Learn about the requirements to lease an Invitation Homes property.', links: [['Before you apply', '/before-you-apply'], ['Application process', '/how-to-apply'], ['Leasing fees', '/fees']] },
  '/before-you-apply': { title: 'Before you apply', intro: 'Find helpful information to prepare for your home search and application.', links: [['Qualification requirements', '/qualify'], ['Application process', '/how-to-apply'], ['Leasing fees', '/fees']] },
  '/how-to-apply': { title: 'Application process', intro: 'Review the steps to apply for a home and get ready for your move.', links: [['Qualification requirements', '/qualify'], ['Leasing fees', '/fees']] },
  '/fees': { title: 'Leasing fees guide', intro: 'Review the fees associated with leasing a home.', links: [['Qualification requirements', '/qualify'], ['Before you apply', '/before-you-apply']] },
  '/difference': { title: 'The Invitation Homes difference', intro: 'Discover a more inviting way to lease a single-family home.', links: [['ProCare maintenance', '/procare'], ['Smart Home', '/smarthomes'], ['Pet-friendly homes', '/pet-friendly-homes-for-lease']] },
  '/procare': { title: 'ProCare®', intro: 'Resident-friendly, proactive service with local maintenance support.', links: [['Request maintenance', '/maintenance-service-requests'], ['Resident responsibilities', '/resident-responsibilities']] },
  '/lease-easy': { title: 'Lease Easy™', intro: 'Explore services designed to make home leasing easier.', links: [['Smart Home', '/smarthomes'], ['Resident offers', '/offers']] },
  '/smarthomes': { title: 'Smart Home', intro: 'Learn about smart home features available in select rental homes.', links: [['Search homes', '/search/houses-for-rent'], ['Lease Easy', '/lease-easy']] },
  '/pet-friendly-homes-for-lease': { title: 'Pet-friendly homes', intro: 'Find a home with room for the whole family, including your pets.', links: [['Search homes', '/search/houses-for-rent'], ['Qualification requirements', '/qualify']] },
  '/offers': { title: 'Resident offers', intro: 'Explore services and offers available to Invitation Homes residents.', links: [['Resident resources', '/welcome-home'], ['Lease Easy', '/lease-easy']] },
  '/resident-responsibilities': { title: 'Resident responsibilities', intro: 'Helpful information for caring for your home throughout your lease.', links: [['Move in', '/welcome-home'], ['Maintenance', '/maintenance-service-requests'], ['Move out', '/moveoutguide']] },
  '/welcome-home': { title: 'Welcome home', intro: 'Resources to help you get settled in your new home.', links: [['Resident responsibilities', '/resident-responsibilities'], ['Request maintenance', '/maintenance-service-requests']] },
  '/renewal-process': { title: 'Renewal process', intro: 'Information and resources for your lease renewal.', links: [['Resident resources', '/welcome-home'], ['Contact us', '/contact-us']] },
  '/moveoutguide': { title: 'Move-out guide', intro: 'Review move-out information and prepare for the end of your lease.', links: [['Resident responsibilities', '/resident-responsibilities'], ['Contact us', '/contact-us']] },
  '/your-invitation-homes-swimming-pool': { title: 'Pool information', intro: 'Review pool safety and care information for residents.', links: [['Resident responsibilities', '/resident-responsibilities']] },
  '/fraud-prevention': { title: 'Fraud prevention', intro: 'Learn how to recognize and report rental scams.', links: [['Contact us', '/contact-us'], ['Search homes', '/search/houses-for-rent']] },
  '/sustainability-guide': { title: 'Sustainable living', intro: 'Learn about sustainability in and around your home.', links: [['About Invitation Homes', '/about-us']] },
  '/about-us': { title: 'Our story', intro: 'Get to know Invitation Homes and the communities we serve.', links: [['Sustainability', '/sustainability'], ['Careers', 'https://careers.invitationhomes.com/']] },
  '/sustainability': { title: 'Sustainability', intro: 'Explore sustainability information and initiatives.', links: [['Our story', '/about-us']] },
  '/vendor-partnerships': { title: 'Vendor partnerships', intro: 'Information for current and prospective vendor partners.', links: [['Contact us', '/contact-us']] },
  '/faq': { title: 'Frequently asked questions', intro: 'Find answers and support for common leasing and resident questions.', links: [['Contact us', '/contact-us'], ['Resident resources', '/welcome-home']] },
  '/contact-us': { title: 'Contact us', intro: 'Find the right team to help with your question.', links: [['Help Center', 'https://invitationhomes.zendesk.com'], ['Resident login', '/profile/login']] },
  '/privacy': { title: 'Privacy policy', intro: 'Review information about privacy and personal data.', links: [['Terms', '/terms']] },
  '/terms': { title: 'Terms', intro: 'Review the terms and conditions for this website.', links: [['Privacy', '/privacy']] }
};

function HomeCard({ property, selected, onSelect }: { property: PropertyListing; selected: boolean; onSelect: (homeId: string) => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <article onMouseEnter={() => onSelect(property.id)} onFocusCapture={() => onSelect(property.id)} className={`overflow-hidden border bg-white transition-shadow ${selected ? 'border-[#168241] ring-2 ring-[#168241]/20' : 'border-[#dedede]'}`}>
      <div className="relative">
        <a href={`/houses-for-rent/${property.id}`} aria-label={`View ${property.title}`}>
          <img src={property.featuredImage} alt={property.title} loading="lazy" className="aspect-[1.45] w-full object-cover" />
        </a>
        <button type="button" aria-label={saved ? 'Remove saved home' : 'Save home'} aria-pressed={saved} onClick={() => setSaved(!saved)} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#168241] shadow">
          <Heart size={19} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <span className="absolute bottom-3 left-3 bg-white px-3 py-1.5 text-sm font-bold">${property.monthlyRent.toLocaleString()}/mo</span>
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold">{property.bedrooms} beds <span className="px-1 text-[#777]">·</span> {property.bathrooms} baths <span className="px-1 text-[#777]">·</span> {property.squareFeet.toLocaleString()} sqft</p>
        <h2 className="mt-2 text-base font-semibold"><a href={`/houses-for-rent/${property.id}`} className="hover:text-[#168241]">{property.address}</a></h2>
        <p className="mt-1 text-sm text-[#626262]">{property.city}, {property.state} {property.zipCode}</p>
        <a href={`/houses-for-rent/${property.id}`} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#168241]">View home<ArrowRight size={15} /></a>
      </div>
    </article>
  );
}

function SearchPage({ marketName }: { marketName?: string }) {
  const initialParams = new URLSearchParams(window.location.search);
  const [location, setLocation] = useState(initialParams.get('location') ?? marketName ?? '');
  const [bedrooms, setBedrooms] = useState(initialParams.get('beds') ?? 'any');
  const [bathrooms, setBathrooms] = useState(initialParams.get('baths') ?? 'any');
  const [minPrice, setMinPrice] = useState(initialParams.get('minPrice') ?? '');
  const [maxPrice, setMaxPrice] = useState(initialParams.get('maxPrice') ?? '');
  const [minSqft, setMinSqft] = useState(initialParams.get('minSqft') ?? '');
  const [maxSqft, setMaxSqft] = useState(initialParams.get('maxSqft') ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [petFriendly, setPetFriendly] = useState(initialParams.get('petFriendly') === 'true');
  const [smartHome, setSmartHome] = useState(initialParams.get('smartHome') === 'true');
  const [viewMode, setViewMode] = useState<'list' | 'split' | 'map'>(
    initialParams.get('view') === 'list' || initialParams.get('view') === 'map' ? initialParams.get('view') as 'list' | 'map' : 'split'
  );
  const [sortOrder, setSortOrder] = useState(initialParams.get('sort') ?? 'recommended');
  const [page, setPage] = useState(() => Math.max(1, Number(initialParams.get('page')) || 1));
  const [selectedMapHomeId, setSelectedMapHomeId] = useState<string | null>(null);
  const previousFilterKey = useRef('');

  useEffect(() => {
    const filterKey = JSON.stringify([location, bedrooms, bathrooms, minPrice, maxPrice, minSqft, maxSqft, petFriendly, smartHome, sortOrder]);
    if (previousFilterKey.current && previousFilterKey.current !== filterKey) setPage(1);
    previousFilterKey.current = filterKey;
  }, [location, bedrooms, bathrooms, minPrice, maxPrice, minSqft, maxSqft, petFriendly, smartHome, sortOrder]);

  useEffect(() => {
    const params = new URLSearchParams();
    const values: Record<string, string> = {
      location,
      beds: bedrooms === 'any' ? '' : bedrooms,
      baths: bathrooms === 'any' ? '' : bathrooms,
      minPrice,
      maxPrice,
      minSqft,
      maxSqft,
      petFriendly: petFriendly ? 'true' : '',
      smartHome: smartHome ? 'true' : '',
      sort: sortOrder === 'recommended' ? '' : sortOrder,
      view: viewMode === 'split' ? '' : viewMode,
      page: page === 1 ? '' : String(page)
    };
    for (const [key, value] of Object.entries(values)) {
      if (value) params.set(key, value);
    }
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  }, [location, bedrooms, bathrooms, minPrice, maxPrice, minSqft, maxSqft, petFriendly, smartHome, sortOrder, viewMode, page]);

  useEffect(() => {
    const restoreFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setLocation(params.get('location') ?? marketName ?? '');
      setBedrooms(params.get('beds') ?? 'any');
      setBathrooms(params.get('baths') ?? 'any');
      setMinPrice(params.get('minPrice') ?? '');
      setMaxPrice(params.get('maxPrice') ?? '');
      setMinSqft(params.get('minSqft') ?? '');
      setMaxSqft(params.get('maxSqft') ?? '');
      setPetFriendly(params.get('petFriendly') === 'true');
      setSmartHome(params.get('smartHome') === 'true');
      setSortOrder(params.get('sort') ?? 'recommended');
      const view = params.get('view');
      setViewMode(view === 'list' || view === 'map' ? view : 'split');
      setPage(Math.max(1, Number(params.get('page')) || 1));
    };
    window.addEventListener('popstate', restoreFromUrl);
    return () => window.removeEventListener('popstate', restoreFromUrl);
  }, [marketName]);

  const homes = useMemo(() => SAMPLE_PROPERTIES.filter((home) => {
    const queryMatches = !location || `${home.city} ${home.state} ${home.zipCode} ${home.address}`.toLowerCase().includes(location.toLowerCase());
    const bedsMatch = bedrooms === 'any' || home.bedrooms >= Number(bedrooms);
    const bathsMatch = bathrooms === 'any' || home.bathrooms >= Number(bathrooms);
    const minPriceMatches = !minPrice || home.monthlyRent >= Number(minPrice);
    const priceMatches = !maxPrice || home.monthlyRent <= Number(maxPrice);
    const minAreaMatches = !minSqft || home.squareFeet >= Number(minSqft);
    const maxAreaMatches = !maxSqft || home.squareFeet <= Number(maxSqft);
    const petsMatch = !petFriendly || home.petFriendly;
    const smartHomeMatches = !smartHome || home.smartHome;
    return queryMatches && bedsMatch && bathsMatch && minPriceMatches && priceMatches && minAreaMatches && maxAreaMatches && petsMatch && smartHomeMatches;
  }).sort((first, second) => {
    if (sortOrder === 'price_asc') return first.monthlyRent - second.monthlyRent;
    if (sortOrder === 'price_desc') return second.monthlyRent - first.monthlyRent;
    if (sortOrder === 'beds_desc') return second.bedrooms - first.bedrooms;
    return 0;
  }), [location, bedrooms, bathrooms, minPrice, maxPrice, minSqft, maxSqft, petFriendly, smartHome, sortOrder]);

  const activeFilterCount = [
    bedrooms !== 'any',
    bathrooms !== 'any',
    Boolean(minPrice),
    Boolean(maxPrice),
    Boolean(minSqft),
    Boolean(maxSqft),
    petFriendly,
    smartHome
  ].filter(Boolean).length;
  const pageSize = 12;
  const pageCount = Math.max(1, Math.ceil(homes.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedHomes = homes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    if (page !== currentPage) setPage(currentPage);
  }, [page, currentPage]);

  return (
    <>
      <OfficialHeader />
      <main className="min-h-[70vh] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#666]">Home <span className="px-1">/</span> Find your home</p>
              <h1 className="mt-2 text-3xl font-semibold">Houses for rent{marketName ? ` in ${marketName}` : ''}</h1>
            </div>
            <a href="/profile/login" className="inline-flex min-h-11 items-center gap-2 border border-[#168241] px-4 text-sm font-semibold text-[#168241]"><Heart size={16} />Save search</a>
          </div>

          <div className="mt-6 grid gap-4 border-y border-[#e2e2e2] py-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-semibold text-[#555]">Location<input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City, state, or ZIP" className="mt-1 min-h-11 w-full border border-[#cfcfcf] px-3 text-sm font-normal text-[#222] outline-none focus:border-[#168241]" /></label>
            <label className="text-xs font-semibold text-[#555]">Minimum price<input value={minPrice} onChange={(event) => setMinPrice(event.target.value)} inputMode="numeric" placeholder="$" className="mt-1 min-h-11 w-full border border-[#cfcfcf] px-3 text-sm font-normal outline-none focus:border-[#168241]" /></label>
            <label className="text-xs font-semibold text-[#555]">Maximum price<input value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} inputMode="numeric" placeholder="$" className="mt-1 min-h-11 w-full border border-[#cfcfcf] px-3 text-sm font-normal outline-none focus:border-[#168241]" /></label>
            <label className="text-xs font-semibold text-[#555]">Bedrooms<select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)} className="mt-1 min-h-11 w-full border border-[#cfcfcf] bg-white px-3 text-sm font-normal outline-none focus:border-[#168241]"><option value="any">Any</option>{[1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count}+</option>)}</select></label>
            <label className="text-xs font-semibold text-[#555]">Bathrooms<select value={bathrooms} onChange={(event) => setBathrooms(event.target.value)} className="mt-1 min-h-11 w-full border border-[#cfcfcf] bg-white px-3 text-sm font-normal outline-none focus:border-[#168241]"><option value="any">Any</option>{[1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count}+</option>)}</select></label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-4">
            <p className="text-sm text-[#555]">Showing {homes.length ? (currentPage - 1) * pageSize + 1 : 0}-{Math.min(currentPage * pageSize, homes.length)} of {homes.length} homes <span className="ml-2 text-xs text-[#777]">Preview inventory</span></p>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)} className="inline-flex min-h-10 items-center gap-2 border border-[#cfcfcf] px-3 text-sm"><SlidersHorizontal size={16} />Filters {activeFilterCount}</button>
              <label className="flex min-h-10 items-center gap-2 border border-[#cfcfcf] px-3 text-sm">Sort<select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="bg-white font-medium outline-none"><option value="recommended">Recommended</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="beds_desc">Bedrooms</option></select></label>
              <div className="flex border border-[#cfcfcf]" role="group" aria-label="Search result layout">
                {(['list', 'split', 'map'] as const).map((mode) => <button key={mode} type="button" aria-pressed={viewMode === mode} onClick={() => setViewMode(mode)} className={`min-h-10 px-3 text-sm capitalize ${viewMode === mode ? 'bg-[#168241] text-white' : 'text-[#444] hover:bg-[#f2f2f2]'}`}>{mode === 'split' ? 'Map + list' : mode}</button>)}
              </div>
            </div>
          </div>

          {filtersOpen && <div className="mb-4 grid gap-4 border-y border-[#e2e2e2] py-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-semibold text-[#555]">Minimum area (sqft)<input value={minSqft} onChange={(event) => setMinSqft(event.target.value)} inputMode="numeric" className="mt-1 min-h-11 w-full border border-[#cfcfcf] px-3 text-sm font-normal outline-none focus:border-[#168241]" /></label>
            <label className="text-xs font-semibold text-[#555]">Maximum area (sqft)<input value={maxSqft} onChange={(event) => setMaxSqft(event.target.value)} inputMode="numeric" className="mt-1 min-h-11 w-full border border-[#cfcfcf] px-3 text-sm font-normal outline-none focus:border-[#168241]" /></label>
            <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={petFriendly} onChange={(event) => setPetFriendly(event.target.checked)} className="accent-[#168241]" />Pet-friendly</label>
            <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={smartHome} onChange={(event) => setSmartHome(event.target.checked)} className="accent-[#168241]" />Smart Home</label>
          </div>}

          <div className={viewMode === 'split' ? 'grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]' : ''}>
            {viewMode !== 'map' && <div className="grid content-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pagedHomes.map((property) => <HomeCard key={property.id} property={property} selected={selectedMapHomeId === property.id} onSelect={setSelectedMapHomeId} />)}
              {homes.length === 0 && <p className="col-span-full py-14 text-center text-sm text-[#666]">No preview homes match these filters.</p>}
            </div>}
            {viewMode !== 'list' && <GoogleRentalMap
              homes={homes}
              selectedHomeId={selectedMapHomeId}
              onSelectHome={(homeId) => {
                setSelectedMapHomeId(homeId);
                const homeIndex = homes.findIndex((home) => home.id === homeId);
                if (homeIndex >= 0) setPage(Math.floor(homeIndex / pageSize) + 1);
              }}
            />}
          </div>

          {pageCount > 1 && <nav aria-label="Search result pages" className="mt-8 flex items-center justify-center gap-4">
            <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="min-h-11 border border-[#cfcfcf] px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
            <span aria-live="polite" className="text-sm">Page {currentPage} of {pageCount}</span>
            <button type="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} className="min-h-11 border border-[#cfcfcf] px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40">Next</button>
          </nav>}
        </div>
      </main>
      <OfficialFooter />
    </>
  );
}

function PropertyPage({ slug }: { slug: string }) {
  const property = SAMPLE_PROPERTIES.find((item) => item.id === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [activeMediaView, setActiveMediaView] = useState<'tour' | 'floorPlan' | null>(null);
  const [saved, setSaved] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState('');

  if (!property) {
    const address = slug.replace(/-/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase());
    return (
      <>
        <OfficialHeader />
        <main className="mx-auto min-h-[60vh] max-w-[1240px] px-4 py-8 sm:px-8">
          <p className="text-sm text-[#666]">Home <span className="px-1">/</span> Houses for rent</p>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{address}</h1>
          <p className="mt-6 max-w-xl text-sm leading-6 text-[#555]">This listing is not included in the local preview inventory yet.</p>
          <a href="/search/houses-for-rent" className="mt-5 inline-flex min-h-11 items-center gap-2 bg-[#168241] px-5 text-sm font-semibold text-white">Back to home search<ArrowRight size={15} /></a>
        </main>
        <OfficialFooter />
      </>
    );
  }

  const propertyImages = property.images.filter((image, index, images) => images.indexOf(image) === index);
  const imageIndex = activeImage % propertyImages.length;

  return (
    <>
      <OfficialHeader />
      <main className="mx-auto max-w-[1240px] px-4 py-6 sm:px-8">
        <p className="text-sm text-[#666]">Home <span className="px-1">/</span> Houses for rent <span className="px-1">/</span>{property.city}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold sm:text-3xl">{property.address}, {property.city}, {property.state} {property.zipCode}</h1>
          <div className="flex gap-2">
            <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="inline-flex min-h-10 items-center gap-2 border border-[#cfcfcf] px-4 text-sm"><Share2 size={15} />Share</button>
            <button type="button" aria-pressed={saved} onClick={() => setSaved(!saved)} className="inline-flex min-h-10 items-center gap-2 border border-[#cfcfcf] px-4 text-sm"><Heart size={15} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}</button>
          </div>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="relative min-h-64 overflow-hidden bg-[#f0f0f0] sm:min-h-[440px]">
            <img src={propertyImages[imageIndex]} alt={`${property.address} property view ${imageIndex + 1}`} className="absolute inset-0 h-full w-full object-cover" />
            {propertyImages.length > 1 && <>
              <button type="button" aria-label="Previous property photo" onClick={() => setActiveImage((imageIndex + propertyImages.length - 1) % propertyImages.length)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow"><ArrowLeft size={18} /></button>
              <button type="button" aria-label="Next property photo" onClick={() => setActiveImage((imageIndex + 1) % propertyImages.length)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow"><ArrowRight size={18} /></button>
            </>}
            <span className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 text-xs font-semibold">{imageIndex + 1} / {propertyImages.length}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-2">
            {propertyImages.slice(0, 4).map((image, index) => <button key={image} type="button" aria-label={`Show property photo ${index + 1}`} aria-pressed={imageIndex === index} onClick={() => setActiveImage(index)} className={`relative min-h-20 overflow-hidden bg-[#f0f0f0] ${index > 1 ? 'hidden sm:block' : ''} ${imageIndex === index ? 'ring-2 ring-inset ring-[#168241]' : ''}`}><img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" /></button>)}
          </div>
        </div>
        {(property.virtualTourUrl || property.floorPlanImage) && <div className="mt-4 flex flex-wrap gap-3">
          {property.virtualTourUrl && <button type="button" onClick={() => setActiveMediaView('tour')} className="min-h-11 border border-[#168241] px-5 text-sm font-semibold text-[#168241]">360° tour</button>}
          {property.floorPlanImage && <button type="button" onClick={() => setActiveMediaView('floorPlan')} className="min-h-11 border border-[#168241] px-5 text-sm font-semibold text-[#168241]">Floor plan</button>}
        </div>}
        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px]">
          <div>
            <h2 className="text-2xl font-semibold">Home features</h2>
            <p className="mt-3 text-sm text-[#555]">{property.bedrooms} beds <span className="px-1">·</span> {property.bathrooms} baths <span className="px-1">·</span> {property.squareFeet.toLocaleString()} sqft</p>
            <ul className="mt-5 grid gap-3 border-y border-[#e2e2e2] py-5 sm:grid-cols-2">{property.amenities.map((item) => <li key={item} className="text-sm">{item}</li>)}</ul>
            <section className="border-b border-[#e2e2e2] py-6"><h2 className="text-xl font-semibold">Home description</h2><p className="mt-3 text-sm leading-6 text-[#555]">Explore this single-family home in {property.city}, with a private yard and features for everyday living.</p></section>
            <section className="border-b border-[#e2e2e2] py-6"><h2 className="text-xl font-semibold">Listing disclosures</h2><p className="mt-3 text-sm leading-6 text-[#555]">Review the property-specific disclosures and lease terms before applying.</p></section>
            <section className="border-b border-[#e2e2e2] py-6"><h2 className="text-xl font-semibold">Neighborhood details</h2><p className="mt-3 text-sm text-[#555]">{property.schoolDistrict ? `Nearby schools: ${property.schoolDistrict}` : `Located in ${property.city}, ${property.state}.`}</p></section>
            <section className="border-b border-[#e2e2e2] py-6"><h2 className="text-xl font-semibold">Nearby Schools</h2><p className="mt-3 text-sm text-[#555]">{property.schoolDistrict ?? `School information for ${property.city} will be available with the listing data.`}</p></section>
            <section className="py-6"><h2 className="text-xl font-semibold">Before you apply</h2><a href="/before-you-apply" className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#168241]">Review requirements<ArrowRight size={15} /></a></section>
          </div>
          <aside className="h-fit border border-[#dedede] p-5">
            <p className="text-sm text-[#666]">Total monthly rent</p>
            <p className="mt-1 text-3xl font-semibold">${property.monthlyRent.toLocaleString()}<span className="text-base font-normal">/mo</span></p>
            <p className="mt-2 text-sm text-[#555]">Available {property.availableDate}</p>
            <div className="mt-4 border-y border-[#e2e2e2] py-3 text-sm"><div className="flex justify-between gap-3"><span>Monthly rent</span><span>${property.monthlyRent.toLocaleString()}</span></div><div className="mt-2 flex justify-between gap-3"><span>Security deposit</span><span>${property.securityDeposit.toLocaleString()}</span></div></div>
            <a href="/how-to-apply" className="mt-5 flex min-h-12 items-center justify-center bg-[#168241] px-4 text-sm font-bold text-white hover:bg-[#0b763c]">Apply now</a>
            <button type="button" className="mt-2 min-h-12 w-full border border-[#168241] px-4 text-sm font-bold text-[#168241]">View all leasing options</button>
            <details className="mt-5 border-t border-[#e2e2e2] pt-4">
              <summary className="cursor-pointer text-sm font-semibold">Affordability Calculator</summary>
              <label className="mt-3 block text-xs text-[#555]">Monthly household income<input type="number" min="0" inputMode="numeric" value={monthlyIncome} onChange={(event) => setMonthlyIncome(event.target.value)} className="mt-1 min-h-11 w-full border border-[#cfcfcf] px-3 text-sm" placeholder="$" /></label>
              {Number(monthlyIncome) > 0 && <p aria-live="polite" className="mt-2 text-sm font-semibold text-[#168241]">Rent is {Math.round((property.monthlyRent / Number(monthlyIncome)) * 100)}% of monthly household income.</p>}
              <p className="mt-2 text-xs leading-5 text-[#666]">Use this estimate to consider rent in relation to your household income. Final qualification depends on the published application requirements.</p>
            </details>
            <p className="mt-4 text-xs leading-5 text-[#666]">Preview property data. Tour scheduling and application submission will be connected during the backend phase.</p>
          </aside>
        </div>
      </main>
      {activeMediaView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveMediaView(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="property-media-title" className="relative flex max-h-[92dvh] w-full max-w-6xl flex-col bg-[#171717] text-white">
            <div className="flex min-h-14 items-center justify-between border-b border-white/15 px-4 sm:px-6">
              <h2 id="property-media-title" className="text-base font-semibold">{activeMediaView === 'tour' ? 'Explore 3D tour' : 'Floor plan'}<span className="ml-2 font-normal text-white/70">{property.address}</span></h2>
              <button type="button" autoFocus onClick={() => setActiveMediaView(null)} className="min-h-10 min-w-10 text-2xl" aria-label="Close property media">×</button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-3 sm:p-6">
              {activeMediaView === 'tour' && property.virtualTourUrl && <iframe title={`${property.address} 360 degree tour`} src={property.virtualTourUrl} allow="fullscreen; accelerometer; gyroscope" allowFullScreen className="h-[70dvh] w-full border-0" />}
              {activeMediaView === 'floorPlan' && property.floorPlanImage && <img src={property.floorPlanImage} alt={`Floor plan for ${property.address}`} className="max-h-[72dvh] max-w-full object-contain" />}
            </div>
          </section>
        </div>
      )}
      <OfficialFooter />
    </>
  );
}

function ContentPage({ path }: { path: string }) {
  if (['/qualify', '/before-you-apply', '/how-to-apply', '/fees'].includes(path)) {
    return <RenterGuidePage path={path} />;
  }

  const page = contentPages[path] ?? { title: path.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') ?? 'Invitation Homes', intro: 'Explore information and resources from Invitation Homes.', links: [['Find homes for rent', '/search/houses-for-rent']] as [string, string][] };
  return (
    <>
      <OfficialHeader />
      <main className="min-h-[65vh]">
        <section className="bg-[#f4f5f2] px-4 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-[1120px]">
            <p className="text-sm text-[#666]">Home <span className="px-1">/</span> Resources</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold capitalize sm:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4c4c4c]">{page.intro}</p>
          </div>
        </section>
        <section className="mx-auto max-w-[1120px] px-4 py-12 sm:px-8">
          <h2 className="text-2xl font-semibold">Explore related information</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.links.map(([label, href]) => <a key={href} href={href} className="flex min-h-16 items-center justify-between border-b border-[#dedede] px-2 text-sm font-semibold hover:text-[#168241]">{label}<ArrowRight size={16} /></a>)}
          </div>
        </section>
      </main>
      <OfficialFooter />
    </>
  );
}

export function OfficialRentalPage({ path }: { path: string }) {
  if (path.startsWith('/search/')) {
    const marketSlug = path.split('/').at(-1)?.replaceAll('-', ' ');
    const marketName = path === '/search/houses-for-rent' ? undefined : marketSlug;
    return <SearchPage marketName={marketName} />;
  }
  if (path.startsWith('/markets/houses-for-rent/')) {
    const marketName = path.split('/').at(-1)?.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
    return <SearchPage marketName={marketName} />;
  }
  if (path.startsWith('/houses-for-rent/')) return <PropertyPage slug={path.split('/').at(-1) ?? ''} />;
  return <ContentPage path={path} />;
}