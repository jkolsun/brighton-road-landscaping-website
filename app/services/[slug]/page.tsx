'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    name: 'Lawn Maintenance',
    video: '/lawn-video.mp4', // Replace this with your actual video file name
    description: 'Our lawn mowing service offers a variety of lawn care plans. Whether you are in need of weekly or biweekly mowing, or only need a one time cut, Brighton Road Landscaping is here for all of your lawn maintenance needs.',
  },
  {
    name: 'Fertilization and Treatment',
    image: '/images/fertilizer.jpg',
    description: 'Our fertilizing and treatment services help keep your lawn green, thick, and healthy all season long. We offer seasonal fertilizer applications, weed control, and preventative treatments tailored to your lawn’s specific needs.',
  },
  {
    name: 'Seasonal Cleanups',
    video: '/cleanup-video.mp4',
    description: (
      <>
        <p><strong>Fall cleanup includes:</strong> leaf/stick removal, and bush/tree trimming, or any combination of the four.</p>
        <br />
        <p><strong>Spring cleanup includes:</strong> leaf/stick removal, weeding, mulching, and bush/tree trimming, or any combination of the six.</p>
      </>
    ),
  },
  {
    name: 'Flowerbed Installation',
    image: '/images/flowerbeds.jpg',
    description: 'Our flower bed installation service is perfect for our clients looking to enhance the look of their property with fresh, well-designed beds. Brighton Road Landscaping offers full-service installation, including bed design, edging, soil preparation, and planting.',
  },
  {
    name: 'Tree Service',
    video:'/tree-video.mp4',
    description: 'Our tree services include trimming, pruning, and small tree removal. Whether you need to shape overgrown branches, improve tree health, or clear space in your yard, Brighton Road Landscaping is equipped to handle the job safely and efficiently.',
  },
  {
    name: 'Snow Removal',
    image: '/images/snow.jpg',
    description: 'Fast, reliable snow removal during the winter season.',
  },
]

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const titleFromSlug = decodeURIComponent(slug as string).replace(/-/g, ' ')
  const service = services.find(
    (s) => s.name.toLowerCase() === titleFromSlug.toLowerCase()
  )

  if (!service) {
    return <div className="text-center py-10 text-red-500">Service not found.</div>
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative w-full h-[400px] lg:h-[500px] mb-8 rounded-2xl shadow-lg overflow-hidden">
        {service.video ? (
          <video
            src={service.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-4xl font-bold text-green-800 mb-4"style={{ fontFamily: 'Impact, sans-serif' }} >{service.name}</h1>
        <p className="text-gray-700 text-lg mb-6" style={{ fontFamily: 'Impact, sans-serif' }}>{service.description}</p>

        <Link
          href="/quote"
          className="inline-block bg-green-700 hover:bg-green-800 hover:scale-105 transition-transform shadow-md text-white text-lg font-semibold py-3 px-6 rounded-lg"
        >
          Get a Free Quote →
        </Link>
      </motion.div>
    </section>
  )
}


