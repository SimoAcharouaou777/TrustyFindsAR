import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaShippingFast, FaRegClock, FaRegCheckCircle, FaRegHeart, FaShare, FaBell, FaChartLine } from 'react-icons/fa';
import { MdVerified, MdLocalOffer } from 'react-icons/md';
import { products } from "../data.js";

const ProductDetails = () => {
  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // Find the selected product by ID
  const product = products.find((p) => p.id === Number(productId));

  // Similar products (based on similar category)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sorry, product not found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for is not available or has been removed</p>
          <Link to="/products" className="bg-[#FF9900] text-[#232F3E] px-6 py-3 rounded-lg hover:bg-[#FEBD69] transition-colors">
            Browse Available Products
          </Link>
        </div>
      </div>
    );
  }

  // Mock price history data
  const priceHistory = [
    { date: 'Jan', price: Math.round(product.price * 1.2) },
    { date: 'Feb', price: Math.round(product.price * 1.15) },
    { date: 'Mar', price: Math.round(product.price * 1.1) },
    { date: 'Apr', price: Math.round(product.price * 1.05) },
    { date: 'May', price: product.price }
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
    <div className="bg-gray-50 py-12">
      {showNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Price drop alert activated successfully!
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-[#FF9900]">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/products" className="hover:text-[#FF9900]">Products</Link>
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
                  <div className="absolute top-4 left-4 bg-[#FF9900] text-[#232F3E] px-3 py-1 rounded-full text-sm font-bold z-10 flex items-center gap-1">
                    <MdLocalOffer />
                    {product.discountPercentage}% OFF
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
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${index === activeImage ? 'border-[#FF9900]' : 'border-gray-200'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Features and Benefits */}
              <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100 mt-6">
                <h3 className="font-semibold text-lg mb-3">Product Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FaShippingFast, text: "Fast Delivery" },
                    { icon: FaRegCheckCircle, text: "Excellent Quality" },
                    { icon: FaRegClock, text: "1-Year Warranty" },
                    { icon: FaRegHeart, text: "Featured Product" }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <feature.icon className="text-[#FF9900]" />
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
                  <span className="text-sm font-medium text-blue-500">Amazon Prime Eligible</span>
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
                  <span className="text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-blue-500 text-sm">
                  {product.reviews} verified reviews
                </span>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-[#B12704]">
                    ${product.price}
                  </span>
                  {product.discountPercentage && (
                    <span className="bg-green-50 text-green-700 text-sm px-2 py-1 rounded-lg border border-green-100">
                      Save {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%
                    </span>
                  )}
                </div>

                {/* Price history */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FaChartLine className="text-gray-500" />
                    <span className="text-sm font-medium">Price History:</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {priceHistory.map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div style={{
                          height: `${(item.price / Math.max(...priceHistory.map(p => p.price)) * 40)}px`,
                          width: '20px',
                        }}
                        className={`${i === priceHistory.length - 1 ? 'bg-[#FF9900]' : 'bg-gray-300'} rounded-t-sm`}
                        ></div>
                        <span className="text-[10px] text-gray-500 mt-1">{item.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">Lowest price in 6 months</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePriceAlert}
                        className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700"
                      >
                        <FaBell /> Alert me when price drops
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="space-y-4">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-3">Product Specifications</h3>
                  <ul className="space-y-2 text-gray-700">
                    {(product.specifications || [
                      'High quality materials and design',
                      'Comfortable for daily use',
                      'Safe delivery guarantee',
                      'Elegant design suitable for all tastes',
                      'Complies with standard specifications',
                      'Suitable for gifts and personal use'
                    ]).map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FaRegCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-3">Shipping Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaShippingFast className="text-[#FF9900] text-lg flex-shrink-0" />
                      <div>
                        <p className="font-medium">Prime Delivery Available</p>
                        <p className="text-sm text-gray-500">Free 2-day shipping for Prime members</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaRegCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                      <div>
                        <p className="font-medium">30-day Amazon return policy</p>
                        <p className="text-sm text-gray-500">Easy returns if you're not satisfied</p>
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
                  className="inline-flex w-full bg-[#FF9900] text-[#232F3E] px-8 py-4 rounded-xl hover:bg-[#FEBD69] transition-all items-center justify-center gap-2 font-bold shadow-sm hover:shadow-md"
                >
                  <FaShoppingCart />
                  Buy Now from Amazon
                </a>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <FaRegHeart />
                    Add to Favorites
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <FaShare />
                    Share
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
          <h2 className="text-xl font-bold text-gray-800 mb-6">Verified Customer Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Michael Johnson",
                date: "1 week ago",
                rating: 5,
                comment: "Excellent product, quality better than expected. Amazon delivery was very fast and the product arrived in excellent condition. I recommend buying from this seller.",
                helpful: 12
              },
              {
                name: "Sarah Williams",
                date: "1 month ago",
                rating: 4,
                comment: "Product quality is excellent and worth the price. I gave 4 stars only because shipping took a little longer than expected, but still within Amazon's estimated delivery window.",
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
                    <span className="text-blue-500">{review.helpful}</span> found this review helpful
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-700">This review is helpful</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Other Products You May Like</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct, index) => (
              <Link
                key={index}
                to={`/products/${relProduct.id}`}
                className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="h-36 bg-white relative">
                  {relProduct.discountPercentage && (
                    <div className="absolute top-2 left-2 bg-[#FF9900] text-[#232F3E] px-2 py-1 rounded-full text-xs font-bold">
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
                    <span className="font-bold text-[#B12704]">${relProduct.price}</span>
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
        <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Shop with Confidence on Amazon</h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            We offer trusted products from verified Amazon sellers. All our links direct you straight to Amazon, so you benefit from their A-to-z Guarantee and official return policies.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { text: "Million+ happy customers worldwide", value: "300+" },
              { text: "A-to-z Guarantee on all purchases", value: "100%" },
              { text: "Available products on Amazon", value: "350M+" },
              { text: "Average savings on purchases", value: "30%" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-yellow-100">
                <div className="text-2xl font-bold text-[#FF9900]">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/products" className="inline-block bg-[#FF9900] text-[#232F3E] px-6 py-3 rounded-xl hover:bg-[#FEBD69] transition-colors shadow-sm hover:shadow-md font-bold">
              Browse More Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;