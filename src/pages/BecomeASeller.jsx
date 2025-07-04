import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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

const BecomeASeller = () => {
  const sections = [
    {
      title: "Why Sell with Us?",
      content: (
        <p>
          <strong>Shilp Sangrah</strong> empowers fashion creators and businesses
          with a platform to showcase their passion and expand their reach. Whether you're
          a boutique owner, artisan, or designer — we help you shine.
        </p>
      ),
    },
    {
      title: "What You Get",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Wider Reach:</strong> Connect with fashion-lovers nationwide.</li>
          <li><strong>No Upfront Cost:</strong> Only pay when you earn.</li>
          <li><strong>Marketing Support:</strong> From social to influencer boosts.</li>
          <li><strong>Secure Payments:</strong> Timely bank settlements.</li>
          <li><strong>Easy Logistics:</strong> We’ll take care of delivery.</li>
        </ul>
      ),
    },
    {
      title: "Who Can Sell?",
      content: (
        <p>
          We welcome fashion brands, homegrown labels, handloom artisans, jewelry makers,
          and anyone who creates beautiful, authentic products.
        </p>
      ),
    },
    {
      title: "How It Works",
      content: (
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Sign Up</strong> via our registration form.</li>
          <li><strong>Add Products</strong> with photos, prices, and descriptions.</li>
          <li><strong>Start Selling</strong> once your profile is approved.</li>
          <li><strong>Deliver Products</strong> with help from our logistics partners.</li>
          <li><strong>Get Paid</strong> securely and on time.</li>
        </ol>
      ),
    },
    {
      title: "Let’s Grow Together",
      content: (
        <p>
          Join a growing community that celebrates creativity, culture, and craftsmanship.
          Together, let's bring beautiful fashion to more people — ethically and authentically.
        </p>
      ),
    },
    {
      title: "Ready to Become a Seller?",
      content: (
        <p>
          📧 Email us at{" "}
          <a
            href="mailto:sell@Shilpsangrah.com"
            className="text-pink-500 underline"
          >
            sell@Shilpsangrah.com
          </a>{" "}
          or WhatsApp us at <strong>+91-7428833683</strong> to begin.
          <br />
          Or visit our{" "}
          <a
            href="https://admin.Shilpsangrah.com/"
            className="text-pink-500 underline"
          >
            Seller Onboarding Page
          </a>{" "}
          to register now.
        </p>
      ),
    },
  ];

  return (
    <>
    <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-pink-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Become a Seller
      </motion.h1>

      {sections.map((section, i) => (
        <motion.section
          key={i}
          custom={i}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-12 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">{section.title}</h2>
          <div className="text-base leading-relaxed text-gray-700">
            {section.content}
          </div>
        </motion.section>
      ))}
    </div>
    <Footer />
    </>
  );
};

export default BecomeASeller;
