import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
const cardVariant = {
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

const jobOpenings = [
  {
    title: "Customer Support Executive",
    location: "Remote / Jaipur",
    type: "Full-time",
    description:
      "Provide exceptional support to customers via chat, phone, and email. Must have excellent communication skills.",
  },
  {
    title: "E-commerce Operations Manager",
    location: "Jaipur Office",
    type: "Full-time",
    description:
      "Oversee daily operations including order processing, logistics, and vendor coordination.",
  },
  {
    title: "Fashion Content Creator",
    location: "Remote",
    type: "Part-time / Freelance",
    description:
      "Create fashion-related blogs, videos, and social media content aligned with our brand voice.",
  },
];

const Careers = () => {
  return (<>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-400 text-white py-16 text-center shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
        >
          Careers at Paridhan Sangrah
        </motion.h1>
        <p className="mt-2 text-lg font-light">
          Join our vibrant team and help shape the future of fashion.
        </p>
      </div>

      {/* Open Positions */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Current Openings
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {jobOpenings.map((job, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.location} · {job.type}</p>
              <p className="text-sm text-gray-700 mb-4">{job.description}</p>
              <a
                href="mailto:careers@paridhansangrah.com?subject=Application for Job Opening"
                className="inline-block text-pink-600 hover:underline font-medium text-sm"
              >
                Apply Now →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 text-base mb-3">
            Don’t see a role that fits? We’d still love to hear from you.
          </p>
          <a
            href="mailto:careers@paridhansangrah.com"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full transition"
          >
            Send Your Resume
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Careers;
