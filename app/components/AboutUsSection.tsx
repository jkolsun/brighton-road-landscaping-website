'use client';

import { motion } from 'framer-motion';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import Image from 'next/image';

const team = [
  {
    name: "Declan O'Brien",
    role: "Co-Owner",
    bio: "Declan is a 17 year old senior at Plymouth-Whitemarsh High School. After starting the business by himself in 2022 going into his freshman year, he relentlessly worked at it and watched it prosper into what it is today, a 6 man crew with 2 trucks. After inviting his younger brother Tristan into the business in 2024, he joined forces with his older brother Aiden in 2025.",
    image: "/images/declan.jpg"
  },
  {
    name: "Aiden O'Brien",
    role: "Co-Owner",
    bio: "Aiden graduated from Plymouth Whitemarsh High School in 2023. After lettering in Varsity football for 3 years, Aiden committed to Muhlenberg College to continue his education and athletic career. For the 2025 season, he joined his brothers and is running the business full time.",
    image: "/images/aiden.jpg"
  },
  {
    name: "Tristan O'Brien",
    role: "Co-Owner",
    bio: "Tristan is a sophomore at Plymouth Whitemarsh playing quarterback and outside linebacker. He joined the crew in 2024, working whenever he was not on the field. Tristan is looking to make a statement this year on Varsity and win the league.",
    image: "/logos/tristan.jpg"
  },
  {
    name: "Jared Kolsun",
    role: "Social Media Marketer / IT",
    bio: "Jared is a junior at Penn State studying Computer Science and Cybersecurity. He joined the team this summer, as an employee and IT developer. He plays on the Penn State Club Lacrosse team and is very active in school.",
    image: "/images/jared.jpg"
  }
];

export default function AboutUsSection() {
  return (

    <section className="px-6 py-14 max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <Image
          src="/images/AboutUS.jpg" // Replace with the actual image path
          alt="Brighton Road Landscaping Logo"
          width={400} // Adjust width as needed
          height={400} // Adjust height as needed
          className="object-contain"
        />
      </div>
      <h2 className="text-xl font-bold text-center text-black-700 mb-12">Brighton Road Landscaping is a family owned and operated business. Located in Plymouth meeting, PA, we service all of Montgomery county. From weekly mowing to our tree service, we pride ourselves on doing excellent work, reliability, and fast, transparent customer service.</h2>
    
    <section className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">Meet Our Team</h2>

      <div className="space-y-16">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={180}
              height={180}
              className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] object-cover rounded-full shadow-md"
            />
            <div className="text-center md:text-left max-w-xl">
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-green-600 text-sm font-semibold mb-1">{member.role}</p>
              <p className="text-gray-700 text-sm">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </section>
  );
}

