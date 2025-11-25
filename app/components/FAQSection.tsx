'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'What areas do you service?',
    answer:
      'Brighton Road Landscaping serves all of Montgomery County, Pa, mainly focusing on our hometown, Plymouth Meeting and the surrounding areas of Conshohoken, Blue Bell, King of Prussia, Audubon, Fort Washington, and Lafayette Hill.',
  },
    {
        question: 'Do you offer lawn mowing every other week?',
        answer:
          'Yes, at Brighton Road Landscaping, we promise that your lawn will be mowed as often as you want. You may cancel or reschedule anytime within 24 hours of the normal cut day.',
      },
  {
    question: 'Do you offer trimming with lawn mowing?',
    answer: 'Yes, at Brighton Road Landscaping, our standard lawn mowing service includes all lawn mowing, edging, trimming, and blowing.',
  },
  {
    question: 'How do you get paid?',
    answer:
      'At Brighton Road Landscaping, we accept cash, check, Venmo, Zelle, Cash App and Apple Pay. Our clients can also choose to be billed once a month if they prefer.',
  },
  {
    question: 'Do I need to sign a contract for the lawn care service?',
    answer: 'No, at Brighton Road Landscaping, we do not require our clients to sign any contracts to use our lawn care service.',
  },
  {
    question: 'What lawn mowers/equipment do you use?',
    answer:
      'At Brighton Road Landscaping, we use a variety of lawn mowers, including multiple Scag zero-turn mowers, Dewalt residential push mowers, and Echo outdoor power equipment.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h3 className="text-lg font-semibold text-green-700 flex justify-between items-center">
                {faq.question}
                <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
              </h3>
              {openIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

