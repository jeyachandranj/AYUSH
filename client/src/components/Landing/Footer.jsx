import React from "react";
import {
  FaGithubSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mx-auto grid max-w-screen-xl gap-6 px-4 py-8 text-gray-300 lg:grid-cols-3">
      <div>
        <p className="pb-4">
          Ayush Registration System - Providing seamless registration and support for Ayurvedic practitioners. We ensure your credentials are up-to-date and verified.
        </p>

        <div className="flex">
          <form method="GET" className="pr-1 duration-300 hover:scale-110">
            <button formAction="https://www.facebook.com">
              <FaFacebookSquare size={36} />
            </button>
          </form>
          <form method="GET" className="pr-1 duration-300 hover:scale-110">
            <button formAction="https://www.instagram.com">
              <FaInstagramSquare size={36} />
            </button>
          </form>
          <form method="GET" className="pr-1 duration-300 hover:scale-110">
            <button formAction="https://www.twitter.com">
              <FaTwitterSquare size={36} />
            </button>
          </form>
          <form method="GET" className="pr-1 duration-300 hover:scale-110">
            <button formAction="https://github.com/jeyachandranj/AYUSH.git">
              <FaGithubSquare size={36} />
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-around lg:col-span-2 lg:mt-20">
        <div>
          <h6 className="font-medium text-gray-400">Services</h6>
          <ul>
            <li className="footer-page-link"><a href="/registration">Registration</a></li>
            <li className="footer-page-link"><a href="/consultation">Consultation</a></li>
            <li className="footer-page-link"><a href="/renewal">Renewal</a></li>
            <li className="footer-page-link"><a href="/certification">Certification</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Support</h6>
          <ul>
            <li className="footer-page-link"><a href="/faq">FAQ</a></li>
            <li className="footer-page-link"><a href="/documentation">Documentation</a></li>
            <li className="footer-page-link"><a href="/guides">Guides</a></li>
            <li className="footer-page-link"><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">About</h6>
          <ul>
            <li className="footer-page-link"><a href="/about">About Us</a></li>
            <li className="footer-page-link"><a href="/news">News</a></li>
            <li className="footer-page-link"><a href="/jobs">Careers</a></li>
            <li className="footer-page-link"><a href="/press">Press</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Legal</h6>
          <ul>
            <li className="footer-page-link"><a href="/terms">Terms</a></li>
            <li className="footer-page-link"><a href="/privacy">Privacy Policy</a></li>
            <li className="footer-page-link"><a href="/compliance">Compliance</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
