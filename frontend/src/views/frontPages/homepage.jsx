/* eslint-disable prettier/prettier */
import Navbar from "./Navbar";
import KeyWorkdGenerator from "./WordGenerator";
import seo from "../../assets/images/seoImg.png";
import { motion } from "framer-motion"; // Import motion for animations
import SeoServicesPage from "./promotion";
import { RiSeoLine } from "react-icons/ri";
import React from 'react';

const homepage = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br max-sm:pt-1 pt-10 lg:pt-20 mx-auto from-[#361b68] to-[#31176381] flex justify-center items-center flex-col space-y-5 max-sm:space-y-10 relative  ">
        {/* Animatio Box section  */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: -1.0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute lg:w-52 w-24 lg:h-52 h-24 rounded-full top-[2%] max-lg:left-1  left-7 -z-1 bg-gradient-to-tr
       from-yellow-600 to-sky-700   "
        ></motion.div>

        {/*  Seo tool section  */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" border-2 border-white text-[#371b6cc4] font-bold text-center rounded-full h-fit py-[3px] bg-gradient-to-r from-gray-400 to-gray-400 flex justify-between px-2 z-10"
        >
          <span className="w-fit h-fit px-3 rounded-full text-white font-semibold bg-[#a0a82bc4] border-2 border-white mr-3">
            Seo tool
          </span>
          <h6 className="pr-2 text-gray-800 font-bold">Keyword Finder</h6>
        </motion.span>
        {/*  Seo tool section  */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:text-7xl text-4xl uppercase z-10 text-white text-center ltracking-widest font-extrabold"
        >
          Discover High-Traffic Keywords
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:w-[60%] px-3  text-yellow-400 text-center lg:text-lg font-medium ltracking-widest font-sans"
        >
          Our SEO experts have the skills and expertise to help you elevate your
          online presence. From keyword research to SEO optimization, we have the
          tools and resources to help you achieve your goals.
        </motion.p>

        {/* Animatio Box section  */}
        <span className="hidden xl:block w-fit">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="absolute top-[13%] left-[83%] translate-x-[-50%] translate-y-[-50%] w-52 h-52  rounded-full   border-[4px]  flex justify-center items-center bg-gray border-yellow-200 bg-gradient-to-br   from-blue-100 to-purple-500 
       "
          >
            <RiSeoLine size={180} color="white" className="text-center " />
          </motion.div>
        </span>
        {/* keyworld generator section  */}
        <KeyWorkdGenerator />
        {/* seo section  */}
        <div className="flex flex-col md:flex-row   w-[95%] gap-5 items-center justify-center px-1">
          {/* keyworld generator section  */}
          <div className="w-full md:w-1/2 space-y-6 z-10">
            <motion.h1
              initial={{ opacity: 0, x: -90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              className="text-4xl text-[#e4c048] lg:text-6xl font-bold   py-[3px] flex justify-between lg:px-2"
            >
              Generate tens of thousands of concealed long-tail keywords
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="lg:text-lg font-semibold text-gray-200  flex items-center justify-center"
            >
              Digital marketers use Keyword spa Generator to find the greatest
              number of concealed long-tail keywords for their website copy. We
              generate these keywords using autocomplete APIs from multiple top
              data providers.
            </motion.p>
          </div>
          <div className="w-full justify-center lg:justify-end  flex md:w-fit">
            {/* imege section  */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <img src={seo} alt="SEO" className="" />
            </motion.div>
          </div>
        </div>
        <SeoServicesPage />
      </main>
    </div>
  );
};

export default homepage;
