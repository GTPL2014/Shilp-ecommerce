import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f9f9ff] text-gray-800 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Shop Info */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">
            Shop Non-Stop on Paridhan Sangrah
          </h3>
          <p className="text-sm mb-2">Trusted by families across India</p>
          <p className="text-sm mb-4">
            Men • Women • Kids | Quality You Can Wear
          </p>
          <div className="flex gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-12 w-auto"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-800 text-lg">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/careers"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 cursor-pointer"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="/become-a-seller"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 cursor-pointer"
              >
                Become a Seller
              </a>
            </li>
            {/* <li>
              <a
                href="/sitemap"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 cursor-pointer"
              >
                Sitemap
              </a>
            </li> */}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-800 text-lg">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/returns-exchanges"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 cursor-pointer"
              >
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a
                href="/shipping-and-delivery"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 cursor-pointer"
              >
                Shipping & Delivery
              </a>
            </li>
            {/* <li>
              <a
                href="/faqs"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 cursor-pointer"
              >
                FAQs
              </a>
            </li> */}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-3 text-xl text-gray-600 mb-5">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
            <FaTwitter />
          </div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <address className="text-sm not-italic leading-6">
            Paridhan Sangrah Pvt. Ltd.
            <br />
            Email:{" "}
            <a
              href="mailto:support@paridhansangrah.com"
              className="text-blue-600"
            >
              support@paridhansangrah.com
            </a>
          </address>
          <p className="text-xs text-gray-500 mt-2">© 2025 Paridhan Sangrah</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
