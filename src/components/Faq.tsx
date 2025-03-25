import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is Logo Ipsum?',
    answer:
      "An idea to support our community's creative economy while finding one-of-a-kind pieces",
  },
  {
    question: 'Where are your products made?',
    answer:
      "We're selling 100% Egyptian products crafted with local threads by our amazing Egyptian tailors.",
  },
  {
    question: 'How can I track my order?',
    answer:
      'You can track your order through Customer Area, link in the email sent by us, or by contacting our customer service email wecare@testmail.com',
  },
];

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="mb-20 px-0 py-12 sm:px-5 md:px-9 lg:px-12">
      <section className="space-y-8 bg-white px-5 py-10 shadow-xs sm:rounded-3xl sm:p-10 sm:shadow-md lg:gap-8 xl:flex xl:px-14 xl:py-16">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold lg:text-5xl">FAQ</h2>
          <p className="xl:text-lg">
            Get informed, get quick responses to your questions through{' '}
            <a href="#" className="font-medium underline">
              this link
            </a>
          </p>
        </div>
        <div className="mt-6 rounded-lg bg-zinc-100 px-6 py-1 md:px-12 md:py-5 xl:w-1/2">
          {faqData.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <button
                  className="flex w-full justify-between py-5 text-left font-medium text-gray-900 focus:outline-none xl:text-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <HiChevronDown
                    className={`text-xl transition-transform xl:text-2xl ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="mb-5 pr-6 text-sm">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
