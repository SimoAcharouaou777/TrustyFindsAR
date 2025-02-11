import { Link, useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { products } from '../data';
const ProductDetails = () => {
  const { productId } = useParams();
  
  // In a real app, you'd fetch this data from an API
  // For now, using the same product data structure
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <a 
            href={product.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </a>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <span className="text-xl font-bold text-[#FF6A00]">
              ${product.price}
            </span>
          </div>

          {/* Product Specifications */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>High-quality sound with noise cancellation</li>
                <li>30-hour battery life</li>
                <li>Water-resistant design</li>
                <li>Comfortable ear cushions</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Free shipping worldwide</li>
                <li>Estimated delivery: 3-7 business days</li>
                <li>Easy returns within 30 days</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full lg:w-auto bg-[#FF6A00] text-white px-8 py-3 rounded-lg hover:bg-[#FF5500] transition-colors flex items-center justify-center gap-2"
          >
            <FaShoppingCart />
            Buy on AliExpress
          </a>

          <Link
            to="/products"
            className="inline-block w-full lg:w-auto text-[#FF6A00] hover:text-[#FF5500] mt-4"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;