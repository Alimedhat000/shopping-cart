import AccordionQA from './Util/AccordionQA';
import { IconType } from 'react-icons';
import { ReactElement, ReactNode } from 'react';

interface FAQItem {
  question: string;
  answer: ReactNode;
  icon?: ReactElement<IconType>;
}

export default function FAQ({ FAQdata }: { FAQdata: FAQItem[] }) {
  return (
    <div className="site-padding mb-20 px-0 py-12 sm:px-5">
      <section className="space-y-8 bg-white px-5 py-10 shadow-xs sm:rounded-3xl sm:p-10 sm:shadow-md lg:gap-8 xl:flex xl:px-14 xl:py-16">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold lg:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="xl:text-lg">
            Get informed, get quick responses to your questions through{' '}
            <a href="#" className="font-medium underline">
              this link
            </a>
          </p>
        </div>
        <AccordionQA QAData={FAQdata} className="px-12 py-5" />
      </section>
    </div>
  );
}
