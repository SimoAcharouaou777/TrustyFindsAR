import { FaSearch, FaChartLine, FaRegStar, FaExternalLinkAlt, FaShippingFast, FaTag, FaUserCheck, FaClock } from 'react-icons/fa';
import { MdVerified, MdLocalOffer, MdDiscount } from 'react-icons/md';
import AliExpressLogo from '../assets/AliExpress-Logo.wine.png';
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
    <div className="bg-gray-50" dir="rtl">
      {/* Hero Section - Enhanced with gradient and better visuals */}
      <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF9248] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src={AliExpressLogo}
              alt="AliExpress"
              className="h-32 md:h-36 w-auto drop-shadow-xl animate-float"
            />
          </div>

          {/* Heading - Enhanced with better typography */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-shadow-lg">
            التسوق الذكي مع <span className="underline decoration-wavy decoration-white">علي إكسبريس</span> في السعودية
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium opacity-90">
            اكتشف أفضل المنتجات المخفضة والعروض الحصرية - توصيل سريع للمملكة العربية السعودية
          </p>

          {/* Search Bar - Enhanced with better functionality */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="ماذا تريد أن تشتري اليوم؟"
              className="w-full px-5 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-2 top-2 bg-white text-[#FF6A00] px-5 py-2 rounded-full hover:bg-orange-100 transition-all duration-300 flex items-center gap-2 font-semibold shadow-sm"
            >
              <FaSearch />
              بحث
            </button>
          </form>

          {/* Trust badges - New section */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <FaShippingFast className="text-white" />
              <span>توصيل سريع للسعودية</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <MdVerified className="text-white" />
              <span>منتجات موثوقة 100%</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <MdDiscount className="text-white" />
              <span>خصومات حصرية</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Deals Counter - New section */}
      <div className="bg-yellow-50 border-y border-yellow-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <FaClock className="text-[#FF6A00] animate-pulse" />
              <span className="font-bold text-gray-800">عروض تنتهي قريباً:</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#FF6A00] text-white px-3 py-1 rounded-md">
                <span className="font-mono font-bold">{String(countdown.hours).padStart(2, '0')}</span>
              </div>
              <span className="font-bold">:</span>
              <div className="bg-[#FF6A00] text-white px-3 py-1 rounded-md">
                <span className="font-mono font-bold">{String(countdown.minutes).padStart(2, '0')}</span>
              </div>
              <span className="font-bold">:</span>
              <div className="bg-[#FF6A00] text-white px-3 py-1 rounded-md">
                <span className="font-mono font-bold">{String(countdown.seconds).padStart(2, '0')}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/flash-deals')}
              className="bg-[#FF6A00] text-white px-4 py-1 rounded-full hover:bg-[#FF5500] transition-colors text-sm font-medium flex items-center gap-1 mt-2 md:mt-0"
            >
              <MdLocalOffer />
              تصفح العروض الآن
            </button>
          </div>
        </div>
      </div>

      {/* Features / Value Proposition - Enhanced with better icons and layout */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
          لماذا يختار السعوديون التسوق معنا؟
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">نوفر لك تجربة تسوق آمنة وسهلة مع أفضل المنتجات المختارة خصيصاً للسوق السعودي</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: FaShippingFast,
              title: "توصيل سريع للسعودية",
              text: "شحن مباشر وسريع لجميع مدن المملكة",
            },
            {
              icon: FaRegStar,
              title: "تقييمات حقيقية",
              text: "مراجعات من مشترين سعوديين حقيقيين",
            },
            {
              icon: FaTag,
              title: "أسعار تنافسية",
              text: "خصومات حصرية وأسعار أقل من السوق المحلي",
            },
            {
              icon: FaUserCheck,
              title: "دعم باللغة العربية",
              text: "مساعدة متوفرة على مدار الساعة بلغتك",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 hover:border-orange-300 hover:-translate-y-1"
            >
              <div className="bg-orange-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-[#FF6A00]" />
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
      <div className="bg-gradient-to-b from-white to-orange-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800 text-center">
            الفئات الأكثر شعبية في السعودية
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "الإلكترونيات", icon: "📱", color: "bg-blue-50 border-blue-200" },
              { name: "الأزياء", icon: "👗", color: "bg-pink-50 border-pink-200" },
              { name: "مستلزمات المنزل", icon: "🏠", color: "bg-green-50 border-green-200" },
              { name: "الجمال والعناية", icon: "✨", color: "bg-purple-50 border-purple-200" },
              { name: "الألعاب والهدايا", icon: "🎮", color: "bg-yellow-50 border-yellow-200" },
              { name: "السيارات", icon: "🚗", color: "bg-gray-50 border-gray-200" },
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
              منتجات رائجة في السعودية
            </h2>
            <p className="text-gray-600 mt-1">اشتر بثقة مع ضمان جودة المنتجات</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#FF6A00] hover:bg-[#FF5500] text-white px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            تصفح جميع المنتجات
            <span className="text-lg">←</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
            >
              {/* Product image with better visualization */}
              <div className="h-56 bg-gray-100 relative overflow-hidden group">
                {product.discountPercentage && (
                  <div className="absolute top-2 left-2 bg-[#FF6A00] text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    خصم {product.discountPercentage}%
                  </div>
                )}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-gray-500">صورة المنتج</span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => window.open(product.link, '_blank')}
                    className="bg-white text-[#FF6A00] px-4 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    عرض المنتج
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg line-clamp-2 h-14">
                  {product.name}
                </h3>

                {/* Price with better visualization */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-[#FF6A00]">
                    {product.price} ر.س
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      {product.originalPrice} ر.س
                    </span>
                  )}
                </div>

                {/* Rating and shipping info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <FaRegStar className="text-yellow-400" />
                    <span>{product.rating} ({product.reviews} تقييم)</span>
                  </div>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <FaShippingFast />
                    شحن سريع
                  </span>
                </div>

                {/* Call to action button */}
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-orange-50 hover:bg-orange-100 text-[#FF6A00] text-center py-2 rounded-lg transition-colors font-semibold mt-2 border border-orange-200"
                >
                  تسوق الآن من علي إكسبريس
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
            تجارب مستخدمين من السعودية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "محمد العتيبي",
                location: "الرياض",
                text: "وفرت أكثر من 40% على شراء الإلكترونيات من خلال هذا الموقع مقارنة بالأسواق المحلية. التوصيل كان سريع جداً!",
                rating: 5
              },
              {
                name: "سارة الدوسري",
                location: "جدة",
                text: "كنت متخوفة من الشراء من علي إكسبريس، لكن الموقع قدم نصائح ممتازة وأرشدني للبائعين الموثوقين. تجربة رائعة.",
                rating: 5
              },
              {
                name: "فهد القحطاني",
                location: "الدمام",
                text: "الأسعار لا تقارن بالمواقع الأخرى، وصلتني المنتجات بالضبط كما هي موصوفة. سأستمر في التسوق من خلالكم.",
                rating: 4
              }
            ].map((review, index) => (
              <div
                key={index}
                className="bg-orange-50 rounded-xl p-6 border border-orange-100 relative"
              >
                <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full border border-orange-200">
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
          الأسئلة الشائعة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: "كيف يتم توصيل المنتجات إلى السعودية؟",
              a: "يتم شحن المنتجات مباشرة من علي إكسبريس إلى عنوانك في المملكة، مع توفير خيارات شحن سريعة تصل خلال 7-15 يوم."
            },
            {
              q: "هل المنتجات تخضع للجمارك السعودية؟",
              a: "نعم، المنتجات التي تزيد قيمتها عن 1000 ريال قد تخضع للرسوم الجمركية وفقاً لأنظمة المملكة."
            },
            {
              q: "كيف أتأكد من جودة المنتج قبل الشراء؟",
              a: "نوفر تقييمات حقيقية من مستخدمين سعوديين، وننصح بشراء المنتجات ذات التقييمات العالية فقط."
            },
            {
              q: "ما هي طرق الدفع المتاحة للمشترين من السعودية؟",
              a: "يدعم علي إكسبريس بطاقات مدى، فيزا، ماستركارد، وأبل باي، ومحافظ إلكترونية أخرى."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-[#FF6A00]">س:</span> {item.q}
              </h4>
              <p className="text-gray-600 flex items-start gap-2">
                <span className="text-[#FF6A00] font-bold">ج:</span> {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/faq')}
            className="text-[#FF6A00] hover:text-[#FF5500] font-medium"
          >
            عرض المزيد من الأسئلة الشائعة →
          </button>
        </div>
      </div>

      {/* CTA section - Enhanced */}
      <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF9248] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            هل أنت جاهز للحصول على أفضل صفقات علي إكسبريس؟
          </h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المتسوقين السعوديين الذين يوفرون آلاف الريالات شهرياً من خلال موقعنا
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-white text-[#FF6A00] px-8 py-3 rounded-full text-lg font-bold hover:bg-orange-50 transition-colors shadow-lg"
          >
            تصفح أفضل العروض الآن
          </button>
        </div>
      </div>

      {/* Disclaimer / Transparency - Enhanced */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              التزامنا بالشفافية
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نحن موقع تابع لبرنامج التسويق بالعمولة مع علي إكسبريس. عند الشراء من خلال روابطنا، قد نحصل على عمولة دون أي تكلفة إضافية عليك. نختار فقط المنتجات عالية الجودة والموثوقة للمستهلك السعودي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;