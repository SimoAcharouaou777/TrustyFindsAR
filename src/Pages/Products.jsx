import { useState, useEffect } from 'react';
    import { FaStar, FaRegHeart, FaShoppingCart, FaSearch, FaFilter, FaShippingFast, FaPercentage, FaFire, FaSortAmountDown } from 'react-icons/fa';
    import { MdVerified, MdLocalOffer, MdDiscount } from 'react-icons/md';
    import { Link } from 'react-router-dom';
    import { products } from "../data.js";

    const Products = () => {
        const [selectedCategory, setSelectedCategory] = useState('all');
        const [priceRange, setPriceRange] = useState([0, 500]);
        const [minRating, setMinRating] = useState(0);
        const [searchTerm, setSearchTerm] = useState('');
        const [sortBy, setSortBy] = useState('popularity');
        const [filtersVisible, setFiltersVisible] = useState(false);
        const [loading, setLoading] = useState(true);

        // التصنيفات باللغة العربية
        const categories = [
            { name: 'all', label: 'جميع المنتجات' },
            { name: 'electronics', label: 'إلكترونيات' },
            { name: 'fashion', label: 'أزياء' },
            { name: 'makeup', label: 'مكياج' },
        ];

        // Sorting options
        const sortOptions = [
            { value: 'popularity', label: 'الأكثر شعبية' },
            { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
            { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
            { value: 'rating', label: 'التقييم الأعلى' },
            { value: 'newest', label: 'الأحدث' },
        ];

        // Simulate loading
        useEffect(() => {
            setTimeout(() => setLoading(false), 800);
        }, []);

        // Apply all filters and sorting
        const getFilteredProducts = () => {
            let filtered = products;

            // Category filter
            if (selectedCategory !== 'all') {
                filtered = filtered.filter(product => product.category === selectedCategory);
            }

            // Price range filter
            filtered = filtered.filter(product =>
                product.price >= priceRange[0] && product.price <= priceRange[1]
            );

            // Rating filter
            if (minRating > 0) {
                filtered = filtered.filter(product => product.rating >= minRating);
            }

            // Search filter
            if (searchTerm.trim() !== '') {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(term)
                );
            }

            // Sort products
            switch (sortBy) {
                case 'price-asc':
                    filtered = [...filtered].sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filtered = [...filtered].sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
                    break;
                case 'newest':
                    // Assuming a more recent ID means newer product
                    filtered = [...filtered].sort((a, b) => b.id - a.id);
                    break;
                case 'popularity':
                default:
                    // Sort by reviews count as a proxy for popularity
                    filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
                    break;
            }

            return filtered;
        };

        const filteredProducts = getFilteredProducts();

        // Generates discounted prices for products that don't have one
        const getDiscountedPrice = (product) => {
            // If product doesn't have originalPrice, generate one
            if (!product.originalPrice) {
                const markup = Math.random() * 0.4 + 0.1; // 10-50% markup
                return (product.price * (1 + markup)).toFixed(2);
            }
            return product.originalPrice;
        };

        // Calculate discount percentage
        const getDiscountPercentage = (price, originalPrice) => {
            const discount = ((originalPrice - price) / originalPrice) * 100;
            return Math.round(discount);
        };

        return (
            <div className="bg-gray-50" dir="rtl">
                {/* Banner Section */}
                <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF9248] py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-white text-center">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">تسوق أفضل المنتجات من علي إكسبريس</h1>
                            <p className="text-xl opacity-90 mb-6">خصومات حصرية تصل إلى 70% للمتسوقين من السعودية</p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-2">
                                    <FaShippingFast className="text-white" />
                                    <span>توصيل سريع للسعودية</span>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-2">
                                    <MdVerified className="text-white" />
                                    <span>منتجات أصلية 100%</span>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-2">
                                    <MdDiscount className="text-white" />
                                    <span>خصومات حصرية</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search bar - big and prominent */}
                <div className="bg-white py-6 shadow-md sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <form onSubmit={(e) => e.preventDefault()} className="relative">
                            <input
                                type="text"
                                placeholder="ابحث عن منتجات علي إكسبريس..."
                                className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        </form>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Controls panel - Category buttons and Sort */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium ${
                                        selectedCategory === category.name
                                            ? 'bg-[#FF6A00] text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    } transition-colors`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        {/* Sort and Filter buttons */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-[#FF6A00]"
                                >
                                    {sortOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>

                            <button
                                onClick={() => setFiltersVisible(!filtersVisible)}
                                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                            >
                                <FaFilter />
                                <span className="hidden md:inline">الفلاتر</span>
                            </button>
                        </div>
                    </div>

                    {/* Advanced filters - Only shown when expanded */}
                    {filtersVisible && (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
                            <h3 className="font-bold text-lg mb-4 text-gray-800">خيارات متقدمة للتصفية</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Price range filter */}
                                <div>
                                    <label className="block text-gray-700 mb-2">نطاق السعر</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            placeholder="من"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            placeholder="إلى"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        />
                                    </div>
                                </div>

                                {/* Rating filter */}
                                <div>
                                    <label className="block text-gray-700 mb-2">التقييم</label>
                                    <div className="flex items-center gap-2">
                                        {[0, 1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                onClick={() => setMinRating(rating)}
                                                className={`${minRating === rating ? 'bg-yellow-400 text-white' : 'bg-gray-100'} px-3 py-1 rounded-md`}
                                            >
                                                {rating > 0 ? `${rating}+` : 'الكل'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Reset filters */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setPriceRange([0, 500]);
                                        setMinRating(0);
                                        setSearchTerm('');
                                    }}
                                    className="text-[#FF6A00] hover:text-[#FF5500] font-medium"
                                >
                                    إعادة ضبط الفلاتر
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Results summary */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {loading ? 'جاري التحميل...' : `${filteredProducts.length} منتج`}
                        </h2>
                        {searchTerm && (
                            <div className="text-gray-600">
                                نتائج البحث عن: <span className="font-medium">{searchTerm}</span>
                            </div>
                        )}
                    </div>

                    {/* Loading state */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((placeholder) => (
                                <div key={placeholder} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                                    <div className="h-64 bg-gray-200"></div>
                                    <div className="p-4">
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                                        <div className="h-10 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* No results */}
                            {filteredProducts.length === 0 && (
                                <div className="text-center py-10">
                                    <div className="text-5xl mb-4">😕</div>
                                    <h3 className="text-xl font-semibold mb-2">لم نجد أي منتجات</h3>
                                    <p className="text-gray-600 mb-6">حاول تغيير معايير البحث أو التصفية</p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setPriceRange([0, 500]);
                                            setMinRating(0);
                                            setSearchTerm('');
                                        }}
                                        className="bg-[#FF6A00] text-white px-6 py-2 rounded-full hover:bg-[#FF5500] transition-colors"
                                    >
                                        عرض جميع المنتجات
                                    </button>
                                </div>
                            )}

                            {/* Product grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => {
                                    const originalPrice = getDiscountedPrice(product);
                                    const discountPercentage = getDiscountPercentage(product.price, originalPrice);

                                    return (
                                        <div
                                            key={product.id}
                                            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 group relative"
                                        >
                                            {/* Product badges */}
                                            <div className="absolute top-0 right-0 z-10">
                                                {discountPercentage > 30 && (
                                                    <div className="bg-red-600 text-white px-3 py-1 font-bold">
                                                        خصم {discountPercentage}%
                                                    </div>
                                                )}
                                            </div>

                                            {product.reviews > 200 && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <div className="bg-[#FF6A00]/90 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                        <FaFire className="text-yellow-300" />
                                                        الأكثر مبيعاً
                                                    </div>
                                                </div>
                                            )}

                                            {/* Product image */}
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

                                                {/* Quick action buttons */}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                    <div className="flex justify-center space-x-3">
                                                        <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                                                            <FaRegHeart className="w-5 h-5" />
                                                        </button>
                                                        <a
                                                            href={product.affiliateLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-[#FF6A00] text-white px-4 py-2 rounded-full font-medium hover:bg-[#FF5500] transition-colors flex items-center gap-1"
                                                        >
                                                            <FaShoppingCart />
                                                            عرض المنتج
                                                        </a>
                                                    </div>
                                                </div>
                                            </a>

                                            <div className="p-5">
                                                {/* Product title */}
                                                <a
                                                    href={product.affiliateLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block mb-3"
                                                >
                                                    <h3 className="font-bold text-lg text-gray-900 hover:text-[#FF6A00] line-clamp-2 h-14">
                                                        {product.name}
                                                    </h3>
                                                </a>

                                                {/* Rating */}
                                                <div className="flex items-center mb-3">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} w-5 h-5`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-600 mr-2">
                                                        {product.rating} ({product.reviews} تقييم)
                                                    </span>
                                                </div>

                                                {/* Price */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-2xl font-bold text-[#FF6A00]">
                                                        {product.price} ر.س
                                                    </span>
                                                    <span className="text-gray-500 line-through text-base">
                                                        {originalPrice} ر.س
                                                    </span>
                                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                                        وفر {discountPercentage}%
                                                    </span>
                                                </div>

                                                {/* Shipping info */}
                                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                                    <FaShippingFast className="text-green-600 mr-1" />
                                                    <span>توصيل سريع للسعودية (7-15 يوم)</span>
                                                </div>

                                                {/* CTA button */}
                                                <a
                                                    href={product.affiliateLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full bg-gradient-to-r from-[#FF6A00] to-[#FF9248] text-white py-3 rounded-lg font-semibold hover:from-[#FF5500] hover:to-[#FF8238] transition-all text-center"
                                                >
                                                    شراء من علي إكسبريس
                                                </a>

                                                {/* Trust badge */}
                                                <div className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                                                    <MdVerified className="text-blue-500" />
                                                    منتج موثوق - يشمل ضمان
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* Promotional banner - placed between products */}
                    {filteredProducts.length > 0 && (
                        <div className="my-10 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border border-orange-200">
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        خصم إضافي 10% على جميع المشتريات من علي إكسبريس!
                                    </h3>
                                    <p className="text-gray-600">
                                        استخدم كود الخصم <span className="font-bold text-[#FF6A00]">SAUDI10</span> عند إتمام عملية الشراء.
                                    </p>
                                </div>
                                <button
                                    className="bg-[#FF6A00] text-white px-6 py-2 rounded-full hover:bg-[#FF5500] transition-colors shadow-md"
                                    onClick={() => {
                                        // Copy code functionality would go here
                                        alert("تم نسخ الكود: SAUDI10");
                                    }}
                                >
                                    نسخ الكود
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Social proof section */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-16 mb-10">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">تجارب المتسوقين من السعودية</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    {
                                        name: "فيصل العنزي",
                                        date: "منذ أسبوع",
                                        text: "وصلت المنتجات بدقة كما هو موصوف وبجودة ممتازة. سعيد جداً بالتجربة!",
                                        product: "سماعات بلوتوث"
                                    },
                                    {
                                        name: "نورة المطيري",
                                        date: "منذ 3 أيام",
                                        text: "جودة المنتج ممتازة والتوصيل أسرع مما توقعت. سأطلب مجدداً بالتأكيد.",
                                        product: "أزياء نسائية"
                                    },
                                    {
                                        name: "عبدالله الحربي",
                                        date: "منذ أسبوعين",
                                        text: "سعر مناسب جداً مقارنة بالأسواق المحلية. المنتج يستحق كل ريال.",
                                        product: "إلكترونيات"
                                    }
                                ].map((review, i) => (
                                    <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="font-semibold">{review.name}</div>
                                            <div className="text-sm text-gray-500">{review.date}</div>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 mb-3">{review.text}</p>
                                        <div className="text-sm text-gray-500">
                                            اشترى: <span className="text-[#FF6A00]">{review.product}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Shopping guide */}
                    <div className="mt-16 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">نصائح للتسوق من علي إكسبريس في السعودية</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-2 text-[#FF6A00]">كيف تتأكد من جودة المنتج؟</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>تحقق دائماً من تقييمات المنتج والصور من المشترين السابقين</li>
                                    <li>اختر البائعين ذوي التقييمات العالية (4.5+ نجوم)</li>
                                    <li>اقرأ المراجعات باللغة العربية للمشترين من السعودية</li>
                                    <li>تحقق من مواصفات المنتج بدقة قبل الشراء</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2 text-[#FF6A00]">معلومات الشحن والتوصيل</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>معظم الشحنات تصل خلال 7-15 يوم عمل للسعودية</li>
                                    <li>المنتجات أقل من 1000 ريال لا تخضع للجمارك</li>
                                    <li>تتبع طلبك مباشرة عبر تطبيق علي إكسبريس</li>
                                    <li>اختر خدمة الشحن السريع للحصول على طلبك بشكل أسرع</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Products;