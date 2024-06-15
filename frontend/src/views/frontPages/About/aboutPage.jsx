/* eslint-disable prettier/prettier */
import Navbar from "../Navbar";
import React from 'react';

import { motion } from "framer-motion";
import AboutImag from "../../../assets/images/about.jpg";
import AirManImag from "../../../assets/images/airplan.png";
import emojy from "../../../assets/images/emojy.png";
import seoMan from "../../../assets/images/seoman.png";
import joan from "../../../assets/images/joan.png";
import jon from "../../../assets/images/jon.png";
import lili from "../../../assets/images/lili.png";
import ana from "../../../assets/images/ana.png";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <main className="  mx-auto  flex  items-center flex-col lg:space-y-4 relative w-full   bg-slate-50">
        {/* top Image section  */}
        <section className="bg-gradient-to-br  mx-auto  flex  items-center flex-col mb-28   from-[#361b68] to-[#31176381]">
          <motion.div
            initial={{ opacity: 0, y: "100%", x: "-50%" }}
            animate={{
              opacity: 1,
              y: "10%",
              x: "50%",
              // y: "-50%",
            }}
            transition={{
              duration: 5, // Adjust duration according to the speed you desire
              repeat: Infinity, // Set to loop indefinitely
              ease: "linear", // Linear easing for smooth motion
            }}
            className="absolute top-10 rigth-8 z-10 -mt-2  translate-x-[-50%] translate-y-[-50%]  lg:w-[40%]  flex justify-end items-center"
          >
            <img src={AirManImag} alt="AirManImag" />
          </motion.div>
          {/* Animation Boxes */}
          <span className="pt-20 relative w-full   space-y-10  ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: -1.0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute lg:w-52 w-28 lg:h-52 h-28 rounded-full lg:top-[2%] top-[5%] max-lg:left-1 left-7 -z-1 bg-gradient-to-br from-yellow-900 to-blue-200"
            ></motion.div>

            {/* Smooth Motion Animation */}
            <span className="fit">
              {/* Content */}
              <h1 className="lg:text-7xl text-5xl w-[100%] max-md:pl-8 text-center   lg:pl-28 p-9 max-md:p-5 text-white  relative z-10  uppercase font-extrabold  ">
                About Us
              </h1>
            </span>
            <div className="relative z-10 ">
              <span className="flex justify-between max-lg:flex-col max-lg:px-14 max-sm:px-4  gap-12 items-center">
                <img
                  src={AboutImag}
                  alt="About Us"
                  width={800}
                  height={800}
                  className="rounded-tr-xl max-lg:rounded-xl"
                />
                <span>
                  <motion.h3
                    initial={{ opacity: 0, x: 90 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="lg:text-5xl text-4xl lg:w-[80%] my-5 font-extrabold text-[#e4c048] "
                  >
                    Working Hard to Make SEO Easy Together
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="font-bold  text-white  pb-10 lg:w-[70%] "
                  >
                    With years of collective experience, our dedicated team has
                    honed their skills in the ever-evolving landscape of SEO. From
                    small businesses to large enterprises, we have collaborated
                    with diverse clients to achieve remarkable results. Let us
                    leverage our experience to propel your business forward and
                    achieve unparalleled success in the digital realm
                  </motion.p>
                </span>
              </span>
            </div>
          </span>
        </section>
        {/* middle Boxes section */}
        <section className=" relative lg:w-[66%] max-md: px-6   h-full max-lg:space-y-36 max-xsm:space-y-60 space-y-10 flex flex-col   ">
          <div className="mt-20 max-md:mt-5 w-[610px] max-md:w-full bg-gradient-to-br from-[#fcf0ee] via-[#f8c9c1] to-transparent  p-16  space-y-5 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold italic">theme-pure</h3>
            <p className="text-lg flex-wrap  italic">
              We are in business to develop an SEO software that allows anyone to
              independently optimize and promote a website on the web, regardless
              of the level of expertise.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 1, y: 50 }}
            animate={{
              opacity: 1, // Maintain full opacity
              y: "4%", // Move the image to 20% of the container's height
            }}
            transition={{
              duration: 1, // Adjust the duration of the animation as needed
              repeat: Infinity, // Repeat the animation indefinitely
              repeatType: "reverse", // Reverse the animation on each repeat
              ease: "linear", // Use linear easing for continuous motion
            }}
            className="absolute w-52  h-80 max-lg:top-[7%] top-[1%] max-lg:left-1 right-[29%] z-1"
          >
            <img src={emojy} alt="emoji of happy SEO" width={150} height={150} />
          </motion.div>

          <div className="absolute max-lg:relative max-md:w-full w-[610px] right-1 -bottom-44 bg-gradient-to-br pt-16 from-[#d8ffef] via-[#7ddab3] to-transparent  p-16 space-y-5 rounded-lg shadow-lg transform -translate-y-full">
            <h3 className="font-serif italic text-2xl font-bold">tem-purpose</h3>
            <p className="text-lg italic">
              We aim to constantly improve the user experience, functionality, and
              support to provide the best possible options for search engine
              optimization.
            </p>
          </div>
          <div className="relative -top-16 left-1/4 max-lg:hidden block   z-10">
            <img src={seoMan} alt="" />
          </div>
        </section>
        {/* team profile section */}
        <section className="w-full  flex items-center justify-center flex-col mb-4  space-y-6 lg:pt-32  pb-32  ">
          {/* <h1 className="text-7xl text-center text-gray-600 max-md:text-4xl lg:w-1/3 font-extrabold ">
            Meet our team of expert
          </h1>
          <p className="text-xl text-gray-400 max-md:w-1/2 ">
            We&apos;re a 100% remote team spread all across the world!
          </p> */}

          <span className="grid lg:grid-cols-4 grid-cols-2 max-md:grid-cols-1  gap-8 pt-10">
            <span className="flex justify-center flex-col items-center">
              <div className="bg-yellow-200 pt-4 overflow-hidden rounded-l-[50%] rounded-br-[55%] w-[300px] h-[300px]">
                <img src={lili} alt="" />
              </div>
              <h3 className="text-lg font-bold mt-5"> Danny Russell </h3>
              <h4 className="font-medium text-gray-500">Founder & CEO</h4>
            </span>
            <span className="flex justify-center flex-col  items-center">
              <div className="bg-blue-200 overflow-hidden pt-4 rounded-l-[50%] rounded-br-[55%] w-[300px] h-[300px]">
                <img src={joan} alt="" />
              </div>
              <h3 className="text-lg font-bold  mt-5"> Ezekiel Pearce </h3>
              <h4 className="font-medium text-gray-500">Founder & CEO</h4>
            </span>
            <span className="flex justify-center flex-col  items-center">
              <div className="bg-pink-200 pt-4  overflow-hidden rounded-l-[50%] rounded-br-[55%] w-[300px] h-[300px]">
                <img src={jon} alt="" />
              </div>
              <h3 className="text-lg font-bold  mt-5"> Byron Conner </h3>
              <h4 className="font-medium text-gray-500">Founder & CEO</h4>
            </span>
            <span className="flex justify-center flex-col  items-center">
              <div className="bg-green-200 pt-4  overflow-hidden rounded-l-[50%] rounded-br-[55%] w-[300px] h-[300px]">
                <img src={ana} alt="" />
              </div>
              <h3 className="text-lg font-bold  mt-5"> Anna Lin </h3>
              <h4 className="font-medium text-gray-500">Founder & CEO</h4>
            </span>
          </span>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
