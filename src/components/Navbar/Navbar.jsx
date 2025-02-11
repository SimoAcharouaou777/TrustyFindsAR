import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa'
import { useState } from 'react'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems] = useState(3) // Example cart items count

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-[#FF6A00] hover:text-[#FF5500] transition-colors">
            TrustyFinds
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 flex-1 max-w-3xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search AliExpress products..."
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF6A00] w-full"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-6 ml-4">
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-[#FF6A00] transition-colors font-medium"
              >
            ShopNow
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-[#FF6A00] transition-colors font-medium"
              >
                Contact
              </Link>
              <div className="relative">
                <FaShoppingCart className="text-[#FF6A00] hover:text-[#FF5500] cursor-pointer w-6 h-6" />
                {cartItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#FF6A00] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-[#FF6A00] hover:text-[#FF5500]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pb-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search AliExpress..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="flex flex-col space-y-2 pl-2">
              <Link 
                to="/products" 
                className="py-2 text-gray-700 hover:text-[#FF6A00] transition-colors font-medium"
              >
                Shop Now
              </Link>
              <Link 
                to="/contact" 
                className="py-2 text-gray-700 hover:text-[#FF6A00] transition-colors font-medium"
              >
                Contact
              </Link>
              <div className="flex items-center gap-2 py-2">
                <FaShoppingCart className="text-[#FF6A00] w-5 h-5" />
                <span className="text-gray-700">Cart ({cartItems})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}