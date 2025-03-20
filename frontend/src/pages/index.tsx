import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import AuthCard from "../components/AuthCard";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const [showAuth, setShowAuth] = useState<boolean>(false);

  return (
    <div>
      {/* Navbar at the Top */}
      <Navbar onLoginClick={() => setShowAuth(true)} />

      {/* Hero Section Below Navbar */}
      <div style={{ marginTop: "80px" }}>
        <HeroSection />
      </div>

      <br /><br />

      {/* Feature Cards Below Hero Section */}
      <FeatureCards />

      <br /><br />

      {/* How It Works Section */}
      <HowItWorks />

      <br /><br />

      {/* Testimonials Section */}
      <Testimonials />

      <br /><br />

      {/* CTA Section */}
      <CTASection />

      <br /><br /><br />

      {/* Footer Section */}
      <Footer />

      {/* Show AuthCard only when showAuth is true */}
      {showAuth && <AuthCard closeAuth={() => setShowAuth(false)} />}
    </div>
  );
};

export default Home;
