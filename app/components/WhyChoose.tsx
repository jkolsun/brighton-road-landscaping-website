'use client';

import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid';

import { motion } from 'framer-motion';

const features = [
  {
    icon: <CurrencyDollarIcon className="w-10 h-10 text-white" />,
    title: 'Affordable Lawn Care',
  },
  {
    icon: <PhoneIcon className="w-10 h-10 text-white" />,
    title: 'Reliable Customer Service 24/7',
  },
  {
    icon: <CalendarDaysIcon className="w-10 h-10 text-white" />,
    title: 'Flexible Scheduling',
  },
  {
    icon: <UserGroupIcon className="w-10 h-10 text-white" />,
    title: 'Experienced Team Members',
  },
  {
    icon: <WrenchScrewdriverIcon className="w-10 h-10 text-white" />,
    title: 'Custom Lawn Plans',
  },
  {
    icon: <ClipboardDocumentCheckIcon className="w-10 h-10 text-white" />,
    title: 'Free Estimates',
  },
];

export default function WhyChoose() {
  return (
    <section className="relative bg-green-800 text-white py-20 px-6 overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Images.webp"
          alt="Lawn Background"
          className="w-full h-full object-cover blur-md opacity-20"
        />
      </div>
  
      {/* Foreground Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold font-inter mb-6">
          Why Choose Brighton Road Landscaping?
        </h2>
        <p className="text-xl font-inter mb-12">
          Top-quality lawn care with transparent pricing, excellent communication, and a team that gets the job done right.
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-green-900 p-6 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold font-inter">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
  
}


