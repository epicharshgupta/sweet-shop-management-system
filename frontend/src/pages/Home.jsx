const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pt-28 pb-20">

      {/* HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto px-6 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-pink-600 drop-shadow-sm leading-tight">
          Welcome to SweetShop 🍬
        </h1>

        <p className="text-gray-700 mt-4 text-xl">
          India’s most loved place for premium, handcrafted & traditionally-made sweets.
        </p>

        <a
          href="/sweets"
          className="mt-6 inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-xl text-lg shadow-lg transition"
        >
          Explore Sweets 🍭
        </a>
      </div>

      {/* FEATURES GRID */}
      <div className="max-w-6xl mx-auto px-6 mt-20 grid md:grid-cols-3 gap-8">

        <div className="bg-white shadow-xl p-8 rounded-3xl text-center hover:-translate-y-1 transition animate-slideUp">
          <div className="text-4xl">🥛</div>
          <h3 className="text-2xl font-bold mt-4 text-gray-800">Pure Ingredients</h3>
          <p className="text-gray-600 mt-2">
            We use 100% pure milk, desi ghee, premium dry fruits & fresh ingredients.
          </p>
        </div>

        <div className="bg-white shadow-xl p-8 rounded-3xl text-center hover:-translate-y-1 transition animate-slideUp delay-150">
          <div className="text-4xl">⏱️</div>
          <h3 className="text-2xl font-bold mt-4 text-gray-800">Fresh Daily</h3>
          <p className="text-gray-600 mt-2">
            All sweets are prepared fresh every single day by expert halwais.
          </p>
        </div>

        <div className="bg-white shadow-xl p-8 rounded-3xl text-center hover:-translate-y-1 transition animate-slideUp delay-300">
          <div className="text-4xl">🚚</div>
          <h3 className="text-2xl font-bold mt-4 text-gray-800">Fast Delivery</h3>
          <p className="text-gray-600 mt-2">
            Super-fast local delivery to keep the taste & freshness intact.
          </p>
        </div>

      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-4xl mx-auto text-center mt-24 px-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-pink-600">
          Why Choose SweetShop? ⭐
        </h2>
        <p className="text-gray-700 mt-4 text-lg">
          We blend tradition with quality to bring authentic Indian sweets to your home.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white shadow p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-800">✔ 30+ Years Legacy</h3>
            <p className="text-gray-600 mt-1">Trusted by thousands of families.</p>
          </div>

          <div className="bg-white shadow p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-800">✔ Homemade Recipes</h3>
            <p className="text-gray-600 mt-1">Traditional techniques for authentic taste.</p>
          </div>

          <div className="bg-white shadow p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-800">✔ 100% Hygiene</h3>
            <p className="text-gray-600 mt-1">Prepared in a clean & verified kitchen.</p>
          </div>

          <div className="bg-white shadow p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-800">✔ Customer First</h3>
            <p className="text-gray-600 mt-1">We value taste, freshness & satisfaction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
