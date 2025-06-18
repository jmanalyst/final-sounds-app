import React, { useState, useEffect, createContext, useContext } from 'react';
import { Search, Play, Pause, Download, Star, X, Menu, ChevronDown } from 'lucide-react';

// --- Helper Functions & Data ---
// In a real app, this data would come from your backend/CMS
const mockSounds = [
  { id: 1, name: "Future Bass Wobble", type: "Bass", bpm: 140, key: "F# Minor", tags: ["wobble", "future bass", "serum"], url: "#", likes: 1200, isLiked: false },
  { id: 2, name: "808 Knock", type: "Drum", bpm: 150, key: "C", tags: ["808", "trap", "hip hop", "kick"], url: "#", likes: 2500, isLiked: true },
  { id: 3, name: "Lofi Pad Chord", type: "Synth", bpm: 85, key: "A# Minor", tags: ["lofi", "chill", "pads", "keys"], url: "#", likes: 850, isLiked: false },
  { id: 4, name: "Acoustic Guitar Riff 3", type: "Guitar", bpm: 110, key: "E Major", tags: ["acoustic", "folk", "strumming"], url: "#", likes: 980, isLiked: false },
  { id: 5, name: "House Piano Loop", type: "Piano", bpm: 124, key: "G Minor", tags: ["house", "deep house", "piano", "chords"], url: "#", likes: 1800, isLiked: true },
  { id: 6, name: "Tech House Hi-Hat Loop", type: "Percussion", bpm: 126, key: "N/A", tags: ["tech house", "hats", "rhythm"], url: "#", likes: 730, isLiked: false },
  { id: 7, name: "Cinematic Impact", type: "FX", bpm: null, key: "N/A", tags: ["impact", "cinematic", "trailer", "sound design"], url: "#", likes: 3200, isLiked: false },
  { id: 8, "name": "Funky Bass Slap", type: "Bass", bpm: 118, key: "D Minor", tags: ["funk", "slap bass", "groovy"], url: "#", likes: 1150, isLiked: true },
  { id: 9, name: "Ambient Vocal Chop", type: "Vocal", bpm: 90, key: "C# Minor", tags: ["ambient", "vocal", "ethereal", "chopped"], url: "#", likes: 2100, isLiked: false },
  { id: 10, name: "Drill Snare Pattern", type: "Drum", bpm: 145, key: "N/A", tags: ["drill", "snare", "trap", "uk drill"], url: "#", likes: 1600, isLiked: false },
];

// Added mock data for featured sounds
const mockFeaturedSounds = [
  { id: 11, name: "Deep House Kick", type: "Drum", bpm: 122, key: "N/A", tags: ["house", "kick", "deep"], url: "#", likes: 1500, isLiked: false },
  { id: 12, name: "Analog Synth Lead", type: "Synth", bpm: 128, key: "C Major", tags: ["synth", "lead", "analog"], url: "#", likes: 900, isLiked: true },
  { id: 13, name: "Percussive Fill", type: "Percussion", bpm: 130, key: "N/A", tags: ["percussion", "fill", "groove"], url: "#", likes: 600, isLiked: false },
  { id: 14, name: "Future Pop Chords", type: "Synth", bpm: 115, key: "G Minor", tags: ["pop", "chords", "future"], url: "#", likes: 1800, isLiked: false },
];

const soundTypes = ["All", "Bass", "Drum", "Synth", "Guitar", "Piano", "Percussion", "FX", "Vocal"];

// --- Context for Global State ---
const AppContext = createContext();

// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('home'); // home, sounds, pricing, account, login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulates user auth
  const [isSubscribed, setIsSubscribed] = useState(false); // Simulates subscription
  const [playingSound, setPlayingSound] = useState(null); // ID of the currently playing sound
  
  const appContextValue = {
    isLoggedIn, setIsLoggedIn,
    isSubscribed, setIsSubscribed,
    playingSound, setPlayingSound,
    setPage
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />;
      case 'sounds':
        return <SoundsPage />;
      case 'pricing':
        return <PricingPage setPage={setPage} />;
      case 'account':
        return <AccountPage />;
      case 'login':
        return <LoginPage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <Header setPage={setPage} />
        <main className="pt-16">
          {renderPage()}
        </main>
        <Footer setPage={setPage}/>
      </div>
    </AppContext.Provider>
  );
}


