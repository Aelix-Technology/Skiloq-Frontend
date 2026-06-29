"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutUs() {
  return (
    <section className="relative py-16 md:py-28 bg-gradient-to-br from-[#1E243B] via-[#242F56] to-[#1E243B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[350px] md:h-[450px] lg:h-[500px]"
          >
            {/* Main Image */}
            <div className="absolute left-0 top-0 w-[80%] h-[90%] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/landing/About Img 1.png"
                alt="About Skiloq"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Overlapping Image */}
            <div className="absolute right-0 bottom-0 w-[40%] h-[50%] rounded-xl overflow-hidden shadow-2xl hidden md:block">
              <Image
                src="/assets/images/landing/Digital Professional 1.png"
                alt="Skiloq Team"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About Us
            </h2>
            
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
              Skiloq is a trust-first talent marketplace built to connect skilled African professionals with meaningful opportunities through verification, transparency, and secure collaboration.
            </p>
            
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              We believe talent exists everywhere, but opportunity is often limited by a lack of trust infrastructure. Too many skilled workers struggle to prove credibility, access secure payments, or connect with serious employers... <a href="#" className="text-[#6F8AFF] hover:underline">View More</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
