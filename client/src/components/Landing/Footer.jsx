import React from "react";
import {
  FaGithubSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Branding Section */}
        <div>
          <p className="mb-4 text-lg text-gray-400">
            Ayush Registration System - Seamless registration and support for Ayurvedic practitioners, ensuring your credentials are always up-to-date and verified.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookSquare className="text-gray-400 hover:text-orange-500 transition duration-300" size={36} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagramSquare className="text-gray-400 hover:text-orange-500 transition duration-300" size={36} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitterSquare className="text-gray-400 hover:text-orange-500 transition duration-300" size={36} />
            </a>
            <a href="https://github.com/jeyachandranj/AYUSH.git" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithubSquare className="text-gray-400 hover:text-orange-500 transition duration-300" size={36} />
            </a>
          </div>
        </div>

        {/* Services and Support Links */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h6 className="font-medium text-gray-400 mb-3">Services</h6>
            <ul className="space-y-2">
              <li><a href="/registration" className="hover:text-orange-500 transition duration-300">Registration</a></li>
              <li><a href="/consultation" className="hover:text-orange-500 transition duration-300">Consultation</a></li>
              <li><a href="/renewal" className="hover:text-orange-500 transition duration-300">Renewal</a></li>
              <li><a href="/certification" className="hover:text-orange-500 transition duration-300">Certification</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-medium text-gray-400 mb-3">Support</h6>
            <ul className="space-y-2">
              <li><a href="/faq" className="hover:text-orange-500 transition duration-300">FAQ</a></li>
              <li><a href="/documentation" className="hover:text-orange-500 transition duration-300">Documentation</a></li>
              <li><a href="/guides" className="hover:text-orange-500 transition duration-300">Guides</a></li>
              <li><a href="/contact" className="hover:text-orange-500 transition duration-300">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium text-gray-400 mb-3">About</h6>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-orange-500 transition duration-300">About Us</a></li>
              <li><a href="/news" className="hover:text-orange-500 transition duration-300">News</a></li>
              <li><a href="/jobs" className="hover:text-orange-500 transition duration-300">Careers</a></li>
              <li><a href="/press" className="hover:text-orange-500 transition duration-300">Press</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium text-gray-400 mb-3">Legal</h6>
            <ul className="space-y-2">
              <li><a href="/terms" className="hover:text-orange-500 transition duration-300">Terms</a></li>
              <li><a href="/privacy" className="hover:text-orange-500 transition duration-300">Privacy Policy</a></li>
              <li><a href="/compliance" className="hover:text-orange-500 transition duration-300">Compliance</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Ayush Registration System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
