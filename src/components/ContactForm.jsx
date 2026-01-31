import React, { useState, useRef } from 'react';
import { FaPaperPlane, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    // REPLACE THESE 3 STRINGS WITH YOUR ACTUAL KEYS FROM EMAILJS DASHBOARD
    // If you haven't set them up yet, the form will show "Error" but the code is correct.
    const YOUR_SERVICE_ID = "service_w1ea2ia";
    const YOUR_TEMPLATE_ID = "template_epkicl9";
    const YOUR_PUBLIC_KEY = "8UKrdjhRo-FGCfCc8";

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, formRef.current, YOUR_PUBLIC_KEY)
      .then((result) => {
          setStatus("success");
          e.target.reset();
          // Reset status after 3 seconds so user can send another if needed
          setTimeout(() => setStatus("idle"), 3000);
      }, (error) => {
          console.log(error.text);
          setStatus("error");
          alert("Failed to send. Please check your internet connection.");
          setStatus("idle");
      });
  };

  return (
    <section id="contact" className="pb-32 px-6 bg-[#0f172a]">
      <div className="max-w-2xl mx-auto bg-[#1e293b] border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-600"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Let's Work Together</h2>
          <p className="text-gray-400">Ready to streamline your data? Send me a message and get a reply within 24 hours.</p>
        </div>

        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Your Name</label>
              <input 
                type="text" 
                name="user_name"
                required
                placeholder="John Doe" 
                className="bg-[#0f172a] border border-white/10 p-4 rounded-lg focus:border-cyan-400 outline-none transition-colors w-full text-white placeholder-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Your Email</label>
              <input 
                type="email" 
                name="user_email"
                required
                placeholder="john@company.com" 
                className="bg-[#0f172a] border border-white/10 p-4 rounded-lg focus:border-cyan-400 outline-none transition-colors w-full text-white placeholder-gray-600" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Project Details</label>
            <textarea 
              name="message"
              required
              rows="4" 
              placeholder="I have a folder of PDF invoices that need to be moved to Excel..." 
              className="bg-[#0f172a] border border-white/10 p-4 rounded-lg focus:border-cyan-400 outline-none transition-colors w-full text-white placeholder-gray-600 resize-none"
            ></textarea>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === "sending" || status === "success"}
            className={`w-full py-4 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer
              ${status === "success" ? "bg-green-600" : "bg-gradient-to-r from-cyan-600 to-purple-600 hover:opacity-90"}
              ${status === "sending" ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {status === "idle" && <><FaPaperPlane /> Send Message</>}
            {status === "sending" && "Sending..."}
            {status === "success" && <><FaCheck /> Message Sent!</>}
            {status === "error" && "Try Again"}
          </motion.button>
        </form>
      </div>
    </section>
  );
}