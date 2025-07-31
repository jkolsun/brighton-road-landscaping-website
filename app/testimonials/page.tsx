"use client";

import { motion } from "framer-motion";

const testimonials = [
  { name: "Micheal R.", text: "Declan did work on my front yard today and was professional beyond his years. Bright future ahead of this hard working kid. Highly recommend." },
  { name: "Danna W.", text: "Declan is our neighbor and he is honestly the hardest working kid I’ve ever seen. He works late into the night most days. Way to go Declan!!" },
  { name: "Brian S.", text: "I’ve used Declan for the past three or four seasons. His crew does a great job and are very reliable. Highly recommend." },
  { name: "Sue K.", text: "They did my lawn several times last year. I can vouch for him, he does a great job!" },
  { name: "Maya K.", text: "My garden was a mess. Now it’s a masterpiece. Thank you guys!" },
    { name: "Tom R.", text: "Declan and his team are the best. They transformed my yard in no time." },
    { name: "Lisa M.", text: "Thanks for cutting the grass. You are the best! Venmo sent!" },
    { name: "Sarah L.", text: "The lawn looks great! I can’t believe how fast Declan and his team work." },
    { name: "Bryan S.", text: "Just wanted let you know, the edging alongside the sidewalk looks great! 👍🏼" },
    { name: "Julia M.", text: "The lawn, bush and fence look beautiful. Thank you!" },
    { name: "Mark T.", text: "Declan and his team are always on time and do a fantastic job. Highly recommend!" },
    { name: "Chris D.", text: "Declan is a hard worker and it shows in the quality of his work. Keep it up!" },
];

export default function TestimonialsPage() {
  return (
    <section className="min-h-screen bg-gray-100 px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-[Impact] font-extrabold mb-12">Testimonials</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-lg p-6 rounded-2xl border-l-4 border-green-600 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="text-5xl text-green-600 absolute top-2 left-4">“</div>
              <p className="text-gray-700 mt-6 italic leading-relaxed"> {t.text} </p>
              <p className="mt-4 font-semibold text-green-800">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
