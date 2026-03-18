'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';

type Category = 'All' | 'Lawn Mowing' | 'Hardscaping' | 'Landscape Design' | 'Tree Service' | 'Seasonal Cleanups';

interface GalleryItem {
  src: string;
  alt: string;
  category: Category;
  span: 'normal' | 'tall' | 'wide' | 'large';
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: '/images/homepage1.JPG',
    alt: 'Professional landscape installation',
    category: 'Landscape Design',
    span: 'large',
    caption: 'Complete landscape transformation in Plymouth Meeting'
  },
  {
    src: '/images/hardscape.jpg',
    alt: 'Custom hardscape patio',
    category: 'Hardscaping',
    span: 'wide',
    caption: 'Custom paver patio installation'
  },
  {
    src: '/images/stripes.jpg',
    alt: 'Perfectly striped lawn',
    category: 'Lawn Mowing',
    span: 'tall',
    caption: 'Professional striping on a residential lawn'
  },
  {
    src: '/images/retaining-wall.jpg',
    alt: 'Stone retaining wall',
    category: 'Hardscaping',
    span: 'normal',
    caption: 'Natural stone retaining wall build'
  },
  {
    src: '/images/install.JPG',
    alt: 'Landscape installation project',
    category: 'Landscape Design',
    span: 'normal',
    caption: 'Full landscape bed installation'
  },
  {
    src: '/images/tree.jpg',
    alt: 'Tree trimming service',
    category: 'Tree Service',
    span: 'tall',
    caption: 'Professional tree trimming and shaping'
  },
  {
    src: '/images/lawns.jpg',
    alt: 'Freshly mowed lawn',
    category: 'Lawn Mowing',
    span: 'wide',
    caption: 'Weekly residential lawn maintenance'
  },
  {
    src: '/images/hardscape2.jpg',
    alt: 'Hardscape walkway',
    category: 'Hardscaping',
    span: 'normal',
    caption: 'Custom brick walkway installation'
  },
  {
    src: '/images/Installation.JPG',
    alt: 'Garden installation',
    category: 'Landscape Design',
    span: 'normal',
    caption: 'Garden bed design and planting'
  },
  {
    src: '/images/fallcleanup.JPG',
    alt: 'Fall cleanup service',
    category: 'Seasonal Cleanups',
    span: 'wide',
    caption: 'Thorough fall leaf removal and cleanup'
  },
  {
    src: '/images/flowerbed.jpg',
    alt: 'Flower bed design',
    category: 'Landscape Design',
    span: 'normal',
    caption: 'Custom flower bed design'
  },
  {
    src: '/images/Tree.websiteJPG.JPG',
    alt: 'Tree removal',
    category: 'Tree Service',
    span: 'normal',
    caption: 'Safe tree removal services'
  },
  {
    src: '/images/sprinkle.jpg',
    alt: 'Sprinkler system',
    category: 'Lawn Mowing',
    span: 'normal',
    caption: 'Irrigation system installation'
  },
  {
    src: '/images/flowerbeds.jpg',
    alt: 'Landscaped flower beds',
    category: 'Landscape Design',
    span: 'tall',
    caption: 'Mulched and planted landscape beds'
  },
  {
    src: '/images/homepage2.JPG',
    alt: 'Brighton Road team at work',
    category: 'Lawn Mowing',
    span: 'normal',
    caption: 'Our crew maintaining a residential property'
  },
  {
    src: '/images/jaguar.jpg',
    alt: 'Commercial property maintenance',
    category: 'Lawn Mowing',
    span: 'wide',
    caption: 'Commercial landscape maintenance'
  },
  {
    src: '/images/fertilizer.jpg',
    alt: 'Lawn fertilization',
    category: 'Seasonal Cleanups',
    span: 'normal',
    caption: 'Professional lawn fertilization treatment'
  },
  {
    src: '/images/homepage4.jpg',
    alt: 'Landscape project',
    category: 'Landscape Design',
    span: 'normal',
    caption: 'Residential landscape project'
  },
];

const categories: Category[] = ['All', 'Lawn Mowing', 'Hardscaping', 'Landscape Design', 'Tree Service', 'Seasonal Cleanups'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Close lightbox and reset image load state when filter changes
  useEffect(() => {
    setLightboxIndex(null);
    setImageLoaded({});
  }, [activeCategory]);

  // Cleanup body overflow on unmount (e.g. page navigation while lightbox open)
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
    setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredItems.length : null);
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null);
  }, [filteredItems.length]);

  // Keyboard navigation for lightbox
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

  const getSpanClasses = (span: string) => {
    switch (span) {
      case 'tall': return 'row-span-2';
      case 'wide': return 'md:col-span-2';
      case 'large': return 'md:col-span-2 row-span-2';
      default: return '';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Decorative elements */}
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
              <p className="text-3xl font-bold text-white">{galleryItems.length}+</p>
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

      {/* Filter Bar */}
      <section className="sticky top-[80px] md:top-[96px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-green-700 text-white shadow-lg shadow-green-700/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]"
            >
              <AnimatePresence mode="sync">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.src}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer ${getSpanClasses(item.span)}`}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Skeleton loader */}
                    {!imageLoaded[index] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />
                    )}

                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block bg-green-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                          {item.category}
                        </span>
                        <p className="text-white text-sm font-medium leading-snug">
                          {item.caption}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                          <ArrowsPointingOutIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">No projects in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
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
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
              className="absolute left-4 md:left-8 z-[110] bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next image"
              className="absolute right-4 md:right-8 z-[110] bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
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
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-0 right-0 text-center px-6">
              <p className="text-white/90 text-lg font-medium">
                {filteredItems[lightboxIndex].caption}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
