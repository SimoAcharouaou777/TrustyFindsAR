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
  FaRegCheckCircle, FaRegClock
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
    <div className="bg-gradient-to-b from-white to-orange-50" dir="rtl">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF9248] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            تواصل معنا
          </h1>
          <p className="text-white/90 max-w-xl mx-auto text-lg">
            هل لديك أي استفسار أو ترغب في معرفة المزيد عن منتجات علي إكسبريس؟ فريقنا جاهز لمساعدتك!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex items-start gap-4 hover:border-orange-300 transition-all hover:shadow-md">
              <div className="bg-orange-100 rounded-full p-3 text-[#FF6A00]">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">اتصل بنا</h3>
                <p className="text-gray-600">متوفرون من الأحد إلى الخميس، 9 صباحًا - 6 مساءً</p>
                <p className="text-[#FF6A00] mt-2 font-medium">966 55 123 4567+</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex items-start gap-4 hover:border-orange-300 transition-all hover:shadow-md">
              <div className="bg-orange-100 rounded-full p-3 text-[#FF6A00]">
                <FaWhatsapp />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">واتساب</h3>
                <p className="text-gray-600">للاستفسارات السريعة والدعم المباشر</p>
                <p className="text-[#FF6A00] mt-2 font-medium">966 55 123 4567+</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex items-start gap-4 hover:border-orange-300 transition-all hover:shadow-md">
              <div className="bg-orange-100 rounded-full p-3 text-[#FF6A00]">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600">سنرد عليك خلال 24 ساعة</p>
                <p className="text-[#FF6A00] mt-2 font-medium">support@aliportal.sa</p>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 mt-8">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-[#FF6A00]" />
                أسئلة شائعة
              </h3>

              <div className="space-y-3">
                <details className="bg-gray-50 rounded-lg p-3">
                  <summary className="font-medium cursor-pointer">كيف يمكنني تتبع طلبي من علي إكسبريس؟</summary>
                  <p className="mt-2 text-gray-600">يمكنك تتبع طلبك مباشرة عبر تطبيق علي إكسبريس أو موقعهم باستخدام رقم التتبع المرسل إليك بعد الشراء.</p>
                </details>

                <details className="bg-gray-50 rounded-lg p-3">
                  <summary className="font-medium cursor-pointer">هل تتقاضون رسومًا إضافية على المنتجات؟</summary>
                  <p className="mt-2 text-gray-600">لا، خدماتنا مجانية تمامًا. نحن نكسب عمولة من علي إكسبريس عند الشراء عبر روابطنا دون أي تكلفة إضافية عليك.</p>
                </details>

                <details className="bg-gray-50 rounded-lg p-3">
                  <summary className="font-medium cursor-pointer">كم المدة التي يستغرقها الشحن للسعودية؟</summary>
                  <p className="mt-2 text-gray-600">عادة ما تصل الشحنات خلال 7-15 يوم عمل، حسب نوع الشحن الذي تختاره ومكان وجودك في المملكة.</p>
                </details>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">أرسل رسالتك</h2>

              {formStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الكامل
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="محمد عبدالله"
                        className="pr-10 pl-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
                        required
                      />
                      <FaUser className="absolute left-auto right-3 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="pr-10 pl-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
                        required
                      />
                      <FaEnvelope className="absolute left-auto right-3 top-3.5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Subject/Topic */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موضوع الرسالة
                  </label>
                  <div className="relative">
                    <select
                      className="pr-10 pl-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/50 transition-all appearance-none bg-white"
                      required
                    >
                      <option value="">اختر موضوع الرسالة</option>
                      <option value="product">استفسار عن منتج</option>
                      <option value="shipping">معلومات الشحن والتوصيل</option>
                      <option value="affiliate">التسويق بالعمولة</option>
                      <option value="suggestion">اقتراحات</option>
                      <option value="other">موضوع آخر</option>
                    </select>
                    <MdSupportAgent className="absolute left-auto right-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                {/* Product Interest (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المنتج الذي تبحث عنه (اختياري)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: هاتف ذكي، ملابس، أدوات منزلية..."
                      className="pr-10 pl-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
                    />
                    <MdShoppingBag className="absolute left-auto right-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رسالتك
                  </label>
                  <div className="relative">
                    <textarea
                      rows={5}
                      placeholder="اكتب رسالتك هنا..."
                      className="pr-10 pl-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
                      required
                    />
                    <FaComment className="absolute left-auto right-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 border-gray-300 rounded text-[#FF6A00] focus:ring-[#FF6A00]"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    أوافق على حفظ بياناتي للرد على استفساري وفق <a href="/privacy" className="text-[#FF6A00] hover:underline">سياسة الخصوصية</a>
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF6A00] to-[#FF3300] text-white px-8 py-3 rounded-lg hover:from-[#FF5500] hover:to-[#FF2200] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <FaPaperPlane />
                  إرسال الرسالة
                </button>
              </form>
            </div>

            {/* Trust Elements */}
            <div className="bg-orange-50 rounded-xl p-6 mt-6 border border-orange-100">
              <h3 className="font-bold text-gray-800 mb-4">لماذا تتواصل معنا؟</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <FaRegCheckCircle className="text-[#FF6A00] mt-1" />
                  <span>نساعدك في اختيار أفضل المنتجات من علي إكسبريس</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaRegCheckCircle className="text-[#FF6A00] mt-1" />
                  <span>نوفر معلومات دقيقة حول الشحن والتوصيل للسعودية</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaRegCheckCircle className="text-[#FF6A00] mt-1" />
                  <span>نقدم لك كوبونات وعروض حصرية لتوفير المال</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaRegCheckCircle className="text-[#FF6A00] mt-1" />
                  <span>نضمن لك تجربة تسوق آمنة وموثوقة من علي إكسبريس</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* Affiliate Partnership CTA */}
      <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF9248] py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            هل ترغب في التسويق بالعمولة معنا؟
          </h2>
          <p className="text-white/90 max-w-xl mx-auto mb-8">
            انضم إلى برنامجنا للتسويق بالعمولة واكسب عمولات مجزية من خلال الترويج لمنتجات علي إكسبريس
          </p>
          <button className="bg-white text-[#FF6A00] px-8 py-3 rounded-lg hover:bg-orange-50 transition-all shadow-md font-bold">
            تعرف على المزيد
          </button>
        </div>
      </div>
    </div>
  )
}