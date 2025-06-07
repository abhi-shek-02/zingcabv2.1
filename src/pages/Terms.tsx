import React from 'react';
import { Shield, FileText, AlertCircle, CreditCard, Users, Clock } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Booking Terms',
      content: [
        'All bookings must be made at least 2 hours in advance for intercity travel',
        'Advance payment of ₹500 is required to confirm booking',
        'Remaining payment should be made after trip completion',
        'Booking confirmation will be sent via SMS and WhatsApp',
        'Driver details will be shared 1 hour before pickup time'
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment & Pricing',
      content: [
        'Fare is based on the actual distance traveled',
        'Toll charges and state taxes are included',
        'Driver allowance is included for outstation trips',
        'Extra charges apply for additional kilometers',
        'No hidden charges – transparent pricing guaranteed'
      ]
    },
    {
      icon: Clock,
      title: 'Cancellation Policy',
      content: [
        'Free cancellation up to 12 hours before pickup time',
        'Cancellation between 2-12 hours: 25% of advance payment',
        'Cancellation within 2 hours: 50% of advance payment',
        'No-show: 100% advance payment forfeited',
        'Refunds will be processed within 5-7 business days'
      ]
    },
    {
      icon: Users,
      title: 'Driver & Vehicle',
      content: [
        'All drivers are background verified and licensed',
        'Vehicles undergo regular maintenance and safety checks',
        'Smoking is strictly prohibited in all vehicles',
        'Driver contact details will be shared for coordination',
        'Any issues with driver or vehicle should be reported immediately'
      ]
    },
    {
      icon: Shield,
      title: 'Safety & Liability',
      content: [
        'ZingCab is not liable for delays due to traffic, weather, or road conditions',
        'Passengers must carry proper identification for travel',
        'Company reserves the right to refuse service to intoxicated passengers',
        'Damage to vehicle interior will be charged to the passenger',
        'Emergency contact numbers are available 24/7'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Terms of Use',
      content: [
        'By using our services, you agree to these terms and conditions',
        'ZingCab reserves the right to modify terms without prior notice',
        'Any disputes will be subject to Kolkata jurisdiction',
        'Feedback and complaints should be submitted within 24 hours of trip',
        'These terms supersede all previous agreements'
      ]
    }
  ];

  const refundScenarios = [
    { scenario: 'Cancellation by ZingCab', refund: '100% refund including advance' },
    { scenario: 'Vehicle breakdown', refund: '100% refund or alternate arrangement' },
    { scenario: 'Driver no-show', refund: '100% refund including advance' },
    { scenario: 'Trip not completed', refund: 'Proportionate refund for incomplete journey' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Our commitment to transparent and fair service policies for all ZingCab users.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-800">
            <strong>Last Updated:</strong> December 15, 2024 | <strong>Effective Date:</strong> December 1, 2024
          </p>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <section.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Policy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Refund Policy</h2>
            <p className="text-xl text-gray-600">When and how refunds are processed</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {refundScenarios.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.scenario}</h3>
                  <p className="text-green-600 font-medium">{item.refund}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Refunds are processed within 5-7 business days</li>
                <li>• Bank charges for refund processing may apply</li>
                <li>• Refund requests must be submitted within 48 hours of the incident</li>
                <li>• All refunds are subject to verification and approval</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Data */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Privacy & Data Protection</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h3>
                <p className="text-gray-700 leading-relaxed">
                  We collect personal information including name, phone number, email, and travel details necessary for booking and service delivery. Location data may be collected for pickup and drop coordination.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your information is used solely for booking confirmation, driver coordination, payment processing, and service improvement. We do not share personal data with third parties except as required for service delivery.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h3>
                <p className="text-gray-700 leading-relaxed">
                  We implement industry-standard security measures to protect your data. All payment information is processed through secure channels and not stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Terms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Our Terms?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            If you have any questions about these terms and conditions, please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:support@zingcab.in"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Email Legal Team
            </a>
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 border border-blue-600"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;