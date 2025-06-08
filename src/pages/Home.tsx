import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Clock, 
  Star, 
  Users, 
  CheckCircle, 
  Phone,
  MessageCircle,
  Award,
  MapPin,
  Car
} from 'lucide-react';
import BookingForm from '../components/BookingForm';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Drivers',
      description: 'All drivers are background verified and trained for your safety'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Available round the clock for all your travel needs'
    },
    {
      icon: Star,
      title: 'Rated 4.8/5',
      description: 'Trusted by thousands of customers across West Bengal'
    },
    {
      icon: Users,
      title: 'Group Friendly',
      description: 'From solo travelers to large groups, we have the right vehicle'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Kolkata',
      rating: 5,
      comment: 'Excellent service! Driver was punctual and the car was clean. Will definitely use again.',
      route: 'Kolkata to Durgapur'
    },
    {
      name: 'Priya Sharma',
      location: 'Siliguri',
      rating: 5,
      comment: 'Safe and comfortable journey. Fair pricing and professional driver.',
      route: 'Siliguri to Kolkata'
    },
    {
      name: 'Amit Das',
      location: 'Digha',
      rating: 5,
      comment: 'Best cab service in Bengal! Highly recommended for intercity travel.',
      route: 'Kolkata to Digha'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Cities Covered' },
    { number: '1000+', label: 'Verified Drivers' },
    { number: '4.8/5', label: 'Customer Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Reliable Intercity
              <span className="block text-blue-200">Cab Services</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Travel comfortably across West Bengal and beyond with verified drivers, 
              clean vehicles, and transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-blue-200">
                <CheckCircle className="h-5 w-5" />
                <span>Verified Drivers</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <CheckCircle className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <CheckCircle className="h-5 w-5" />
                <span>Fair Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="relative -mt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ZingCab?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing safe, reliable, and comfortable intercity travel experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Flexible travel solutions for every need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">One Way Trip</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Perfect for single destination travel. No return charges, pay only for distance traveled.
              </p>
              <Link 
                to="/services" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Round Trip</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Go and return with the same car. Enjoy discounted rates and hassle-free experience.
              </p>
              <Link 
                to="/services" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Local Rental</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hourly rentals for local sightseeing, shopping, or business meetings within the city.
              </p>
              <Link 
                to="/services" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real travelers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                  <div className="text-sm text-blue-600 mt-1">{testimonial.route}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Travel?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your intercity cab now and experience comfortable, reliable travel across West Bengal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/917003371343"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp Booking</span>
            </a>
            <a
              href="tel:7003371343"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;