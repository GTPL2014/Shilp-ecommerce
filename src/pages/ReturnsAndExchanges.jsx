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

const ReturnsAndExchanges = () => {
  const sections = [
    {
      title: "Our Promise",
      content: (
        <p>
          At <strong>Paridhan Sangrah</strong>, we aim to ensure you're satisfied with every purchase.
          If something isn't right, our return and exchange process is simple and customer-friendly.
        </p>
      ),
    },
    {
      title: "Return Eligibility",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Items must be returned within <strong>7 days</strong> of delivery.</li>
          <li>Product must be unused, unwashed, and in original condition with tags intact.</li>
          <li>Returns are only accepted for damaged, defective, or wrong items delivered.</li>
          <li>Personalized/customized products are <strong>not eligible</strong> for return.</li>
        </ul>
      ),
    },
    {
      title: "Exchange Policy",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Exchanges are allowed for size issues or defective/damaged products.</li>
          <li>Exchange requests must be placed within <strong>7 days</strong> of delivery.</li>
          <li>If the desired size is unavailable, we’ll offer store credit or a full refund.</li>
        </ul>
      ),
    },
    {
      title: "How to Initiate a Return/Exchange",
      content: (
        <ol className="list-decimal pl-6 space-y-2">
          <li>Go to <strong>My Orders</strong> and select the item you wish to return or exchange.</li>
          <li>Click on <strong>Return / Exchange</strong> and follow the steps.</li>
          <li>Upload a clear photo if your item is damaged or incorrect.</li>
          <li>Our team will review and process the request within 2-3 working days.</li>
        </ol>
      ),
    },
    {
      title: "Refunds",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Refunds will be issued to your original payment method or as store credit.</li>
          <li>Refunds are processed within <strong>5–7 business days</strong> after approval.</li>
        </ul>
      ),
    },
    {
      title: "Need Help?",
      content: (
        <p>
          Email us at <a href="mailto:support@paridhansangrah.com" className="text-pink-500 underline">support@paridhansangrah.com</a> or call us at <strong>+91-7428833683</strong>.<br />
          Our customer care is available Mon–Sat, 10 AM – 6 PM.
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
        Returns & Exchanges
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

export default ReturnsAndExchanges;
