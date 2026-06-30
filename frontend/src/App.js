import React, { useEffect, useState } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Education from "@/components/portfolio/Education";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Services from "@/components/portfolio/Services";
import Experience from "@/components/portfolio/Experience";
import Resume from "@/components/portfolio/Resume";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import { getProfile } from "@/lib/api";

function App() {
  const [profile, setProfile] = useState({ photo_url: null, resume_url: null });

  const refresh = async () => {
    try {
      const p = await getProfile();
      setProfile(p || {});
    } catch (e) {
      // backend may not have profile yet
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="App" data-testid="portfolio-app">
      <Navbar />
      <main>
        <Hero profile={profile} onUploaded={refresh} />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Resume profile={profile} onUploaded={refresh} />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
