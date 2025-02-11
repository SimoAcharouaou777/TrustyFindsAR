import { useState } from 'react';
import { FaStar, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { products } from '../data'; 

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Fake product data
 

  const categories = [
    { name: 'all', label: 'All Products' },
    { name: 'electronics', label: 'Electronics' },
    { name: 'fashion', label: 'Fashion' },
    { name: 'makeup', label: 'Makeup' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category.name
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FaRegHeart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FaShoppingCart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#FF6A00]">
                  ${product.price}
                </span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
              
              <Link 
                to={`/products/${product.id}`}
                className="mt-4 w-full bg-[#FF6A00] text-white py-2 rounded-lg hover:bg-[#FF5500] transition-colors flex items-center justify-center gap-2"
              >
                <FaShoppingCart />
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;