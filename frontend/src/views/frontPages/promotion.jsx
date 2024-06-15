/* eslint-disable prettier/prettier */
import { motion } from "framer-motion"; // Import motion for animations
import React from 'react';

const SeoServicesPage = () => {
  // Randomize the list of SEO services

  return (
    <div className="pb-40 relative mx-2 ">
      {/* Hero Section */}
      <div className="py-20 shadow-2xl border-t-8 border-red-600 rounded-t-xl bg-[#e4c048] shadow-[#66c466] px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="lg:text-5xl text-3xl font-bold mb-4 text-[#4B0082]">
            Learn your audience’s vocabulary
          </h1>
          <p className="text-lg text-black font-bold">
            We provide top-notch SEO services to boost your online presence and
            drive traffic to your website.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-tr from-gray-300 relative z-10  to-gray-500  py-20 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="lg:text-5xl text-3xl font-bold mb-4 text-[#4B0082]">
            Contact Us for SEO Services
          </h2>
          <p className="text-lg text-gray-700 mb-8 font-bold">
            Need professional SEO services? Get in touch with us today!
          </p>
          <p className="text-xl text-gray-700 mb-2 font-bold">Email: info@example.com</p>
          <p className="text-xl text-gray-700 mb-2 font-bold">Phone: +1234567890</p>
        </div>
      </div>

      {/* Animatio Box section  */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: -1.0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute lg:w-52 w-28 lg:h-52 h-28 rounded-full top-[48%] -left-24  bg-gradient-to-tr
       from-[#af32bb] to-[#139e31]"
      ></motion.div>

      {/* FAQ Section */}
      <div className="container mx-auto mt-16 w-full   ">
        <div className="w-[70%] mx-auto space-y-12">
          <h2 className="lg:text-5xl text-3xl text-center font-bold mb-4 text-[#e4c048]">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQ Item 1 */}
            <div>
              <h3 className="text-3xl text-white font-extrabold mb-2">
                What is SEO and why is it important?
              </h3>
              <p className="text-lg font-bold text-white">
                SEO stands for Search Engine Optimization. It is important
                because it helps your website rank higher in search engine
                results pages, driving organic traffic and increasing
                visibility.
              </p>
            </div>
            {/* FAQ Item 2 */}
            <div className="relative z-10">
              <h3 className="text-3xl text-white font-extrabold mb-2">
                How long does it take to see results from SEO?
              </h3>
              <p className="text-lg font-bold text-white relative z-10">
                The time it takes to see results from SEO can vary depending on
                various factors such as the competitiveness of keywords, website
                age, and the quality of SEO efforts. Generally, it can take
                several months to start seeing significant results.
              </p>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: -1.0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute lg:w-60 w-32 lg:h-60 h-32 rounded-full top-[35%] lg:-right-32 -right-14  bg-gradient-to-tr
       from-[#af32bb9c] to-[#139e31b0]"
              ></motion.div>
            </div>
            {/* Add more FAQ items as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoServicesPage;
