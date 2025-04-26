import { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaComment,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaRegCheckCircle, 
  FaRegClock
} from 'react-icons/fa';
import { MdSupportAgent, MdShoppingBag } from 'react-icons/md';

export const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setFormStatus('success');
    // Reset form
    e.target.reset();
    // Clear success message after 5 seconds
    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <div className="bg-gradient-to-b from-white to-yellow-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/90 max-w-xl mx-auto text-lg">
            Do you have any questions or want to know more about Amazon products? Our team is ready to help you!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 flex items-start gap-4 hover:border-yellow-300 transition-all hover:shadow-md">
              <div className="bg-yellow-100 rounded-full p-3 text-[#FF9900]">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
                <p className="text-gray-600">Available Monday to Friday, 9 AM - 6 PM (EST)</p>
                <p className="text-[#FF9900] mt-2 font-medium">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 flex items-start gap-4 hover:border-yellow-300 transition-all hover:shadow-md">
              <div className="bg-yellow-100 rounded-full p-3 text-[#FF9900]">
                <FaWhatsapp />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">WhatsApp</h3>
                <p className="text-gray-600">For quick inquiries and direct support</p>
                <p className="text-[#FF9900] mt-2 font-medium">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 flex items-start gap-4 hover:border-yellow-300 transition-all hover:shadow-md">
              <div className="bg-yellow-100 rounded-full p-3 text-[#FF9900]">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">We'll respond within 24 hours</p>
                <p className="text-[#FF9900] mt-2 font-medium">support@trustyfinds.com</p>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mt-8">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-[#FF9900]" />
                Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                <details className="bg-gray-50 rounded-lg p-3">
                  <summary className="font-medium cursor-pointer">How can I track my Amazon order?</summary>
                  <p className="mt-2 text-gray-600">You can track your order directly through the Amazon app or website using the tracking information provided in your order confirmation email.</p>
                </details>

                <details className="bg-gray-50 rounded-lg p-3">
                  <summary className="font-medium cursor-pointer">Do you charge additional fees on products?</summary>
                  <p className="mt-2 text-gray-600">No, our services are completely free. We earn a commission from Amazon when you purchase through our links at no extra cost to you.</p>
                </details>

                <details className="bg-gray-50 rounded-lg p-3">
                  <summary className="font-medium cursor-pointer">How long does Amazon shipping take?</summary>
                  <p className="mt-2 text-gray-600">Shipping times vary by your location and the shipping method chosen. Prime members often receive deliveries within 1-2 days, while standard shipping typically takes 3-7 business days.</p>
                </details>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Your Message</h2>

              {formStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  Your message has been sent successfully! We'll contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/50 transition-all"
                        required
                      />
                      <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/50 transition-all"
                        required
                      />
                      <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Subject/Topic */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Subject
                  </label>
                  <div className="relative">
                    <select
                      className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/50 transition-all appearance-none bg-white"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="product">Product Inquiry</option>
                      <option value="shipping">Shipping & Delivery Information</option>
                      <option value="affiliate">Affiliate Marketing</option>
                      <option value="suggestion">Suggestions</option>
                      <option value="other">Other Topic</option>
                    </select>
                    <MdSupportAgent className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                {/* Product Interest (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product You're Looking For (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Example: Smartphone, Clothing, Home Appliances..."
                      className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/50 transition-all"
                    />
                    <MdShoppingBag className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      rows={5}
                      placeholder="Write your message here..."
                      className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/50 transition-all"
                      required
                    />
                    <FaComment className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 border-gray-300 rounded text-[#FF9900] focus:ring-[#FF9900]"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the storage of my data to respond to my inquiry according to the <a href="/privacy" className="text-[#FF9900] hover:underline">Privacy Policy</a>
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF9900] to-[#FEBD69] text-[#232F3E] px-8 py-3 rounded-lg hover:from-[#FEBD69] hover:to-[#FF9900] transition-all flex items-center justify-center gap-2 shadow-md font-bold"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>

            {/* Trust Elements */}
            <div className="bg-yellow-50 rounded-xl p-6 mt-6 border border-yellow-100">
              <h3 className="font-bold text-gray-800 mb-4">Why Contact Us?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <FaRegCheckCircle className="text-[#FF9900] mt-1" />
                  <span>We help you choose the best products from Amazon</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaRegCheckCircle className="text-[#FF9900] mt-1" />
                  <span>We provide accurate information about shipping and delivery worldwide</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaRegCheckCircle className="text-[#FF9900] mt-1" />
                  <span>We offer recommendations for top-rated Amazon products with the best value</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaRegCheckCircle className="text-[#FF9900] mt-1" />
                  <span>We ensure a safe and reliable shopping experience from Amazon</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* Affiliate Partnership CTA */}
      <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to Become Our Affiliate Partner?
          </h2>
          <p className="text-white/90 max-w-xl mx-auto mb-8">
            Join our affiliate marketing program and earn generous commissions by promoting Amazon products
          </p>
          <button className="bg-[#FF9900] text-[#232F3E] px-8 py-3 rounded-lg hover:bg-[#FEBD69] transition-all shadow-md font-bold">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}