// --- Components ---

function Header({ setPage }) {
  const { isLoggedIn, setPage: setAppContextPage } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ page, children }) => (
    <button onClick={() => { setPage(page); setIsMenuOpen(false); }} className="text-gray-300 hover:text-white transition duration-200">
      {children}
    </button>
  );

  return (
    // Changed bg-gray-900/80 to bg-black for the navigation bar
    <header className="bg-black backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button onClick={() => setPage('home')} className="text-2xl font-bold text-white">
              SOUND<span className="text-blue-500">WAVE</span> {/* Corrected text-white-500 to text-blue-500 */}
            </button>
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink page="sounds">Sounds</NavLink>
              <NavLink page="pricing">Pricing</NavLink>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <NavLink page="account">Account</NavLink>
            ) : (
              <>
                <button onClick={() => setAppContextPage('login')} className="text-gray-300 hover:text-white transition duration-200">
                  Login
                </button>
                {/* Changed Sign Up button to white background and black text for desktop */}
                <button
                  onClick={() => setAppContextPage('pricing')}
                  className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-4 space-y-2">
          <NavLink page="sounds">Sounds</NavLink>
          <NavLink page="pricing">Pricing</NavLink>
          <hr className="border-gray-700"/>
          {isLoggedIn ? (
              <NavLink page="account">Account</NavLink>
            ) : (
              <>
                <NavLink page="login">Login</NavLink>
                 {/* Changed Sign Up button to white background and black text for mobile */}
                 <button
                  onClick={() => { setAppContextPage('pricing'); setIsMenuOpen(false); }}
                  className="w-full text-left bg-white hover:bg-gray-200 text-black font-semibold py-2 px-3 rounded-lg transition duration-200"
                >
                  Sign Up
                </button>
              </>
            )}
        </div>
      )}
    </header>
  );
}


