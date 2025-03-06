import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaShippingFast, FaRegClock, FaRegCheckCircle, FaRegHeart, FaShare, FaBell, FaChartLine } from 'react-icons/fa';
import { MdVerified, MdLocalOffer } from 'react-icons/md';
import { products } from "../data.js";

const ProductDetails = () => {
  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // البحث عن المنتج المحدد من خلال الـ ID
  const product = products.find((p) => p.id === Number(productId));

  // منتجات مشابهة (based on similar category)
  const relatedProducts = products
    .filter(p => p.id !== Number(productId))
    .slice(0, 4);

  // Track product view
  useEffect(() => {
    if (product) {
      // Analytics tracking would go here
      window.scrollTo(0, 0);
    }
  }, [productId, product]);

  const handlePriceAlert = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">عذراً، لم يتم العثور على المنتج</h2>
          <p className="text-gray-600 mb-6">المنتج الذي تبحث عنه غير متوفر أو تم حذفه</p>
          <Link to="/products" className="bg-[#FF6A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF5500] transition-colors">
            تصفح المنتجات المتوفرة
          </Link>
        </div>
      </div>
    );
  }

  // Mock price history data
  const priceHistory = [
    { date: 'يناير', price: Math.round(product.price * 1.2) },
    { date: 'فبراير', price: Math.round(product.price * 1.15) },
    { date: 'مارس', price: Math.round(product.price * 1.1) },
    { date: 'أبريل', price: Math.round(product.price * 1.05) },
    { date: 'مايو', price: product.price }
  ];

  // Create mock product images (normally these would come from the API)
  const productImages = [
    product.image,
    ...(product.additionalImages || []),
    // If product doesn't have additional images, create variations
    ...(!product.additionalImages ? [
      product.image + '?variant=1',
      product.image + '?variant=2',
    ] : [])
  ];

  return (
    <div className="bg-gray-50 py-12" dir="rtl">
      {showNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          تم تفعيل تنبيه انخفاض السعر بنجاح!
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-[#FF6A00]">الرئيسية</Link>
          <span className="mx-2">›</span>
          <Link to="/products" className="hover:text-[#FF6A00]">المنتجات</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm h-80 md:h-96 bg-white">
                {product.discountPercentage && (
                  <div className="absolute top-4 right-4 bg-[#FF6A00] text-white px-3 py-1 rounded-full text-sm font-bold z-10 flex items-center gap-1">
                    <MdLocalOffer />
                    خصم {product.discountPercentage}%
                  </div>
                )}
                <img
                  src={productImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex justify-center gap-3 overflow-x-auto">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${index === activeImage ? 'border-[#FF6A00]' : 'border-gray-200'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Features and Benefits */}
              <div className="bg-orange-50 rounded-xl p-5 border border-orange-100 mt-6">
                <h3 className="font-semibold text-lg mb-3">مميزات المنتج</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FaShippingFast, text: "توصيل سريع" },
                    { icon: FaRegCheckCircle, text: "جودة ممتازة" },
                    { icon: FaRegClock, text: "ضمان لمدة سنة" },
                    { icon: FaRegHeart, text: "منتج مميز" }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <feature.icon className="text-[#FF6A00]" />
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MdVerified className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-500">بائع موثوق بعلي إكسبريس</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="text-gray-600 mr-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-blue-500 text-sm">
                  {product.reviews} تقييم من المشترين
                </span>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">
                      {product.originalPrice} ر.س
                    </span>
                  )}
                  <span className="text-3xl font-bold text-[#FF6A00]">
                    {product.price} ر.س
                  </span>
                  {product.discountPercentage && (
                    <span className="bg-green-50 text-green-700 text-sm px-2 py-1 rounded-lg border border-green-100">
                      وفر {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%
                    </span>
                  )}
                </div>

                {/* Price history */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FaChartLine className="text-gray-500" />
                    <span className="text-sm font-medium">تاريخ تغير السعر:</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {priceHistory.map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div style={{
                          height: `${(item.price / Math.max(...priceHistory.map(p => p.price)) * 40)}px`,
                          width: '20px',
                        }}
                        className={`${i === priceHistory.length - 1 ? 'bg-[#FF6A00]' : 'bg-gray-300'} rounded-t-sm`}
                        ></div>
                        <span className="text-[10px] text-gray-500 mt-1">{item.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">أدنى سعر في 6 أشهر</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePriceAlert}
                        className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700"
                      >
                        <FaBell /> تنبيه عند انخفاض السعر
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="space-y-4">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-3 text-right">مواصفات المنتج</h3>
                  <ul className="space-y-2 text-gray-700">
                    {(product.specifications || [
                      'جودة عالية في الخامات والتصميم',
                      'مريح للاستخدام اليومي',
                      'ضمان سلامة التوصيل',
                      'تصميم أنيق يناسب جميع الأذواق',
                      'متوافق مع المعايير القياسية',
                      'مناسب للهدايا والاستخدام الشخصي'
                    ]).map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FaRegCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-3 text-right">معلومات الشحن</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaShippingFast className="text-[#FF6A00] text-lg flex-shrink-0" />
                      <div>
                        <p className="font-medium">شحن سريع إلى السعودية</p>
                        <p className="text-sm text-gray-500">يصل إلى باب منزلك خلال 7-15 يوم</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaRegCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                      <div>
                        <p className="font-medium">ضمان استرجاع لمدة 30 يوم</p>
                        <p className="text-sm text-gray-500">في حالة وصول المنتج غير مطابق للوصف</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full bg-[#FF6A00] text-white px-8 py-4 rounded-xl hover:bg-[#FF5500] transition-all items-center justify-center gap-2 font-bold shadow-sm hover:shadow-md"
                >
                  <FaShoppingCart />
                  اشترِ الآن من علي إكسبريس
                </a>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <FaRegHeart />
                    أضف للمفضلة
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <FaShare />
                    مشاركة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">آراء المتسوقين من السعودية</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "أحمد الشمري",
                date: "منذ أسبوع",
                rating: 5,
                comment: "منتج ممتاز والجودة أفضل مما توقعت. التوصيل كان سريعًا جدًا ووصل المنتج بحالة ممتازة. أنصح بالشراء من هذا البائع.",
                helpful: 12
              },
              {
                name: "نورة العتيبي",
                date: "منذ شهر",
                rating: 4,
                comment: "جودة المنتج ممتازة وقيمته تستحق السعر. أعطيت 4 نجوم فقط لأن الشحن استغرق وقتاً أطول قليلاً من المتوقع.",
                helpful: 8
              }
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? "text-yellow-400 w-4 h-4" : "text-gray-300 w-4 h-4"} />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="text-blue-500">{review.helpful}</span> وجدوا هذا التقييم مفيداً
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-700">هذا التقييم مفيد</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">منتجات أخرى قد تعجبك</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct, index) => (
              <Link
                key={index}
                to={`/products/${relProduct.id}`}
                className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="h-36 bg-white relative">
                  {relProduct.discountPercentage && (
                    <div className="absolute top-2 right-2 bg-[#FF6A00] text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{relProduct.discountPercentage}%
                    </div>
                  )}
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 text-sm h-10">{relProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#FF6A00]">{relProduct.price} ر.س</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 w-3 h-3" />
                      <span className="text-xs text-gray-500">{relProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust elements and FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">تسوق بثقة مع بوابة علي إكسبريس</h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            نقدم لك منتجات موثوقة من بائعين معتمدين. جميع روابطنا توجهك مباشرة إلى علي إكسبريس، لتستفيد من حماية المشتري والضمان الرسمي.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { text: "مليون+ عميل سعودي سعيد", value: "1" },
              { text: "ضمان استرجاع الأموال", value: "100%" },
              { text: "منتج متوفر للسعودية", value: "50K+" },
              { text: "توفير على المشتريات", value: "30%" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-orange-100">
                <div className="text-2xl font-bold text-[#FF6A00]">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/products" className="inline-block bg-[#FF6A00] text-white px-6 py-3 rounded-xl hover:bg-[#FF5500] transition-colors shadow-sm hover:shadow-md font-bold">
              تصفح المزيد من المنتجات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;