import React from 'react';
import { MapPin, Clock, Plane, Car, Users, Shield, Star, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: MapPin,
      title: 'One Way Trip',
      description: 'Perfect for single destination travel with no return journey required.',
      features: [
        'Pay only for distance traveled',
        'No return charges',
        'Flexible pickup times',
        'Direct route optimization'
      ],
      popular: true
    },
    {
      icon: Car,
      title: 'Round Trip',
      description: 'Go and return with the same driver and vehicle at discounted rates.',
      features: [
        '20% discount on return journey',
        'Same driver for both legs',
        'Waiting charges minimal',
        'Flexible return timing'
      ],
      popular: false
    },
    {
      icon: Clock,
      title: 'Local Rental',
      description: 'Hourly car rentals for local sightseeing, shopping, or business meetings.',
      features: [
        'Minimum 4 hours booking',
        'Includes driver and fuel',
        'Multiple stops allowed',
        'City-wise fixed rates'
      ],
      popular: false
    },
    {
      icon: Plane,
      title: 'Airport Transfer',
      description: 'Reliable airport pickup and drop services with flight tracking.',
      features: [
        'Flight delay monitoring',
        'Meet & greet service',
        'Fixed pricing',
        '24/7 availability'
      ],
      popular: false
    }
  ];

  const carTypes = [
    {
      name: 'Hatchback',
      icon: '🚗',
      seats: '4 Seater',
      luggage: '2 Bags',
      examples: 'Wagon R, Hyundai i20',
      features: ['AC', 'Music System', 'Clean Interior']
    },
    {
      name: 'Sedan',
      icon: '🚙',
      seats: '4 Seater',
      luggage: '3 Bags',
      examples: 'Maruti Dzire, Honda Amaze',
      features: ['AC', 'Spacious', 'Comfortable']
    },
    {
      name: 'SUV',
      icon: '🚐',
      seats: '6-7 Seater',
      luggage: '5 Bags',
      examples: 'Ertiga, Tata Safari',
      features: ['AC', 'Large Groups', 'Extra Space']
    }
  ];

  const coverage = [
    'Kolkata', 'Durgapur', 'Siliguri', 'Asansol', 'Howrah', 'Burdwan', 'Malda', 'Jalpaiguri',
    'Kharagpur', 'Haldia', 'Bankura', 'Purulia', 'Cooch Behar', 'Darjeeling', 'Kalimpong',
    'Digha', 'Mandarmani', 'Shantiniketan', 'Murshidabad', 'Nabadwip'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Comprehensive intercity cab services designed for every travel need across West Bengal and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Travel Style</h2>
            <p className="text-xl text-gray-600">Flexible options for every journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                      <service.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>Book This Service</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Vehicle</h2>
            <p className="text-xl text-gray-600">From solo travelers to large groups, we have the perfect car for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carTypes.map((car, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">{car.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{car.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Seating:</span>
                      <span className="font-medium">{car.seats}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Luggage:</span>
                      <span className="font-medium">{car.luggage}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{car.examples}</p>
                  <div className="space-y-1">
                    {car.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Service Coverage</h2>
            <p className="text-xl text-gray-600">We cover major cities and towns across West Bengal</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {coverage.map((city, index) => (
                <div key={index} className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                  <span className="text-gray-800 font-medium">{city}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Don't see your city?</p>
              <p className="text-blue-600 font-semibold">Stay tuned — we'll be there soon!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Safety & Quality</h2>
            <p className="text-xl text-gray-600">Your safety is our top priority</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Drivers</h3>
              <p className="text-gray-600 leading-relaxed">
                All drivers undergo thorough background verification, training, and regular assessments.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Well-Maintained Vehicles</h3>
              <p className="text-gray-600 leading-relaxed">
                Regular maintenance, cleanliness checks, and safety inspections ensure comfortable rides.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous monitoring, customer feedback, and quality improvements for excellent service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Experience Premium Travel?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your intercity cab now and enjoy comfortable, safe, and reliable travel
          </p>
          <a
            href="/"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
          >
            Book Your Ride Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;