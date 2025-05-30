import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ShippingAndDelivery = () => {
  const sections = [
    {
      title: "Shipping Policy",
      content: (
        <p>
          At <strong>Paridhan Sangrah</strong>, we aim to deliver your products
          quickly and safely. We partner with trusted logistics providers to
          ensure your order reaches you on time.
        </p>
      ),
    },
    {
      title: "Shipping Charges",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Free Shipping</strong> on all prepaid orders across India.
          </li>
          <li>
            <strong>Cash on Delivery (COD)</strong> may include an extra charge,
            visible during checkout.
          </li>
        </ul>
      ),
    },
    {
      title: "Delivery Time",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Orders are processed within <strong>1–2 business days</strong>.
          </li>
          <li>
            Delivery typically takes <strong>3–7 business days</strong> based on
            location.
          </li>
          <li>Remote/rural areas may take longer.</li>
        </ul>
      ),
    },
    {
      title: "Order Tracking",
      content: (
        <ol className="list-decimal pl-5 space-y-2">
          <li>A tracking link is sent via email/SMS once shipped.</li>
          <li>
            You can also track orders in the <strong>My Orders</strong> section.
          </li>
        </ol>
      ),
    },
    {
      title: "Delays & Exceptions",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Delays may occur due to natural causes or logistics issues.</li>
          <li>We’ll keep you updated in case of unusual delays.</li>
        </ul>
      ),
    },
    {
      title: "Need Help?",
      content: (
        <p>
          Email:{" "}
          <a
            href="mailto:support@paridhansangrah.com"
            className="text-pink-500 underline"
          >
            support@paridhansangrah.com
          </a>
          <br />
          Phone: <strong>+91-7428833683</strong>
          <br />
          Support available Mon–Sat, 10 AM – 6 PM.
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-400 text-white py-16 text-center shadow-md">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold"
          >
            Shipping & Delivery
          </motion.h1>
          <p className="mt-2 text-lg font-light">Your order, our priority.</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {sections.map((section, i) => (
            <motion.section
              key={i}
              custom={i}
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {section.title}
              </h2>
              <div className="text-gray-600 leading-relaxed">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingAndDelivery;
