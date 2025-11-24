const Hero = () => {
  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Animated Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/95 to-gray-900/80 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
          alt="Premium Shopping"
          className="w-full h-full object-cover animate-ken-burns"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&h=1080&fit=crop';
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400 rounded-full animate-float-medium opacity-50"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-orange-500 rounded-full animate-float-fast opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-300 rounded-full animate-float-slow opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-orange-500 rounded-full animate-float-medium opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          {/* Text Content */}
          <div className="space-y-6 text-white">
            <h2 className="text-6xl md:text-7xl font-bold animate-text-reveal">
              Premium Shopping
            </h2>
            <p className="text-4xl md:text-5xl font-bold text-orange-500 animate-bounce-subtle">
              Experience Excellence
            </p>
            <p className="text-xl text-gray-200 max-w-lg animate-fade-in-up leading-relaxed">
              Discover our curated collection of premium products. Quality, style, and innovation in every purchase.
            </p>
            <div className="flex gap-4 pt-6 animate-fade-in-up-delayed">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 active:scale-95 animate-pulse-slow">
                Explore Products
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl active:scale-95 border-2 border-white/50 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-900 to-transparent z-20"></div>
    </section>
  );
};

export default Hero;
