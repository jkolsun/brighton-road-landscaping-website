'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  HomeIcon,
  WrenchScrewdriverIcon,
  PencilSquareIcon,
  ScissorsIcon,
  SparklesIcon,
  BeakerIcon
} from '@heroicons/react/24/solid';

const team = [
  {
    name: "Declan O'Brien",
    role: "Co-Owner",
    bio: "Declan is a 18 year old senior at Plymouth Whitemarsh High School. After founding Brighton Road Landscaping by himself in 2022 as a rising freshman, he relentlessly worked at it and watched it prosper into what it is today. After inviting his younger brother Tristan into the business in 2024, he joined forces with his older brother Aiden in 2025.",
    image: "/images/declan.jpg"
  },
  {
    name: "Aiden O'Brien",
    role: "Co-Owner",
    bio: "Aiden graduated from Plymouth Whitemarsh High School in 2023. After lettering in Varsity football for 3 years, Aiden committed to Muhlenberg College to continue his education and athletic career. For the 2025 season, he joined his brothers at Brighton Road Landscaping and is running the business full time.",
    image: "/images/aiden.jpg"
  },
  {
    name: "Tristan O'Brien",
    role: "Co-Owner",
    bio: "Tristan is a sophomore at Plymouth Whitemarsh High School starting at corner on Varsity football. He joined Brighton Road Landscaping in 2024, working whenever he was not on the field. Tristan had huge success in his sophomore season and is working hard in preparation for his junior season.",
    image: "/logos/tristan.jpg"
  },
  {
    name: "Jared Kolsun",
    role: "Social Media Marketer / IT",
    bio: "Jared is a junior at Penn State studying Computer Science and Cybersecurity. Hailing from Conshohocken, He became a member of Brighton Road Landscaping in the 2025 season as a crew member and IT developer. He plays on the Penn State Club Lacrosse team and is very active in school.",
    image: "/images/jared.jpg"
  }
];

const services = [
  { name: "Lawn Mowing", icon: ScissorsIcon },
  { name: "Hardscaping", icon: WrenchScrewdriverIcon },
  { name: "Landscape Design", icon: PencilSquareIcon },
  { name: "Tree Services", icon: HomeIcon },
  { name: "Seasonal Cleanups", icon: SparklesIcon },
  { name: "Fertilization", icon: BeakerIcon }
];

export default function AboutUsSection() {
  return (
    <>
      {/* Hero Section - Half Image, Half Text */}
      <section className="min-h-[600px] bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 md:p-12"
          >
            <h1 className="text-4xl md:text-5xl font-[impact] text-gray-900 mb-6">
              About Brighton Road Landscaping
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Brighton Road Landscaping is a family owned and operated business. Serving the areas of 
              Plymouth Meeting, Conshohocken, Blue Bell and King of Prussia, PA, our mission is to provide 
              our clients with reliable, high quality lawn care and landscaping services. We aim to create a 
              culture that is rooted in respect for our clients and each other, and working hard to ensure the job 
              is done right. We accomplish this by practicing what we preach as owners and hiring employees 
              who share our values so that we can continue to build our reputation throughout Montgomery 
              County. Our brand is known for reliability, honest pricing, and quality work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote">
                <button className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105">
                  Get a Quote
                </button>
              </Link>
              <Link href="/join">
                <button className="border-2 border-green-700 text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105">
                  Join Our Team
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full min-h-[600px] relative"
          >
            <Image
              src="/images/flyer.JPG"
              alt="Brighton Road Landscaping Team"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team Section - Bigger Text & Images */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-[impact] text-center text-gray-900 mb-16">
            Meet Our Team
          </h2>

          <div className="space-y-20">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={250}
                  height={250}
                  className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] object-cover rounded-full shadow-xl"
                />
                <div className="text-center md:text-left max-w-2xl">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 text-lg font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* Our Services Section - With Professional Icons */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-[impact] text-center text-gray-900 mb-12">
      Our Services
    </h2>
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
      {[
        { name: "Lawn Mowing", icon: ScissorsIcon, slug: "lawn-mowing" },
        { name: "Hardscaping", icon: WrenchScrewdriverIcon, slug: "hardscaping" },
        { name: "Landscape Design", icon: PencilSquareIcon, slug: "landscape-design" },
        { name: "Tree Services", icon: HomeIcon, slug: "tree-service" },
        { name: "Seasonal Cleanups", icon: SparklesIcon, slug: "seasonal-cleanups" },
        { name: "Fertilization", icon: BeakerIcon, slug: "lawn-care" }
      ].map((service, index) => (
        <Link href={`/services/${service.slug}`} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center group cursor-pointer"
          >
            <div className="bg-green-100 rounded-full p-6 mb-3 group-hover:bg-green-200 transition flex items-center justify-center mx-auto w-24 h-24">
              <service.icon className="w-12 h-12 text-green-700" />
            </div>
            <p className="font-semibold text-gray-800 group-hover:text-green-700 transition">{service.name}</p>
          </motion.div>
        </Link>
      ))}
    </div>

    <div className="text-center">
      <Link href="/services">
        <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105 text-lg">
          View All Services
        </button>
      </Link>
    </div>
  </div>
</section>

      <Footer />
    </>
  );
}