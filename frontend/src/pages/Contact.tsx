import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock,
  faMessage,
  faUser,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, 
  faFacebook, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: 'Visit Us',
      content: '123 Car Avenue, Mumbai, Maharashtra 400001',
      color: 'bg-primary-600'
    },
    {
      icon: faPhone,
      title: 'Call Us',
      content: '+91 98765 43210',
      color: 'bg-primary-600'
    },
    {
      icon: faEnvelope,
      title: 'Email Us',
      content: 'info@rentorbits.com',
      color: 'bg-primary-600'
    },
    {
      icon: faClock,
      title: 'Working Hours',
      content: 'Mon - Sat: 9:00 AM - 8:00 PM',
      color: 'bg-primary-600'
    }
  ];

  const socialLinks = [
    { icon: faWhatsapp, link: 'https://wa.me/919876543210', color: 'bg-primary-600' },
    { icon: faFacebook, link: '#', color: 'bg-primary-700' },
    { icon: faInstagram, link: '#', color: 'bg-primary-600' },
    { icon: faLinkedin, link: '#', color: 'bg-primary-700' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative py-20 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-white/80">
              Have questions? We're here to help. Contact our team for support or inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`${info.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <FontAwesomeIcon icon={info.icon} className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">{info.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{info.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                      Subject
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                        <FontAwesomeIcon icon={faMessage} />
                      </span>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                      isSubmitting ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'
                    }`}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>

                  {submitStatus === 'success' && (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg">
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
                      Failed to send message. Please try again later.
                    </div>
                  )}
                </form>
              </div>

              {/* Map and Social Links */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Find Us</h2>
                {/* Map Placeholder */}
                <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-6">
                  <iframe
                    title="RentOrbits Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995644531!3d19.08219783958001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1652789563301!5m2!1sen!2sin"
                    className="w-full h-full rounded-lg"
                    loading="lazy"
                  />
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Connect With Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity duration-300`}
                      >
                        <FontAwesomeIcon icon={social.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 