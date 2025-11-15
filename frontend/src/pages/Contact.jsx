const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 pt-28 pb-20 px-4">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-pink-600 drop-shadow-sm">
          Contact Us 💬
        </h1>
        <p className="text-gray-700 mt-4 text-lg">
          We’d love to hear from you! Whether it’s feedback, queries, or custom sweet orders — we are here to help.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-5xl mx-auto mt-14 grid md:grid-cols-2 gap-10">

        {/* CONTACT DETAILS */}
        <div className="bg-white p-8 rounded-3xl shadow-xl animate-slideUp">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="text-3xl">📞</span>
              <p className="text-gray-700 text-lg">+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl">📧</span>
              <p className="text-gray-700 text-lg">support@sweetshop.com</p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl">📍</span>
              <p className="text-gray-700 text-lg">
                SweetShop HQ,  
                <br /> Delhi, India
              </p>
            </div>
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            Our team responds within 24 hours.
          </p>
        </div>

        {/* CONTACT FORM */}
        <div className="backdrop-blur-xl bg-white/80 p-8 rounded-3xl shadow-xl border border-pink-100 animate-slideUp">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send a Message</h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
            >
              Send Message 🚀
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
