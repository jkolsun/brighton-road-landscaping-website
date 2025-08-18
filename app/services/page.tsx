'use client';

import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    name: 'Lawn Mowing',
    image: '/images/lawns.jpg',
  },
  {
    name: 'Fertilization and Treatment',
    image: '/images/fertilizer.jpg',
  },
  {
    name: 'Seasonal Cleanups',
    image: '/images/cleanups.jpg',
  },
  {
    name: 'Flowerbed Installation',
    image: '/images/flowerbed.jpg',
  },
  {
    name: 'Tree Service',
    image: '/images/tree.jpg',
  },
  {
    name: 'Snow Removal',
    image: '/images/snow.jpg',
  },
];

export default function ServicesPage() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center font-[Impact] text-green-800 mb-10">
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service.name}
            href={`/services/${service.name
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '')}`}
          >
            <div className="relative group bg-white p-4 rounded-xl overflow-hidden shadow-lg transition hover:scale-105 duration-300 cursor-pointer">
              <div className="relative h-40 w-full mb-4">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="text-center text-lg text-neutral-900" style={{ fontFamily: 'Impact, sans-serif' }}>
                {service.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}