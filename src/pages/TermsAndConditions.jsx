import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Introduction",
      content: (
        <p>
          Welcome to <strong>Paridhan Sangrah</strong>. By accessing or using our website, you agree to be bound by these terms and conditions. Please read them carefully.
        </p>
      ),
    },
    {
      title: "User Responsibilities",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>You must provide accurate and complete information during registration or checkout.</li>
          <li>You agree not to misuse the site for any fraudulent or unlawful activity.</li>
          <li>All content on the website is the property of Paridhan Sangrah and cannot be reused without permission.</li>
        </ul>
      ),
    },
    {
      title: "Product & Pricing",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Prices are subject to change without notice.</li>
          <li>We strive to provide accurate product details, but errors may occur.</li>
        </ul>
      ),
    },
    {
      title: "Limitation of Liability",
      content: (
        <p>
          Paridhan Sangrah is not liable for any damages arising from the use of our platform. We are not responsible for delays or failures due to unforeseen circumstances.
        </p>
      ),
    },
    {
      title: "Changes to Terms",
      content: (
        <p>
          We reserve the right to update these terms at any time. Continued use of the site means you accept the revised terms.
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <motion.h1
          className="text-4xl font-bold mb-10 text-pink-600 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Terms & Conditions
        </motion.h1>

        {sections.map((section, i) => (
          <motion.section
            key={i}
            custom={i}
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">{section.title}</h2>
            <div className="text-base leading-relaxed">{section.content}</div>
          </motion.section>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
