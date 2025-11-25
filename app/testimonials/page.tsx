"use client";

import { motion } from "framer-motion";
import { useState } from 'react';
import Footer from '@/components/Footer';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const testimonials = [
  { name: "Michael R.", text: "Declan did work on my front yard today and was professional beyond his years. Bright future ahead of this hard working kid. Highly recommend.", rating: 5, service: "Lawn Mowing" },
  { name: "Danna W.", text: "Declan is our neighbor and he is honestly the hardest working kid I've ever seen. He works late into the night most days. Way to go Declan!!", rating: 5, service: "General Landscaping" },
  { name: "Bryan S.", text: "I've used Declan for the past three or four seasons. His crew does a great job and are very reliable. Highly recommend.", rating: 5, service: "Seasonal Service" },
  { name: "Sue K.", text: "They did my lawn several times last year. I can vouch for him, he does a great job!", rating: 5, service: "Lawn Care" },
  { name: "Maya K.", text: "My garden was a mess. Now it's a masterpiece. Thank you guys!", rating: 5, service: "Garden Design" },
  { name: "Tom R.", text: "Declan and his team are the best. They transformed my yard in no time.", rating: 5, service: "Yard Transformation" },
  { name: "Lisa M.", text: "Thanks for cutting the grass. You are the best! Venmo sent!", rating: 5, service: "Lawn Mowing" },
  { name: "Sarah L.", text: "The lawn looks great! I can't believe how fast Declan and his team work.", rating: 5, service: "Lawn Service" },
  { name: "Bryan S.", text: "Just wanted let you know, the edging alongside the sidewalk looks great! 👍🏼", rating: 5, service: "Edging & Trimming" },
  { name: "Julia M.", text: "The lawn, bush and fence look beautiful. Thank you!", rating: 5, service: "Complete Care" },
  { name: "Mark T.", text: "Declan and his team are always on time and do a fantastic job. Highly recommend!", rating: 5, service: "Regular Maintenance" },
  { name: "Chris D.", text: "Declan is a hard worker and it shows in the quality of his work. Keep it up!", rating: 5, service: "Landscaping" },
];

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredTestimonials = testimonials.slice(0, 3);
  const remainingTestimonials = testimonials.slice(3);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 to-green-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-[impact] text-white mb-6 tracking-wide">
            CLIENT TESTIMONIALS
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Don't just take our word for it — hear what our satisfied customers have to say about Brighton Road Landscaping
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-8 h-8 text-yellow-400" />
            ))}
          </div>
          <p className="text-white mt-2 text-lg">5.0 Average Rating</p>
        </motion.div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-12 shadow-2xl">
              <div className="relative">
                <div className="text-white/20 text-[120px] absolute -top-12 -left-4 font-serif">"</div>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <p className="text-white text-2xl md:text-3xl italic leading-relaxed mb-8">
                    {featuredTestimonials[activeIndex].text}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-xl">
                        — {featuredTestimonials[activeIndex].name}
                      </p>
                      <p className="text-white/70 text-sm mt-1">
                        {featuredTestimonials[activeIndex].service}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <button 
                  onClick={prevTestimonial}
                  className="pointer-events-auto bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="pointer-events-auto bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                >
                  <ChevronRightIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-8 bg-green-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid of Additional Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-[impact] text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            More Happy Customers
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingTestimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-green-500"></div>
                <div className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <StarIcon key={idx} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-green-700">— {testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.service}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-700 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl font-[impact] text-white">100+</p>
              <p className="text-white/80 mt-2">Happy Customers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl font-[impact] text-white">5.0</p>
              <p className="text-white/80 mt-2">Star Rating</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl font-[impact] text-white">5+</p>
              <p className="text-white/80 mt-2">Years of Service</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl font-[impact] text-white">100%</p>
              <p className="text-white/80 mt-2">Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}