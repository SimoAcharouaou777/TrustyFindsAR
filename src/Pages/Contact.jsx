import { FaUser, FaEnvelope, FaComment, FaPaperPlane } from 'react-icons/fa';

export const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have questions or suggestions? We'd love to hear from you!
        </p>
      </div>

      <form className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="space-y-8">
          {/* Name Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="John Doe"
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
              <input 
                type="email" 
                placeholder="john@example.com"
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <div className="relative">
              <FaComment className="absolute left-3 top-3.5 text-gray-400" />
              <textarea 
                rows={5}
                placeholder="Write your message here..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-[#FF6A00] to-[#FF3300] text-white px-8 py-3 rounded-lg hover:from-[#FF5500] hover:to-[#FF2200] transition-all flex items-center justify-center gap-2"
          >
            <FaPaperPlane className="w-5 h-5" />
            Send Message
          </button>
        </div>
      </form>

      {/* Additional Contact Info */}
      <div className="mt-12 text-center text-gray-600">
        <p>Prefer other methods? Reach us at:</p>
        <div className="mt-4 flex justify-center gap-6">
          <p>📞 +1 (555) 123-4567</p>
          <p>✉️ support@trustyfinds.com</p>
        </div>
      </div>
    </div>
  )
}