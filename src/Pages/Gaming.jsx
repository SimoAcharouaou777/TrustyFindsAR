import { useState, useEffect } from 'react';
import { games } from '../games';
import { FaGamepad, FaSearch, FaTimes, FaStar, FaFire, FaChevronRight, FaGamepad as GameIcon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Gaming = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated categories (you can replace with real categories from your data)
  const categories = ['all', 'action', 'adventure', 'puzzle', 'strategy'];
  
  // Featured game - could be randomly selected or manually picked
  const featuredGame = games[0];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Add this useEffect to inject styles that will help content lockers render properly
  useEffect(() => {
    // Create style element if it doesn't exist
    if (!document.getElementById('locker-style-overrides')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'locker-style-overrides';
      styleEl.textContent = `
        /* Content locker style overrides */
        #locker-container {
          width: 100% !important;
          height: auto !important;
          min-height: 400px !important;
          position: relative !important;
        }
        
        /* Target common content locker elements */
        .cl-main-wrapper, 
        .offer-container,
        .offer-page,
        .offer-iframe {
          width: 100% !important;
          max-width: 100% !important;
          position: relative !important;
          left: auto !important;
          top: auto !important;
          transform: none !important;
        }
        
        /* Force visibility of content */
        #locker-container > * {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
    
    // Clean up on unmount
    return () => {
      const styleEl = document.getElementById('locker-style-overrides');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedCategory === 'all' || game.category === selectedCategory)
  );

  // Update openLocker function to use the content locker's preferred rendering approach:
  const openLocker = (game) => {
    setSelectedGame(game);
    document.body.style.overflow = 'hidden';

    // Clear previous timeout if it exists
    if (window.lockerTimeout) {
      clearTimeout(window.lockerTimeout);
    }
    
    // Add a slightly longer delay to ensure the modal is fully rendered
    window.lockerTimeout = setTimeout(() => {
      if (!game.locker) return;

      // Remove old locker script if exists
      const oldScript = document.getElementById('locker-script');
      if (oldScript) oldScript.remove();

      // Get the variable and function names
      const varName = game.locker.varName;
      const funcName = game.locker.funcName;

      // Set up global configuration for this specific game's locker
      // IMPORTANT: Don't specify container - let it use its default behavior
      window[varName] = {
        it: game.locker.it,
        key: game.locker.key
        // Removed container property to let content locker decide its own rendering
      };

      // Create new script
      const script = document.createElement('script');
      script.id = 'locker-script';
      script.src = game.locker.script;
      script.async = true;
      
      // Once the script loads, call the appropriate function to display the locker
      script.onload = () => {
        console.log('Content locker script loaded successfully');
        
        // Hide the loading indicator
        const loadingElement = document.getElementById('locker-loading');
        if (loadingElement) {
          loadingElement.style.display = 'none';
        }
        
        // Get the activation function based on the game's configuration
        const activationFunc = window[funcName];
        if (typeof activationFunc === 'function') {
          activationFunc();
          console.log(`Locker activation function ${funcName} called`);
          
          // Add a MutationObserver to detect when content is added to the body
          // and move it to our container
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.addedNodes.length) {
                // Look for added content locker elements
                mutation.addedNodes.forEach((node) => {
                  if (node.nodeType === 1 && 
                      (node.classList.contains('cl-main-wrapper') || 
                       node.classList.contains('offer-page') || 
                       node.id === 'offer-container')) {
                    // Found the content locker element, move it to our container
                    const container = document.getElementById('locker-container');
                    if (container && node.parentElement !== container) {
                      container.appendChild(node);
                      observer.disconnect(); // Stop observing once we've moved it
                    }
                  }
                });
              }
            });
          });
          
          // Start observing the document body for added nodes
          observer.observe(document.body, { childList: true, subtree: true });
        } else {
          console.error(`Locker activation function ${funcName} not found`);
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load content locker script');
      };
      
      document.body.appendChild(script);
    }, 800);
  };

  const closeLocker = () => {
    setSelectedGame(null);
    document.body.style.overflow = 'auto';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#FF9900] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-xl font-semibold">Loading awesome games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen text-white py-10 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF9900]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animated title */}
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF9900] to-[#FEBD69]">
              Game Unlocking Portal
            </span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            Discover and unlock premium games for free by completing quick offers! 
            Your gaming adventure starts here.
          </p>
        </motion.div>

        {/* Featured game spotlight */}
        <motion.div 
          className="mb-16 relative rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="relative h-[300px] md:h-[400px]">
            <div className="absolute inset-0">
              <img 
                src={featuredGame.image} 
                alt={featuredGame.name}
                className="w-full h-full object-cover" 
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center mb-3">
                <span className="bg-[#FF9900] text-[#232F3E] text-xs font-bold px-3 py-1 rounded-full mr-3">
                  FEATURED
                </span>
                <div className="flex items-center text-yellow-400">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{featuredGame.name}</h2>
              <p className="text-white/80 text-lg mb-5 max-w-2xl">{featuredGame.description}</p>
              
              <motion.button 
                className="bg-gradient-to-r from-[#FF9900] to-[#FEBD69] text-[#232F3E] py-3 px-8 rounded-full font-bold text-lg flex items-center gap-2 hover:shadow-lg hover:shadow-[#FF9900]/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openLocker(featuredGame)}
              >
                <FaFire /> Unlock This Epic Game
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search and filters */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Search input */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for your next favorite game..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF9900] text-lg bg-white/90"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              </div>
              
              {/* Category filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar md:justify-end">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category 
                        ? 'bg-[#FF9900] text-[#232F3E]' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Games grid with animation */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
            <GameIcon className="mr-3 text-[#FF9900]" /> 
            Browse Games
            <span className="ml-3 bg-white/20 text-sm py-1 px-3 rounded-full">{filteredGames.length}</span>
          </h2>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                  onClick={() => openLocker(game)}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(255, 153, 0, 0.25)"
                  }}
                  layout
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                      Free
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#FF9900] transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-white/70 mb-4 line-clamp-2 text-sm h-10">
                      {game.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <span className="flex h-8 w-8 rounded-full bg-[#FF9900]/20 items-center justify-center mr-2">
                          <FaGamepad className="text-[#FF9900]" />
                        </span>
                        <span className="text-white/60 text-sm">Premium</span>
                      </div>
                      <div className="text-[#FF9900] flex items-center text-sm font-medium">
                        Unlock <FaChevronRight className="ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-10 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No games found</h3>
              <p className="text-white/70 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                className="bg-[#FF9900] text-[#232F3E] px-6 py-3 rounded-lg font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* How it works section */}
        <motion.div 
          className="mb-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How to Unlock Games</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: '1️⃣',
                title: 'Choose a Game', 
                text: 'Browse our collection and select the game you want to unlock.' 
              },
              { 
                icon: '2️⃣',
                title: 'Complete an Offer', 
                text: 'Finish a quick survey, install an app, or join a service.' 
              },
              { 
                icon: '3️⃣',
                title: 'Get Your Game', 
                text: 'Once verified, your game will be unlocked immediately.' 
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/70">{step.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content Locker Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLocker}
          >
            <motion.div 
              className="bg-[#1a2035] rounded-2xl shadow-2xl w-full max-w-4xl relative border border-[#FF9900]/30 flex flex-col max-h-[95vh]"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-4 bg-gradient-to-r from-[#0f172a] to-[#1e293b] flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedGame.image} 
                    alt={selectedGame.name} 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{selectedGame.name}</h3>
                    <p className="text-white/60 text-xs">Complete an offer to unlock</p>
                  </div>
                </div>
                <button
                  onClick={closeLocker}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              {/* Content Container */}
              <div className="flex-grow overflow-auto bg-white">
                {/* Loading indicator */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10" 
                  id="locker-loading"
                >
                  <div className="w-12 h-12 border-4 border-[#FF9900] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-800 font-semibold">Loading your unlock options...</p>
                </div>
                
                {/* Content locker container */}
                <div 
                  id="locker-container" 
                  className="min-h-[400px] w-full"
                >
                  {/* Content locker will be moved here by our MutationObserver */}
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-3 bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-t border-white/10 shrink-0">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <p className="text-white/80">Having trouble? Our support team is here to help!</p>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg">
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gaming;