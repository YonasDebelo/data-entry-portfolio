import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaArrowRight, FaExchangeAlt } from "react-icons/fa";

// --- UPDATED PROJECT DATA BASED ON YOUR NEW IMAGES ---
const projects = [
  {
    id: 1,
    title: "B2B Lead Generation (Real Estate)",
    category: "Data Cleaning & Enrichment",
    image: "/images/real-estate.png",         // The "After" Excel
    beforeImage: "/images/real-estate-before.png", // The "Before" Word Doc
    tags: ["Internet Research", "Lead Qualification", "Data Entry"],
    description: "Transformed a messy Word document into a verified, actionable Excel lead list.",
    color: "from-blue-500 to-cyan-400",
    // Updated text based on Image 5 vs Image 0
    challenge: "Client provided a disorganized Word table with phone numbers combined into names, incomplete LinkedIn paths, and no professional formatting.",
    solution: "I separated contact details into distinct columns, validated every LinkedIn URL, researched missing email addresses, and applied 'Warm/Cold' status color-coding.",
    result: "Delivered 50+ fully enriched leads ready for immediate outreach.",
    features: ["CEO Verification", "URL Validation", "Status Formatting"]
  },
  {
    id: 2,
    title: "E-Commerce Inventory Management",
    category: "Data Structuring",
    image: "/images/ecommerce.png",
    beforeImage: "/images/ecommerce-before.png",
    tags: ["Shopify", "Data Cleaning", "Product Cataloging"],
    description: "Converted raw, unstructured product text into a upload-ready Shopify CSV.",
    color: "from-green-500 to-emerald-400",
    // Updated text based on Image 3 vs Image 1
    challenge: "Received a raw text dump where data wasn't in columns, image file extensions (.jpg) were missing, and pricing lacked currency formatting.",
    solution: "Structured the data into a clean table, used formulas to append correct file extensions to images, and standardized all pricing fields.",
    result: "100% accurate inventory file ready for bulk upload.",
    features: ["Bulk Processing", "Image Path Fixing", "Currency Formatting"]
  },
  {
    id: 3,
    title: "Financial Performance Dashboard",
    category: "Excel & Analytics",
    image: "/images/finance.png",
    beforeImage: "/images/finance-before.png",
    tags: ["Data Visualization", "Excel Formulas", "Reporting"],
    description: "Turned confusing text-based financial records into a visual insight dashboard.",
    color: "from-orange-500 to-red-500",
    // Updated text based on Image 4 vs Image 2
    challenge: "Financial data was trapped in messy text files with inconsistent dates (e.g., 'novr', 'agt') and difficult-to-read figures with no visual context.",
    solution: "Standardized all date formats, cleaned the numerical data, and implemented Excel Data Bars to instantly visualize Net Profit trends.",
    result: "Owner can now assess monthly performance at a glance.",
    features: ["Data Bars", "Date Standardization", "Profit Calculation"]
  }
];

// --- TOGGLE SWITCH COMPONENT ---
const ToggleSwitch = ({ isAfter, toggle }) => (
  <div 
    onClick={(e) => { e.stopPropagation(); toggle(); }} // stopPropagation prevents modal close click
    className="relative w-64 h-12 bg-black/40 rounded-full p-1 cursor-pointer border border-white/20 flex items-center justify-between px-2 select-none"
  >
    <motion.div 
      className="absolute top-1 bottom-1 w-[48%] bg-cyan-600 rounded-full shadow-lg z-0"
      animate={{ x: isAfter ? "100%" : "0%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
    <span className={`relative z-10 w-1/2 text-center text-sm font-bold transition-colors ${!isAfter ? 'text-white' : 'text-gray-400'}`}>
      BEFORE (Messy)
    </span>
    <span className={`relative z-10 w-1/2 text-center text-sm font-bold transition-colors ${isAfter ? 'text-white' : 'text-gray-400'}`}>
      AFTER (Clean)
    </span>
  </div>
);

// --- MODAL COMPONENT WITH AUTO-ANIMATION ---
const ProjectModal = ({ project, onClose }) => {
  const [showAfter, setShowAfter] = useState(true); 

  // ** AUTO-ANIMATION LOGIC **
  useEffect(() => {
    // Wait 1 second, then switch to "Before" view automatically
    const timer1 = setTimeout(() => {
      setShowAfter(false);
    }, 1000);

    // Wait another 2.5 seconds, then switch back to "After" view
    const timer2 = setTimeout(() => {
      setShowAfter(true);
    }, 3500);

    // Cleanup timers if the user closes the modal quickly
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-[#1e293b] w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500 rounded-full text-white transition-colors z-30 backdrop-blur-sm"
        >
          <FaTimes />
        </button>

        <div className="overflow-y-auto custom-scrollbar">
          {/* IMAGE SECTION WITH TOGGLE */}
          <div className="w-full relative bg-[#0f172a] p-4 flex flex-col items-center gap-4 border-b border-white/10">
             <ToggleSwitch isAfter={showAfter} toggle={() => setShowAfter(!showAfter)} />
             <div className="relative w-full max-w-4xl h-[40vh] md:h-[50vh]">
               <AnimatePresence mode='wait'>
                 <motion.img 
                   key={showAfter ? "after" : "before"}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.5, ease: "easeInOut" }} // Smoother animation
                   src={showAfter ? project.image : project.beforeImage} 
                   alt={project.title} 
                   className="w-full h-full object-contain rounded-lg shadow-2xl border border-white/10" 
                 />
               </AnimatePresence>
               <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-1 rounded text-xs font-mono text-white border border-white/20">
                 Viewing: <span className={showAfter ? "text-green-400" : "text-red-400"}>{showAfter ? "Final Deliverable" : "Raw Input Data"}</span>
               </div>
             </div>
          </div>

          {/* TEXT DETAILS */}
          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-white mb-6">{project.title}</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-900/10 p-6 rounded-xl border border-red-500/20">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-red-400">⚠</span> The Challenge (Before)
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{project.challenge}</p>
              </div>
              <div className="bg-green-900/10 p-6 rounded-xl border border-green-500/20">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                   <FaCheckCircle className="text-green-400" /> The Solution (After)
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-xl border-l-4 border-cyan-400 mb-8">
              <h3 className="text-md font-bold text-white mb-2">The Measurable Result</h3>
              <p className="text-gray-200 text-base">{project.result}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">{feature}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PORTFOLIO SECTION ---
export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portfolio" className="py-24 px-6 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Case Studies</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Click on any project to see the "Before & After" transformation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              // Added cursor-pointer and onClick to the main card wrapper
              className="group bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 shadow-xl flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-56 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-20 mix-blend-overlay z-10 transition-opacity duration-300 group-hover:opacity-0`} />
                <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-semibold bg-white/5 text-cyan-400 px-2 py-1 rounded-md border border-white/10">{tag}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                <div className="mt-auto pt-4 border-t border-white/10">
                  {/* Button is now just visual, the click is on the parent div */}
                  <button className="text-sm font-bold text-white hover:text-cyan-400 transition-colors flex items-center gap-2 w-full">
                    View Case Study <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}