import { FaFacebook, FaTwitter, FaInstagram, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <FaShoppingBag className="w-8 h-8 text-[#FF6A00]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6A00] to-[#FF3300] bg-clip-text text-transparent">
                TrustyFinds
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your gateway to verified AliExpress deals and trusted shopping guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FF6A00]">Navigation</h4>
            <ul className="space-y-3">
              {['About Us', 'Blog', 'FAQ', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-[#FF6A00] transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-[#FF6A00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FF6A00]">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Affiliate Disclosure'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-[#FF6A00] transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-[#FF6A00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FF6A00]">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-[#FF6A00]/10 hover:bg-[#FF6A00]/20 rounded-full transition-colors">
                <FaFacebook className="w-6 h-6 text-[#FF6A00]" />
              </a>
              <a href="#" className="p-2 bg-[#FF6A00]/10 hover:bg-[#FF6A00]/20 rounded-full transition-colors">
                <FaTwitter className="w-6 h-6 text-[#FF6A00]" />
              </a>
              <a href="#" className="p-2 bg-[#FF6A00]/10 hover:bg-[#FF6A00]/20 rounded-full transition-colors">
                <FaInstagram className="w-6 h-6 text-[#FF6A00]" />
              </a>
            </div>
            
            <div className="mt-6 border-t border-[#FF6A00]/20 pt-6">
              <p className="text-sm text-gray-400">
                Subscribe for exclusive deals:
              </p>
              <div className="mt-2 flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-full bg-white/5 border border-[#FF6A00]/20 text-sm focus:outline-none focus:border-[#FF6A00]"
                />
                <button className="px-4 py-2 bg-[#FF6A00] hover:bg-[#FF5500] rounded-full text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#FF6A00]/20 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 TrustyFinds. Independent AliExpress affiliate. Not affiliated with AliExpress/Alibaba Group.
          </p>
        </div>
      </div>
    </footer>
  )
}