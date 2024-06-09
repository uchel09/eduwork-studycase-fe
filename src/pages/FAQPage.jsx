import HeaderC from "../components/Layouts/HeaderC";
import styles from "../styles/style";

import Footer from "../components/Layouts/Footer";
import { useState } from "react";
import { faqArray } from "../static/faqData";

const FAQPage = () => {
  return (
    <div>
      <HeaderC activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tabNumber) => {
    setActiveTab(tabNumber === activeTab ? 0 : tabNumber);
  };
  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {/* single Faq */}
        {faqArray.map((item, index) => {
          return (
            <div className="border-b border-gray-200 pb-4" key={index}>
              <button
                className="flex items-center justify-between w-full"
                onClick={() => toggleTab(item.id)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                {activeTab === item.id ? (
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {activeTab === item.id && (
                <div className="border-b border-gray-200">
                  <p className="text-base text-gray-500 bg-white p-2 mt-2">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQPage;