function HomePage({ setPage }) {
  const { playingSound, setPlayingSound } = useContext(AppContext);

  // Helper function to toggle like status for featured sounds
  const toggleLikeFeatured = (id) => {
    // This would typically involve state management for mockFeaturedSounds
    // For simplicity, we'll just log it here.
    console.log(`Toggling like for featured sound ${id}`);
  };

  return (
    // Wrapped content in a React Fragment to allow multiple top-level elements
    <>
      {/* Hero Section with Background Video - This section maintains min-h-screen */}
      <div className="relative min-h-screen flex items-center justify-center text-white">
        {/* Background Video Container */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {/* Optional: Add a dark overlay to make text more readable */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
          {/* Placeholder for the background video */}
          <video
            autoPlay
            loop
            muted
            playsInline // Important for mobile browsers
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-y-1/2 -translate-x-1/2 object-cover"
          >
            {/* Replace 'gtrbgvid.mov' with the actual path to your video file. Consider using .mp4 for wider compatibility. */}
            <source src="gtrbgvid.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content for the Home Page, positioned above the video */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
            The Ultimate Sound Library
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Unlock your creativity with unlimited access to a professionally curated library of high-quality, royalty-free sounds.
          </p>
          <div className="flex justify-center items-center space-x-4">
            {/* Styled "Explore Sounds" button to match the theme */}
            <button
              onClick={() => setPage('sounds')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
            >
              Explore Sounds
            </button>
            <button
              onClick={() => setPage('pricing')}
              className="bg-transparent border-2 border-gray-500 hover:bg-gray-800 text-gray-200 font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>

      {/* New Content Sections - These sections will now appear BELOW the hero section and be scrollable */}
      <div className="bg-gray-900 py-16"> {/* Full width dark section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured Sounds Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Featured Sounds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockFeaturedSounds.map(sound => (
                <SoundItem
                  key={sound.id}
                  sound={sound}
                  isPlaying={playingSound === sound.id}
                  onPlayToggle={() => setPlayingSound(playingSound === sound.id ? null : sound.id)}
                  onLikeToggle={() => toggleLikeFeatured(sound.id)} // Using a placeholder function
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => setPage('sounds')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
              >
                View All Sounds
              </button>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-gray-800 p-8 rounded-lg">
                <Search size={48} className="text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">1. Explore</h3>
                <p className="text-gray-300">Dive into our vast library with intuitive search and powerful filters to find the perfect sound.</p>
              </div>
              <div className="text-center bg-gray-800 p-8 rounded-lg">
                <Play size={48} className="text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">2. Discover</h3>
                <p className="text-gray-300">Preview sounds directly in your browser and listen for inspiration.</p>
              </div>
              <div className="text-center bg-gray-800 p-8 rounded-lg">
                <Download size={48} className="text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">3. Create</h3>
                <p className="text-gray-300">Download high-quality, royalty-free sounds and integrate them into your projects.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

function SoundsPage() {
    const [sounds, setSounds] = useState(mockSounds);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const { playingSound, setPlayingSound } = useContext(AppContext);
  
    const filteredSounds = sounds.filter(sound => {
      const matchesFilter = activeFilter === 'All' || sound.type === activeFilter;
      const matchesSearch = sound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            sound.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });

    const toggleLike = (id) => {
        setSounds(sounds.map(sound => 
            sound.id === id ? { ...sound, isLiked: !sound.isLiked, likes: sound.isLiked ? sound.likes - 1 : sound.likes + 1 } : sound
        ));
    };
  
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6">Sound Library</h2>
  
        {/* Search and Filters */}
        <div className="sticky top-16 bg-gray-900 py-4 z-40 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search sounds, tags, genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg w-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {soundTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition duration-200 ${
                  activeFilter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
  
        {/* Sound List */}
        <div className="space-y-2">
            {filteredSounds.length > 0 ? filteredSounds.map(sound => (
            <SoundItem 
                key={sound.id} 
                sound={sound} 
                isPlaying={playingSound === sound.id}
                onPlayToggle={() => setPlayingSound(playingSound === sound.id ? null : sound.id)}
                onLikeToggle={() => toggleLike(sound.id)}
            />
            )) : (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">No sounds found.</p>
                    <p className="text-gray-500">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
      </div>
    );
}

function SoundItem({ sound, isPlaying, onPlayToggle, onLikeToggle }) {
    const { isSubscribed } = useContext(AppContext);

    const handleDownload = () => {
        if (!isSubscribed) {
            alert('Please subscribe to download sounds.');
            // In a real app, you would show a modal and direct them to the pricing page.
            return;
        }
        alert(`Downloading "${sound.name}"... (This is a simulation)`);
    }

    return (
        <div className="grid grid-cols-12 items-center gap-4 bg-gray-800/50 hover:bg-gray-800 p-3 rounded-lg transition duration-200">
            <div className="col-span-1">
                <button onClick={onPlayToggle} className="w-10 h-10 flex items-center justify-center bg-blue-600/20 hover:bg-blue-600/40 rounded-full text-blue-400">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
            </div>
            <div className="col-span-5 md:col-span-4">
                <p className="font-semibold truncate">{sound.name}</p>
                <div className="flex flex-wrap gap-x-2">
                    {sound.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs text-gray-400">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="hidden md:block col-span-2 text-sm text-gray-400">{sound.type}</div>
            <div className="hidden md:block col-span-1 text-sm text-gray-400">{sound.bpm ? `${sound.bpm} BPM` : 'N/A'}</div>
            <div className="hidden md:block col-span-1 text-sm text-gray-400">{sound.key}</div>
            <div className="col-span-5 md:col-span-3 flex items-center justify-end gap-4">
                <button onClick={onLikeToggle} className={`flex items-center gap-1.5 text-sm transition duration-200 ${sound.isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}>
                    <Star size={16} fill={sound.isLiked ? 'currentColor' : 'none'} />
                    {sound.likes}
                </button>
                <button onClick={handleDownload} className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Download size={18} />
                </button>
            </div>
        </div>
    )
}

function PricingPage({ setPage }) {
    const { setIsLoggedIn, setIsSubscribed } = useContext(AppContext);

    const handleSubscribe = () => {
        // This is a simulation of a Stripe checkout flow.
        // In a real app, this would redirect to Stripe.
        // Upon successful payment, Stripe would redirect back and you'd update the user's status.
        alert('Simulating subscription... You now have access to all sounds!');
        setIsLoggedIn(true);
        setIsSubscribed(true);
        setPage('sounds');
    };

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Simple, All-Access Pricing</h2>
          <p className="text-gray-400 mb-12">One plan. Unlimited downloads. Cancel anytime.</p>
        </div>
  
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg p-8 border border-blue-500/30">
          <h3 className="text-2xl font-semibold text-center text-white">Pro Access</h3>
          <div className="text-center my-6">
            <span className="text-5xl font-extrabold">$19.99</span>
            <span className="text-gray-400">/month</span>
          </div>
          <ul className="space-y-4 text-gray-300 mb-8">
            <li className="flex items-center"><span className="text-green-400 mr-3">✔</span> Unlimited sound downloads</li>
            <li className="flex items-center"><span className="text-green-400 mr-3">✔</span> Access to all future sound packs</li>
            <li className="flex items-center"><span className="text-green-400 mr-3">✔</span> Royalty-free license for all sounds</li>
            <li className="flex items-center"><span className="text-green-400 mr-3">✔</span> High-quality WAV files</li>
            <li className="flex items-center"><span className="text-green-400 mr-3">✔</span> Cancel your subscription anytime</li>
          </ul>
          <button
            onClick={handleSubscribe}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
          >
            Start Creating Today
          </button>
        </div>
      </div>
    );
}

function AccountPage() {
    const { isLoggedIn, isSubscribed, setIsLoggedIn, setIsSubscribed } = useContext(AppContext);
  
    if (!isLoggedIn) {
      // This shouldn't happen if UI is correct, but good for robustness
      return <LoginPage />; 
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsSubscribed(false);
        // setPage('home') would be handled by the parent component logic if needed
    }

    const handleManageSubscription = () => {
        // In a real app, this would link to your Stripe customer portal
        alert("This would redirect to the Stripe customer portal to manage your subscription.");
    }
  
    return (
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">My Account</h2>
        <div className="bg-gray-800 rounded-lg p-8 space-y-6">
            <div>
                <label className="text-sm text-gray-400">Email Address</label>
                <p className="text-lg">subscriber@email.com</p>
            </div>
            <div>
                <label className="text-sm text-gray-400">Subscription Status</label>
                <p className={`text-lg font-semibold ${isSubscribed ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isSubscribed ? 'Active' : 'Inactive'}
                </p>
            </div>
             {isSubscribed && (
                <button
                    onClick={handleManageSubscription}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Manage Subscription
                </button>
             )}
            <hr className="border-gray-700 !mt-8" />
            <button
              onClick={handleLogout}
              className="w-full bg-red-600/80 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Log Out
            </button>
        </div>
      </div>
    );
}

function LoginPage({ setPage }) {
    const { setIsLoggedIn } = useContext(AppContext);

    const handleLogin = (e) => {
        e.preventDefault();
        // This is a simulation. A real app would verify credentials against a backend.
        alert('Login successful! (This is a simulation)');
        setIsLoggedIn(true);
        // For this demo, we assume login doesn't automatically mean subscribed.
        // User would go to pricing to subscribe.
        setPage('account');
    }

    return (
        <div className="container mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input type="email" id="email" defaultValue="subscriber@email.com" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                     <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-300">Password</label>
                        <input type="password" id="password" defaultValue="password" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                        Log In
                    </button>
                </form>
                <p className="text-center text-sm text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <button onClick={() => setPage('pricing')} className="font-medium text-blue-500 hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}

function Footer({ setPage }) {
  return (
    // Changed bg-gray-800/50 to bg-black for the footer
    <footer className="bg-black border-t border-gray-700 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
             <button onClick={() => setPage('home')} className="text-2xl font-bold text-white">
              SOUND<span className="text-blue-500">WAVE</span>
            </button>
            <p className="text-gray-400 mt-2">Your source for premium sounds.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase">Navigate</h2>
              <ul className="text-gray-400 space-y-2">
                <li><button onClick={() => setPage('sounds')} className="hover:underline">Sounds</button></li>
                <li><button onClick={() => setPage('pricing')} className="hover:underline">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase">Follow</h2>
               <ul className="text-gray-400 space-y-2">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Github</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
              </ul>
            </div>
             <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase">Legal</h2>
               <ul className="text-gray-400 space-y-2">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Use</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="text-center text-gray-500">
          © {new Date().getFullYear()} SOUNDWAVE™. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
