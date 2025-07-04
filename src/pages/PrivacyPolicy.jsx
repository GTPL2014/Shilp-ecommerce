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

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal information such as name, email, phone number, and address.</li>
          <li>Order history and payment details (secured and not stored on our servers).</li>
          <li>Browsing data like IP address, device info, and cookies.</li>
        </ul>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>To process orders and deliver products.</li>
          <li>To communicate updates, offers, and service-related info.</li>
          <li>To improve website experience and customer support.</li>
        </ul>
      ),
    },
    {
      title: "Data Protection",
      content: (
        <p>
          We implement strict security measures to protect your data. We never share your personal info with third parties without your consent, except where legally required.
        </p>
      ),
    },
    {
      title: "Cookies",
      content: (
        <p>
          Our site uses cookies to personalize content and analyze traffic. You can manage your cookie preferences through your browser settings.
        </p>
      ),
    },
    {
      title: "Your Rights",
      content: (
        <p>
          You may request access, correction, or deletion of your personal data by contacting us at <a href="mailto:support@Shilpsangrah.com" className="text-pink-500 underline">support@Shilpsangrah.com</a>.
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
          Privacy Policy
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

export default PrivacyPolicy;
