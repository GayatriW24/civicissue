import MainLayout from "../layouts/MainLayout";
import Features from "../components/Features";
import FeatureCards from "../components/FeatureCards";
import FAQ from "../components/Faq";

function Home() {
  return (
    <MainLayout>
      <section
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/img.png')"
            
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Report Local Issues.
          </h1>

          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-6">
            Make Your City Better.
          </h1>

          <p className="text-gray-200 max-w-2xl leading-relaxed">
            Civix helps citizens report and track local civic issues like potholes,
            broken lights, and garbage collection problems. Join thousands making
            their communities better.
          </p>
        </div>
      </section>

      <Features />
      <FeatureCards/>
      <FAQ/>

    </MainLayout>
  );
}

export default Home;