import { FaSearch, FaChartLine, FaRegStar, FaExternalLinkAlt, FaShippingFast, FaTag, FaUserCheck, FaClock } from 'react-icons/fa';
import { MdVerified, MdLocalOffer, MdDiscount } from 'react-icons/md';
import AmazonLogo from '../assets/Amazon-Logo.png'; 
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { homeProducts } from "../homeProducts.js";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [countdown, setCountdown] = useState({ hours: 5, minutes: 59, seconds: 59 });

  // Countdown timer effect for flash deals
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer when it reaches zero
          return { hours: 5, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section - Enhanced with gradient and better visuals */}
      <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src={AmazonLogo}
              alt="Amazon"
              className="h-32 md:h-36 w-auto drop-shadow-xl animate-float"
            />
          </div>

          {/* Heading - Enhanced with better typography */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-shadow-lg">
            Smart Shopping with <span className="underline decoration-wavy decoration-white">Amazon</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium opacity-90">
            Discover the best discounted products and exclusive offers - Fast delivery worldwide
          </p>

          {/* Search Bar - Enhanced with better functionality */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="What would you like to buy today?"
              className="w-full px-5 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF9900] shadow-lg text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-[#FF9900] text-[#232F3E] px-5 py-2 rounded-full hover:bg-[#FFAC30] transition-all duration-300 flex items-center gap-2 font-semibold shadow-sm"
            >
              <FaSearch />
              Search
            </button>
          </form>

          {/* Trust badges - New section */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <FaShippingFast className="text-white" />
              <span>Fast Worldwide Delivery</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <MdVerified className="text-white" />
              <span>100% Trusted Products</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <MdDiscount className="text-white" />
              <span>Exclusive Discounts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Deals Counter - New section */}
      <div className="bg-yellow-50 border-y border-yellow-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <FaClock className="text-[#FF9900] animate-pulse" />
              <span className="font-bold text-gray-800">Deals Ending Soon:</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#FF9900] text-white px-3 py-1 rounded-md">
                <span className="font-mono font-bold">{String(countdown.hours).padStart(2, '0')}</span>
              </div>
              <span className="font-bold">:</span>
              <div className="bg-[#FF9900] text-white px-3 py-1 rounded-md">
                <span className="font-mono font-bold">{String(countdown.minutes).padStart(2, '0')}</span>
              </div>
              <span className="font-bold">:</span>
              <div className="bg-[#FF9900] text-white px-3 py-1 rounded-md">
                <span className="font-mono font-bold">{String(countdown.seconds).padStart(2, '0')}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/flash-deals')}
              className="bg-[#FF9900] text-[#232F3E] px-4 py-1 rounded-full hover:bg-[#FFAC30] transition-colors text-sm font-medium flex items-center gap-1 mt-2 md:mt-0"
            >
              <MdLocalOffer />
              Browse Deals Now
            </button>
          </div>
        </div>
      </div>

      {/* Features / Value Proposition - Enhanced with better icons and layout */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
          Why Choose to Shop With Us?
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">We provide you with a safe and easy shopping experience with the best products selected from Amazon</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: FaShippingFast,
              title: "Fast Global Delivery",
              text: "Quick shipping to your doorstep, wherever you are",
            },
            {
              icon: FaRegStar,
              title: "Real Reviews",
              text: "Genuine reviews from verified buyers worldwide",
            },
            {
              icon: FaTag,
              title: "Competitive Prices",
              text: "Exclusive discounts and competitive Amazon prices",
            },
            {
              icon: FaUserCheck,
              title: "24/7 Support",
              text: "Help available around the clock, wherever you are",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-[#FEBD69]/30 hover:border-[#FEBD69] hover:-translate-y-1"
            >
              <div className="bg-[#232F3E]/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-[#232F3E]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories - New section */}
      <div className="bg-gradient-to-b from-white to-[#FEBD69]/20 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800 text-center">
            Most Popular Categories
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Electronics", icon: "📱", color: "bg-blue-50 border-blue-200" },
              { name: "Fashion", icon: "👗", color: "bg-pink-50 border-pink-200" },
              { name: "Home Supplies", icon: "🏠", color: "bg-green-50 border-green-200" },
              { name: "Beauty & Care", icon: "✨", color: "bg-purple-50 border-purple-200" },
              { name: "Games & Gifts", icon: "🎮", color: "bg-yellow-50 border-yellow-200" },
              { name: "Automotive", icon: "🚗", color: "bg-gray-50 border-gray-200" },
            ].map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(`/category/${category.name}`)}
                className={`${category.color} border rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-all duration-300`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products - Enhanced with better layout and visual hierarchy */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Trending Amazon Products
            </h2>
            <p className="text-gray-600 mt-1">Buy with confidence with product quality guarantee</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#FF9900] hover:bg-[#FFAC30] text-[#232F3E] px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            Browse All Products
            <span className="text-lg">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FEBD69]"
            >
              {/* Product image with better visualization */}
              <div className="h-56 bg-gray-100 relative overflow-hidden group">
                {product.discountPercentage && (
                  <div className="absolute top-2 right-2 bg-[#FF9900] text-[#232F3E] px-3 py-1 rounded-full text-sm font-bold z-10">
                    {product.discountPercentage}% OFF
                  </div>
                )}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-gray-500">Product Image</span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => window.open(product.link, '_blank')}
                    className="bg-white text-[#232F3E] px-4 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    View Product
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg line-clamp-2 h-14">
                  {product.name}
                </h3>

                {/* Price with better visualization */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-[#B12704]">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Rating and shipping info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <FaRegStar className="text-yellow-400" />
                    <span>{product.rating} ({product.reviews} reviews)</span>
                  </div>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <FaShippingFast />
                    Fast Shipping
                  </span>
                </div>

                {/* Call to action button */}
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#232F3E]/5 hover:bg-[#232F3E]/10 text-[#232F3E] text-center py-2 rounded-lg transition-colors font-semibold mt-2 border border-[#232F3E]/20"
                >
                  Shop Now on Amazon
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials - New section */}
      <div className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800 text-center">
            User Experiences From Around The World
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael Johnson",
                location: "United States",
                text: "I saved over 40% on electronics through this website compared to local markets. The Amazon delivery was super fast!",
                rating: 5
              },
              {
                name: "Sarah Williams",
                location: "United Kingdom",
                text: "I was hesitant about buying certain products, but the site provided excellent advice and guided me to trusted Amazon sellers. Great experience.",
                rating: 5
              },
              {
                name: "Felix Chen",
                location: "Canada",
                text: "The prices are incomparable to other sites, and the Amazon products arrived exactly as described. I will continue shopping through you.",
                rating: 4
              }
            ].map((review, index) => (
              <div
                key={index}
                className="bg-[#232F3E]/5 rounded-xl p-6 border border-[#232F3E]/10 relative"
              >
                <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full border border-[#FEBD69]">
                  <span className="text-2xl">{"⭐".repeat(review.rating)}</span>
                </div>
                <p className="text-gray-700 italic mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-gray-500 text-sm">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ - New section */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: "How are Amazon products delivered internationally?",
              a: "Amazon ships globally to most countries, with delivery times typically between 2-10 days depending on your location and shipping option selected."
            },
            {
              q: "Are international orders subject to customs fees?",
              a: "Yes, international orders may be subject to import duties and taxes based on your country's regulations."
            },
            {
              q: "How can I verify product quality before purchasing?",
              a: "We provide real customer reviews and recommend only purchasing products with high ratings and positive feedback."
            },
            {
              q: "What payment methods are available for Amazon purchases?",
              a: "Amazon supports most major credit cards, debit cards, and payment options including PayPal, Apple Pay, and other electronic wallets."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-[#232F3E]">Q:</span> {item.q}
              </h4>
              <p className="text-gray-600 flex items-start gap-2">
                <span className="text-[#232F3E] font-bold">A:</span> {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/faq')}
            className="text-[#232F3E] hover:text-[#131921] font-medium"
          >
            View More FAQs →
          </button>
        </div>
      </div>

      {/* CTA section - Enhanced */}
      <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Are You Ready to Get the Best Amazon Deals?
          </h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of shoppers who save hundreds of dollars monthly through our website
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#FF9900] text-[#232F3E] px-8 py-3 rounded-full text-lg font-bold hover:bg-[#FFAC30] transition-colors shadow-lg"
          >
            Browse the Best Deals Now
          </button>
        </div>
      </div>

      {/* Disclaimer / Transparency - Enhanced */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#232F3E]/5 rounded-xl p-6 border border-[#232F3E]/10">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Our Commitment to Transparency
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are a participant in the Amazon Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites. When you purchase through our links, we may earn a commission at no additional cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;