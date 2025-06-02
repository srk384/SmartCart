import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 md:h-82">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* -- About Section -- */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm">
              Your trusted online shop for quality products at great prices. Fast shipping, easy returns, and great support.
            </p>
          </div>

          {/* -- Quick Links -- */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="/returns-refunds" className="hover:text-white transition">Returns & Refunds</a></li>
              <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* -- Social Media -- */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-white transition" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

        </div>

        {/* -- Footer Bottom -- */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; 2025 Smart Cart. All rights reserved.
        </div>
      </div>
    </footer>

  )
}

export default Footer