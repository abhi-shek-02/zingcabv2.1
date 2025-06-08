import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Car, Users, ArrowRight, Clock, Phone, User, Mail } from 'lucide-react';
import Modal from './Modal';
import { supabase } from '../lib/supabase';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fromCity: '',
    toCity: '',
    date: '',
    returnDate: '',
    carType: '',
    tripType: 'oneway',
    pickupTime: '09:00'
  });
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    title: '',
    message: ''
  });

  const carTypes = [
    { id: 'hatchback', name: 'Hatchback', seats: '4 Seater', example: 'Wagon R', icon: Car },
    { id: 'sedan', name: 'Sedan', seats: '4 Seater', example: 'Maruti Dzire', icon: Car },
    { id: 'suv', name: 'SUV', seats: '6-7 Seater', example: 'Ertiga', icon: Car },
    { id: 'crysta', name: 'Crysta', seats: '7 Seater', example: 'Toyota Innova Crysta', icon: Car },
    { id: 'scorpio', name: 'Scorpio', seats: '7 Seater', example: 'Mahindra Scorpio', icon: Car }
  ];

  const popularRoutes = [
    { from: 'Kolkata', to: 'Digha', distance: 185 },
    { from: 'Kolkata', to: 'Mandarmani', distance: 180 },
    { from: 'Kolkata', to: 'Kharagpur', distance: 120 },
    { from: 'Kolkata', to: 'Durgapur', distance: 165 }
  ];

  const tripTypes = [
    { id: 'oneway', name: 'One Way', description: 'Single destination' },
    { id: 'roundtrip', name: 'Round Trip', description: 'Go and return' },
    { id: 'local', name: 'Local Rental', description: 'Hourly rental' },
    { id: 'airport', name: 'Airport Transfer', description: 'Airport pickup/drop' }
  ];

  // Check for prefilled trip type from footer links
  useEffect(() => {
    const selectedTripType = localStorage.getItem('selectedTripType');
    if (selectedTripType) {
      setFormData(prev => ({ ...prev, tripType: selectedTripType }));
      localStorage.removeItem('selectedTripType');
    }

    // Check for prefilled route from pricing page
    const selectedRoute = localStorage.getItem('selectedRoute');
    if (selectedRoute) {
      const route = JSON.parse(selectedRoute);
      setFormData(prev => ({ 
        ...prev, 
        fromCity: route.fromCity, 
        toCity: route.toCity,
        carType: 'sedan' // Default to sedan
      }));
      localStorage.removeItem('selectedRoute');
    }
  }, []);

  const showModal = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setEstimatedFare(null);
  };

  const validatePhone = (phone: string) => {
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(phone);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showModal('warning', 'Name Required', 'Please enter your full name.');
      return false;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      showModal('warning', 'Valid Email Required', 'Please enter a valid email address.');
      return false;
    }

    if (!validatePhone(formData.phone)) {
      showModal('warning', 'Valid Phone Required', 'Please enter a valid 10-digit Indian mobile number.');
      return false;
    }

    if (formData.tripType === 'local') {
      if (!formData.fromCity || !formData.date || !formData.carType || !formData.pickupTime) {
        showModal('warning', 'Incomplete Form', 'Please fill in pickup location, date, time, and car type for local rental.');
        return false;
      }
    } else {
      if (!formData.fromCity || !formData.toCity || !formData.date || !formData.carType || !formData.pickupTime) {
        showModal('warning', 'Incomplete Form', 'Please fill in all required fields including pickup time.');
        return false;
      }
      if (formData.tripType === 'roundtrip' && !formData.returnDate) {
        showModal('warning', 'Return Date Required', 'Please select a return date for round trip booking.');
        return false;
      }
    }

    // Validate date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      showModal('warning', 'Invalid Date', 'Pickup date cannot be in the past.');
      return false;
    }

    return true;
  };

  const calculateFare = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Try to get fare from routes table
      const { data: routeData, error } = await supabase
        .from('routes')
        .select('*')
        .or(`and(from_city.ilike.%${formData.fromCity}%,to_city.ilike.%${formData.toCity}%),and(from_city.ilike.%${formData.toCity}%,to_city.ilike.%${formData.fromCity}%)`)
        .limit(1);

      let baseFare = 2000; // Default fare

      if (routeData && routeData.length > 0) {
        const route = routeData[0];
        baseFare = formData.carType === 'suv' || formData.carType === 'crysta' || formData.carType === 'scorpio' 
          ? route.suv_price 
          : route.sedan_price;
      }

      if (formData.tripType === 'roundtrip') {
        baseFare = Math.round(baseFare * 1.8);
      } else if (formData.tripType === 'local') {
        baseFare = 1500; // Local rental base fare
      }

      setEstimatedFare(baseFare);
    } catch (error) {
      console.error('Error calculating fare:', error);
      showModal('error', 'Error', 'Failed to calculate fare. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateBookingId = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ZC${timestamp.slice(-6)}${random}`;
  };

  const handleBooking = async () => {
    if (!estimatedFare) {
      await calculateFare();
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const bookingId = generateBookingId();
      
      const bookingData = {
        booking_id: bookingId,
        phone: formData.phone,
        name: formData.name,
        email: formData.email,
        from_city: formData.fromCity,
        to_city: formData.tripType === 'local' ? null : formData.toCity,
        pickup_date: formData.date,
        return_date: formData.returnDate || null,
        pickup_time: formData.pickupTime,
        trip_type: formData.tripType,
        car_type: formData.carType,
        estimated_fare: estimatedFare,
        status: 'pending'
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      showModal('success', 'Booking Confirmed!', 
        `Your booking has been confirmed with ID: ${bookingId}. Total estimated fare: ₹${estimatedFare}. Our team will contact you shortly to confirm details and arrange payment.`);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        fromCity: '',
        toCity: '',
        date: '',
        returnDate: '',
        carType: '',
        tripType: 'oneway',
        pickupTime: '09:00'
      });
      setEstimatedFare(null);
    } catch (error) {
      console.error('Error creating booking:', error);
      showModal('error', 'Booking Failed', 'Failed to create booking. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouteSelect = (route: any) => {
    setFormData(prev => ({ 
      ...prev, 
      fromCity: route.from, 
      toCity: route.to 
    }));
  };

  const handleTripTypeChange = (tripType: string) => {
    setFormData(prev => ({ ...prev, tripType }));
    setEstimatedFare(null);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Your Intercity Cab</h2>
        <p className="text-gray-600">Quick, reliable, and affordable travel across West Bengal</p>
      </div>

      {/* Trip Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Trip Type</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tripTypes.map(type => (
            <div
              key={type.id}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.tripType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleTripTypeChange(type.id)}
            >
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-1">{type.name}</h4>
                <p className="text-xs text-gray-600">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="9876543210"
                maxLength={10}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Travel Details */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* From City / Pickup Location */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.tripType === 'local' ? 'Pickup Location' : 'From City'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="fromCity"
                value={formData.fromCity}
                onChange={handleInputChange}
                placeholder="Kolkata"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* To City (hidden for local rental) */}
          {formData.tripType !== 'local' && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">To City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="toCity"
                  value={formData.toCity}
                  onChange={handleInputChange}
                  placeholder="Durgapur"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.tripType === 'local' ? 'Pickup Date' : 'Travel Date'}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={getTodayDate()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Return Date (only for round trip) */}
          {formData.tripType === 'roundtrip' && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  min={formData.date || getTodayDate()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Pickup Time */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Car Type */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
            <div className="relative">
              <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                name="carType"
                value={formData.carType}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Select Car</option>
                {carTypes.map(car => (
                  <option key={car.id} value={car.id}>
                    {car.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Car Types Display */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Vehicle</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {carTypes.map(car => (
            <div
              key={car.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.carType === car.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, carType: car.id }))}
            >
              <div className="flex items-center justify-center mb-2">
                <car.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-center text-sm">{car.name}</h3>
              <p className="text-xs text-gray-600 text-center">{car.seats}</p>
              <p className="text-xs text-gray-500 text-center">{car.example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fare Estimate */}
      {estimatedFare && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">Estimated Fare</h3>
              <p className="text-sm text-green-600">
                {formData.tripType === 'roundtrip' ? 'Round Trip' : 
                 formData.tripType === 'local' ? 'Local Rental' : 
                 formData.tripType === 'airport' ? 'Airport Transfer' : 'One Way'} • {formData.fromCity} {formData.toCity && `to ${formData.toCity}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-800">₹{estimatedFare}</p>
              <p className="text-sm text-green-600">Pay ₹500 advance</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={calculateFare}
          disabled={isLoading}
          className="flex-1 bg-blue-100 text-blue-700 py-3 px-6 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Calculating...' : 'Get Fare Estimate'}
        </button>
        <button
          onClick={handleBooking}
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <span>{isLoading ? 'Processing...' : estimatedFare ? 'Confirm Booking' : 'Book Your Ride'}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Popular Routes (only for intercity trips) */}
      {formData.tripType !== 'local' && (
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Popular Routes</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {popularRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() => handleRouteSelect(route)}
                className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900">
                  {route.from} → {route.to}
                </p>
                <p className="text-xs text-gray-600">{route.distance} km</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default BookingForm;