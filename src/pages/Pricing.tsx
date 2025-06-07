import React from 'react';
import { MapPin, ArrowRight, Info, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const routesData = [
    {
      start_location: "Kolkata",
      end_location: "Digha",
      price: [
        { car_type: "booking_total_price_Sedan", price: "3699" },
        { car_type: "booking_total_price_SUV", price: "4499" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Mandarmani",
      price: [
        { car_type: "booking_total_price_Sedan", price: "3699" },
        { car_type: "booking_total_price_SUV", price: "4499" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Contai",
      price: [
        { car_type: "booking_total_price_Sedan", price: "2399" },
        { car_type: "booking_total_price_SUV", price: "3499" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Kharagpur",
      price: [
        { car_type: "booking_total_price_Sedan", price: "2399" },
        { car_type: "booking_total_price_SUV", price: "3499" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Asansol",
      price: [
        { car_type: "booking_total_price_Sedan", price: "3699" },
        { car_type: "booking_total_price_SUV", price: "4899" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Durgapur",
      price: [
        { car_type: "booking_total_price_Sedan", price: "3399" },
        { car_type: "booking_total_price_SUV", price: "4499" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Tarapith",
      price: [
        { car_type: "booking_total_price_Sedan", price: "4699" },
        { car_type: "booking_total_price_SUV", price: "5699" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Mayapur",
      price: [
        { car_type: "booking_total_price_Sedan", price: "3499" },
        { car_type: "booking_total_price_SUV", price: "4499" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Haldia",
      price: [
        { car_type: "booking_total_price_Sedan", price: "2999" },
        { car_type: "booking_total_price_SUV", price: "3699" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Shantiniketan",
      price: [
        { car_type: "booking_total_price_Sedan", price: "3699" },
        { car_type: "booking_total_price_SUV", price: "4999" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Gangasagar",
      price: [
        { car_type: "booking_total_price_Sedan", price: "2999" },
        { car_type: "booking_total_price_SUV", price: "3999" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Bakkhali",
      price: [
        { car_type: "booking_total_price_Sedan", price: "2999" },
        { car_type: "booking_total_price_SUV", price: "3999" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Kakdwip",
      price: [
        { car_type: "booking_total_price_Sedan", price: "2999" },
        { car_type: "booking_total_price_SUV", price: "3999" }
      ]
    },
    {
      start_location: "Kolkata",
      end_location: "Kolaghat",
      price: [
        { car_type: "booking_total_price_Sedan", price: "1999" },
        { car_type: "booking_total_price_SUV", price: "2499" }
      ]
    }
  ];

  const priceFactors = [
    { factor: 'Base Fare', description: 'Distance-based pricing' },
    { factor: 'Driver Allowance', description: 'Outstation driver charges as per standard rates' },
    { factor: 'Toll Charges', description: 'All toll charges included' },
    { factor: 'State Tax', description: 'State entry tax included' }
  ];

  const handleRouteSelect = (route: any) => {
    // Store route data for prefilling booking form
    localStorage.setItem('selectedRoute', JSON.stringify({
      fromCity: route.start_location,
      toCity: route.end_location
    }));
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Transparent Pricing</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Fixed rates for popular routes with no hidden charges. All taxes and tolls included.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Popular Routes & Fares</h2>
            <p className="text-xl text-gray-600">Fixed pricing for one-way trips. Click to book instantly.</p>
            <div className="mt-4 text-sm text-gray-500">
              Price includes all: Toll, State Tax, Driver Allowance
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routesData.map((route, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border cursor-pointer group"
                onClick={() => handleRouteSelect(route)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{route.start_location}</h3>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <h3 className="font-semibold text-gray-900">{route.end_location}</h3>
                </div>
                <div className="space-y-2">
                  {route.price.map((priceInfo, priceIndex) => (
                    <div key={priceIndex} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {priceInfo.car_type.includes('Sedan') ? 'Sedan' : 'SUV'}
                      </span>
                      <span className="text-lg font-bold text-blue-600">₹{priceInfo.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Click to book this route
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Factors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What's Included in Your Fare?</h2>
            <p className="text-xl text-gray-600">Transparent pricing with no hidden charges</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceFactors.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="flex items-center justify-center mb-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.factor}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-blue-800 mb-2">Additional Charges</h3>
              <p className="text-blue-700 text-sm">
                Actual parking fees at destination (if applicable)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Book Your Ride?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the best prices for intercity cab booking across West Bengal
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
          >
            Book Your Cab Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;