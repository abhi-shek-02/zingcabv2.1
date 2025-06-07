import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const handleServiceClick = (tripType: string) => {
    // Store the trip type in localStorage to prefill the booking form
    localStorage.setItem('selectedTripType', tripType);
    // Navigate to home page where booking form is located
    window.location.href = '/';
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ZingCab</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for comfortable and reliable intercity cab services across West Bengal and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Fare Calculator
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleServiceClick('oneway')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  One Way Trip
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick('roundtrip')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  Round Trip
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick('local')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  Local Rental
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick('airport')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  Airport Transfer
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <div className="text-gray-300">
                  <div>7003371343</div>
                  <div>7003848501</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">support@zingcab.in</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  Bagmari Road, Kolkata - 700054
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 ZingCab. All rights reserved. | Designed for reliable intercity travel.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;