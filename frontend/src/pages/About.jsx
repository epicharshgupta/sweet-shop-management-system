const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pt-28 pb-16 px-6">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-pink-600 drop-shadow-sm">
          About SweetShop 🍬
        </h1>

        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Bringing joy, tradition, and authentic Indian sweetness to homes since{" "}
          <span className="font-bold">1990</span>.
        </p>
      </div>

      {/* INFO BOX */}
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-3xl shadow-xl p-8 animate-slideUp">
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          SweetShop started as a small family kitchen and has grown into one of the most 
          trusted sweet stores. Every sweet we prepare reflects love, purity, and a strong 
          commitment to maintaining traditional Indian flavors.
        </p>
      </div>

      {/* OUR VALUES SECTION */}
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-10">

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="text-4xl mb-3">🍯</div>
          <h3 className="text-xl font-semibold mb-2">Pure Ingredients</h3>
          <p className="text-gray-600">
            We use fresh milk, pure desi ghee, premium dry fruits & handpicked ingredients.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="text-4xl mb-3">👨‍🍳</div>
          <h3 className="text-xl font-semibold mb-2">Traditional Recipes</h3>
          <p className="text-gray-600">
            Crafted by expert halwais using methods passed down for generations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="text-4xl mb-3">🚚</div>
          <h3 className="text-xl font-semibold mb-2">Fresh Daily Delivery</h3>
          <p className="text-gray-600">
            Sweets prepared fresh every morning — delivered on the same day.
          </p>
        </div>

      </div>

      {/* STORY SECTION */}
      <div className="max-w-4xl mx-auto mt-20 text-center animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Our Story ❤️
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg">
          What began as a passion for authentic taste has grown into a brand loved by 
          thousands. Our promise is simple — create sweets that make people smile.
        </p>
      </div>

      {/* FOOTER LINE */}
      <div className="max-w-xl mx-auto mt-16 text-center text-gray-500 animate-fadeIn">
        ― Thank you for being a part of our sweet journey ―
      </div>
    </div>
  );
};

export default About;
