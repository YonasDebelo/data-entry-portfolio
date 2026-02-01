import React from "react";
import { Link } from "react-scroll";
import { FaCheckCircle, FaGoogle, FaFileExcel } from "react-icons/fa"; 
import { SiAirtable, SiNotion, SiGooglesheets } from "react-icons/si";

// --- IMPORTS ---
import Hero3D from "./components/Hero3D";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials"; // <--- IMPORT ADDED HERE
import ContactForm from "./components/ContactForm";

const SkillBadge = ({ icon, name }) => (
  <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
    <div className="text-5xl">{icon}</div>
    <span className="text-sm font-medium">{name}</span>
  </div>  
);

function App() {
  return (
    <div className="relative w-full bg-[#0f172a]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10">
        <div 
  className="flex items-center gap-2 cursor-pointer" 
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  {/* 1. Your Logo Image */}
  <img 
    src="/logo.png" 
    alt="Yonas Logo" 
    className="h-10 w-10 object-contain" 
  />

  {/* 2. The Text */}
  <h1 className="text-2xl font-bold text-white tracking-tighter">
    YONAS<span className="text-cyan-400">.VA</span>
  </h1>
</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          {['About', 'Services', 'Portfolio', 'Tools', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={item.toLowerCase().replace(" ", "")} 
              smooth={true} 
              className="cursor-pointer hover:text-cyan-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <Link to="contact" smooth={true}>
          <button className="px-6 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer">
            Hire Me
          </button>
        </Link>
      </nav>

      <Hero3D />

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
             <h2 className="text-3xl font-bold mb-6 text-white">Efficiency Meets <span className="text-cyan-400">Accuracy</span></h2>
             <p className="text-gray-400 mb-4 leading-relaxed">
               As a Software Engineering student at Haramaya University, I combine technical precision with manual efficiency. 
               I am multilingual, offering data services in <span className="text-white font-bold">English, Amharic, and Afan Oromo</span>.
             </p>
             <ul className="space-y-3 mt-6">
               {['99.9% Accuracy Rate', 'Fast Turnaround Times', 'Confidentiality Guaranteed'].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-300">
                   <FaCheckCircle className="text-cyan-400" /> {item}
                 </li>
               ))}
             </ul>
          </div>
          <div className="p-1 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600">
            <div className="bg-[#0f172a] p-8 rounded-xl h-full flex flex-col justify-center items-center text-center">
               <div className="text-6xl font-bold text-white mb-2">3+</div>
               <div className="text-gray-400 uppercase tracking-widest text-sm">Years Experience</div>
               <div className="w-full h-px bg-white/10 my-6"></div>
               <div className="text-6xl font-bold text-white mb-2">50+</div>
               <div className="text-gray-400 uppercase tracking-widest text-sm">Projects Completed</div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      
      <Portfolio />

      {/* --- NEW TESTIMONIALS SECTION --- */}
      <Testimonials />

      {/* Tools Section */}
      <section id="tools" className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
           <h2 className="text-4xl font-bold text-white mb-16">Tools & Tech Stack</h2>
           <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <SkillBadge icon={<FaFileExcel />} name="Excel" />
            <SkillBadge icon={<SiGooglesheets />} name="Sheets" />
            <SkillBadge icon={<SiAirtable />} name="Airtable" />
            <SkillBadge icon={<SiNotion />} name="Notion" />
            <SkillBadge icon={<FaGoogle />} name="Google Suite" />
          </div>
        </div>
      </section>

      <ContactForm />

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>© 2026 Yonas. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;