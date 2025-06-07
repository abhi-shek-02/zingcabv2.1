import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Car, Users, ArrowRight, Clock } from 'lucide-react';
import Modal from './Modal';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fromCity: '',
    toCity: '',
    date: '',
    returnDate: '',
    carType: '',
    tripType: 'oneway',
    pickupTime: '09:00',
    timeFormat: 'AM'
  });
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    title: '',
    message: ''
  });

  const carTypes = [
    { id: 'hatchback', name: 'Hatchback', seats: '4 Seater', example: 'Wagon R' },
    { id: 'sedan', name: 'Sedan', seats: '4 Seater', example: 'Maruti Dzire' },
    { id: 'suv', name: 'SUV', seats: '6-7 Seater', example: 'Ertiga' },
    { id: 'crysta', name: 'Crysta', seats: '7 Seater', example: 'Toyota Innova Crysta' },
    { id: 'scorpio', name: 'Scorpio', seats: '7 Seater', example: 'Mahindra Scorpio' }
  ];

  const popularRoutes = [
    { from: 'Kolkata', to: 'Digha', distance: 185 },
    { from: 'Kolkata', to: 'Mandarmani', distance: 180 },
    { from: 'Kolkata', to: 'Kharagpur', distance: 120 },
    { from: 'Kolkata', to: 'Durgapur', distance: 165 }
  ];

  // Check for prefilled trip type from footer links
  useEffect(() => {
    const selectedTripType = localStorage.getItem('selectedTripType');
    if (selectedTripType) {
      setFormData(prev => ({ ...prev, tripType: selectedTripType }));
      localStorage.removeItem('selectedTripType');
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

  const validateForm = () => {
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
    return true;
  };

  const calculateFare = () => {
    if (!validateForm()) return;

    const route = popularRoutes.find(r => 
      (r.from.toLowerCase().includes(formData.fromCity.toLowerCase()) && 
       r.to.toLowerCase().includes(formData.toCity.toLowerCase())) ||
      (r.to.toLowerCase().includes(formData.fromCity.toLowerCase()) && 
       r.from.toLowerCase().includes(formData.toCity.toLowerCase()))
    );
    
    const distance = route ? route.distance : 200;
    let baseFare = 2000; // Base fare for estimation
    
    if (formData.tripType === 'roundtrip') {
      baseFare = Math.round(baseFare * 1.8);
    } else if (formData.tripType === 'local') {
      baseFare = 1500; // Local rental base fare
    }
    
    setEstimatedFare(baseFare);
  };

  const handleBooking = () => {
    if (!estimatedFare) {
      calculateFare();
      return;
    }
    
    showModal('success', 'Booking Request Received!', `Your booking request has been submitted. Total estimated fare: ₹${estimatedFare}. Our team will contact you shortly to confirm details and arrange payment.`);
  };

  const handleRouteSelect = (route: any) => {
    setFormData(prev => ({ 
      ...prev, 
      fromCity: route.from, 
      toCity: route.to 
    }));
  };

  const renderTimeSelector = () => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          name="timeFormat"
          value={formData.timeFormat}
          onChange={handleInputChange}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Intercity Cab</h2>
        <p className="text-gray-600">Quick, reliable, and affordable travel across West Bengal</p>
      </div>

      {/* Trip Type Selection */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={formData.tripType === 'oneway'}
              onChange={handleInputChange}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm font-medium">One Way</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              checked={formData.tripType === 'roundtrip'}
              onChange={handleInputChange}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm font-medium">Round Trip</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="local"
              checked={formData.tripType === 'local'}
              onChange={handleInputChange}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm font-medium">Local Rental</span>
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
              min={new Date().toISOString().split('T')[0]}
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
                min={formData.date || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Pickup Time */}
        {renderTimeSelector()}

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

      {/* Car Types Display */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-center text-sm">{car.name}</h3>
            <p className="text-xs text-gray-600 text-center">{car.seats}</p>
            <p className="text-xs text-gray-500 text-center">{car.example}</p>
          </div>
        ))}
      </div>

      {/* Fare Estimate */}
      {estimatedFare && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">Estimated Fare</h3>
              <p className="text-sm text-green-600">
                {formData.tripType === 'roundtrip' ? 'Round Trip' : formData.tripType === 'local' ? 'Local Rental' : 'One Way'} • {formData.fromCity} {formData.toCity && `to ${formData.toCity}`}
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
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={calculateFare}
          className="flex-1 bg-blue-100 text-blue-700 py-3 px-6 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-200"
        >
          Get Fare Estimate
        </button>
        <button
          onClick={handleBooking}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>{estimatedFare ? 'Confirm Booking' : 'Book Your Ride'}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Popular Routes (only for intercity trips) */}
      {formData.tripType !== 'local' && (
        <div className="mt-8 pt-6 border-t border-gray-200">
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