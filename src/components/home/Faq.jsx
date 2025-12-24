"use client";
import React from "react";
import Image from "next/image";

const faqData = [
  {
    question: "How do I rent a car?",
    answer:
      "Simply browse our available cars, select the one you like, and follow the booking process. You can contact the owner directly if needed.",
  },
  {
    question: "Can I list my own car for rent?",
    answer:
      "Yes! You can add your car using the 'Add Your Car' form. Your listing will be reviewed and published quickly.",
  },
  {
    question: "Is the payment process safe?",
    answer:
      "Absolutely! All transactions are secure, and you can pay safely through our platform.",
  },
  {
    question: "Do you offer support if something goes wrong?",
    answer:
      "Yes, our support team is available 24/7 to assist you with any issues during booking or renting.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking anytime before the rental period starts. Refunds and changes are processed according to our rental policy.",
  },
];

const Faq = () => {
  return (
    <div className="max-w-[1132px] mx-auto px-4 py-20">
      <div className="flex flex-col items-center mb-12">
        <h2 className="section_heading text-center">
          Frequently Asked Questions
        </h2>
        <p className="section_paragraph mt-4 text-center max-w-2xl text-lg text-gray-300">
          Got questions? We’ve got answers. Learn more about renting or listing
          your car.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* image  */}
        <div className="flex justify-center items-center">
          <Image
            src="https://i.pinimg.com/1200x/b6/86/83/b68683689519fcfdbdd7a9548ecde3b2.jpg"
            alt="FAQ Illustration"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        {/* accordions */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              tabIndex={0}
              className="collapse collapse-arrow border border-white/10 rounded-lg hover:border-white/20 "
            >
              <div className="collapse-title text-white font-medium text-lg">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-300 text-base">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
