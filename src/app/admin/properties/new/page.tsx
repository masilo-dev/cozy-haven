'use client'

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '../../../../components/admin/AdminHeader'
import { ArrowLeft, Upload, X, Plus, Trash2, Save } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewPropertyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>(['WiFi', 'Kitchen'])
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    country: 'England',
    type: 'SHORT_TERM',
    category: 'APARTMENT',
    basePrice: '',
    currency: '£',
    maxGuests: '2',
    bedrooms: '1',
    bathrooms: '1',
    featured: false,
    available: true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages(prev => [...prev, event.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setVideos(prev => [...prev, event.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index))
  }

  const addAmenity = () => {
    const newAmenity = prompt('Enter amenity name:')
    if (newAmenity && !amenities.includes(newAmenity)) {
      setAmenities(prev => [...prev, newAmenity])
    }
  }

  const removeAmenity = (amenity: string) => {
    setAmenities(prev => prev.filter(a => a !== amenity))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implement actual API call
      const propertyData = {
        ...formData,
        images,
        videos,
        amenities,
        basePrice: parseFloat(formData.basePrice)
      }
      
      console.log('Creating property:', propertyData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Property created successfully!')
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error creating property:', error)
      alert('Error creating property. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AdminHeader />
      <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/admin/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
          <p className="text-gray-600">Create a new rental property listing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Luxury Manchester City Centre Apartment"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Describe your property in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Full address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="City name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="SHORT_TERM">Short-term Rental</option>
                  <option value="LONG_TERM">Long-term Rental</option>
                  <option value="BOTH">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="APARTMENT">Apartment</option>
                  <option value="HOUSE">House</option>
                  <option value="VILLA">Villa</option>
                  <option value="STUDIO">Studio</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing & Capacity</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Price *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                  <input
                    type="number"
                    name="basePrice"
                    required
                    min="0"
                    step="0.01"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Guests *</label>
                <input
                  type="number"
                  name="maxGuests"
                  required
                  min="1"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms *</label>
                <input
                  type="number"
                  name="bedrooms"
                  required
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms *</label>
                <input
                  type="number"
                  name="bathrooms"
                  required
                  min="0"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Images Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Images</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-24 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Property image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Videos Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Videos</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Videos</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload videos</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI up to 50MB</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {videos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video, index) => (
                  <div key={index} className="relative group">
                    <video
                      src={video}
                      className="w-full h-32 object-cover rounded-lg"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h2>
            
            <div className="mb-4">
              <button
                type="button"
                onClick={addAmenity}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Amenity</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-700">{amenity}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(amenity)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Featured Property (appears in featured section)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="available"
                  id="available"
                  checked={formData.available}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                  Available for booking
                </label>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Creating...' : 'Create Property'}</span>
            </button>
          </div>
        </form>
      </div>
    </main>
    </>
  )
}