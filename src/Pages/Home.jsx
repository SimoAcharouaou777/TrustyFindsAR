import { FaSearch, FaChartLine, FaRegStar, FaExternalLinkAlt } from 'react-icons/fa';
import AliExpressLogo from '../assets/AliExpress-Logo.wine.png';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-50">
      {/* Hero Section - Using AliExpress Orange (#FF6A00) */}
      <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF3300] text-white py-20 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Semi-transparent background container */}
    <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
      <div className="mb-8 flex flex-col items-center justify-center gap-6">
        {/* Logo with Contrast Shadow */}
        <div className="relative group">
          <img 
            src={AliExpressLogo} 
            alt="AliExpress" 
            className="h-32 md:h-40 w-auto animate-float drop-shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
            style={{ 
              filter: 'contrast(1.2) brightness(1.1)',
              transform: 'translateY(0px)'
            }}
          />
        </div>

        {/* Enhanced Text Container */}
        <div className="bg-black/20 px-6 py-3 rounded-full backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-bold text-white/95">
              Official
            </span>
            <span className="text-3xl md:text-4xl font-medium text-white/90 italic">
              Shopping Partner
            </span>
            <span className="text-3xl md:text-4xl font-bold text-white/95">
              Portal
            </span>
          </div>
        </div>
      </div>
    </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block mb-4 text-orange-200">Curated AliExpress Finds</span>
            Trusted Shopping Guidance
          </h1>
          
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            We help you discover the best AliExpress deals with real-time pricing, 
            seller ratings, and direct platform links
          </p>

          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search verified AliExpress products..."
              className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg"
            />
            <button className="absolute right-2 top-2 bg-[#FF6A00] text-white px-8 py-2 rounded-full hover:bg-[#FF5500] transition-all duration-300 flex items-center gap-2">
              <FaSearch /> Find Deals
            </button>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            How We Help You Shop Smarter
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your independent guide to better AliExpress purchases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { 
              icon: FaChartLine, 
              title: "Price Tracking", 
              text: "See historical prices and trends" 
            },
            { 
              icon: FaRegStar, 
              title: "Verified Listings", 
              text: "Filter by seller ratings & reviews" 
            },
            { 
              icon: FaExternalLinkAlt, 
              title: "Direct Links", 
              text: "Straight to official AliExpress products" 
            },
            { 
              icon: FaSearch, 
              title: "Smart Filters", 
              text: "Find exactly what you need faster" 
            },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100">
              <feature.icon className="w-12 h-12 text-[#FF6A00] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">
            Handpicked AliExpress Deals
          </h2>
          <button onClick={() => navigate('/products')} className="text-[#FF6A00] hover:text-[#FF5500] font-semibold flex items-center gap-2">
            View All Finds →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute top-2 left-2 bg-[#FF6A00] text-white px-3 py-1 rounded-full text-sm">
                  -35%
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Wireless Earbuds</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#FF6A00]">$24.99</span>
                  <span className="text-gray-500 line-through">$38.99</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                  <FaExternalLinkAlt className="text-[#FF6A00]" />
                  <span>Direct AliExpress Link</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                  <FaRegStar className="text-yellow-400" />
                  <span>4.8 (2.1k reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparency Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-orange-50 rounded-xl p-8 border border-orange-100">
            <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-4">
              Our Promise to You
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We maintain complete independence from sellers. Our recommendations are based on 
              real customer reviews, price history analysis, and sales data. When you click a link, 
              you'll go directly to the official AliExpress product page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home