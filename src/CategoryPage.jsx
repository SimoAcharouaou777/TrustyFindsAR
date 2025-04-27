import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegHeart, FaShoppingCart, FaShippingFast, FaPercent, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { MdVerified, MdLocalOffer } from 'react-icons/md';
import {products} from "./data.js";

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [loading, setLoading] = useState(true);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [sortBy, setSortBy] = useState('popularity');
    const [showFilters, setShowFilters] = useState(false);

    // Common category mapping used across the app
    const categoryMap = {
        'Electronics': 'electronics',
        'Fashion': 'fashion',
        'Makeup': 'makeup',
        'Beauty & Care': 'makeup',
        'Games & Gifts': 'games'
    };

    // Category-specific color themes - Updated with Amazon color schemes
    const categoryThemes = {
        'electronics': {
            gradient: 'from-[#232F3E] to-[#131921]',
            accent: '[#FF9900]',
            icon: '🔌'
        },
        'fashion': {
            gradient: 'from-[#232F3E] to-[#37475A]',
            accent: '[#FF9900]',
            icon: '👚'
        },
        'makeup': {
            gradient: 'from-[#232F3E] to-[#37475A]',
            accent: '[#FF9900]',
            icon: '💄'
        },
        'games': {
            gradient: 'from-[#232F3E] to-[#37475A]',
            accent: '[#FF9900]',
            icon: '🎮'
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // Simulate loading
        setTimeout(() => setLoading(false), 800);

        // Get category key from URL parameter
        const categoryKey = categoryName;

        // Filter products by category
        const filteredProducts = products.filter(product => product.category === categoryKey);

        // Sort by popularity initially
        const sortedProducts = [...filteredProducts].sort((a, b) => b.reviews - a.reviews);
        setCategoryProducts(sortedProducts);
    }, [categoryName]);

    const handleSort = (sortType) => {
        setSortBy(sortType);
        let sorted = [...categoryProducts];

        switch(sortType) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'discount':
                sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            default:
                sorted.sort((a, b) => b.reviews - a.reviews);
        }

        setCategoryProducts(sorted);
    };

    // Get the theme for current category
    const getCategoryTheme = () => {
        const categoryKey = categoryName || 'default';
        return categoryThemes[categoryKey] || categoryThemes.default;
    };

    const theme = getCategoryTheme();

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
                <div className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-${theme.accent} mb-4`}></div>
                <p className="text-lg font-medium text-gray-600">Loading {categoryName} products...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Banner Section - More attractive design */}
            <div className={`bg-gradient-to-r ${theme.gradient} py-16`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-left md:w-2/3">
                            <span className="text-white/80 font-medium mb-2 inline-block">Shop from the best products</span>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {theme.icon} {categoryName}
                            </h1>
                            <p className="text-white/90 text-lg max-w-lg mb-6">
                                Best {categoryName} products at competitive prices with fast delivery and quality guarantee
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                                    <FaShippingFast className="mr-2" />
                                    <span>Prime Delivery</span>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                                    <MdVerified className="mr-2" />
                                    <span>Authentic Products</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 md:mt-0 md:w-1/3">
                            <div className="relative">
                                <div className="absolute -inset-1 rounded-lg bg-white/30 blur"></div>
                                <div className="bg-white p-4 rounded-lg shadow-lg relative">
                                    <p className="font-bold text-gray-800 mb-2">Exclusive Offers</p>
                                    <div className="bg-yellow-100 text-[#B12704] text-sm px-3 py-1 rounded-md inline-flex items-center">
                                        <MdLocalOffer className="mr-1" /> Prime Exclusive Deals
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Sorting Bar */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-700">{categoryProducts.length} Products</span>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${showFilters ? `border-${theme.accent} text-${theme.accent}` : 'border-gray-300 text-gray-700'}`}
                        >
                            <FaFilter className="text-sm" />
                            <span>Filter</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 mt-3 sm:mt-0">
                        <span className="text-gray-600">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 bg-white text-gray-800"
                        >
                            <option value="popularity">Most Popular</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rating</option>
                            <option value="discount">Highest Discount</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid with Enhanced Cards */}
                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-yellow-200 group relative"
                            >
                                {/* Badges */}
                                {product.discountPercentage && product.discountPercentage >= 40 && (
                                    <div className="absolute top-3 left-3 bg-[#B12704] text-white px-2 py-1 rounded-md font-bold text-xs">
                                        {product.discountPercentage}% OFF
                                    </div>
                                )}

                                {product.reviews > 100 && (
                                    <div className="absolute top-3 right-3 bg-[#FF9900]/90 text-[#232F3E] px-2 py-1 rounded-md text-xs font-bold backdrop-blur-sm">
                                        Best Seller
                                    </div>
                                )}

                                {/* Image with hover effect */}
                                <a
                                    href={product.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative h-64 overflow-hidden bg-gray-100"
                                >
                                    <img
                                        src={product.image.startsWith('//') ? `https:${product.image}` : product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Quick actions on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                                        <div className="flex justify-center space-x-3">
                                            <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                                                <FaRegHeart className="w-5 h-5" />
                                            </button>
                                            <a
                                                href={product.affiliateLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#FF9900] text-[#232F3E] px-4 py-2 rounded-full font-medium hover:bg-[#FEBD69] transition-colors flex items-center gap-1"
                                            >
                                                <FaShoppingCart />
                                                View Product
                                            </a>
                                        </div>
                                    </div>
                                </a>

                                <div className="p-4">
                                    {/* Product Name */}
                                    <a
                                        href={product.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <h3 className="font-bold text-gray-900 hover:text-[#FF9900] line-clamp-2 h-14 mb-3">
                                            {product.name}
                                        </h3>
                                    </a>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xl font-bold text-[#B12704]">
                                            ${product.price}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-gray-500 line-through text-sm">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`${
                                                        i < Math.floor(product.rating)
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                    } w-4 h-4`}
                                                />
                                            ))}
                                            <span className="ml-1 font-medium">
                                                {product.rating}
                                            </span>
                                        </div>
                                        <span>
                                            ({product.reviews} reviews)
                                        </span>
                                    </div>

                                    {/* CTA Button */}
                                    <a
                                        href={product.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-gradient-to-r from-[#FF9900] to-[#FEBD69] text-[#232F3E] py-3 rounded-lg font-semibold hover:from-[#FEBD69] hover:to-[#FF9900] transition-all text-center"
                                    >
                                        Buy from Amazon
                                    </a>

                                    {/* Trust badge */}
                                    <div className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                                        <MdVerified className="text-blue-500" />
                                        Verified Product - Amazon A-to-z Guarantee
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                        <div className="text-5xl mb-4">😢</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No products available in this category</h2>
                        <p className="text-gray-500 mb-6">Please check other categories or come back later</p>
                        <Link to="/products" className="bg-[#FF9900] text-[#232F3E] px-6 py-3 rounded-lg font-medium hover:bg-[#FEBD69] transition-colors inline-block">
                            Browse All Products
                        </Link>
                    </div>
                )}

                {/* Promo Section */}
                {categoryProducts.length > 0 && (
                    <div className="mt-12 mb-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0 text-center md:text-left">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Try Amazon Prime for free delivery!
                                </h3>
                                <p className="text-gray-600">
                                    Sign up for a <span className="font-bold text-[#232F3E] bg-yellow-100 px-2 py-1 rounded">30-day free trial</span> of Amazon Prime.
                                </p>
                            </div>
                            <a
                                href="https://amazon.com/prime"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#FF9900] text-[#232F3E] px-6 py-2 rounded-full hover:bg-[#FEBD69] transition-colors shadow-md font-bold"
                            >
                                Try Prime Free
                            </a>
                        </div>
                    </div>
                )}

                {/* Trust & Benefits Section */}
                <div className="mt-16 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Why Shop From Us?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4">
                            <div className="bg-yellow-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
                                <FaShippingFast className="text-2xl text-[#FF9900]" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">Fast Prime Delivery</h3>
                            <p className="text-gray-600 text-sm">Free 2-day shipping for Prime members</p>
                        </div>

                        <div className="text-center p-4">
                            <div className="bg-yellow-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
                                <MdVerified className="text-2xl text-[#FF9900]" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">Authentic Products</h3>
                            <p className="text-gray-600 text-sm">We guarantee the quality and authenticity of all our products</p>
                        </div>

                        <div className="text-center p-4">
                            <div className="bg-yellow-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
                                <FaPercent className="text-2xl text-[#FF9900]" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">Competitive Prices</h3>
                            <p className="text-gray-600 text-sm">Best prices with continuous discounts</p>
                        </div>

                        <div className="text-center p-4">
                            <div className="bg-yellow-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
                                <FaSortAmountDown className="text-2xl text-[#FF9900]" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">Product Variety</h3>
                            <p className="text-gray-600 text-sm">Millions of products from popular brands</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;