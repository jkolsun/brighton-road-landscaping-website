'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import WhyChoose from '@/components/WhyChoose';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  const testimonialsRef = useRef(null);
const isTestimonialsInView = useInView(testimonialsRef, { once: true });

const faqRef = useRef(null);
const isFAQInView = useInView(faqRef, { once: true });

  return (
    <div>
      {/* 🎥 Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Grass.Cutting.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10" />

        {/* Transparent Logo Overlay */}
  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-64 md:w-80 opacity-200">
    <img
      src="/images/brighton-logo.png"
      alt="Brighton Road Landscaping Logo"
      className="w-full h-auto"
    />
  </div>

        {/* Hero Text */}
        <section className="relative z-20 flex items-center justify-center text-center px-4 py-20 h-full">
        <h1 className="text-white text-5xl md:text-7xl font-[impact] leading-tight text-center">
  A Mowed Lawn for a Reasonable Price
</h1>
        </section>
      </div>

      {/* ⬇️ Scroll Section */}
      <WhyChoose />

      {/* 💬 Testimonials Section */}
      <section className="bg-white py-16 px-6 md:px-20">
  <motion.div
    ref={testimonialsRef}
    initial={{ opacity: 0, y: 50 }}
    animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          What Our Customers Are Saying
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <p className="text-gray-800 text-sm mb-4 italic">
              “Declan did work on my front yard today and was professional beyond his years. Bright future ahead of this hard working kid. Highly recommend”
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-green-800">— Michael R </span>
              <div className="flex gap-1 text-yellow-400">★★★★★</div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <p className="text-gray-800 text-sm mb-4 italic">
              “Declan is our neighbor and he is honestly the hardest working kid I’ve ever seen. He works late into the night most days. Way to go Declan!!”
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-green-800">— Danna </span>
              <div className="flex gap-1 text-yellow-400">★★★★★</div>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <p className="text-gray-800 text-sm mb-4 italic">
              “I’ve used Declan for the past three or four seasons. His crew does a great job and are very reliable. Highly recommend”
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-green-800">— Bryan S</span>
              <div className="flex gap-1 text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>
        </motion.div>

      </section>
      {/* FAQ Section */}
      <section id="faq" className="bg-gray-100 py-20">
  <motion.div
    ref={faqRef}
    initial={{ opacity: 0, y: 50 }}
    animate={isFAQInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
  >

  <FAQSection />
  </motion.div>
</section>
<Footer />

    </div>
  );
}


  
  



