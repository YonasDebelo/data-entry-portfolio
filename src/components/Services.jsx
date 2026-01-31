import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaSearch, FaFileExcel } from "react-icons/fa";

const ServiceCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:border-cyan-500/50 transition-all duration-300"
  >
    <div className="text-4xl text-cyan-400 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </motion.div>
);

export default function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
        >
          My Services
        </motion.h2>

        {/* --- ADDED: The Professional Guarantee --- */}
        <motion.p 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 max-w-3xl mx-auto mb-16 text-lg leading-relaxed"
        >
          I combine manual precision with software engineering automation. <br />
          <span className="text-cyan-400 font-bold">My Promise:</span> 100% Data Confidentiality & <span className="text-cyan-400 font-bold">99.9% Accuracy</span> or a full revision.
        </motion.p>
        {/* ------------------------------------------ */}

        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard 
            icon={<FaDatabase />} 
            title="Data Entry & Cleaning" 
            desc="Accurate data migration, duplicate removal, and formatting for Excel/SQL databases." 
          />
          <ServiceCard 
            icon={<FaSearch />} 
            title="Web Research" 
            desc="Deep market research, lead generation, and competitor analysis." 
          />
          <ServiceCard 
            icon={<FaFileExcel />} 
            title="CRM Management" 
            desc="Updating and maintaining records in HubSpot, Salesforce, or Zoho." 
          />
        </div>
      </div>
    </section>
  );
}