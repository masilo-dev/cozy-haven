import Image from 'next/image'
import { Building2, Users, Award, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Cozy Haven Holdings</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your trusted partner for premium property rentals across England since 2018
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2018, Cozy Haven Holdings began with a simple mission: to provide exceptional 
                rental experiences that feel like home. What started as a small collection of properties 
                in Manchester has grown into England&apos;s premier rental platform.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We specialize in both short-term holiday rentals and long-term residential lettings, 
                offering everything from cozy studios to luxury penthouses across major English cities.
              </p>
              <p className="text-lg text-gray-700">
                Our commitment to quality, customer service, and attention to detail has earned us the 
                trust of thousands of guests and property owners throughout England.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cozy Haven Holdings office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Numbers that showcase our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Building2 className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Premium Properties</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25,000+</div>
              <div className="text-gray-600">Happy Guests</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Award className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive rental solutions for every need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Short-Term Rentals</h3>
              <p className="text-gray-700 mb-4">
                Perfect for holidays, business trips, and weekend getaways. Fully furnished properties 
                with all amenities included.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Nightly and weekly rates</li>
                <li>• 24/7 guest support</li>
                <li>• Professional cleaning</li>
                <li>• Instant booking available</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Long-Term Lettings</h3>
              <p className="text-gray-700 mb-4">
                Ideal for relocations, extended stays, and corporate housing. Flexible lease terms 
                from 1 month to 2 years.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Monthly rental rates</li>
                <li>• Flexible lease terms</li>
                <li>• Utility management</li>
                <li>• Maintenance included</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Management</h3>
              <p className="text-gray-700 mb-4">
                Comprehensive management services for property owners. Maximize your rental income 
                with our expert team.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Marketing & listing</li>
                <li>• Guest screening</li>
                <li>• Maintenance coordination</li>
                <li>• Revenue optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600">We're here to help with all your rental needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Phone className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+44 161 123 4567</p>
              <p className="text-sm text-gray-500 mt-2">Mon-Fri 9AM-6PM</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Mail className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@cozyhaven.co.uk</p>
              <p className="text-sm text-gray-500 mt-2">24/7 Support</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Clock className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency</h3>
              <p className="text-gray-600">+44 161 999 8888</p>
              <p className="text-sm text-gray-500 mt-2">24/7 Emergency Line</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}