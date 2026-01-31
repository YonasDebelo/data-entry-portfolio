import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Dr. A. Kedir",
    role: "Senior Lecturer, Haramaya Univ.",
    quote: "Yonas approaches data problems like an engineer, not just a typist. His ability to automate repetitive tasks with Python saved our department weeks of manual entry work.",
    initials: "AK",
    color: "bg-blue-600"
  },
  {
    name: "Project Supervisor",
    role: "Data Science Capstone",
    quote: "I've rarely seen a student deliver such clean datasets. He flagged 40% of the raw data as 'invalid' before we even asked—his attention to detail is exceptional.",
    initials: "PS",
    color: "bg-purple-600"
  },
  {
    name: "Collaborator",
    role: "E-Commerce Migration Project",
    quote: "We needed to move 5,000 products over a weekend. Yonas didn't sleep until every single SKU matched perfectly. Highly reliable and fast.",
    initials: "CL",
    color: "bg-green-600"
  }
];

const ReviewCard = ({ review, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-[#1e293b] p-8 rounded-2xl border border-white/10 relative shadow-xl hover:border-cyan-500/30 transition-all duration-300"
  >
    <FaQuoteLeft className="text-4xl text-white/10 absolute top-6 right-6" />
    
    {/* Stars */}
    <div className="flex gap-1 mb-6 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} size={14} />
      ))}
    </div>

    {/* The Quote */}
    <p className="text-gray-300 mb-8 italic leading-relaxed text-sm md:text-base">
      "{review.quote}"
    </p>

    {/* The Person */}
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
        {review.initials}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm">{review.name}</h4>
        <span className="text-cyan-400 text-xs uppercase tracking-wider font-semibold">{review.role}</span>
      </div>
    </div>
  </motion.div>
);

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#0f172a] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Mentors & Teams</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My work speaks for itself, but here is what my supervisors and collaborators say about my reliability and precision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}