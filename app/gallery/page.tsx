'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';

// Every project photo — new client work first, then the existing portfolio.
const IMAGES: string[] = [
  '/images/projects/landscape-design-build-hero.jpg',
  '/images/projects/hardscaping-hero.jpg',
  '/images/projects/IMG_8166.JPG',
  '/images/projects/IMG_8167.JPG',
  '/images/projects/IMG_8168.JPG',
  '/images/projects/IMG_8174.JPG',
  '/images/projects/IMG_8149.JPG',
  '/images/projects/IMG_8150.JPG',
  '/images/projects/IMG_8151.JPG',
  '/images/projects/IMG_8152.JPG',
  '/images/projects/IMG_8153.JPG',
  '/images/projects/IMG_8134.JPG',
  '/images/projects/IMG_8135_2.JPG',
  '/images/projects/IMG_8196.JPG',
  '/images/projects/IMG_7812.JPG',
  '/images/projects/IMG_7813.JPG',
  '/images/projects/IMG_7820.JPG',
  '/images/projects/IMG_7821.JPG',
  '/images/projects/IMG_7823.JPG',
  '/images/projects/IMG_2085.JPG',
  '/images/projects/IMG_2086.JPG',
  '/images/projects/IMG_2122.JPG',
  '/images/projects/IMG_2124.JPG',
  '/images/projects/IMG_0251.JPG',
  '/images/projects/IMG_0252.JPG',
  '/images/homepage1.JPG',
  '/images/hardscape.jpg',
  '/images/hardscape2.jpg',
  '/images/retaining-wall.jpg',
  '/images/install.JPG',
  '/images/Installation.JPG',
  '/images/flowerbed.jpg',
  '/images/flowerbeds.jpg',
  '/images/stripes.jpg',
  '/images/lawns.jpg',
  '/images/jaguar.jpg',
  '/images/homepage2.JPG',
  '/images/homepage4.jpg',
  '/images/fallcleanup.JPG',
  '/images/drainage-rivrock.jpg',
  '/images/sprinkle.jpg',
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Cleanup body overflow on unmount (e.g. navigating away with lightbox open)
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % IMAGES.length : null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + IMAGES.length) % IMAGES.length : null);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-[impact] text-white mb-6 tracking-wide">
            OUR WORK
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
            Browse our portfolio of completed projects across Montgomery County
          </p>
          <div className="mt-8 flex items-center justify-center gap-8 text-white/80">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{IMAGES.length}+</p>
              <p className="text-sm">Projects</p>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">5.0</p>
              <p className="text-sm">Star Rating</p>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-sm">Satisfaction</p>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 80%)' }}></div>
      </section>

      {/* Gallery Grid — uniform tiles, no filters */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {IMAGES.map((src, index) => (
              <motion.button
                type="button"
                key={src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-gray-200 shadow-sm hover:shadow-xl transition-shadow"
                aria-label={`View project photo ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`Brighton Road Landscaping project ${index + 1} in Montgomery County, PA`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <ArrowsPointingOutIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-4">
            Ready for Your Own Transformation?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every project in our gallery started with a simple quote request. Let us bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                Get a Free Quote
              </button>
            </Link>
            <Link href="/services">
              <button className="border-2 border-green-700 text-green-700 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg transform hover:scale-105 transition-all duration-300">
                View Services
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} aria-label="Close lightbox" className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous image" className="absolute left-4 md:left-8 z-[110] bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next image" className="absolute right-4 md:right-8 z-[110] bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[80vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[lightboxIndex]}
                alt={`Brighton Road Landscaping project ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            <div className="absolute bottom-8 left-0 right-0 text-center px-6">
              <p className="text-white/50 text-sm">{lightboxIndex + 1} / {IMAGES.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
