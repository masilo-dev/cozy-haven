'use client'

'use client'

import { useState } from 'react'
import { Calendar, Users, CreditCard, Shield, Apple, Smartphone, Wallet, Building2, AlertTriangle } from 'lucide-react'

interface Property {
  id: string
  title: string
  price: number
  currency: string
  priceType: string
  maxGuests: number
}

interface BookingFormProps {
  property: Property
}

export default function BookingForm({ property }: BookingFormProps) {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showPaymentMethods, setShowPaymentMethods] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom'
  })

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paypalEmail: '',
    bankAccount: '',
    sortCode: ''
  })

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'paypal', name: 'PayPal', icon: Wallet, description: 'Pay with your PayPal account' },
    { id: 'apple-pay', name: 'Apple Pay', icon: Apple, description: 'Touch ID or Face ID' },
    { id: 'google-pay', name: 'Google Pay', icon: Smartphone, description: 'Pay with Google' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: Building2, description: 'Direct bank transfer' }
  ]

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0
    const checkIn = new Date(bookingData.checkIn)
    const checkOut = new Date(bookingData.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    const basePrice = property.price * nights
    const serviceFee = basePrice * 0.1 // 10% service fee
    const cleaningFee = 25 // Fixed cleaning fee
    const taxes = basePrice * 0.2 // 20% VAT
    return {
      basePrice,
      serviceFee,
      cleaningFee,
      taxes,
      total: basePrice + serviceFee + cleaningFee + taxes,
      nights
    }
  }

  const handleBooking = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates')
      return
    }
    setShowBookingForm(true)
  }

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPaymentMethods(true)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate payment processing
    const paymentData = {
      bookingData,
      guestDetails,
      paymentMethod: selectedPaymentMethod,
      paymentDetails,
      total: calculateTotal().total,
      propertyId: property.id
    }

    console.log('Processing payment:', paymentData)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Payment successful! Booking confirmed. You will receive a confirmation email shortly.')
      
      // Reset form
      setShowBookingForm(false)
      setShowPaymentMethods(false)
      setSelectedPaymentMethod('')
    } catch (error) {
      alert('Payment failed. Please try again.')
    }
  }

  const pricing = calculateTotal()

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-gray-900">
            {property.currency}{property.price}
          </span>
          <span className="text-gray-600">/{property.priceType}</span>
        </div>
      </div>

      {!showBookingForm ? (
        <div className="space-y-4">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={bookingData.guests}
                onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {Array.from({length: property.maxGuests}, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Breakdown */}
          {bookingData.checkIn && bookingData.checkOut && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{property.currency}{property.price} × {pricing.nights} nights</span>
                <span>{property.currency}{pricing.basePrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>{property.currency}{pricing.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cleaning fee</span>
                <span>{property.currency}{pricing.cleaningFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes (VAT 20%)</span>
                <span>{property.currency}{pricing.taxes.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>{property.currency}{pricing.total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleBooking}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Reserve Now
          </button>

          <p className="text-xs text-gray-500 text-center">
            You won&apos;t be charged yet
          </p>
        </div>
      ) : !showPaymentMethods ? (
        <form onSubmit={handleContinueToPayment} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={guestDetails.name}
                onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={guestDetails.email}
                onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={guestDetails.phone}
                onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="+44 123 456 7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input
                type="text"
                required
                value={guestDetails.address}
                onChange={(e) => setGuestDetails({...guestDetails, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Street address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                required
                value={guestDetails.city}
                onChange={(e) => setGuestDetails({...guestDetails, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
              <input
                type="text"
                required
                value={guestDetails.postalCode}
                onChange={(e) => setGuestDetails({...guestDetails, postalCode: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="SW1A 1AA"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowBookingForm(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Choose Payment Method</h3>
          
          {/* Payment Methods */}
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`w-full p-4 border rounded-lg text-left transition-all duration-200 ${
                    selectedPaymentMethod === method.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-6 w-6 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Payment Details Form */}
          {selectedPaymentMethod && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {selectedPaymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                    <input
                      type="text"
                      required
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                      <input
                        type="text"
                        required
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                      <input
                        type="text"
                        required
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                    <input
                      type="text"
                      required
                      value={paymentDetails.cardholderName}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Name on card"
                    />
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'paypal' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email *</label>
                  <input
                    type="email"
                    required
                    value={paymentDetails.paypalEmail}
                    onChange={(e) => setPaymentDetails({...paymentDetails, paypalEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your@paypal.com"
                  />
                </div>
              )}

              {selectedPaymentMethod === 'bank-transfer' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
                    <input
                      type="text"
                      required
                      value={paymentDetails.bankAccount}
                      onChange={(e) => setPaymentDetails({...paymentDetails, bankAccount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="12345678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort Code *</label>
                    <input
                      type="text"
                      required
                      value={paymentDetails.sortCode}
                      onChange={(e) => setPaymentDetails({...paymentDetails, sortCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="12-34-56"
                    />
                  </div>
                </div>
              )}

              {(selectedPaymentMethod === 'apple-pay' || selectedPaymentMethod === 'google-pay') && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    You will be redirected to {selectedPaymentMethod === 'apple-pay' ? 'Apple Pay' : 'Google Pay'}{' '}
                    to complete your payment.
                  </p>
                </div>
              )}

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{property.currency}{pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentMethods(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Complete Payment</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Your payment information is secure and encrypted with 256-bit SSL</span>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}